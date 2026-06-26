import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { drugs, drugCategories, drugColorMap, type Drug } from '@/data/drugs'

export const Route = createFileRoute('/drugs')({
  component: DrugsPage,
})

function DrugCard({ drug }: { drug: Drug }) {
  const [expanded, setExpanded] = useState(false)
  const [favorited, setFavorited] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favDrugs') || '[]').includes(drug.id) } catch { return false }
  })
  const colors = drugColorMap[drug.color] || drugColorMap.blue

  const toggleFav = (e: React.MouseEvent) => {
    e.stopPropagation()
    const favs: string[] = JSON.parse(localStorage.getItem('favDrugs') || '[]')
    const updated = favorited ? favs.filter(f => f !== drug.id) : [...favs, drug.id]
    localStorage.setItem('favDrugs', JSON.stringify(updated))
    setFavorited(!favorited)
  }

  return (
    <div style={{
      borderRadius: '14px',
      background: expanded ? colors.bg : 'rgba(255,255,255,0.03)',
      border: `1px solid ${expanded ? colors.border : 'rgba(255,255,255,0.07)'}`,
      transition: 'all 0.3s ease',
      overflow: 'hidden',
    }}>
      {/* Card header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '20px',
          cursor: 'pointer',
          display: 'flex', alignItems: 'flex-start', gap: '16px',
        }}
      >
        <div style={{
          width: '44px', height: '44px',
          borderRadius: '10px',
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', flexShrink: 0,
        }}>
          💊
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#f1f5f9' }}>{drug.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={toggleFav}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '16px', color: favorited ? '#f59e0b' : '#475569',
                  transition: 'all 0.2s',
                }}
                title={favorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                {favorited ? '★' : '☆'}
              </button>
              <svg
                width="16" height="16" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24"
                style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
              >
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </div>
          </div>
          <span style={{
            display: 'inline-block', marginTop: '4px',
            padding: '2px 10px',
            borderRadius: '100px',
            fontSize: '0.72rem', fontWeight: '600',
            background: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
          }}>
            {drug.class}
          </span>
          {!expanded && (
            <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>
              {drug.mechanism.substring(0, 100)}...
            </p>
          )}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {/* Mechanism */}
            <InfoBlock label="Mechanism" value={drug.mechanism} color={colors.text} />

            {/* Dose */}
            <InfoBlock label="Dose" value={drug.dose} color={colors.text} />

            {/* PK */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <InfoBlock label="Onset" value={drug.onset} color={colors.text} small />
              <InfoBlock label="Duration" value={drug.duration} color={colors.text} small />
            </div>
          </div>

          {/* Side effects */}
          <ListBlock label="Side Effects" items={drug.sideEffects} color="#f87171" icon="⚠" />

          {/* Contraindications */}
          <ListBlock label="Contraindications" items={drug.contraindications} color="#fbbf24" icon="⛔" />

          {/* Pearls */}
          <ListBlock label="Clinical Pearls" items={drug.pearls} color={colors.text} icon="✦" />

          {/* References */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              References
            </div>
            {drug.references.map((ref, i) => (
              <p key={i} style={{ margin: '0 0 4px', fontSize: '0.75rem', color: '#475569' }}>
                [{i + 1}] {ref}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function InfoBlock({ label, value, color, small }: { label: string; value: string; color: string; small?: boolean }) {
  return (
    <div style={{
      padding: '14px',
      borderRadius: '10px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
        {label}
      </div>
      <div style={{ fontSize: small ? '0.8rem' : '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
        {value}
      </div>
    </div>
  )
}

function ListBlock({ label, items, color, icon }: { label: string; items: string[]; color: string; icon: string }) {
  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color, fontSize: '10px', marginTop: '4px', flexShrink: 0 }}>{icon}</span>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DrugsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDrugs = drugs.filter(drug => {
    const matchesCategory = activeCategory === 'all' ||
      drugCategories.find(c => c.id === activeCategory)?.drugs?.includes(drug.id)
    const matchesSearch = !searchTerm ||
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.class.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>💉</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Pharmacology
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Evidence-based drug reference for anesthesia practice. Tap any card to expand.
        </p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <svg width="16" height="16" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24"
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search drugs..."
          style={{
            width: '100%', padding: '10px 14px 10px 42px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#f1f5f9', fontSize: '0.875rem',
            outline: 'none',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)' }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
        />
      </div>

      {/* Category tabs */}
      <div style={{
        display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '24px',
        scrollbarWidth: 'none',
      }}>
        {drugCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: activeCategory === cat.id ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.07)',
              background: activeCategory === cat.id ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
              color: activeCategory === cat.id ? '#60a5fa' : '#64748b',
              fontSize: '0.78rem', fontWeight: '600',
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Drug cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '48px' }}>
        {filteredDrugs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>
            No drugs found for "{searchTerm}"
          </div>
        ) : (
          filteredDrugs.map(drug => <DrugCard key={drug.id} drug={drug} />)
        )}
      </div>

      {/* References */}
      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          Primary References
        </h3>
        {[
          'Morgan GE, Mikhail MS, Murray MJ. Clinical Anesthesiology, 6th ed. McGraw-Hill Education, 2018.',
          "Miller RD (ed). Miller's Anesthesia, 8th ed. Elsevier, 2015.",
          'OpenAnesthesia. Pharmacology Reference. openanesthesia.org',
          'UpToDate. Drug Dosing and Clinical Pharmacology. uptodate.com',
        ].map((ref, i) => (
          <p key={i} style={{ margin: '0 0 6px', fontSize: '0.8rem', color: '#475569' }}>
            [{i + 1}] {ref}
          </p>
        ))}
      </div>
    </div>
  )
}
