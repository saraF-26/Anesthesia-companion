import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/notes')({
  component: NotesPage,
})

interface Note {
  id: string
  content: string
  category: string
  createdAt: number
}

const defaultNotes: Note[] = [
  { id: 'n1', content: 'Preoxygenate 3–5 minutes with 100% O₂ before any induction. Target EtO₂ >90%.', category: 'Airway', createdAt: Date.now() },
  { id: 'n2', content: 'Confirm ETT placement with continuous waveform capnography — gold standard.', category: 'Airway', createdAt: Date.now() },
  { id: 'n3', content: 'Treat hypotension: check depth of anesthesia first, then fluids, then vasopressors. Rule out bleeding.', category: 'Hemodynamics', createdAt: Date.now() },
  { id: 'n4', content: 'Sevoflurane is the most commonly used maintenance agent. MAC decreases 6% per decade.', category: 'Inhalational', createdAt: Date.now() },
  { id: 'n5', content: 'EtCO₂ confirms ventilation AND tube placement. Normal 35–45 mmHg. Rising EtCO₂ = earliest sign of MH.', category: 'Monitoring', createdAt: Date.now() },
  { id: 'n6', content: 'Succinylcholine CI: burns >24h, crush injury, denervation, MH susceptibility, Duchenne/Becker, hyperkalemia.', category: 'NMB', createdAt: Date.now() },
  { id: 'n7', content: 'Before extubation: awake + following commands, TOF ≥0.9, SpO₂ >95%, RR 10-20, temp >36°C.', category: 'Emergence', createdAt: Date.now() },
  { id: 'n8', content: 'RSI: pre-ox → cricoid → induction (propofol or ketamine) + sux (1.5 mg/kg) or rocuronium (1.2 mg/kg) → intubate.', category: 'Airway', createdAt: Date.now() },
]

const categories = ['All', 'Airway', 'Hemodynamics', 'Inhalational', 'Monitoring', 'NMB', 'Emergence', 'Drugs', 'Fluid', 'General']

function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('anesthesiaNotes') || 'null')
      return saved || defaultNotes
    } catch {
      return defaultNotes
    }
  })
  const [filter, setFilter] = useState('All')
  const [newContent, setNewContent] = useState('')
  const [newCategory, setNewCategory] = useState('General')
  const [editId, setEditId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const saveNotes = (updated: Note[]) => {
    setNotes(updated)
    localStorage.setItem('anesthesiaNotes', JSON.stringify(updated))
  }

  const addNote = () => {
    if (!newContent.trim()) return
    const note: Note = { id: `n${Date.now()}`, content: newContent.trim(), category: newCategory, createdAt: Date.now() }
    saveNotes([note, ...notes])
    setNewContent('')
    setShowAdd(false)
  }

  const deleteNote = (id: string) => {
    saveNotes(notes.filter(n => n.id !== id))
  }

  const saveEdit = (id: string) => {
    saveNotes(notes.map(n => n.id === id ? { ...n, content: editContent } : n))
    setEditId(null)
  }

  const filtered = filter === 'All' ? notes : notes.filter(n => n.category === filter)

  const catColor = (cat: string) => {
    const map: Record<string, string> = {
      Airway: '#06b6d4', Hemodynamics: '#ef4444', Inhalational: '#8b5cf6',
      Monitoring: '#3b82f6', NMB: '#f59e0b', Emergence: '#10b981',
      Drugs: '#6366f1', Fluid: '#14b8a6', General: '#94a3b8',
    }
    return map[cat] || '#94a3b8'
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '28px' }}>📝</span>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
              Quick Notes
            </h1>
          </div>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
            Your personal anesthesia notes. Saved locally in your browser.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          style={{
            padding: '10px 18px', borderRadius: '10px',
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(59,130,246,0.3)',
            color: '#60a5fa', fontWeight: '700', fontSize: '0.85rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          }}
        >
          <span style={{ fontSize: '18px', lineHeight: 1 }}>+</span> Add Note
        </button>
      </div>

      {/* Add note form */}
      {showAdd && (
        <div style={{
          padding: '20px', marginBottom: '20px', borderRadius: '12px',
          background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '0.9rem', fontWeight: '700', color: '#f1f5f9' }}>New Note</h3>
          <textarea
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            placeholder="Write your note here..."
            rows={3}
            style={{
              width: '100%', padding: '10px 12px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#f1f5f9', fontSize: '0.875rem',
              outline: 'none', resize: 'vertical',
              fontFamily: 'inherit', lineHeight: 1.5,
              marginBottom: '12px',
            }}
          />
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              style={{
                padding: '8px 12px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f1f5f9', fontSize: '0.8rem', outline: 'none', cursor: 'pointer',
              }}
            >
              {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={addNote} style={{
              padding: '8px 16px', borderRadius: '8px',
              background: 'rgba(59,130,246,0.8)', border: 'none',
              color: 'white', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer',
            }}>Save Note</button>
            <button onClick={() => setShowAdd(false)} style={{
              padding: '8px 16px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#94a3b8', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer',
            }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '20px', scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            padding: '6px 12px', borderRadius: '7px',
            border: filter === cat ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.07)',
            background: filter === cat ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.03)',
            color: filter === cat ? '#60a5fa' : '#64748b',
            fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{cat}</button>
        ))}
      </div>

      {/* Notes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>
            No notes yet. Add your first note above.
          </div>
        )}
        {filtered.map(note => {
          const c = catColor(note.category)
          return (
            <div key={note.id} style={{
              padding: '16px 18px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderLeft: `3px solid ${c}50`,
              position: 'relative',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  padding: '2px 8px', borderRadius: '6px',
                  background: `${c}15`, color: c,
                  fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  {note.category}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => { setEditId(note.id); setEditContent(note.content) }}
                    style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '12px', padding: '2px 6px', borderRadius: '4px', transition: 'all 0.15s' }}
                    title="Edit"
                  >✏</button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '12px', padding: '2px 6px', borderRadius: '4px', transition: 'all 0.15s' }}
                    title="Delete"
                  >🗑</button>
                </div>
              </div>
              {editId === note.id ? (
                <div>
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%', padding: '8px 10px',
                      borderRadius: '6px', background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#f1f5f9', fontSize: '0.84rem',
                      outline: 'none', resize: 'vertical', fontFamily: 'inherit',
                      marginBottom: '8px',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => saveEdit(note.id)} style={{
                      padding: '6px 12px', borderRadius: '6px',
                      background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)',
                      color: '#34d399', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer',
                    }}>Save</button>
                    <button onClick={() => setEditId(null)} style={{
                      padding: '6px 12px', borderRadius: '6px',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#94a3b8', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer',
                    }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: '0.855rem', color: '#94a3b8', lineHeight: 1.6 }}>{note.content}</p>
              )}
            </div>
          )
        })}
      </div>

      <div style={{
        padding: '14px 16px', borderRadius: '8px',
        background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)',
        fontSize: '0.78rem', color: '#60a5fa',
      }}>
        ℹ Notes are saved locally in your browser. They are NOT synced across devices.
      </div>
    </div>
  )
}
