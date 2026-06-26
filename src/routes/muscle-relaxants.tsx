import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { muscleRelaxants, nmbaComparison } from '@/data/muscleRelaxants'

export const Route = createFileRoute('/muscle-relaxants')({
  component: MuscleRelaxantsPage,
})

function MuscleRelaxantsPage() {
  const [selected, setSelected] = useState(muscleRelaxants[0].id)
  const agent = muscleRelaxants.find(a => a.id === selected)!
  const colorMap: Record<string, string> = { red: '#f87171', blue: '#60a5fa', teal: '#2dd4bf', purple: '#a78bfa', cyan: '#22d3ee' }
  const color = colorMap[agent.color] || '#60a5fa'

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>⚡</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Neuromuscular Blocking Agents
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Muscle relaxants, TOF monitoring, and reversal agents.</p>
      </div>

      {/* Agent selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', overflowX: 'auto', flexWrap: 'wrap' }}>
        {muscleRelaxants.map(a => {
          const c = colorMap[a.color] || '#60a5fa'
          const isActive = a.id === selected
          return (
            <button key={a.id} onClick={() => setSelected(a.id)} style={{
              padding: '8px 16px', borderRadius: '8px',
              border: isActive ? `1px solid ${c}40` : '1px solid rgba(255,255,255,0.07)',
              background: isActive ? `${c}15` : 'rgba(255,255,255,0.03)',
              color: isActive ? c : '#64748b',
              fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              <span style={{ fontSize: '0.65rem', color: a.type === 'depolarizing' ? '#f87171' : '#60a5fa', display: 'block', marginBottom: '2px' }}>
                {a.type === 'depolarizing' ? 'DEPOL' : 'NON-DEPOL'}
              </span>
              {a.name}
            </button>
          )
        })}
      </div>

      {/* Detail card */}
      <div style={{
        borderRadius: '16px', padding: '24px',
        background: `${color}08`, border: `1px solid ${color}25`,
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color }}>{agent.name}</h2>
          <span style={{
            padding: '3px 12px', borderRadius: '100px',
            background: agent.type === 'depolarizing' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)',
            color: agent.type === 'depolarizing' ? '#f87171' : '#60a5fa',
            fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase',
          }}>
            {agent.type.replace('-', ' ')}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          {[
            { label: 'Onset', value: agent.onset },
            { label: 'Duration', value: agent.duration },
            { label: 'Reversal', value: agent.reversal },
          ].map(item => (
            <div key={item.label} style={{
              padding: '12px', borderRadius: '8px',
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ fontSize: '0.62rem', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color }}>{item.value}</div>
            </div>
          ))}
        </div>

        <InfoBlockFull label="Dose" value={agent.dose} />
        <div style={{ marginTop: '12px' }}><InfoBlockFull label="Metabolism" value={agent.metabolism} /></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
          <ListSec label="Side Effects" items={agent.sideEffects} color="#f87171" icon="⚠" />
          <ListSec label="Contraindications" items={agent.contraindications} color="#fbbf24" icon="⛔" />
        </div>

        <div style={{ marginTop: '16px', padding: '14px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>TOF Monitoring</div>
          <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5 }}>{agent.tofMonitoring}</p>
        </div>

        <ListSec label="Clinical Pearls" items={agent.pearls} color={color} icon="✦" />

        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>References</div>
          {agent.references.map((r, i) => <p key={i} style={{ margin: '0 0 4px', fontSize: '0.75rem', color: '#475569' }}>[{i+1}] {r}</p>)}
        </div>
      </div>

      {/* Comparison table */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Comparison Table
        </h2>
        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Agent', 'Type', 'Dose', 'Onset', 'Duration', 'Reversal', 'Organ Indep.'].map(h => (
                  <th key={h} style={{ padding: '11px 14px', fontSize: '0.68rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nmbaComparison.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '11px 14px', fontSize: '0.85rem', fontWeight: '600', color: '#e2e8f0' }}>{row.name}</td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: '600',
                      background: row.type === 'Depolarizing' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)',
                      color: row.type === 'Depolarizing' ? '#f87171' : '#60a5fa',
                    }}>{row.type}</span>
                  </td>
                  <td style={{ padding: '11px 14px', fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace' }}>{row.dose}</td>
                  <td style={{ padding: '11px 14px', fontSize: '0.78rem', color: '#94a3b8' }}>{row.onset}</td>
                  <td style={{ padding: '11px 14px', fontSize: '0.78rem', color: '#94a3b8' }}>{row.duration}</td>
                  <td style={{ padding: '11px 14px', fontSize: '0.78rem', color: '#94a3b8' }}>{row.reversal}</td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: '600',
                      background: row.organIndependent === 'Yes' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)',
                      color: row.organIndependent === 'Yes' ? '#34d399' : '#f87171',
                    }}>{row.organIndependent}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOF Monitoring guide */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          TOF Monitoring Guide
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
          {[
            { tof: 'TOF Count = 4 twitches + Fade', depth: 'Moderate block', action: 'Consider reversal if surgery allows', color: '#f59e0b' },
            { tof: 'TOF Ratio ≥0.9', depth: 'Adequate reversal', action: 'Safe to extubate', color: '#10b981' },
            { tof: 'TOF Count = 1–2 twitches', depth: 'Deep block', action: 'Wait or use sugammadex 4 mg/kg', color: '#ef4444' },
            { tof: 'TOF Count = 0 twitches', depth: 'Profound block', action: 'Wait or sugammadex 16 mg/kg (post-ROC 1.2 mg/kg)', color: '#ef4444' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '16px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${item.color}25`,
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: item.color, marginBottom: '6px' }}>{item.tof}</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>{item.depth}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>→ {item.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>References</h3>
        {[
          "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018. Chapter 12.",
          "Miller RD. Miller's Anesthesia, 8th ed. Elsevier, 2015. Chapter 34.",
          "Papazian L, et al. Neuromuscular blockers in early acute respiratory distress syndrome. NEJM, 2010.",
        ].map((r, i) => <p key={i} style={{ margin: '0 0 4px', fontSize: '0.78rem', color: '#475569' }}>[{i+1}] {r}</p>)}
      </div>
    </div>
  )
}

function InfoBlockFull({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: '12px 14px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5 }}>{value}</div>
    </div>
  )
}

function ListSec({ label, items, color, icon }: { label: string; items: string[]; color: string; icon: string }) {
  return (
    <div>
      <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginTop: '4px' }}>{label}</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '5px' }}>
          <span style={{ color, fontSize: '10px', marginTop: '4px', flexShrink: 0 }}>{icon}</span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>
  )
}
