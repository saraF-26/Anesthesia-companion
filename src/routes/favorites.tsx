import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { drugs } from '@/data/drugs'
import { emergencies } from '@/data/emergencies'
import { pearls } from '@/data/pearls'

export const Route = createFileRoute('/favorites')({
  component: FavoritesPage,
})

function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<'drugs' | 'pearls' | 'emergencies' | 'notes'>('drugs')

  const getFavDrugs = () => {
    try { return JSON.parse(localStorage.getItem('favDrugs') || '[]') as string[] } catch { return [] }
  }
  const getFavPearls = () => {
    try { return JSON.parse(localStorage.getItem('favPearls') || '[]') as string[] } catch { return [] }
  }

  const [favDrugIds] = useState(getFavDrugs)
  const [favPearlIds] = useState(getFavPearls)

  const favDrugs = drugs.filter(d => favDrugIds.includes(d.id))
  const favPearls = pearls.filter(p => favPearlIds.includes(p.id))
  const favEmergencies = emergencies.filter(e => e.severity === 'critical').slice(0, 3)

  const tabs = [
    { id: 'drugs' as const, label: 'Drugs', count: favDrugs.length, color: '#3b82f6' },
    { id: 'pearls' as const, label: 'Pearls', count: favPearls.length, color: '#f59e0b' },
    { id: 'emergencies' as const, label: 'Quick Refs', count: favEmergencies.length, color: '#ef4444' },
    { id: 'notes' as const, label: 'Notes', count: 0, color: '#94a3b8' },
  ]

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>★</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Favorites
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Your saved drugs, pearls, and quick references.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 16px', border: 'none',
              background: 'none',
              color: activeTab === tab.id ? tab.color : '#64748b',
              borderBottom: activeTab === tab.id ? `2px solid ${tab.color}` : '2px solid transparent',
              fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
            <span style={{
              padding: '1px 7px', borderRadius: '100px',
              background: activeTab === tab.id ? `${tab.color}20` : 'rgba(255,255,255,0.06)',
              color: activeTab === tab.id ? tab.color : '#475569',
              fontSize: '0.7rem', fontWeight: '700',
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {activeTab === 'drugs' && (
        <div>
          {favDrugs.length === 0 ? (
            <EmptyState message="No favorite drugs yet." link="/drugs" linkLabel="Browse Drugs →" />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {favDrugs.map(drug => (
                <Link key={drug.id} to="/drugs" style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '16px 18px', borderRadius: '10px',
                    background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { ;(e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.1)' }}
                  onMouseLeave={e => { ;(e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.05)' }}
                  >
                    <div style={{ fontWeight: '700', color: '#e2e8f0', marginBottom: '4px' }}>{drug.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#60a5fa' }}>{drug.class}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                      Dose: {drug.dose.substring(0, 80)}...
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'pearls' && (
        <div>
          {favPearls.length === 0 ? (
            <EmptyState message="No favorite pearls yet." link="/pearls" linkLabel="Browse Pearls →" />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
              {favPearls.map(pearl => (
                <div key={pearl.id} style={{
                  padding: '16px', borderRadius: '10px',
                  background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)',
                  borderLeft: '3px solid rgba(245,158,11,0.4)',
                }}>
                  <div style={{ fontSize: '0.65rem', color: '#fbbf24', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>{pearl.category}</div>
                  <div style={{ fontWeight: '700', color: '#f1f5f9', fontSize: '0.88rem', marginBottom: '8px' }}>{pearl.title}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>{pearl.content.substring(0, 120)}...</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'emergencies' && (
        <div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '16px' }}>
            Critical emergency references — always accessible.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {favEmergencies.map(em => (
              <Link key={em.id} to="/emergencies" style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '16px 18px', borderRadius: '10px',
                  background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)',
                  borderLeft: '3px solid #ef4444',
                  transition: 'all 0.15s',
                }}>
                  <div style={{ fontWeight: '700', color: '#f87171', marginBottom: '6px' }}>{em.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    {em.immediateActions[0]}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '16px' }}>
            Your saved quick notes.
          </p>
          <Link to="/notes" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 16px', borderRadius: '8px',
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
            color: '#60a5fa', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600',
          }}>
            Go to Quick Notes →
          </Link>
        </div>
      )}
    </div>
  )
}

function EmptyState({ message, link, linkLabel }: { message: string; link: string; linkLabel: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.3 }}>★</div>
      <p style={{ margin: '0 0 16px', fontSize: '0.9rem' }}>{message}</p>
      <Link to={link} style={{
        display: 'inline-block',
        padding: '8px 16px', borderRadius: '8px',
        background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
        color: '#60a5fa', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '600',
      }}>
        {linkLabel}
      </Link>
    </div>
  )
}
