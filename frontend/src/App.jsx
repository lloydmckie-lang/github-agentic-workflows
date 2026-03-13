import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    try {
      const res = await fetch('/api/items')
      if (!res.ok) throw new Error('Failed to fetch items')
      const data = await res.json()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function addItem(e) {
    e.preventDefault()
    if (!newItemName.trim()) return
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newItemName.trim() }),
      })
      if (!res.ok) throw new Error('Failed to add item')
      const item = await res.json()
      setItems((prev) => [...prev, item])
      setNewItemName('')
    } catch (err) {
      setError(err.message)
    }
  }

  async function deleteItem(id) {
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete item')
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <h1>Items</h1>
      {error && <p className="error" role="alert">{error}</p>}
      <form onSubmit={addItem} className="add-form">
        <input
          type="text"
          placeholder="New item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          aria-label="New item name"
        />
        <button type="submit">Add</button>
      </form>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <button onClick={() => deleteItem(item.id)} aria-label={`Delete ${item.name}`}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
