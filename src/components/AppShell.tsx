import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MOD_KEY, isTypingTarget } from '../lib/platform'
import { revealRecord } from '../lib/reveal'
import {
  changeCount,
  groupByStage,
  hasActiveFilters,
  navigationOrder,
  selectVisible,
  selectedContact,
} from '../state/selectors'
import { useStore } from '../state/store'
import { ContactsBoard } from './ContactsBoard'
import { ContactsTable } from './ContactsTable'
import { DetailsPanel } from './DetailsPanel'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Toast } from './Toast'
import { Button } from './ui/Button'
import { Dialog } from './ui/Dialog'
import { Icon } from './ui/Icon'

/** Something the person asked for that would throw away an unsaved draft. */
type PendingAction = { kind: 'close' } | { kind: 'open'; id: string }

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('contacts-theme', theme)
    } catch {
      /* storage can be unavailable (private mode); the theme still applies */
    }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))] as const
}

/** True when the media query matches; follows window resizes. */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia?.(query).matches ?? false)
  useEffect(() => {
    const mql = window.matchMedia?.(query)
    if (!mql) return
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/**
 * Sidebar open/closed. On wide screens the choice is pinned and remembered.
 * Below 1280px the sidebar is a rail, and opening it shows it over the page
 * (not remembered, closes on Esc or a click outside), so the content never squeezes.
 */
function useSidebar() {
  const isWide = useMediaQuery('(min-width: 1280px)')
  const [pinned, setPinned] = useState(() => {
    try {
      return localStorage.getItem('contacts-sidebar') !== 'closed'
    } catch {
      return true
    }
  })
  const [overlay, setOverlay] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('contacts-sidebar', pinned ? 'open' : 'closed')
    } catch {
      /* storage unavailable: the choice still applies for this visit */
    }
  }, [pinned])

  // Crossing the breakpoint drops a temporary overlay.
  useEffect(() => setOverlay(false), [isWide])

  const toggle = useCallback(() => {
    if (isWide) setPinned((p) => !p)
    else setOverlay((o) => !o)
  }, [isWide])

  return {
    pinned,
    overlay: overlay && !isWide,
    expanded: isWide ? pinned : overlay,
    toggle,
    closeOverlay: () => setOverlay(false),
  }
}

/**
 * Both views stay mounted; the inactive one is hidden with visibility (not display),
 * so its scroll position survives switching. visibility:hidden also removes it from
 * the tab order and the accessibility tree.
 */
function viewClass(active: boolean) {
  return active ? 'h-full' : 'invisible pointer-events-none absolute inset-0'
}

