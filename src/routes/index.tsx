import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const quickAccess = [
  { path: '/drugs', label: 'Drugs', description: 'Induction agents, opioids, vasopressors & more', color: '#3b82f6', icon: '💉' },
  { path: '/airway', label: 'Airway', description: 'Assessment, algorithms, difficult airway', color: '#06b6d4', icon: '🫁' },
  { path: '/emergencies', label: 'Emergencies', description: 'MH, anaphylaxis, LAST, difficult airway', color: '#ef4444', icon: '🚨' },
  { path: '/machine', label: 'Machine', description: 'Interactive anesthesia machine screen', color: '#8b5cf6', icon: '🖥️' },
  { path: '/intubation', label: 'Intubation', description: 'Step-by-step RSI and intubation guide', color: '#10b981', icon: '🔬' },
  { path: '/muscle-relaxants', label: 'NMBs', description: 'Succinylcholine, rocuronium, reversal', color: '#f59e0b', icon: '⚡' },
  { path: '/inhalational', label: 'Inhalational', description: 'Sevoflurane, desflurane, isoflurane, N₂O', color: '#14b8a6', icon: '💨' },
  { path: '/hemodynamics', label: 'Hemodynamics', description: 'Hypotension, vasopressors, MAP targets', color: '#f97316', icon: '❤️' },
]

const sections = [
  { path: '/drugs', label: 'Pharmacology', icon: '💊', color: '#3b82f6' },
  { path: '/fluids', label: 'Fluids', icon: '🧪', color: '#06b6d4' },
  { path: '/airway', label: 'Airway', icon: '🫁', color: '#14b8a6' },
  { path: '/intubation', label: 'Intubation', icon: '🔬', color: '#10b981' },
  { path: '/airway-anatomy', label: 'Anatomy', icon: '🔭', color: '#8b5cf6' },
  { path: '/inhalational', label: 'Inhalational', icon: '💨', color: '#06b6d4' },
  { path: '/muscle-relaxants', label: 'NMBs', icon: '⚡', color: '#f59e0b' },
  { path: '/hemodynamics', label: 'Hemodynamics', icon: '❤️', color: '#ef4444' },
  { path: '/machine', label: 'Machine', icon: '🖥️', color: '#8b5cf6' },
  { path: '/emergencies', label: 'Emergencies', icon: '🚨', color: '#ef4444' },
  { path: '/pearls', label: 'Pearls', icon: '✦', color: '#f59e0b' },
  { path: '/cases', label: 'Cases', icon: '📋', color: '#3b82f6' },
  { path: '/notes', label: 'Notes', icon: '📝', color: '#94a3b8' },
  { path: '/favorites', label: 'Favorites', icon: '★', color: '#f59e0b' },
]

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div style={{
      padding: '20px 24px',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      flex: 1,
      minWidth: '120px',
    }}>
      <div style={{ fontSize: '1.75rem', fontWeight: '800', color, marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </div>
  )
}

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate({ to: '/search', search: { q: searchQuery } })
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        position: 'relative',
        padding: '80px 20px 60px',
        overflow: 'hidden',
      }}>
        {/* Background gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59, 130, 246, 0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 40%, rgba(20, 184, 166, 0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px',
            borderRadius: '100px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            marginBottom: '28px',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#93c5fd',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
            Anesthesia Education Platform
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '800',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            color: '#f1f5f9',
          }}>
            Anesthesia{' '}
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa, #06b6d4, #14b8a6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Companion
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#94a3b8',
            marginBottom: '40px',
            lineHeight: 1.6,
          }}>
            Your Buddy Through Every Anesthesia Rotation.
            <br />
            <span style={{ color: '#64748b', fontSize: '0.9em' }}>Evidence-based content from Morgan & Mikhail, Miller's, DAS, NYSORA, and ASA guidelines.</span>
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ maxWidth: '560px', margin: '0 auto 48px', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <svg width="18" height="18" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24"
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search drugs, emergencies, airway topics, machine settings..."
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#f1f5f9',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'
                  e.currentTarget.style.background = 'rgba(59,130,246,0.05)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                  padding: '7px 16px',
                  borderRadius: '8px',
                  background: 'rgba(59,130,246,0.8)',
                  border: 'none',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Search
              </button>
            </div>
          </form>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <StatCard value="15+" label="Drug cards" color="#60a5fa" />
            <StatCard value="11" label="Emergencies" color="#f87171" />
            <StatCard value="5" label="Inhalational" color="#34d399" />
            <StatCard value="16" label="Sections" color="#a78bfa" />
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section style={{ padding: '0 20px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
            Quick Access
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '12px',
          }}>
            {quickAccess.map(item => (
              <Link
                key={item.path}
                to={item.path}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${item.color}40`
                    ;(e.currentTarget as HTMLElement).style.background = `${item.color}08`
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${item.color}15`
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'none'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px',
                    borderRadius: '10px',
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px',
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#e2e8f0', marginBottom: '4px', fontSize: '0.9rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.4 }}>{item.description}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Sections */}
      <section style={{ padding: '0 20px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
            All Sections
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '10px',
          }}>
            {sections.map(s => (
              <Link key={s.path} to={s.path} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = `${s.color}40`
                  ;(e.currentTarget as HTMLElement).style.background = `${s.color}08`
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                }}
                >
                  <div style={{ fontSize: '22px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#94a3b8' }}>{s.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto 40px', padding: '0 20px',
      }}>
        <div style={{
          padding: '16px 20px',
          borderRadius: '10px',
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.15)',
          display: 'flex', gap: '12px', alignItems: 'flex-start',
        }}>
          <span style={{ color: '#ef4444', fontSize: '16px', flexShrink: 0 }}>⚠</span>
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5 }}>
            <strong style={{ color: '#f87171' }}>Educational Disclaimer:</strong> Content is for educational purposes only, based on published guidelines and textbooks. Clinical decisions must be made with your supervising consultant and per institutional protocol. Drug doses, emergency algorithms, and protocols may vary by institution and patient population.
          </p>
        </div>
      </div>
    </div>
  )
}
