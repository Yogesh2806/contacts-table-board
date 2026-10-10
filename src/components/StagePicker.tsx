import { Fragment } from 'react'
import { STAGES, type Stage } from '../types'
import { Icon } from './ui/Icon'
import { STAGE_STYLE } from './ui/stage'

interface StagePickerProps {
  value: Stage
  /** The stage as saved; shown with a dashed outline while a different one is chosen. */
  savedValue: Stage
  onChange: (stage: Stage) => void
}

/**
 * The pipeline as four stage pills joined by chevrons. Real radio inputs underneath,
 * so arrow keys move the choice and screen readers hear "Stage, radio group".
 */
export function StagePicker({ value, savedValue, onChange }: StagePickerProps) {
  return (
    <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
      <legend className="mb-2 p-0 text-sm font-semibold">Stage</legend>
      <div className="flex flex-wrap items-center gap-x-0.5 gap-y-2">
        {STAGES.map((stage, i) => {
          const checked = stage === value
          const isSavedOnly = stage === savedValue && !checked
          const style = STAGE_STYLE[stage]
          return (
            <Fragment key={stage}>
              {i > 0 && <Icon name="chevron-forward" size={16} className="text-subtle" />}
              <label
                className={`relative inline-flex h-8 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border text-xs leading-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus ${
                  checked
                    ? `border-2 px-[7px] font-bold ${style.selected}`
                    : isSavedOnly
                      ? `px-2 font-semibold ${style.saved}`
                      : 'border-line bg-surface px-2 font-semibold text-muted hover:border-line-strong hover:text-ink'
                }`}
              >
                <input
                  type="radio"
                  name="stage"
                  value={stage}
                  checked={checked}
                  onChange={() => onChange(stage)}
                  className="sr-only"
                />
                {checked ? (
                  <Icon name="checkmark-circle" size={16} />
                ) : (
                  <span aria-hidden className={`h-2 w-2 rounded-full ${style.dot}`} />
                )}
                {stage}
                {isSavedOnly && <span className="sr-only">(currently saved)</span>}
              </label>
            </Fragment>
          )
        })}
      </div>
      {value !== savedValue && (
        <p className="m-0 flex items-center gap-1.5 text-[13px] leading-[18px] text-muted">
          <Icon name="information-circle" size={16} />
          Saved as {savedValue}. Saving moves this contact to {value}.
        </p>
      )}
    </fieldset>
  )
}
