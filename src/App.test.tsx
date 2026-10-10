import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'
import App from './App'

beforeAll(() => {
  // jsdom lacks these browser APIs; the app only uses them for smooth scrolling.
  Element.prototype.scrollIntoView = () => {}
  Element.prototype.scrollBy = () => {}
  window.matchMedia ??= (() => ({ matches: false, addEventListener() {}, removeEventListener() {} })) as never
})

const tableView = () => document.querySelector<HTMLElement>('[data-view="table"]')!
const boardView = () => document.querySelector<HTMLElement>('[data-view="board"]')!
const column = (stage: string) => boardView().querySelector<HTMLElement>(`[data-column="${stage}"]`)!

function rowFor(name: string) {
  return within(tableView()).getByRole('button', { name: `Open ${name}` }).closest('tr')!
}

describe('table and board stay in sync', () => {
  it('a stage saved from the board moves the card and updates the table row', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('radio', { name: /board/i }))
    await user.click(within(column('Prospect')).getByText('Daniel Okafor'))

    const panel = screen.getByRole('dialog', { name: 'Daniel Okafor' })
    await user.click(within(panel).getByRole('radio', { name: /qualified/i }))

    // Not saved yet: nothing moved.
    expect(within(column('Qualified')).queryByText('Daniel Okafor')).toBeNull()
    expect(within(rowFor('Daniel Okafor')).getByText('Prospect')).toBeInTheDocument()

    await user.click(within(panel).getByRole('button', { name: 'Save changes' }))

    expect(within(column('Qualified')).getByText('Daniel Okafor')).toBeInTheDocument()
    expect(within(column('Prospect')).queryByText('Daniel Okafor')).toBeNull()
    expect(within(rowFor('Daniel Okafor')).getByText('Qualified')).toBeInTheDocument()
    // Exactly one card and one row for Daniel: no duplicates, no stale copy.
    expect(within(boardView()).getAllByText('Daniel Okafor')).toHaveLength(1)
    expect(within(tableView()).getAllByRole('button', { name: 'Open Daniel Okafor' })).toHaveLength(1)
    expect(screen.getByText('Daniel Okafor moved to Qualified')).toBeInTheDocument()
  })

  it('switching views keeps an unsaved draft, and Cancel restores the saved values', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(within(tableView()).getByRole('button', { name: 'Open Maya Patel' }))
    const notes = screen.getByLabelText('Notes')
    await user.clear(notes)
    await user.type(notes, 'Draft note')

    await user.click(screen.getByRole('radio', { name: /board/i }))
    await user.click(screen.getByRole('radio', { name: /table/i }))
    expect(screen.getByLabelText('Notes')).toHaveValue('Draft note') // the draft survived

    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByRole('dialog', { name: 'Maya Patel' })).toBeNull()

    await user.click(within(tableView()).getByRole('button', { name: 'Open Maya Patel' }))
    expect(screen.getByLabelText('Notes')).toHaveValue('Met at the SaaS meetup; wants a demo in November.')
  })

  it('closing with unsaved changes asks first, and Keep editing keeps them', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(within(tableView()).getByRole('button', { name: 'Open Lena Fischer' }))
    await user.type(screen.getByLabelText('Notes'), 'Asked for a quote')
    await user.keyboard('{Escape}')

    const dialog = screen.getByRole('alertdialog', { name: 'Discard unsaved changes?' })
    await user.click(within(dialog).getByRole('button', { name: 'Keep editing' }))
    expect(screen.getByLabelText('Notes')).toHaveValue('Asked for a quote')

    await user.keyboard('{Escape}')
    await user.click(screen.getByRole('button', { name: 'Discard changes' }))
    expect(screen.queryByRole('dialog', { name: 'Lena Fischer' })).toBeNull()
  })

  it('closing the panel returns focus to the record that was open', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(within(tableView()).getByRole('button', { name: 'Open Tom Becker' }))
    await user.keyboard('{Escape}')
    await new Promise((r) => requestAnimationFrame(r))
    expect(document.activeElement).toBe(within(tableView()).getByRole('button', { name: 'Open Tom Becker' }))
  })

  it('Undo in the toast restores the previous stage everywhere', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(within(tableView()).getByRole('button', { name: 'Open Sofia Alvarez' }))
    await user.click(screen.getByRole('radio', { name: /customer/i }))
    await user.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(within(rowFor('Sofia Alvarez')).getByText('Customer')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Undo' }))
    expect(within(rowFor('Sofia Alvarez')).getByText('Prospect')).toBeInTheDocument()
    expect(within(column('Prospect')).getByText('Sofia Alvarez')).toBeInTheDocument()
  })

  it('repeated edits and view switches never duplicate or lose records', async () => {
    const user = userEvent.setup()
    render(<App />)
    const stages = ['Qualified', 'Customer', 'Lead', 'Qualified']

    for (const stage of stages) {
      await user.click(within(tableView()).getByRole('button', { name: 'Open Kenji Watanabe' }))
      await user.click(screen.getByRole('radio', { name: new RegExp(stage, 'i') }))
      await user.click(screen.getByRole('button', { name: 'Save changes' }))
      await user.keyboard('{Escape}')
      await user.click(screen.getByRole('radio', { name: /board/i }))
      await user.click(screen.getByRole('radio', { name: /table/i }))
    }

    expect(within(tableView()).getAllByRole('button', { name: /^Open / })).toHaveLength(10)
    const cards = boardView().querySelectorAll('[data-focus-id]')
    expect(cards).toHaveLength(10)
    expect(within(column('Qualified')).getByText('Kenji Watanabe')).toBeInTheDocument()
  })

  it('the sidebar toggle opens and closes the sidebar, also with the [ key', async () => {
    const user = userEvent.setup()
    render(<App />)
    const open = screen.getByRole('button', { name: 'Open sidebar' })
    expect(open).toHaveAttribute('aria-expanded', 'false')
    await user.click(open)
    expect(screen.getByRole('button', { name: 'Close sidebar' })).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Open sidebar' })).toBeInTheDocument()
    await user.keyboard('[[') // '[[' types a literal [
    expect(screen.getByRole('button', { name: 'Close sidebar' })).toBeInTheDocument()
  })
})
