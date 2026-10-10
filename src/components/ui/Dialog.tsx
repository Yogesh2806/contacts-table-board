import { useEffect, useRef, type ReactNode } from 'react'

interface DialogProps {
  title: string
  description?: ReactNode
  role?: 'dialog' | 'alertdialog'
  icon?: ReactNode
  children?: ReactNode
  footer: ReactNode
  onDismiss: () => void
}

/**
 * Modal dialog: focus moves in, Tab is trapped, Esc dismisses, and focus goes
 * back to whatever had it before (Aa NAD Modal behaviour).
 */
export function Dialog({ title, description, role = 'dialog', icon, children, footer, onDismiss }: DialogProps) {
  const ref = useRef<HTMLDivElement>(null)
  const dismissRef = useRef(onDismiss)
  dismissRef.current = onDismiss

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const node = ref.current
    const focusable = () =>
      Array.from(node?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? [])
    // Safe default: the first button, which is the non-destructive one.
    focusable()[0]?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        dismissRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      if (previous && document.contains(previous)) previous.focus()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-overlay p-6" onMouseDown={onDismiss}>
      <div
        ref={ref}
        role={role}
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? 'dialog-desc' : undefined}
        onMouseDown={(e) => e.stopPropagation()}
        className="flex w-[440px] max-w-full flex-col gap-4 rounded-md bg-raised p-8 shadow-4"
      >
        <div className="flex items-start gap-4">
          {icon}
          <div className="flex flex-col gap-2">
            <h2 id="dialog-title" className="m-0 text-xl font-bold leading-7">
              {title}
            </h2>
            {description && (
              <p id="dialog-desc" className="m-0 text-muted">
                {description}
              </p>
            )}
          </div>
        </div>
        {children}
        <div className="flex flex-wrap justify-end gap-2 pt-2">{footer}</div>
      </div>
    </div>
  )
}
