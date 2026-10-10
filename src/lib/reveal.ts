import type { ViewMode } from '../types'

const PANEL_SELECTOR = '[aria-labelledby="panel-title"]'

/**
 * Scroll a record's row or card into view in the visible view. The details panel
 * floats over the right edge, so if the record would sit underneath it, scroll a
 * little further. Optionally move keyboard focus to it.
 */
export function revealRecord(view: ViewMode, id: string, { focus = false } = {}) {
  requestAnimationFrame(() => {
    const el = document.querySelector<HTMLElement>(`[data-view="${view}"] [data-focus-id="${id}"]`)
    if (!el) return
    if (focus) el.focus({ preventScroll: true })
    el.scrollIntoView({ block: 'nearest', inline: 'nearest' })

    const panel = document.querySelector<HTMLElement>(PANEL_SELECTOR)
    const scroller = el.closest<HTMLElement>('[role="region"]')
    if (!panel || !scroller) return
    const overlap = el.getBoundingClientRect().right - (panel.getBoundingClientRect().left - 24)
    if (overlap > 0) scroller.scrollBy({ left: overlap, behavior: 'smooth' })
  })
}
