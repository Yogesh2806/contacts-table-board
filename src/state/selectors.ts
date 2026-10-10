import { STAGES, type Contact, type Stage, type ViewMode } from '../types'
import type { State } from './reducer'

export function matchesSearch(contact: Contact, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [contact.name, contact.company, contact.email, contact.role].some((field) =>
    field.toLowerCase().includes(q),
  )
}

export function matchesOwner(contact: Contact, owner: string): boolean {
  if (owner === 'all') return true
  if (owner === 'none') return !contact.owner
  return contact.owner === owner
}

export function hasActiveFilters(state: Pick<State, 'search' | 'owner'>): boolean {
  return state.search.trim() !== '' || state.owner !== 'all'
}

/**
 * Contacts that pass the search and owner filter. The open record always stays
 * visible, so a save can never make the row or card you are editing vanish.
 */
export function selectVisible(state: State): Contact[] {
  return state.contacts.filter(
    (c) => c.id === state.selectedId || (matchesSearch(c, state.search) && matchesOwner(c, state.owner)),
  )
}

export interface StageGroup {
  stage: Stage
  contacts: Contact[]
  /** How many contacts in this stage the current filters hide. */
  hiddenCount: number
  /** How many contacts this stage has in total, ignoring filters. */
  totalCount: number
}

/** Board columns, always in pipeline order, always all four (empty ones included). */
export function groupByStage(all: Contact[], visible: Contact[]): StageGroup[] {
  return STAGES.map((stage) => {
    const contacts = visible.filter((c) => c.stage === stage)
    const totalCount = all.filter((c) => c.stage === stage).length
    return { stage, contacts, totalCount, hiddenCount: totalCount - contacts.length }
  })
}

/** Reading order for J/K navigation, matching what the current view shows. */
export function navigationOrder(visible: Contact[], view: ViewMode): Contact[] {
  if (view === 'table') return visible
  return STAGES.flatMap((stage) => visible.filter((c) => c.stage === stage))
}

export function selectedContact(state: State): Contact | undefined {
  return state.selectedId ? state.contacts.find((c) => c.id === state.selectedId) : undefined
}

/** How many editable fields differ between the draft and the saved record. */
export function changeCount(state: State): number {
  const saved = selectedContact(state)
  const { draft } = state
  if (!saved || !draft || draft.contactId !== saved.id) return 0
  return Number(draft.stage !== saved.stage) + Number(draft.notes !== saved.notes)
}

export function isDirty(state: State): boolean {
  return changeCount(state) > 0
}
