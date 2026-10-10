import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
  type DragStartEvent,
  type KeyboardCoordinateGetter,
} from '@dnd-kit/core'
import { useState, type KeyboardEvent } from 'react'
import type { StageGroup } from '../state/selectors'
import type { Contact, Stage } from '../types'
import { ContactCard } from './ContactCard'
import { Button } from './ui/Button'
import { Icon } from './ui/Icon'
import { STAGE_STYLE, StagePill } from './ui/stage'

interface ContactsBoardProps {
  groups: StageGroup[]
  contacts: Contact[]
  selectedId: string | null
  highlight: { id: string; key: number } | null
  filtersActive: boolean
  onOpen: (id: string) => void
  onMove: (id: string, stage: Stage) => void
  onClearFilters: () => void
  /** While the panel floats over the right edge, add scroll room so the last column can move out from under it. */
  panelOpen?: boolean
}

/**
 * ← → move between columns, ↑ ↓ between cards (Enter opens).
 * Space picks a card up for keyboard drag-and-drop (handled by dnd-kit).
 */
function moveCardFocus(e: KeyboardEvent<HTMLButtonElement>) {
  if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return
  const board = e.currentTarget.closest('[data-board]')
  if (!board) return
  const columns = Array.from(board.querySelectorAll<HTMLElement>('[data-column]')).map((col) =>
    Array.from(col.querySelectorAll<HTMLButtonElement>('[data-focus-id]')),
  )
  const colIndex = columns.findIndex((cards) => cards.includes(e.currentTarget))
  const rowIndex = columns[colIndex]?.indexOf(e.currentTarget) ?? -1
  let target: HTMLButtonElement | undefined
  if (e.key === 'ArrowUp') target = columns[colIndex][rowIndex - 1]
  if (e.key === 'ArrowDown') target = columns[colIndex][rowIndex + 1]
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const step = e.key === 'ArrowLeft' ? -1 : 1
    for (let c = colIndex + step; c >= 0 && c < columns.length; c += step) {
      if (columns[c].length) {
        target = columns[c][Math.min(rowIndex, columns[c].length - 1)]
        break
      }
    }
  }
  if (target) {
    e.preventDefault()
    target.focus()
  }
}

/** Keyboard drag: ← / → jump a whole column instead of nudging 25px at a time. */
const columnJump: KeyboardCoordinateGetter = (event, { context, currentCoordinates }) => {
  if (event.code !== 'ArrowLeft' && event.code !== 'ArrowRight') return undefined
  event.preventDefault()
  const rects = Array.from(context.droppableRects.values()).sort((a, b) => a.left - b.left)
  if (!rects.length) return currentCoordinates
  const x = currentCoordinates.x
  const current = rects.findIndex((r) => x >= r.left - 8 && x < r.left + r.width)
  const from = current === -1 ? 0 : current
  const next = rects[Math.max(0, Math.min(rects.length - 1, from + (event.code === 'ArrowRight' ? 1 : -1)))]
  return { x: next.left + 12, y: currentCoordinates.y }
}

function DraggableCard({
  contact,
  selected,
  flashing,
  flashKey,
  onOpen,
}: {
  contact: Contact
  selected: boolean
  flashing: boolean
  flashKey?: number
  onOpen: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: contact.id, data: { stage: contact.stage } })

  if (isDragging) {
    // Keep a dashed gap where the card was, so people can see where it came from.
    return (
      <div
        ref={setNodeRef}
        aria-hidden
        className={`h-[112px] rounded-md border border-dashed opacity-60 ${STAGE_STYLE[contact.stage].emptyRing}`}
      />
    )
  }

  return (
    <ContactCard
      key={flashKey}
      ref={setNodeRef}
      contact={contact}
      selected={selected}
      flashing={flashing}
      data-focus-id={contact.id}
      aria-label={`${contact.name}, ${contact.stage}. Press Enter to open, Space to move.`}
      {...attributes}
      {...listeners}
      onClick={() => onOpen(contact.id)}
      onKeyDown={(e) => {
        listeners?.onKeyDown?.(e)
        if (e.defaultPrevented) return
        if (e.key === 'Enter') {
          e.preventDefault()
          onOpen(contact.id)
          return
        }
        moveCardFocus(e)
      }}
    />
  )
}

function EmptyColumn({
  group,
  filtersActive,
  dropping,
  draggingName,
  onClearFilters,
}: {
  group: StageGroup
  filtersActive: boolean
  dropping: boolean
  draggingName?: string
  onClearFilters: () => void
}) {
  const style = STAGE_STYLE[group.stage]

  if (dropping) {
    return (
      <div className={`flex min-h-[240px] flex-1 flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 text-center ${style.dropZone}`}>
        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${style.dropIcon}`}>
          <Icon name="arrow-down" size={20} />
        </span>
        <span className="text-sm font-bold">Drop to move to {group.stage}</span>
        <span className="text-sm">{draggingName} will leave their current stage. You can undo right after.</span>
      </div>
    )
  }

  // Empty because of the filters, or empty for everyone: these need different words.
  if (filtersActive) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line-strong p-6 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-muted shadow-[inset_0_0_0_1px_var(--border)]">
          <Icon name="funnel" size={20} />
        </span>
        <span className="text-sm font-bold">None match your filters</span>
        <span className="text-sm text-muted">
          {group.hiddenCount > 0
            ? `${group.hiddenCount} ${group.stage} ${group.hiddenCount === 1 ? 'contact is' : 'contacts are'} hidden by your filters.`
            : `No ${group.stage} contacts yet, for anyone.`}
        </span>
        {group.hiddenCount > 0 && (
          <Button size="sm" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className={`flex min-h-[240px] flex-1 flex-col items-center justify-center gap-2 rounded-md border-[1.5px] border-dashed p-6 text-center ${style.emptyRing}`}>
      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${style.pill}`}>
        <Icon name="trending-up" size={20} />
      </span>
      <span className="text-sm font-bold">No {group.stage.toLowerCase()} contacts yet</span>
      <span className="text-sm text-muted">
        Drag a card here, or open a contact and set its stage to {group.stage}.
      </span>
    </div>
  )
}

