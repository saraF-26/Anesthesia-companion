import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/hemodynamics')({
  component: HemodynamicsPage,
})

const conditions = [
  {
    id: 'hypotension',
    title: 'Intraoperative Hypotension',
    color: '#ef4444',
    definition: 'MAP <65 mmHg or SBP <90 mmHg, or >20% decrease from baseline',
    causes: [
      'Vasodilation: volatile/propofol, spinal/epidural',
      'Hypovolemia: fasting deficit, hemorrhage, third-space loss',
      'Cardiac depression: volatile agents, beta-blockers, acidosis',
      'Obstructive: PE, tension pneumothorax, cardiac tamponade',
      'Distributive: sepsis, anaphylaxis',
    ],
    management: [
      'Reduce anesthetic depth',
      'Trendelenburg position (unless contraindicated)',
      'IV fluid bolus 250–500 mL crystalloid',
      'Phenylephrine 50–200 mcg IV bolus (pure α-agonist, for vasodilation)',
      'Ephedrine 5–10 mg IV (if bradycardia + hypotension — mixed α/β)',
      'Norepinephrine infusion 0.05–0.3 mcg/kg/min for sustained hypotension',
      'Treat underlying cause',
    ],
    targets: 'MAP ≥65 mmHg in most patients; ≥70–80 in chronic hypertension',
  },
  {
    id: 'hypertension',
    title: 'Intraoperative Hypertension',
    color: '#f97316',
    definition: 'SBP >20% above baseline or SBP >160 mmHg',
    causes: [
      'Light anesthesia / pain (most common)',
      'Hypercapnia (↑ sympathetic drive)',
      'Hypoxia',
      'Bladder distension',
      'Essential hypertension (pre-existing)',
      'Pheochromocytoma / carcinoid',
      'Intracranial hypertension (Cushing response)',
    ],
    management: [
      'Deepen anesthesia (increase volatile/TIVA)',
      'Give opioid (fentanyl 1 mcg/kg)',
      'Correct hypercapnia (adjust ventilation)',
      'Labetalol 5–10 mg IV (alpha + beta block)',
      'Hydralazine 5–10 mg IV (direct vasodilator, 15 min onset)',
      'Esmolol 0.5 mg/kg IV (short-acting beta-blocker)',
      'GTN/Nicardipine infusion for severe/refractory hypertension',
    ],
    targets: 'SBP <160 mmHg; avoid abrupt drops in chronic hypertension patients',
  },
  {
    id: 'bradycardia',
    title: 'Intraoperative Bradycardia',
    color: '#8b5cf6',
    definition: 'HR <50 bpm or clinically significant HR reduction',
    causes: [
      'Vagal stimulation: traction, peritoneal stretch, ocular stimulation',
      'High spinal/epidural (T1–T4 sympathetic block)',
      'Opioids (high dose fentanyl, remifentanil)',
      'Beta-blockers',
      'Succinylcholine (second dose in adults/any dose in children)',
      'Hypoxia (terminal bradycardia)',
      'Myocardial ischemia',
    ],
    management: [
      'Remove vagal stimulus if present',
      'Atropine 0.5 mg IV (repeat q3–5 min, max 3 mg)',
      'Ephedrine 5–10 mg IV (if combined hypotension)',
      'Epinephrine 10–50 mcg IV if severe/not responding',
      'Pacing for complete heart block',
      'Rule out: hypoxia, high spinal, MI',
    ],
    targets: 'HR >50 bpm with hemodynamic stability',
  },
  {
    id: 'tachycardia',
    title: 'Intraoperative Tachycardia',
    color: '#f59e0b',
    definition: 'HR >100 bpm (in context of anesthesia)',
    causes: [
      'Light anesthesia / pain',
      'Hypovolemia',
      'Fever / malignant hyperthermia',
      'Hypoxia / hypercarbia',
      'Drugs: atropine, ephedrine, sympathomimetics',
      'Anaphylaxis',
      'SVT / AF / VT',
    ],
    management: [
      'Deepen anesthesia or give opioid',
      'Volume resuscitation if hypovolemic',
      'Check EtCO₂ and temperature (rule out MH)',
      'Correct hypoxia',
      'Esmolol 0.5 mg/kg IV for SVT',
      'Adenosine 6 mg rapid IV for SVT (12 mg second dose)',
      'Synchronized cardioversion if hemodynamically unstable SVT/AF',
    ],
    targets: 'HR 60–100 bpm in most patients',
  },
]

