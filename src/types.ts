export const STAGES = ['Lead', 'Prospect', 'Qualified', 'Customer'] as const
export type Stage = (typeof STAGES)[number]

export interface Contact {
  id: string
  /** Required. */
  name: string
  /** Required: every contact is in exactly one stage. */
  stage: Stage
  /** Optional fields are empty strings or empty arrays when missing. */
  email: string
  company: string
  role: string
  owner: string
  labels: string[]
  notes: string
}

/** The only fields this exercise lets people edit. */
export type EditableFields = Pick<Contact, 'stage' | 'notes'>

export type ViewMode = 'table' | 'board'

/** 'all' = no owner filter, 'none' = contacts without an owner, otherwise an owner's name. */
export type OwnerFilter = string

export const NOTES_MAX_LENGTH = 1000
