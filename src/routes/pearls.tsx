import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { pearls, pearlCategories } from '@/data/pearls'

export const Route = createFileRoute('/pearls')({
  component: PearlsPage,
})

function PearlsPage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('favPearls') || '[]') } catch { return [] }
  })

  const filtered = pearls.filter(p => {
    const matchesCat = category === 'All' || p.category === category
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  const toggleFav = (id: string) => {
    const updated = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id]
    setFavorites(updated)
    localStorage.setItem('favPearls', JSON.stringify(updated))
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>✦</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Clinical Pearls
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          High-yield anesthesia pearls for students and junior doctors. Evidence-based, exam-ready.
        </p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <svg width="14" height="14" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24"
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search pearls..."
          style={{
            width: '100%', padding: '9px 12px 9px 36px',
            borderRadius: '8px', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#f1f5f9', fontSize: '0.875rem', outline: 'none',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)' }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
        />
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '24px', scrollbarWidth: 'none' }}>
        {pearlCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '6px 12px', borderRadius: '7px',
              border: category === cat ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.07)',
              background: category === cat ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.03)',
              color: category === cat ? '#fbbf24' : '#64748b',
              fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pearls grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px', marginBottom: '48px' }}>
        {filtered.map(pearl => (
          <div key={pearl.id} style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(245,158,11,0.04)',
            border: '1px solid rgba(245,158,11,0.12)',
            borderLeft: '3px solid rgba(245,158,11,0.4)',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <span style={{
                  display: 'inline-block', padding: '2px 8px', borderRadius: '6px', marginBottom: '6px',
                  background: 'rgba(245,158,11,0.1)', color: '#fbbf24',
                  fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  {pearl.category}
                </span>
                <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#f1f5f9', lineHeight: 1.3 }}>
                  {pearl.title}
                </h3>
              </div>
              <button
                onClick={() => toggleFav(pearl.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '16px', color: favorites.includes(pearl.id) ? '#f59e0b' : '#475569',
                  flexShrink: 0, marginLeft: '8px',
                  transition: 'all 0.2s',
                }}
              >
                {favorites.includes(pearl.id) ? '★' : '☆'}
              </button>
            </div>
            <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6 }}>
              {pearl.content}
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {pearl.tags.map(tag => (
                <span key={tag} style={{
                  padding: '2px 8px', borderRadius: '100px',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#475569', fontSize: '0.65rem', fontWeight: '600',
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>References</h3>
        {[
          "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018.",
          "Miller RD. Miller's Anesthesia, 8th ed. Elsevier, 2015.",
          "OpenAnesthesia. Clinical Pearls. openanesthesia.org",
          "Difficult Airway Society Guidelines. dasairway.org, 2015.",
          "Association of Anaesthetists Guidelines. aagbi.org",
        ].map((r, i) => <p key={i} style={{ margin: '0 0 4px', fontSize: '0.78rem', color: '#475569' }}>[{i+1}] {r}</p>)}
      </div>
    </div>
  )
}