export function AppShell() {
  const { state, dispatch } = useStore()
  const [theme, toggleTheme] = useTheme()
  const sidebar = useSidebar()
  const [pending, setPending] = useState<PendingAction | null>(null)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const visible = useMemo(() => selectVisible(state), [state])
  const groups = useMemo(() => groupByStage(state.contacts, visible), [state.contacts, visible])
  const order = useMemo(() => navigationOrder(visible, state.view), [visible, state.view])
  const contact = selectedContact(state)
  const changes = changeCount(state)
  const dirty = changes > 0
  const filtersActive = hasActiveFilters(state)

  // ---- Opening, closing and moving between records (with the unsaved-changes guard) ----

  const close = useCallback(() => {
    const id = state.selectedId
    dispatch({ type: 'close' })
    if (id) {
      // Return to context: same view and scroll, focus on the record, even if it moved column.
      revealRecord(state.view, id, { focus: true })
      const name = state.contacts.find((c) => c.id === id)?.name
      if (name) setAnnouncement(`Panel closed. Focus is on ${name}.`)
    }
  }, [dispatch, state.selectedId, state.view, state.contacts])

  const requestOpen = useCallback(
    (id: string) => {
      if (id === state.selectedId) return
      if (dirty) setPending({ kind: 'open', id })
      else dispatch({ type: 'open', id })
    },
    [dirty, dispatch, state.selectedId],
  )

  const requestClose = useCallback(() => {
    if (dirty) setPending({ kind: 'close' })
    else close()
  }, [dirty, close])

  const step = useCallback(
    (delta: 1 | -1) => {
      if (!contact || order.length < 2) return
      const i = order.findIndex((c) => c.id === contact.id)
      const next = order[(i + delta + order.length) % order.length]
      requestOpen(next.id)
    },
    [contact, order, requestOpen],
  )

  const save = useCallback(() => {
    if (dirty) dispatch({ type: 'save' })
  }, [dirty, dispatch])

  /** Cancel = drop the draft and go back to where you were. */
  const cancel = useCallback(() => {
    dispatch({ type: 'discardDraft' })
    close()
  }, [dispatch, close])

  function confirmDiscard() {
    const action = pending
    setPending(null)
    dispatch({ type: 'discardDraft' })
    if (action?.kind === 'open') dispatch({ type: 'open', id: action.id })
    else close()
  }

  // ---- Keyboard shortcuts ----
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (pending || showShortcuts) return // the open dialog handles its own keys
      const typing = isTypingTarget(e.target)

      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && state.selectedId) {
        e.preventDefault()
        save()
        return
      }
      if (e.key === 'Escape' && sidebar.overlay) {
        e.preventDefault()
        sidebar.closeOverlay()
        return
      }
      if (e.key === 'Escape' && state.selectedId && !e.defaultPrevented) {
        e.preventDefault()
        requestClose()
        return
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === '[') {
        e.preventDefault()
        sidebar.toggle()
      } else if (e.key === '/') {
        e.preventDefault()
        searchRef.current?.focus()
      } else if (e.key === '?') {
        e.preventDefault()
        setShowShortcuts(true)
      } else if (state.selectedId && (e.key === 'j' || e.key === 'k')) {
        e.preventDefault()
        step(e.key === 'j' ? 1 : -1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [pending, showShortcuts, state.selectedId, save, requestClose, step, sidebar])

  // ---- Keep each view's scroll position when switching views ----
  // Both views stay mounted (one is hidden), so their scroll containers keep their place.
  // After a change, bring the changed record into view (a moved card can land off-screen).
  // Only when a record changes (not on every view switch, which must keep its scroll).
  const viewRef = useRef(state.view)
  viewRef.current = state.view
  useEffect(() => {
    if (state.highlight) revealRecord(viewRef.current, state.highlight.id)
  }, [state.highlight])

  // Switching views while a record is open: make sure that record is visible beside the panel.
  const selectedRef = useRef(state.selectedId)
  selectedRef.current = state.selectedId
  useEffect(() => {
    if (selectedRef.current) revealRecord(state.view, selectedRef.current)
  }, [state.view])

  const clearFilters = useCallback(() => dispatch({ type: 'clearFilters' }), [dispatch])
  const position = contact ? { index: Math.max(0, order.findIndex((c) => c.id === contact.id)), total: order.length } : { index: 0, total: 0 }

  return (
    <div
      className="relative flex h-full min-h-[600px] bg-bg text-ink"
      data-sidebar={sidebar.pinned ? 'open' : 'closed'}
      data-sidebar-overlay={sidebar.overlay}
    >
      <a
        href="#main"
        className="absolute left-2 top-2 z-[60] -translate-y-20 rounded-sm bg-action px-3 py-2 text-sm font-semibold text-on-action focus:translate-y-0"
      >
        Skip to contacts
      </a>
      {/* The wrapper holds the sidebar's place in the layout: a 64px rail, or 232px when pinned open. */}
      <div className="relative hidden w-16 shrink-0 transition-[width] duration-200 ease-standard md:block pinned:w-[232px]">
        <Sidebar
          theme={theme}
          onToggleTheme={toggleTheme}
          expanded={sidebar.expanded}
          overlay={sidebar.overlay}
          onToggle={sidebar.toggle}
        />
      </div>
      {sidebar.overlay && (
        <div aria-hidden className="absolute inset-0 z-30 hidden md:block" onMouseDown={sidebar.closeOverlay} />
      )}

      <div id="main" className="relative flex min-w-0 flex-1 flex-col">
        <Header ref={searchRef} visibleCount={visible.length} />

        <div className="relative min-h-0 flex-1">
          <div data-view="table" className={viewClass(state.view === 'table')}>
            <ContactsTable
              contacts={visible}
              selectedId={state.selectedId}
              highlight={state.highlight}
              search={state.search}
              onOpen={requestOpen}
              onClearFilters={clearFilters}
            />
          </div>
          <div data-view="board" className={viewClass(state.view === 'board')}>
            <ContactsBoard
              groups={groups}
              contacts={state.contacts}
              selectedId={state.selectedId}
              highlight={state.highlight}
              filtersActive={filtersActive}
              onOpen={requestOpen}
              onMove={(id, stage) => dispatch({ type: 'moveStage', id, stage })}
              onClearFilters={clearFilters}
              panelOpen={Boolean(contact)}
            />
          </div>

          <Toast
            toast={state.toast}
            onUndo={(entry) => dispatch({ type: 'undo', entry })}
            onDismiss={() => dispatch({ type: 'dismissToast' })}
          />
        </div>

        {contact && (
          <DetailsPanel
            contact={contact}
            values={state.draft ?? { stage: contact.stage, notes: contact.notes }}
            changeCount={changes}
            justSaved={state.savedId === contact.id}
            position={position}
            onChange={(patch) => dispatch({ type: 'editDraft', patch })}
            onSave={save}
            onCancel={cancel}
            onClose={requestClose}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </div>

      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {pending && contact && (
        <Dialog
          role="alertdialog"
          title="Discard unsaved changes?"
          description={`Your changes to ${contact.name} haven't been saved. If you discard them, the record stays as it was.`}
          icon={
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning-bg text-warning">
              <Icon name="warning" size={20} />
            </span>
          }
          onDismiss={() => setPending(null)}
          footer={
            <>
              <Button onClick={() => setPending(null)}>Keep editing</Button>
              <Button variant="danger" onClick={confirmDiscard}>
                Discard changes
              </Button>
            </>
          }
        />
      )}

      {showShortcuts && (
        <Dialog
          title="Keyboard shortcuts"
          onDismiss={() => setShowShortcuts(false)}
          icon={
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sunken text-muted">
              <Icon name="keypad" size={20} />
            </span>
          }
          footer={<Button onClick={() => setShowShortcuts(false)}>Close</Button>}
        >
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            {[
              ['/', 'Search'],
              ['[', 'Open or close the sidebar'],
              ['↑ ↓', 'Move between rows or cards'],
              ['← →', 'Move between board columns'],
              ['Enter', 'Open the focused contact'],
              ['Space', 'Pick up a card to move it (board)'],
              ['J / K', 'Next / previous contact in the panel'],
              [`${MOD_KEY} Enter`, 'Save changes'],
              ['Esc', 'Cancel or close'],
            ].map(([keys, what]) => (
              <div key={keys} className="contents">
                <dt>
                  <kbd className="kbd">{keys}</kbd>
                </dt>
                <dd className="m-0 text-muted">{what}</dd>
              </div>
            ))}
          </dl>
        </Dialog>
      )}
    </div>
  )
}
