import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { inhalationalAgents, macComparison } from '@/data/inhalational'

export const Route = createFileRoute('/inhalational')({
  component: InhalationalPage,
})

function InhalationalPage() {
  const [selected, setSelected] = useState(inhalationalAgents[0].id)
  const agent = inhalationalAgents.find(a => a.id === selected)!

  const colorMap: Record<string, string> = { blue: '#60a5fa', cyan: '#22d3ee', teal: '#2dd4bf', purple: '#a78bfa' }
  const color = colorMap[agent.color] || '#60a5fa'
  const bgColor = `${color}10`
  const borderColor = `${color}25`

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>💨</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Inhalational Agents
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Volatile anesthetics and nitrous oxide — pharmacology, clinical use, and comparison.
        </p>
      </div>

      {/* Agent selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', overflowX: 'auto' }}>
        {inhalationalAgents.map(a => {
          const c = colorMap[a.color] || '#60a5fa'
          const isActive = a.id === selected
          return (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                border: isActive ? `1px solid ${c}40` : '1px solid rgba(255,255,255,0.07)',
                background: isActive ? `${c}15` : 'rgba(255,255,255,0.03)',
                color: isActive ? c : '#64748b',
                fontSize: '0.85rem', fontWeight: '600',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {a.name}
            </button>
          )
        })}
      </div>

      {/* Agent detail */}
      <div style={{
        borderRadius: '16px',
        background: bgColor,
        border: `1px solid ${borderColor}`,
        padding: '24px',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color }}>
            {agent.name}
          </h2>
          <span style={{
            padding: '3px 12px', borderRadius: '100px',
            background: bgColor, border: `1px solid ${borderColor}`,
            fontSize: '0.72rem', fontWeight: '700', color,
          }}>
            Volatile Anesthetic
          </span>
        </div>

        {/* Key numbers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'MAC', value: agent.mac },
            { label: 'MAC (Elderly)', value: agent.macElderly },
            { label: 'Blood:Gas Coeff', value: agent.bloodGasCoeff },
            { label: 'Onset', value: agent.onset },
            { label: 'Recovery', value: agent.recovery },
          ].map(item => (
            <div key={item.label} style={{
              padding: '14px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ fontSize: '0.65rem', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Smell / Airway */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <InfoBox label="Smell" value={agent.smell} />
          <InfoBox label="Airway Irritation" value={agent.airwayIrritation} />
        </div>

        {/* Effects */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <ListSection label="Cardiovascular Effects" items={agent.cardioEffects} color="#f87171" icon="❤" />
          <ListSection label="Respiratory Effects" items={agent.respEffects} color="#60a5fa" icon="💨" />
        </div>

        <ListSection label="Contraindications" items={agent.contraindications} color="#fbbf24" icon="⛔" />
        <div style={{ marginTop: '16px' }}>
          <ListSection label="Clinical Pearls" items={agent.pearls} color={color} icon="✦" />
        </div>

        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            References
          </div>
          {agent.references.map((r, i) => (
            <p key={i} style={{ margin: '0 0 4px', fontSize: '0.75rem', color: '#475569' }}>[{i+1}] {r}</p>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Comparison Table
        </h2>
        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Agent', 'MAC', 'Blood:Gas', 'Onset', 'Recovery', 'Induction?'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', fontSize: '0.7rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {macComparison.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px', fontSize: '0.85rem', fontWeight: '600', color: '#e2e8f0' }}>{row.agent}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#60a5fa', fontFamily: 'monospace' }}>{row.mac}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#94a3b8' }}>{row.bloodGas}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#94a3b8' }}>{row.onset}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#94a3b8' }}>{row.recovery}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '2px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '600',
                      background: row.induction === 'Yes' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                      color: row.induction === 'Yes' ? '#34d399' : '#f87171',
                    }}>
                      {row.induction}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>References</h3>
        {[
          "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018. Chapter 8.",
          "Miller RD. Miller's Anesthesia, 8th ed. Elsevier, 2015. Chapters 26–27.",
          "OpenAnesthesia. Volatile Anesthetics. openanesthesia.org",
        ].map((r, i) => <p key={i} style={{ margin: '0 0 4px', fontSize: '0.78rem', color: '#475569' }}>[{i+1}] {r}</p>)}
      </div>
    </div>
  )
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>{value}</div>
    </div>
  )
}

function ListSection({ label, items, color, icon }: { label: string; items: string[]; color: string; icon: string }) {
  return (
    <div>
      <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>{label}</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
          <span style={{ color, fontSize: '10px', marginTop: '4px', flexShrink: 0 }}>{icon}</span>
          <span style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>
  )
}
