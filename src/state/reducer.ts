import type { Contact, EditableFields, OwnerFilter, Stage, ViewMode } from '../types'

/**
 * One reducer, two kinds of state:
 * - Data: `contacts` is the single source of truth. Only `save`, `moveStage`
 *   and `undo` change it, always through `applyPatch`.
 * - UI: which view is showing, filters, the open record, its unsaved draft,
 *   and the toast. The table and board are both computed from `contacts`,
 *   so they can never disagree or hold a stale copy.
 */

/** An unsaved edit. `null` in state means "no unsaved changes". */
export interface Draft extends EditableFields {
  contactId: string
}

export interface UndoEntry {
  before: Contact
  after: Contact
}

export interface ToastState {
  key: number
  title: string
  description?: string
  undo?: UndoEntry
}

export interface State {
  contacts: Contact[]
  view: ViewMode
  search: string
  owner: OwnerFilter
  selectedId: string | null
  draft: Draft | null
  /** The record whose last save happened while its panel was open (drives "All changes saved"). */
  savedId: string | null
  toast: ToastState | null
  /** A record to briefly highlight after it changed (a moved card, an updated row). */
  highlight: { id: string; key: number } | null
}

export type Action =
  | { type: 'setView'; view: ViewMode }
  | { type: 'setSearch'; search: string }
  | { type: 'setOwner'; owner: OwnerFilter }
  | { type: 'clearFilters' }
  | { type: 'open'; id: string }
  | { type: 'close' }
  | { type: 'editDraft'; patch: Partial<EditableFields> }
  | { type: 'discardDraft' }
  | { type: 'save' }
  | { type: 'moveStage'; id: string; stage: Stage }
  | { type: 'undo'; entry: UndoEntry }
  | { type: 'dismissToast' }

export function createInitialState(contacts: Contact[]): State {
  return {
    contacts,
    view: 'table',
    search: '',
    owner: 'all',
    selectedId: null,
    draft: null,
    savedId: null,
    toast: null,
    highlight: null,
  }
}

let counter = 0
const nextKey = () => ++counter

function findContact(state: State, id: string | null): Contact | undefined {
  return id ? state.contacts.find((c) => c.id === id) : undefined
}

/** Replace one contact by id. Never adds or duplicates a record. */
function applyPatch(contacts: Contact[], id: string, patch: Partial<Contact>): Contact[] {
  return contacts.map((c) => (c.id === id ? { ...c, ...patch } : c))
}

function sameFields(a: EditableFields, b: EditableFields): boolean {
  return a.stage === b.stage && a.notes === b.notes
}

/** Keep a draft only while it actually differs from the saved record. */
function reconcileDraft(draft: Draft | null, contacts: Contact[]): Draft | null {
  if (!draft) return null
  const saved = contacts.find((c) => c.id === draft.contactId)
  if (!saved || sameFields(draft, saved)) return null
  return draft
}

function describeChange(before: Contact, after: Contact): Pick<ToastState, 'title' | 'description'> {
  const stageChanged = before.stage !== after.stage
  const notesChanged = before.notes !== after.notes
  if (stageChanged) {
    return {
      title: `${after.name} moved to ${after.stage}`,
      description: notesChanged ? 'Notes were updated too.' : undefined,
    }
  }
  return { title: `Notes saved for ${after.name}` }
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setView':
      return { ...state, view: action.view }

    case 'setSearch':
      return { ...state, search: action.search }

    case 'setOwner':
      return { ...state, owner: action.owner }

    case 'clearFilters':
      return { ...state, search: '', owner: 'all' }

    case 'open': {
      if (!findContact(state, action.id)) return state
      // Opening another record drops any draft; the UI asks first when the draft is dirty.
      return { ...state, selectedId: action.id, draft: null, savedId: null }
    }

    case 'close':
      return { ...state, selectedId: null, draft: null, savedId: null }

    case 'editDraft': {
      const saved = findContact(state, state.selectedId)
      if (!saved) return state
      const base: EditableFields = state.draft ?? { stage: saved.stage, notes: saved.notes }
      const next: Draft = { ...base, ...action.patch, contactId: saved.id }
      return { ...state, draft: sameFields(next, saved) ? null : next, savedId: null }
    }

    case 'discardDraft':
      return { ...state, draft: null }

    case 'save': {
      const { draft } = state
      const before = findContact(state, draft?.contactId ?? null)
      if (!draft || !before) return state
      const after: Contact = { ...before, stage: draft.stage, notes: draft.notes }
      return {
        ...state,
        contacts: applyPatch(state.contacts, before.id, { stage: draft.stage, notes: draft.notes }),
        draft: null,
        savedId: before.id,
        toast: { key: nextKey(), ...describeChange(before, after), undo: { before, after } },
        highlight: { id: before.id, key: nextKey() },
      }
    }

    case 'moveStage': {
      const before = findContact(state, action.id)
      if (!before || before.stage === action.stage) return state
      const after: Contact = { ...before, stage: action.stage }
      const contacts = applyPatch(state.contacts, before.id, { stage: action.stage })
      return {
        ...state,
        contacts,
        // An open draft for this record keeps its notes; it is dropped if it now matches.
        draft: reconcileDraft(state.draft, contacts),
        toast: { key: nextKey(), ...describeChange(before, after), undo: { before, after } },
        highlight: { id: before.id, key: nextKey() },
      }
    }

    case 'undo': {
      const { before } = action.entry
      if (!findContact(state, before.id)) return state
      const contacts = applyPatch(state.contacts, before.id, { stage: before.stage, notes: before.notes })
      return {
        ...state,
        contacts,
        draft: reconcileDraft(state.draft, contacts),
        savedId: null,
        toast: { key: nextKey(), title: `Undone. ${before.name} is back in ${before.stage}.` },
        highlight: { id: before.id, key: nextKey() },
      }
    }

    case 'dismissToast':
      return { ...state, toast: null }

    default:
      return state
  }
}
