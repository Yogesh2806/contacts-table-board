/** Show ⌘ on Apple devices and Ctrl elsewhere, in shortcut hints. */
export const MOD_KEY =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent) ? '⌘' : 'Ctrl'

/** True when a key press should be left to a text field (typing, not a shortcut). */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable || (tag === 'INPUT' && !['radio', 'checkbox', 'button'].includes((target as HTMLInputElement).type))
}
