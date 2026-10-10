import { forwardRef, type HTMLAttributes } from 'react'
import type { Contact } from '../types'
import { Avatar, NoOwner } from './ui/Avatar'
import { Icon } from './ui/Icon'

interface ContactCardProps extends HTMLAttributes<HTMLButtonElement> {
  contact: Contact
  selected?: boolean
  flashing?: boolean
  /** The floating copy shown under the pointer while dragging. */
  overlay?: boolean
}

/**
 * A board card shows only what identifies a person: name, role · company,
 * up to two labels, owner and a notes hint. Stage is the column, so it is not repeated.
 */
export const ContactCard = forwardRef<HTMLButtonElement, ContactCardProps>(function ContactCard(
  { contact: c, selected, flashing, overlay, className = '', ...rest },
  ref,
) {
  const subtitle = [c.role, c.company].filter(Boolean).join(' · ')
  return (
    <button
      ref={ref}
      type="button"
      className={`group flex w-full flex-col gap-3 rounded-md border bg-surface p-3 text-left text-ink transition-[transform,box-shadow,border-color] duration-100 ease-standard ${
        overlay
          ? '-rotate-2 cursor-grabbing border-line-strong shadow-4'
          : 'border-line hover:-translate-y-0.5 hover:border-line-strong hover:shadow-1'
      } ${selected ? 'outline outline-2 -outline-offset-2 outline-action' : ''} ${flashing ? 'animate-flash' : ''} ${className}`}
      {...rest}
    >
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-[15px] font-bold leading-5">{c.name}</span>
        {subtitle ? (
          <span className="truncate text-sm text-muted">{subtitle}</span>
        ) : (
          <span className="text-sm text-subtle">No role or company</span>
        )}
      </span>
      {c.labels.length > 0 && (
        <span className="flex flex-wrap gap-1">
          {c.labels.slice(0, 2).map((l) => (
            <span key={l} className="inline-flex h-5 items-center rounded-sm border border-line-strong px-1.5 text-[11px] font-semibold">
              {l}
            </span>
          ))}
          {c.labels.length > 2 && (
            <span className="text-xs font-semibold leading-5 text-muted" aria-label={`and ${c.labels.length - 2} more`}>
              +{c.labels.length - 2}
            </span>
          )}
        </span>
      )}
      <span className="flex w-full items-center gap-2 text-xs text-muted">
        {c.owner ? (
          <span className="inline-flex items-center gap-1.5">
            <Avatar name={c.owner} />
            {c.owner.split(' ')[0]}
          </span>
        ) : (
          <NoOwner />
        )}
        <span className="flex-1" />
        {c.notes && <Icon name="document-text" size={16} label="Has notes" />}
      </span>
    </button>
  )
})
