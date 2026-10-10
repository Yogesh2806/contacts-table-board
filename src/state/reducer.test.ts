import { describe, expect, it } from 'vitest'
import { INITIAL_CONTACTS } from '../data/contacts'
import { createInitialState, reducer, type Action, type State } from './reducer'
import { changeCount, groupByStage, selectVisible } from './selectors'

const run = (actions: Action[], start: State = createInitialState(INITIAL_CONTACTS)) =>
  actions.reduce(reducer, start)

const byId = (state: State, id: string) => state.contacts.find((c) => c.id === id)!

describe('editing', () => {
  it('keeps edits in a draft until Save', () => {
    const s = run([
      { type: 'open', id: 'c5' },
      { type: 'editDraft', patch: { stage: 'Qualified', notes: 'Review passed.' } },
    ])
    expect(byId(s, 'c5').stage).toBe('Prospect') // nothing leaked into the data
    expect(changeCount(s)).toBe(2)
  })

  it('saves once: the record changes in place, with no duplicates', () => {
    const s = run([
      { type: 'open', id: 'c5' },
      { type: 'editDraft', patch: { stage: 'Qualified' } },
      { type: 'save' },
    ])
    expect(byId(s, 'c5').stage).toBe('Qualified')
    expect(s.contacts).toHaveLength(INITIAL_CONTACTS.length)
    expect(new Set(s.contacts.map((c) => c.id)).size).toBe(INITIAL_CONTACTS.length)
    expect(s.draft).toBeNull()
    expect(s.selectedId).toBe('c5') // the panel stays open on the saved record
  })

  it('drops the draft when edits return to the saved values', () => {
    const s = run([
      { type: 'open', id: 'c5' },
      { type: 'editDraft', patch: { stage: 'Customer' } },
      { type: 'editDraft', patch: { stage: 'Prospect' } },
    ])
    expect(s.draft).toBeNull()
    expect(changeCount(s)).toBe(0)
  })

  it('Cancel restores the saved values exactly, after many edits', () => {
    const s = run([
      { type: 'open', id: 'c1' },
      { type: 'editDraft', patch: { stage: 'Prospect' } },
      { type: 'editDraft', patch: { notes: 'one' } },
      { type: 'editDraft', patch: { stage: 'Customer', notes: 'two' } },
      { type: 'discardDraft' },
    ])
    expect(byId(s, 'c1')).toEqual(INITIAL_CONTACTS[0])
    expect(s.draft).toBeNull()
  })
})

describe('board grouping', () => {
  it('always returns all four stages, including the empty one', () => {
    const s = createInitialState(INITIAL_CONTACTS)
    const groups = groupByStage(s.contacts, selectVisible(s))
    expect(groups.map((g) => g.stage)).toEqual(['Lead', 'Prospect', 'Qualified', 'Customer'])
    expect(groups.find((g) => g.stage === 'Qualified')!.contacts).toHaveLength(0)
  })

  it('a saved stage change moves the card between groups', () => {
    const s = run([
      { type: 'open', id: 'c5' },
      { type: 'editDraft', patch: { stage: 'Qualified' } },
      { type: 'save' },
    ])
    const groups = groupByStage(s.contacts, selectVisible(s))
    expect(groups.find((g) => g.stage === 'Prospect')!.contacts.map((c) => c.id)).not.toContain('c5')
    expect(groups.find((g) => g.stage === 'Qualified')!.contacts.map((c) => c.id)).toEqual(['c5'])
  })

  it('counts contacts hidden by filters separately from truly empty stages', () => {
    const s = run([{ type: 'setOwner', owner: 'Priya Shah' }])
    const groups = groupByStage(s.contacts, selectVisible(s))
    const prospect = groups.find((g) => g.stage === 'Prospect')!
    const qualified = groups.find((g) => g.stage === 'Qualified')!
    expect(prospect.contacts).toHaveLength(0)
    expect(prospect.hiddenCount).toBe(3)
    expect(qualified.totalCount).toBe(0)
  })
})

describe('drag-and-drop and undo', () => {
  it('moving a card records an undo that restores it', () => {
    const moved = run([{ type: 'moveStage', id: 'c7', stage: 'Qualified' }])
    expect(byId(moved, 'c7').stage).toBe('Qualified')
    const undone = reducer(moved, { type: 'undo', entry: moved.toast!.undo! })
    expect(byId(undone, 'c7').stage).toBe('Prospect')
  })

  it('moving the open record keeps the unsaved notes in its draft', () => {
    const s = run([
      { type: 'open', id: 'c7' },
      { type: 'editDraft', patch: { notes: 'Call on Monday' } },
      { type: 'moveStage', id: 'c7', stage: 'Customer' },
    ])
    expect(byId(s, 'c7').stage).toBe('Customer')
    expect(s.draft?.notes).toBe('Call on Monday')
  })
})

describe('filters', () => {
  it('search matches name, company, role and email', () => {
    const s = run([{ type: 'setSearch', search: 'northwind' }])
    expect(selectVisible(s).map((c) => c.id)).toEqual(['c5'])
  })

  it('the open record stays visible even if it no longer matches', () => {
    const s = run([
      { type: 'open', id: 'c5' },
      { type: 'setSearch', search: 'tidepool' },
    ])
    expect(selectVisible(s).map((c) => c.id).sort()).toEqual(['c5', 'c8'])
  })
})
