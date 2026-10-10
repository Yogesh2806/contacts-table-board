import type { KeyboardEvent } from 'react'
import type { Contact } from '../types'
import { Avatar, NoOwner } from './ui/Avatar'
import { Button } from './ui/Button'
import { Icon } from './ui/Icon'
import { StagePill } from './ui/stage'

interface ContactsTableProps {
  contacts: Contact[]
  selectedId: string | null
  highlight: { id: string; key: number } | null
  search: string
  onOpen: (id: string) => void
  onClearFilters: () => void
}

const COLUMNS: { label: string; icon: string; className?: string }[] = [
  { label: 'Name', icon: 'person', className: "sticky left-0 z-[3] w-[240px] shadow-[inset_-1px_0_0_var(--border)] before:pointer-events-none before:absolute before:-bottom-px before:right-full before:top-0 before:w-4 before:bg-bg before:content-[''] md:before:w-8" },
  { label: 'Stage', icon: 'flag', className: 'w-[130px]' },
  { label: 'Company', icon: 'business', className: 'w-[190px]' },
  { label: 'Role', icon: 'briefcase', className: 'w-[180px]' },
  { label: 'Owner', icon: 'person-circle', className: 'w-[140px]' },
  { label: 'Labels', icon: 'pricetags', className: 'w-[200px]' },
  { label: 'Email', icon: 'mail', className: 'w-[240px]' },
  { label: 'Notes', icon: 'document-text', className: 'hidden notes:table-cell' },
]

/** A missing optional value: drawn on purpose, with a name for screen readers. */
function Missing({ label }: { label: string }) {
  return (
    <span className="text-subtle" aria-label={label} title={label}>
      —
    </span>
  )
}

/** ↑ / ↓ move between rows, like a spreadsheet. */
function moveRowFocus(e: KeyboardEvent<HTMLButtonElement>) {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
  e.preventDefault()
  const buttons = Array.from(
    e.currentTarget.closest('table')?.querySelectorAll<HTMLButtonElement>('[data-focus-id]') ?? [],
  )
  const i = buttons.indexOf(e.currentTarget)
  buttons[e.key === 'ArrowDown' ? i + 1 : i - 1]?.focus()
}

export function ContactsTable({ contacts, selectedId, highlight, search, onOpen, onClearFilters }: ContactsTableProps) {
  return (
    <div className="flex h-full flex-col">
      <div role="region" aria-label="Contacts table" tabIndex={-1} className="min-h-0 flex-1 overflow-auto px-4 md:px-8">
        <table className="w-full min-w-[1100px] border-separate border-spacing-0 text-sm">
          <caption className="sr-only">Contacts, one row per person. Select a name to open its details.</caption>
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.label}
                  scope="col"
                  className={`sticky top-0 z-[2] border-b border-line bg-bg px-3 py-3 text-left text-xs font-semibold text-muted ${col.className ?? ''}`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name={col.icon} size={16} />
                    {col.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => {
              const selected = c.id === selectedId
              const flashing = highlight?.id === c.id
              const cell = `border-b border-line px-3 ${selected ? 'bg-blue-50' : 'bg-bg group-hover:bg-hover'}`
              return (
                <tr
                  key={flashing ? `${c.id}-${highlight!.key}` : c.id}
                  className={`group cursor-pointer ${flashing ? '[&>td]:animate-row-flash' : ''}`}
                  onClick={() => onOpen(c.id)}
                >
                  <td className={`sticky left-0 z-[1] h-12 shadow-[inset_-1px_0_0_var(--border)] before:pointer-events-none before:absolute before:-bottom-px before:right-full before:top-0 before:w-4 before:bg-bg before:content-[''] md:before:w-8 ${cell}`}>
                    <span className="flex min-w-0 items-center gap-2">
                      <Avatar name={c.name} />
                      <button
                        type="button"
                        data-focus-id={c.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          onOpen(c.id)
                        }}
                        onKeyDown={moveRowFocus}
                        className="max-w-[180px] truncate rounded-sm text-left font-semibold text-ink"
                        aria-label={`Open ${c.name}`}
                        title={c.name}
                      >
                        {c.name}
                      </button>
                    </span>
                  </td>
                  <td className={cell}>
                    <StagePill stage={c.stage} />
                  </td>
                  <td className={`${cell} max-w-[190px] truncate`} title={c.company || undefined}>
                    {c.company || <Missing label="No company" />}
                  </td>
                  <td className={`${cell} whitespace-nowrap`}>{c.role || <Missing label="No role" />}</td>
                  <td className={cell}>
                    {c.owner ? (
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <Avatar name={c.owner} />
                        {c.owner.split(' ')[0]}
                      </span>
                    ) : (
                      <NoOwner />
                    )}
                  </td>
                  <td className={cell}>
                    {c.labels.length ? (
                      <span className="inline-flex items-center gap-1">
                        {c.labels.slice(0, 2).map((l) => (
                          <span
                            key={l}
                            className="inline-flex h-5 items-center rounded-sm border border-line-strong px-1.5 text-[11px] font-semibold"
                          >
                            {l}
                          </span>
                        ))}
                        {c.labels.length > 2 && (
                          <span
                            className="text-xs font-semibold text-muted"
                            title={c.labels.slice(2).join(', ')}
                            aria-label={`and ${c.labels.length - 2} more: ${c.labels.slice(2).join(', ')}`}
                          >
                            +{c.labels.length - 2}
                          </span>
                        )}
                      </span>
                    ) : (
                      <Missing label="No labels" />
                    )}
                  </td>
                  <td className={`${cell} max-w-[240px] truncate text-muted`} title={c.email || undefined}>
                    {c.email || <Missing label="No email" />}
                  </td>
                  <td className={`${cell} hidden max-w-[320px] truncate text-muted notes:table-cell`} title={c.notes || undefined}>
                    {c.notes || <Missing label="No notes" />}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {contacts.length === 0 && (
          <div role="status" className="sticky left-0 flex flex-col items-center gap-3 px-6 py-24 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sunken text-muted">
              <Icon name="search" size={24} />
            </span>
            <h2 className="m-0 text-lg font-bold">
              {search.trim() ? `No contacts match “${search.trim()}”` : 'No contacts match these filters'}
            </h2>
            <p className="m-0 max-w-[420px] text-muted">
              Search looks at names, companies, roles and emails. Check the spelling, or clear the filters to see everyone.
            </p>
            <Button iconStart="close" onClick={onClearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>

      <footer className="flex shrink-0 flex-wrap items-center gap-4 border-t border-line px-4 py-3 text-xs text-muted md:px-8">
        <span>
          {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
        </span>
        <span className="flex-1" />
        <span className="hidden items-center gap-1.5 md:inline-flex">
          Select a name or press <kbd className="kbd">Enter</kbd> to open · <kbd className="kbd">↑</kbd>
          <kbd className="kbd">↓</kbd> move between rows · <kbd className="kbd">?</kbd> shortcuts
        </span>
      </footer>
    </div>
  )
}
