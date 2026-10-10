import { forwardRef } from 'react'
import { OWNERS } from '../data/contacts'
import { hasActiveFilters } from '../state/selectors'
import { useStore } from '../state/store'
import type { ViewMode } from '../types'
import { Button } from './ui/Button'
import { Icon } from './ui/Icon'

const VIEWS: { value: ViewMode; label: string; icon: string }[] = [
  { value: 'table', label: 'Table', icon: 'list' },
  { value: 'board', label: 'Board', icon: 'albums' },
]

function ownerLabel(owner: string) {
  return owner === 'none' ? 'No owner' : owner
}

/**
 * Page title, view switch and filters. The header spans the full content width
 * and never moves: the details panel opens over it rather than pushing it.
 */
export const Header = forwardRef<HTMLInputElement, { visibleCount: number }>(function Header(
  { visibleCount },
  searchRef,
) {
  const { state, dispatch } = useStore()
  const total = state.contacts.length
  const filtered = hasActiveFilters(state)

  return (
    <header className="flex shrink-0 flex-col gap-4 border-b border-line px-4 pb-4 pt-6 md:px-8">
      <div className="flex items-center gap-3">
        <h1 className="m-0 text-2xl font-bold leading-8">Contacts</h1>
        <span className="inline-flex h-6 items-center rounded-sm bg-sunken px-2 text-xs font-semibold text-muted">
          {filtered ? `${visibleCount} of ${total} people` : `${total} people`}
        </span>
      </div>

      <div role="toolbar" aria-label="View options" className="flex flex-wrap items-center gap-3">
        {/* Segmented control: native radios, so arrow keys switch views. */}
        <fieldset className="m-0 flex rounded-sm border border-line bg-sunken p-0.5">
          <legend className="sr-only">View</legend>
          {VIEWS.map((v) => {
            const checked = state.view === v.value
            return (
              <label
                key={v.value}
                className={`relative flex h-7 cursor-pointer items-center gap-1.5 rounded-sm px-3 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus ${
                  checked
                    ? 'bg-[var(--segment-active)] text-ink shadow-[inset_0_0_0_1px_var(--segment-active-border),var(--shadow-1)]'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <input
                  type="radio"
                  name="view"
                  value={v.value}
                  checked={checked}
                  onChange={() => dispatch({ type: 'setView', view: v.value })}
                  className="sr-only"
                />
                <Icon name={checked ? v.icon : `${v.icon}-outline`} size={16} />
                {v.label}
              </label>
            )
          })}
        </fieldset>

        <div className="flex-1" />

        <div className="relative w-full md:w-[280px]">
          <label htmlFor="contact-search" className="sr-only">
            Search contacts
          </label>
          <Icon name="search" size={16} className="pointer-events-none absolute left-2.5 top-2 text-muted" />
          <input
            ref={searchRef}
            id="contact-search"
            type="search"
            value={state.search}
            onChange={(e) => dispatch({ type: 'setSearch', search: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && state.search) {
                e.stopPropagation()
                dispatch({ type: 'setSearch', search: '' })
              }
            }}
            placeholder="Search name, company or email"
            className="h-8 w-full rounded-sm border border-line-strong bg-surface pl-8 pr-8 text-sm text-ink placeholder:text-subtle [&::-webkit-search-cancel-button]:hidden"
          />
          {state.search ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => dispatch({ type: 'setSearch', search: '' })}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-sm text-muted hover:bg-hover hover:text-ink"
            >
              <Icon name="close" size={16} />
            </button>
          ) : (
            <kbd aria-hidden className="kbd absolute right-2 top-1.5 text-subtle">
              /
            </kbd>
          )}
        </div>

        <div className="relative">
          <label htmlFor="owner-filter" className="sr-only">
            Owner
          </label>
          <Icon name="person-circle" size={16} className="pointer-events-none absolute left-2.5 top-2 text-muted" />
          <select
            id="owner-filter"
            value={state.owner}
            onChange={(e) => dispatch({ type: 'setOwner', owner: e.target.value })}
            className="h-8 w-[184px] appearance-none rounded-sm border border-line-strong bg-surface pl-8 pr-8 text-sm text-ink"
          >
            <option value="all">Everyone</option>
            {OWNERS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
            <option value="none">No owner</option>
          </select>
          <Icon name="chevron-down" size={16} className="pointer-events-none absolute right-2.5 top-2 text-muted" />
        </div>
      </div>

      {filtered && (
        <div role="status" className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <span>
            Showing {visibleCount} of {total} contacts
          </span>
          {state.search.trim() && (
            <FilterChip
              label={`Search: “${state.search.trim()}”`}
              onRemove={() => dispatch({ type: 'setSearch', search: '' })}
              removeLabel="Clear search"
            />
          )}
          {state.owner !== 'all' && (
            <FilterChip
              label={`Owner is ${ownerLabel(state.owner)}`}
              onRemove={() => dispatch({ type: 'setOwner', owner: 'all' })}
              removeLabel="Remove owner filter"
            />
          )}
          <Button variant="ghost" size="sm" onClick={() => dispatch({ type: 'clearFilters' })}>
            Clear filters
          </Button>
        </div>
      )}
    </header>
  )
})

function FilterChip({ label, onRemove, removeLabel }: { label: string; onRemove: () => void; removeLabel: string }) {
  return (
    <span className="inline-flex h-7 items-center gap-1 rounded-full border border-line bg-surface pl-3 pr-1 text-sm text-ink">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeLabel}
        className="flex h-5 w-5 items-center justify-center rounded-full text-muted hover:bg-hover hover:text-ink"
      >
        <Icon name="close" size={16} />
      </button>
    </span>
  )
}
