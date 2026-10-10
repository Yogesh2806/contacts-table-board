import { useEffect } from 'react'
import type { ToastState, UndoEntry } from '../state/reducer'
import { Icon } from './ui/Icon'

interface ToastProps {
  toast: ToastState | null
  onUndo: (entry: UndoEntry) => void
  onDismiss: () => void
}

/**
 * One toast at a time, in a polite live region (focus never jumps to it).
 * A toast with Undo stays until it is replaced or dismissed; plain confirmations
 * leave after 4 seconds (Aa NAD Toast rules).
 */
export function Toast({ toast, onUndo, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!toast || toast.undo) return
    const t = window.setTimeout(onDismiss, 4000)
    return () => window.clearTimeout(t)
  }, [toast, onDismiss])

  return (
    <div aria-live="polite" role="status" className="pointer-events-none absolute bottom-16 left-4 z-30 md:left-8">
      {toast && (
        <div
          key={toast.key}
          className="pointer-events-auto flex w-[420px] max-w-[calc(100vw-32px)] animate-toast-in items-start gap-3 rounded-md bg-inverse p-4 text-on-inverse shadow-3"
        >
          <Icon name="checkmark-circle" size={20} className="mt-0.5 text-[var(--green-300)] [[data-theme=dark]_&]:text-[var(--green-600)]" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-semibold">{toast.title}</span>
            {toast.description && <span className="text-sm opacity-80">{toast.description}</span>}
          </div>
          {toast.undo && (
            <button
              type="button"
              onClick={() => onUndo(toast.undo!)}
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-sm px-2 text-sm font-bold underline-offset-2 hover:underline focus-visible:outline-on-inverse"
            >
              <Icon name="arrow-undo" size={16} />
              Undo
            </button>
          )}
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm opacity-80 hover:opacity-100 focus-visible:outline-on-inverse"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