function Column({
  group,
  selectedId,
  highlight,
  filtersActive,
  dragging,
  onOpen,
  onClearFilters,
}: {
  group: StageGroup
  selectedId: string | null
  highlight: { id: string; key: number } | null
  filtersActive: boolean
  dragging: Contact | null
  onOpen: (id: string) => void
  onClearFilters: () => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: group.stage })
  const isTarget = isOver && dragging !== null && dragging.stage !== group.stage
  const empty = group.contacts.length === 0

  return (
    <section
      ref={setNodeRef}
      data-column={group.stage}
      aria-label={`${group.stage}, ${group.contacts.length} ${group.contacts.length === 1 ? 'contact' : 'contacts'}`}
      className={`flex min-h-[560px] w-[280px] shrink-0 flex-col gap-3 rounded-md p-3 transition-shadow ${STAGE_STYLE[group.stage].column} ${
        isTarget ? STAGE_STYLE[group.stage].dropRing : ''
      }`}
    >
      <h2 className="m-0 flex items-center gap-2 px-1 pt-1 text-sm font-bold">
        <StagePill stage={group.stage} />
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-surface px-2 text-xs font-bold text-muted shadow-[inset_0_0_0_1px_var(--border)]">
          {group.contacts.length}
        </span>
      </h2>
      {!empty && (
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {group.contacts.map((c) => (
            <li key={c.id}>
              <DraggableCard
                contact={c}
                selected={c.id === selectedId}
                flashing={highlight?.id === c.id}
                flashKey={highlight?.id === c.id ? highlight.key : undefined}
                onOpen={onOpen}
              />
            </li>
          ))}
        </ul>
      )}
      {(empty || isTarget) && (
        <EmptyColumn
          group={group}
          filtersActive={filtersActive}
          dropping={isTarget}
          draggingName={dragging?.name}
          onClearFilters={onClearFilters}
        />
      )}
    </section>
  )
}

export function ContactsBoard({
  groups,
  contacts,
  selectedId,
  highlight,
  filtersActive,
  onOpen,
  onMove,
  onClearFilters,
  panelOpen = false,
}: ContactsBoardProps) {
  const [dragging, setDragging] = useState<Contact | null>(null)
  const sensors = useSensors(
    // A small distance keeps a normal click as "open", not "drag".
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      keyboardCodes: { start: ['Space'], cancel: ['Escape'], end: ['Space', 'Enter'] },
      coordinateGetter: columnJump,
    }),
  )

  const nameOf = (id: string | number) => contacts.find((c) => c.id === id)?.name ?? 'Contact'
  const announcements: Announcements = {
    onDragStart: ({ active }) => `Picked up ${nameOf(active.id)}. Use the arrow keys to move between stages, Space to drop, Escape to cancel.`,
    onDragOver: ({ active, over }) => (over ? `${nameOf(active.id)} is over ${over.id}.` : `${nameOf(active.id)} is not over a stage.`),
    onDragEnd: ({ active, over }) =>
      over ? `${nameOf(active.id)} dropped in ${over.id}.` : `${nameOf(active.id)} was dropped back where it was.`,
    onDragCancel: ({ active }) => `Moving ${nameOf(active.id)} was cancelled.`,
  }

  function handleDragStart(e: DragStartEvent) {
    setDragging(contacts.find((c) => c.id === e.active.id) ?? null)
  }

  function handleDragEnd(e: DragEndEvent) {
    const id = String(e.active.id)
    const stage = e.over?.id as Stage | undefined
    setDragging(null)
    if (stage) onMove(id, stage)
    // Keep keyboard users on the card they just moved.
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-board] [data-focus-id="${id}"]`)?.focus())
  }

  return (
    <DndContext
      sensors={sensors}
      accessibility={{ announcements }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setDragging(null)}
    >
      <div className="flex h-full flex-col">
        <div role="region" aria-label="Contacts board, grouped by stage" tabIndex={-1} className="min-h-0 flex-1 overflow-auto px-4 py-6 md:px-8">
          <div data-board className="flex min-w-min items-start gap-4">
            {groups.map((g) => (
              <Column
                key={g.stage}
                group={g}
                selectedId={selectedId}
                highlight={highlight}
                filtersActive={filtersActive}
                dragging={dragging}
                onOpen={onOpen}
                onClearFilters={onClearFilters}
              />
            ))}
            {panelOpen && <div aria-hidden className="w-[424px] shrink-0" />}
          </div>
        </div>
        <footer className="hidden shrink-0 flex-wrap items-center gap-4 border-t border-line px-8 py-3 text-xs text-muted md:flex">
          <span>Drag a card to change its stage</span>
          <span className="flex-1" />
          <span className="inline-flex items-center gap-1">
            <kbd className="kbd">←</kbd>
            <kbd className="kbd">→</kbd> columns
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd> cards
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="kbd">Enter</kbd> open
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="kbd">Space</kbd> move
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="kbd">?</kbd> shortcuts
          </span>
        </footer>
      </div>
      <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.2, 0, 0, 1)' }}>
        {dragging ? <ContactCard contact={dragging} overlay tabIndex={-1} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
