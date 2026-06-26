import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { emergencies, type Emergency } from '@/data/emergencies'

export const Route = createFileRoute('/emergencies')({
  component: EmergenciesPage,
})

function EmergencyCard({ em }: { em: Emergency }) {
  const [tab, setTab] = useState<'recognition' | 'algorithm' | 'drugs' | 'refs'>('recognition')

  const severityColor = em.severity === 'critical' ? '#ef4444' : em.severity === 'high' ? '#f59e0b' : '#3b82f6'
  const severityBg = em.severity === 'critical' ? 'rgba(239,68,68,0.08)' : em.severity === 'high' ? 'rgba(245,158,11,0.08)' : 'rgba(59,130,246,0.08)'

  return (
    <div style={{
      borderRadius: '14px',
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${severityColor}30`,
      borderLeft: `3px solid ${severityColor}`,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            padding: '4px 12px', borderRadius: '100px',
            background: severityBg,
            fontSize: '0.68rem', fontWeight: '700',
            color: severityColor,
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            {em.severity}
          </div>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#f1f5f9' }}>
            {em.title}
          </h3>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0' }}>
          {(['recognition', 'algorithm', 'drugs', 'refs'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '8px 14px',
                border: 'none',
                background: 'none',
                color: tab === t ? '#60a5fa' : '#64748b',
                borderBottom: tab === t ? '2px solid #3b82f6' : '2px solid transparent',
                fontSize: '0.78rem', fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.15s',
              }}
            >
              {t === 'refs' ? 'References' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {tab === 'recognition' && (
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
              Clinical Recognition
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {em.recognition.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: severityColor, fontSize: '10px', marginTop: '5px', flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>

            {/* Red flags */}
            {em.redFlags.length > 0 && (
              <div style={{
                marginTop: '20px', padding: '16px',
                borderRadius: '10px',
                background: 'rgba(239,68,68,0.07)',
                border: '1px solid rgba(239,68,68,0.2)',
              }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: '#ef4444', fontSize: '14px' }}>🚩</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Red Flags — Act Immediately
                  </span>
                </div>
                {em.redFlags.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: '#ef4444', fontSize: '10px', marginTop: '5px' }}>▸</span>
                    <span style={{ fontSize: '0.82rem', color: '#fca5a5' }}>{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'algorithm' && (
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
              Step-by-Step Management
            </div>

            {/* Immediate actions */}
            <div style={{
              padding: '14px 16px', marginBottom: '16px',
              borderRadius: '10px',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
            }}>
              <div style={{ fontWeight: '700', color: '#f87171', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                ⚡ Immediate Actions
              </div>
              {em.immediateActions.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#ef4444', fontWeight: '700', fontSize: '0.75rem', minWidth: '16px' }}>{i + 1}.</span>
                  <span style={{ fontSize: '0.83rem', color: '#fca5a5' }}>{a}</span>
                </div>
              ))}
            </div>

            {/* Full algorithm */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {em.algorithm.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'rgba(59,130,246,0.15)',
                    border: '1px solid rgba(59,130,246,0.3)',
                    color: '#60a5fa', fontSize: '0.68rem', fontWeight: '700',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, paddingTop: '2px' }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'drugs' && (
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
              Drugs & Doses
            </div>
            {em.drugs.map((d, i) => (
              <div key={i} style={{
                padding: '12px 14px', marginBottom: '8px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'grid', gridTemplateColumns: '1fr 1fr auto',
                gap: '12px', alignItems: 'center',
              }}>
                <span style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '0.85rem' }}>{d.name}</span>
                <span style={{ color: '#60a5fa', fontSize: '0.8rem', fontFamily: 'monospace' }}>{d.dose}</span>
                <span style={{
                  padding: '2px 8px', borderRadius: '6px',
                  background: 'rgba(59,130,246,0.1)',
                  color: '#93c5fd', fontSize: '0.7rem', fontWeight: '600',
                }}>
                  {d.route}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === 'refs' && (
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
              References & Guidelines
            </div>
            {em.references.map((ref, i) => (
              <p key={i} style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                [{i + 1}] {ref}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EmergenciesPage() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high'>('all')
  const [search, setSearch] = useState('')

  const filtered = emergencies.filter(em => {
    const matchesSeverity = filter === 'all' || em.severity === filter
    const matchesSearch = !search || em.title.toLowerCase().includes(search.toLowerCase())
    return matchesSeverity && matchesSearch
  })

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>🚨</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Emergencies
          </h1>
        </div>
        <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '0.9rem' }}>
          Emergency recognition and management algorithms. Evidence-based protocols.
        </p>
        <div style={{
          display: 'inline-flex', gap: '6px', padding: '8px 12px',
          borderRadius: '8px', background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.15)',
          fontSize: '0.75rem', color: '#f87171',
        }}>
          ⚠ Always call for help first in any emergency
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <svg width="14" height="14" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search emergencies..."
            style={{
              width: '100%', padding: '9px 12px 9px 36px',
              borderRadius: '8px', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#f1f5f9', fontSize: '0.8rem', outline: 'none',
            }}
          />
        </div>
        {(['all', 'critical', 'high'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 14px', borderRadius: '8px',
              border: filter === f
                ? (f === 'critical' ? '1px solid rgba(239,68,68,0.4)' : f === 'high' ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(59,130,246,0.4)')
                : '1px solid rgba(255,255,255,0.07)',
              background: filter === f
                ? (f === 'critical' ? 'rgba(239,68,68,0.1)' : f === 'high' ? 'rgba(245,158,11,0.1)' : 'rgba(59,130,246,0.1)')
                : 'rgba(255,255,255,0.03)',
              color: filter === f
                ? (f === 'critical' ? '#f87171' : f === 'high' ? '#fbbf24' : '#60a5fa')
                : '#64748b',
              fontSize: '0.78rem', fontWeight: '600',
              cursor: 'pointer', textTransform: 'capitalize',
            }}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
        {filtered.map(em => <EmergencyCard key={em.id} em={em} />)}
      </div>

      {/* References */}
      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          Primary Guidelines
        </h3>
        {[
          "Frerk C, et al. Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults. BJA, 2015.",
          "Hopkins PM, et al. European Malignant Hyperthermia Group guidelines for investigation of malignant hyperthermia susceptibility. BJA, 2015.",
          "AAGBI Working Party on Anaphylaxis. Anaphylaxis: guidelines. Anaesthesia, 2020.",
          "Rhodes A, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock. Intensive Care Med, 2017.",
          "Stanford Emergency Manual. emergencymanual.stanford.edu",
          "Association of Anaesthetists. AAGBI Safety Guidelines. aagbi.org",
        ].map((ref, i) => (
          <p key={i} style={{ margin: '0 0 6px', fontSize: '0.78rem', color: '#475569', lineHeight: 1.5 }}>
            [{i + 1}] {ref}
          </p>
        ))}
      </div>
    </div>
  )
}
