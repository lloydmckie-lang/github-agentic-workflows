import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import App from '../App'

const mockItems = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' },
]

beforeEach(() => {
  vi.resetAllMocks()
})

describe('App', () => {
  it('renders heading', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockItems,
    })
    render(<App />)
    expect(screen.getByText('Items')).toBeInTheDocument()
    await waitFor(() => screen.getByText('Item One'))
  })

  it('displays fetched items', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockItems,
    })
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText('Item One')).toBeInTheDocument()
      expect(screen.getByText('Item Two')).toBeInTheDocument()
    })
  })

  it('shows error when fetch fails', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: false })
    render(<App />)
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('adds a new item', async () => {
    const newItem = { id: 3, name: 'Item Three' }
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => mockItems })
      .mockResolvedValueOnce({ ok: true, json: async () => newItem })

    render(<App />)
    await waitFor(() => screen.getByText('Item One'))

    fireEvent.change(screen.getByLabelText('New item name'), {
      target: { value: 'Item Three' },
    })
    fireEvent.click(screen.getByText('Add'))

    await waitFor(() => {
      expect(screen.getByText('Item Three')).toBeInTheDocument()
    })
  })

  it('deletes an item', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => mockItems })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ deleted: 1 }) })

    render(<App />)
    await waitFor(() => screen.getByText('Item One'))

    fireEvent.click(screen.getByLabelText('Delete Item One'))

    await waitFor(() => {
      expect(screen.queryByText('Item One')).not.toBeInTheDocument()
    })
  })
})
