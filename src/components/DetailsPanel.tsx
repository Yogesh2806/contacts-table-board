import { useEffect, useRef, useState } from 'react'
import { MOD_KEY } from '../lib/platform'
import { NOTES_MAX_LENGTH, type Contact, type EditableFields } from '../types'
import { StagePicker } from './StagePicker'
import { Avatar, NoOwner } from './ui/Avatar'
import { Button, IconButton } from './ui/Button'
import { Icon } from './ui/Icon'
import { StagePill } from './ui/stage'

interface DetailsPanelProps {
  contact: Contact
  /** What the form shows: the draft if there is one, otherwise the saved values. */
  values: EditableFields
  changeCount: number
  justSaved: boolean
  position: { index: number; total: number }
  onChange: (patch: Partial<EditableFields>) => void
  onSave: () => void
  onCancel: () => void
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

/**
 * The shared details panel, opened from either view. It floats over the page at
 * full height, so the table/board behind it keeps its layout and scroll.
 * Edits stay in a draft until "Save changes"; nothing reaches the views before that.
 */
export function DetailsPanel({
  contact,
  values,
  changeCount,
  justSaved,
  position,
  onChange,
  onSave,
  onCancel,
  onClose,
  onPrev,
  onNext,
}: DetailsPanelProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [copied, setCopied] = useState(false)
  const dirty = changeCount > 0
  const subtitle = [contact.role, contact.company].filter(Boolean).join(' · ')

  // Move focus into the panel whenever a different contact opens.
  useEffect(() => {
    headingRef.current?.focus()
    setCopied(false)
  }, [contact.id])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="panel-title"
      className="absolute inset-y-0 right-0 z-20 flex w-[440px] max-w-full animate-panel-in flex-col border-l border-line bg-raised shadow-4"
    >
      <div className="flex shrink-0 items-center gap-1 border-b border-line px-3 py-2">
        <IconButton icon="chevron-up" label="Previous contact (K)" onClick={onPrev} disabled={position.total < 2} />
        <IconButton icon="chevron-down" label="Next contact (J)" onClick={onNext} disabled={position.total < 2} />
        <span className="pl-1 text-xs text-muted">
          {position.index + 1} of {position.total}
        </span>
        <span className="flex-1" />
        <IconButton icon="close" label="Close panel (Esc)" onClick={onClose} />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-6">
        <div className="flex items-center gap-4">
          <Avatar name={contact.name} size={48} />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h2
              id="panel-title"
              ref={headingRef}
              tabIndex={-1}
              className="m-0 break-words text-xl font-bold leading-7 focus-visible:outline-none"
            >
              {contact.name}
            </h2>
            <span className="text-sm text-muted">{subtitle || 'No role or company yet'}</span>
          </div>
          {dirty ? (
            <span className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full bg-warning-bg pl-2 pr-2.5 text-xs font-semibold text-warning">
              <span aria-hidden className="h-2 w-2 rounded-full bg-current" />
              Unsaved
            </span>
          ) : (
            <StagePill stage={contact.stage} />
          )}
        </div>

        <StagePicker value={values.stage} savedValue={contact.stage} onChange={(stage) => onChange({ stage })} />

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-notes" className="text-sm font-semibold">
            Notes
          </label>
          <textarea
            id="contact-notes"
            rows={5}
            maxLength={NOTES_MAX_LENGTH}
            value={values.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Add a note about this contact"
            aria-describedby="notes-count"
            className="w-full resize-y rounded-sm border border-line-strong bg-surface px-3 py-2 text-base leading-6 text-ink placeholder:text-subtle"
          />
          <span
            id="notes-count"
            className={`self-end text-xs ${values.notes.length > NOTES_MAX_LENGTH - 100 ? 'text-warning' : 'text-muted'}`}
            aria-live={values.notes.length > NOTES_MAX_LENGTH - 100 ? 'polite' : 'off'}
          >
            {values.notes.length} / {NOTES_MAX_LENGTH}
          </span>
        </div>

        <hr className="m-0 border-0 border-t border-line" />

        <section aria-labelledby="details-heading" className="flex flex-col gap-3">
          <h3 id="details-heading" className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-muted">
            Details
          </h3>
          <dl className="m-0 grid grid-cols-[96px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 text-sm">
            <dt className="text-muted">Email</dt>
            <dd className="m-0 flex min-w-0 items-center gap-1">
              {contact.email ? (
                <>
                  <a href={`mailto:${contact.email}`} className="truncate text-ink">
                    {contact.email}
                  </a>
                  <IconButton icon={copied ? 'checkmark' : 'copy'} label={copied ? 'Email copied' : 'Copy email'} onClick={copyEmail} />
                </>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-subtle">
                  <Icon name="mail-unread" size={16} />
                  No email yet
                </span>
              )}
            </dd>
            <dt className="text-muted">Company</dt>
            <dd className="m-0">{contact.company || <span className="text-subtle">No company yet</span>}</dd>
            <dt className="text-muted">Role</dt>
            <dd className="m-0">{contact.role || <span className="text-subtle">No role yet</span>}</dd>
            <dt className="text-muted">Owner</dt>
            <dd className="m-0">
              {contact.owner ? (
                <span className="inline-flex items-center gap-2">
                  <Avatar name={contact.owner} />
                  {contact.owner}
                </span>
              ) : (
                <NoOwner label="No owner yet" />
              )}
            </dd>
            <dt className="text-muted">Labels</dt>
            <dd className="m-0 flex flex-wrap gap-1">
              {contact.labels.length ? (
                contact.labels.map((l) => (
                  <span key={l} className="inline-flex h-6 items-center rounded-sm border border-line-strong px-2 text-xs font-semibold">
                    {l}
                  </span>
                ))
              ) : (
                <span className="text-subtle">No labels</span>
              )}
            </dd>
          </dl>
        </section>
      </div>

      {dirty ? (
        <div className="flex shrink-0 animate-fade-in items-center gap-2 border-t border-warning-border bg-warning-bg px-6 py-4">
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-semibold">
              {changeCount} unsaved {changeCount === 1 ? 'change' : 'changes'}
            </span>
            <span className="text-xs text-muted">
              <kbd>{MOD_KEY}↵</kbd> save · <kbd>Esc</kbd> cancel
            </span>
          </div>
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant="primary" iconStart="checkmark" onClick={onSave}>
            Save changes
          </Button>
        </div>
      ) : (
        <div
          role="status"
          className={`flex min-h-[72px] shrink-0 items-center gap-2 border-t border-line px-6 py-4 text-sm ${
            justSaved ? 'font-semibold text-success' : 'text-muted'
          }`}
        >
          <Icon name={justSaved ? 'checkmark-circle' : 'checkmark-circle-outline'} size={20} />
          <span className="flex-1">{justSaved ? 'All changes saved' : 'No changes yet'}</span>
          <span className="text-xs font-normal text-muted">
            <kbd>Esc</kbd> close
          </span>
        </div>
      )}
    </aside>
  )
}
