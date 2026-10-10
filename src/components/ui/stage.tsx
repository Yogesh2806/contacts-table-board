import type { Stage } from '../../types'

/**
 * Stage colours. Colour always comes with the stage name (and a tick when
 * selected), so it is never the only signal. Full class strings so Tailwind keeps them.
 */
export const STAGE_STYLE: Record<
  Stage,
  { dot: string; pill: string; column: string; selected: string; saved: string; emptyRing: string; dropRing: string; dropZone: string; dropIcon: string }
> = {
  Lead: {
    dot: 'bg-blue-600',
    pill: 'bg-blue-100 text-blue-800',
    column: 'bg-blue-50',
    selected: 'border-blue-600 bg-blue-100 text-blue-800 shadow-[0_0_0_3px_var(--blue-50)]',
    saved: 'border-dashed border-blue-600 bg-blue-50 text-blue-800',
    emptyRing: 'border-blue-300',
    dropRing: 'shadow-[0_0_0_2px_var(--blue-600),0_0_0_6px_var(--blue-100)]',
    dropZone: 'border-blue-600 bg-blue-100 text-blue-800',
    dropIcon: 'bg-blue-600 text-white [[data-theme=dark]_&]:text-[#111]',
  },
  Prospect: {
    dot: 'bg-violet-600',
    pill: 'bg-violet-100 text-violet-800',
    column: 'bg-violet-50',
    selected: 'border-violet-600 bg-violet-100 text-violet-800 shadow-[0_0_0_3px_var(--violet-50)]',
    saved: 'border-dashed border-violet-600 bg-violet-50 text-violet-800',
    emptyRing: 'border-violet-300',
    dropRing: 'shadow-[0_0_0_2px_var(--violet-600),0_0_0_6px_var(--violet-100)]',
    dropZone: 'border-violet-600 bg-violet-100 text-violet-800',
    dropIcon: 'bg-violet-600 text-white [[data-theme=dark]_&]:text-[#111]',
  },
  Qualified: {
    dot: 'bg-amber-600',
    pill: 'bg-amber-100 text-amber-800',
    column: 'bg-amber-50',
    selected: 'border-amber-600 bg-amber-100 text-amber-800 shadow-[0_0_0_3px_var(--amber-50)]',
    saved: 'border-dashed border-amber-600 bg-amber-50 text-amber-800',
    emptyRing: 'border-amber-300',
    dropRing: 'shadow-[0_0_0_2px_var(--amber-600),0_0_0_6px_var(--amber-100)]',
    dropZone: 'border-amber-600 bg-amber-100 text-amber-800',
    dropIcon: 'bg-amber-600 text-white [[data-theme=dark]_&]:text-[#111]',
  },
  Customer: {
    dot: 'bg-green-600',
    pill: 'bg-green-100 text-green-800',
    column: 'bg-green-50',
    selected: 'border-green-600 bg-green-100 text-green-800 shadow-[0_0_0_3px_var(--green-50)]',
    saved: 'border-dashed border-green-600 bg-green-50 text-green-800',
    emptyRing: 'border-green-300',
    dropRing: 'shadow-[0_0_0_2px_var(--green-600),0_0_0_6px_var(--green-100)]',
    dropZone: 'border-green-600 bg-green-100 text-green-800',
    dropIcon: 'bg-green-600 text-white [[data-theme=dark]_&]:text-[#111]',
  },
}

/** The read-only stage badge used in the table, board headers and panel. */
export function StagePill({ stage }: { stage: Stage }) {
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full pl-2 pr-2.5 text-xs font-semibold ${STAGE_STYLE[stage].pill}`}
    >
      <span aria-hidden className={`h-2 w-2 rounded-full ${STAGE_STYLE[stage].dot}`} />
      {stage}
    </span>
  )
}