const mapFormula = {
  formula: 'MAP = DBP + 1/3 × (SBP – DBP) OR MAP = (SBP + 2×DBP) / 3',
  example: 'For BP 120/80: MAP = 80 + (120–80)/3 = 80 + 13.3 ≈ 93 mmHg',
  targets: [
    { condition: 'Normal patients', target: 'MAP ≥65 mmHg' },
    { condition: 'Chronic hypertension', target: 'MAP ≥80–90 mmHg (avoid large drops)' },
    { condition: 'Septic shock', target: 'MAP ≥65 mmHg (Surviving Sepsis)' },
    { condition: 'Head injury / SAH', target: 'CPP = MAP – ICP ≥60 mmHg' },
    { condition: 'Spinal cord injury', target: 'MAP ≥85–90 mmHg (preserve cord perfusion)' },
  ],
}

function HemodynamicsPage() {
  const [selected, setSelected] = useState(conditions[0].id)
  const condition = conditions.find(c => c.id === selected)!

  const [sbp, setSbp] = useState('')
  const [dbp, setDbp] = useState('')
  const [mapResult, setMapResult] = useState<string | null>(null)

  const calcMap = () => {
    const s = parseFloat(sbp), d = parseFloat(dbp)
    if (isNaN(s) || isNaN(d)) return
    const map = (s + 2 * d) / 3
    setMapResult(`MAP = ${map.toFixed(0)} mmHg`)
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>❤️</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Hemodynamics
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Intraoperative hemodynamic disturbances — causes, recognition, and management.
        </p>
      </div>

      {/* MAP calculator */}
      <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '28px' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: '700', color: '#f1f5f9' }}>MAP Calculator</h3>
        <p style={{ margin: '0 0 12px', fontSize: '0.75rem', color: '#64748b' }}>{mapFormula.formula}</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>SBP (mmHg)</label>
            <input value={sbp} onChange={e => setSbp(e.target.value)} type="number" placeholder="120"
              style={{ width: '100px', padding: '7px 10px', borderRadius: '7px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: '0.875rem', outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>DBP (mmHg)</label>
            <input value={dbp} onChange={e => setDbp(e.target.value)} type="number" placeholder="80"
              style={{ width: '100px', padding: '7px 10px', borderRadius: '7px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: '0.875rem', outline: 'none' }} />
          </div>
          <button onClick={calcMap} style={{ padding: '7px 14px', borderRadius: '7px', background: 'rgba(59,130,246,0.7)', border: 'none', color: 'white', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer' }}>
            Calculate
          </button>
          {mapResult && <span style={{ color: '#60a5fa', fontSize: '1rem', fontWeight: '700', fontFamily: 'monospace' }}>{mapResult}</span>}
        </div>
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {mapFormula.targets.map((t, i) => (
            <div key={i} style={{ padding: '6px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.65rem', color: '#475569' }}>{t.condition}</div>
              <div style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: '600' }}>{t.target}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Condition tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {conditions.map(c => (
          <button key={c.id} onClick={() => setSelected(c.id)} style={{
            padding: '8px 14px', borderRadius: '8px',
            border: selected === c.id ? `1px solid ${c.color}40` : '1px solid rgba(255,255,255,0.07)',
            background: selected === c.id ? `${c.color}15` : 'rgba(255,255,255,0.03)',
            color: selected === c.id ? c.color : '#64748b',
            fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer',
            transition: 'all 0.2s',
          }}>{c.title}</button>
        ))}
      </div>

      {/* Condition detail */}
      <div style={{
        padding: '24px', borderRadius: '14px', marginBottom: '48px',
        background: `${condition.color}06`, border: `1px solid ${condition.color}20`,
        borderLeft: `4px solid ${condition.color}`,
      }}>
        <h2 style={{ margin: '0 0 6px', fontSize: '1.2rem', fontWeight: '800', color: condition.color }}>{condition.title}</h2>
        <div style={{ marginBottom: '20px', padding: '8px 12px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', display: 'inline-block' }}>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Definition: {condition.definition}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Causes</div>
            {condition.causes.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                <span style={{ color: condition.color, fontSize: '10px', marginTop: '4px', flexShrink: 0 }}>◆</span>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Management</div>
            {condition.management.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: `${condition.color}20`, border: `1px solid ${condition.color}30`, color: condition.color, fontSize: '0.6rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>{m}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '16px', padding: '10px 14px', borderRadius: '8px', background: `${condition.color}12`, border: `1px solid ${condition.color}25` }}>
          <span style={{ fontSize: '0.78rem', color: condition.color }}>🎯 Target: {condition.targets}</span>
        </div>
      </div>

      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>References</h3>
        {[
          "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018.",
          "Futier E, et al. Intraoperative hypotension and outcomes. BJA, 2017.",
          "Rhodes A, et al. Surviving Sepsis Campaign. Intensive Care Med, 2017.",
          "AHA/ACC ACLS Guidelines, 2020.",
        ].map((r, i) => <p key={i} style={{ margin: '0 0 4px', fontSize: '0.78rem', color: '#475569' }}>[{i+1}] {r}</p>)}
      </div>
    </div>
  )
}
