import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/fluids')({
  component: FluidsPage,
})

const crystalloids = [
  {
    name: 'Normal Saline (0.9% NaCl)',
    color: '#3b82f6',
    composition: 'Na⁺ 154 mEq/L, Cl⁻ 154 mEq/L, Osmolarity: 308 mOsm/L',
    indications: ['Hyponatremia correction', 'Metabolic alkalosis', 'Cerebral edema (relative)', 'Neurosurgery (pH advantage)'],
    cautions: ['Large volumes → hyperchloremic metabolic acidosis', 'High chloride load worsens renal outcomes', 'Not physiologic — chloride 154 vs plasma 103 mEq/L'],
    pearls: 'Avoid >2L in most cases. Associated with worse outcomes in major surgery vs balanced solutions.',
  },
  {
    name: "Lactated Ringer's (Hartmann's)",
    color: '#10b981',
    composition: 'Na⁺ 130, K⁺ 4, Ca²⁺ 3, Cl⁻ 109, Lactate 28 mEq/L. Osmolarity: 273 mOsm/L',
    indications: ['General surgical maintenance', 'Fluid resuscitation', 'Volume replacement', 'Burns resuscitation (Parkland formula)'],
    cautions: ['Contains K⁺ — avoid in hyperkalemia', 'Slightly hypotonic vs plasma', 'Contains calcium — avoid mixing with blood products'],
    pearls: 'Most physiologically balanced crystalloid. First-line for most surgical patients.',
  },
  {
    name: 'Plasma-Lyte (Normosol)',
    color: '#06b6d4',
    composition: 'Na⁺ 140, K⁺ 5, Mg²⁺ 3, Cl⁻ 98, Acetate 27, Gluconate 23 mEq/L. Osmolarity: 294 mOsm/L, pH 7.4',
    indications: ['Large volume resuscitation', 'Hepatic/renal surgery', 'Burns'],
    cautions: ['Most expensive crystalloid', 'Less widely available'],
    pearls: 'Closest to plasma composition. Acetate/gluconate metabolized to bicarbonate — truly balanced.',
  },
  {
    name: 'Dextrose 5% (D5W)',
    color: '#f59e0b',
    composition: 'Glucose 50 g/L. Osmolarity: 252 mOsm/L. No electrolytes.',
    indications: ['Hypoglycemia treatment', 'Hyperkalemia (with insulin)', 'Free water replacement', 'Pediatric maintenance'],
    cautions: ['NOT for resuscitation — distributes throughout total body water', 'Causes hyponatremia with large volumes', 'Avoid in brain injury (worsens edema)'],
    pearls: 'Effective free water = only ~100 mL/L stays intravascular. Contraindicated for volume expansion.',
  },
  {
    name: 'Dextrose 5% in 0.9% NaCl (D5NS)',
    color: '#f97316',
    composition: 'Glucose 50 g/L + Na⁺ 154 + Cl⁻ 154 mEq/L. Osmolarity: 560 mOsm/L.',
    indications: ['Maintenance fluids with caloric supplementation', 'Pediatric maintenance'],
    cautions: ['Hyperchloremic acidosis risk', 'Not for resuscitation', 'High osmolarity'],
    pearls: 'Common pediatric maintenance fluid. Not used for resuscitation.',
  },
]

const colloids = [
  {
    name: 'Albumin 4–5%',
    color: '#8b5cf6',
    expansion: '~70–80% stays intravascular initially',
    indications: ['Severe hypoalbuminemia (<20 g/L) with edema', 'Large volume paracentesis (6 g/100 mL drained)', 'Spontaneous bacterial peritonitis'],
    cautions: ['Expensive', 'Evidence for benefit in general resuscitation is weak', 'Albumin Trial: no benefit over saline in ICU'],
    pearls: 'Albumin 20% (hypertonic): shifts fluid from interstitium — useful in nephrotic syndrome, burns.',
  },
  {
    name: 'Gelatin-Based (Gelofusine)',
    color: '#6366f1',
    expansion: 'Moderate — shorter duration than albumin',
    indications: ['Volume expansion when colloid needed'],
    cautions: ['Anaphylaxis risk (highest of all colloids)', 'Crosses placenta', 'Renal function concerns'],
    pearls: 'Avoided in many centers due to anaphylaxis risk. Not available in US.',
  },
  {
    name: 'Hydroxyethyl Starch (HES) — e.g., Voluven',
    color: '#ef4444',
    expansion: '~100% volume for volume',
    indications: ['Previously used for perioperative volume expansion'],
    cautions: ['WITHDRAWN/restricted: increased AKI and mortality in septic patients (6S, CRYSTMAS trials)', 'Pruritus', 'Coagulopathy', 'Renal failure'],
    pearls: 'EMA/FDA restrictions in 2013–2023. Avoid in sepsis and ICU. Limited perioperative use in some countries.',
  },
]

const bloodProducts = [
  { product: 'Packed Red Blood Cells (pRBC)', volume: '~300 mL/unit', indication: 'Hb <7 (stable) or <8 (cardiac/symptomatic)', expected: '+10 g/dL per unit in average adult', color: '#ef4444' },
  { product: 'Fresh Frozen Plasma (FFP)', volume: '~250 mL/unit', indication: 'Coagulopathy (INR >1.5 + bleeding), massive transfusion', expected: 'Contains all coagulation factors', color: '#f59e0b' },
  { product: 'Platelets', volume: '~250 mL/unit', indication: 'Platelets <50 + active bleeding (surgical), <100 (neurosurgery)', expected: '+30–50 × 10⁹/L per adult therapeutic dose', color: '#f97316' },
  { product: 'Cryoprecipitate', volume: '~100 mL/unit', indication: 'Fibrinogen <1.5 + bleeding; von Willebrand disease; hemophilia A', expected: 'Contains fibrinogen, vWF, factor VIII, factor XIII', color: '#8b5cf6' },
  { product: 'TXA (Tranexamic Acid)', volume: 'IV bolus', indication: 'Trauma/PPH/surgery with significant hemorrhage — within 3 hrs', expected: 'Antifibrinolytic: inhibits plasmin. 1 g IV then 1 g infusion.', color: '#10b981' },
]

function FluidsPage() {
  const [tab, setTab] = useState<'crystalloids' | 'colloids' | 'blood' | 'calculators'>('crystalloids')
  const [weight, setWeight] = useState('')
  const [hours, setHours] = useState('')
  const [calcResult, setCalcResult] = useState<string | null>(null)

  const calcMaintenance = () => {
    const w = parseFloat(weight)
    if (isNaN(w)) return
    let rate: number
    if (w <= 10) rate = w * 4
    else if (w <= 20) rate = 40 + (w - 10) * 2
    else rate = 60 + (w - 20) * 1
    const deficit = rate * (parseFloat(hours) || 8)
    setCalcResult(`Maintenance rate: ${rate.toFixed(0)} mL/hr | Deficit (${hours || '8'} hrs NPO): ${deficit.toFixed(0)} mL`)
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>🧪</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Fluid Management
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Crystalloids, colloids, blood products, and perioperative fluid calculators.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '28px' }}>
        {[
          { id: 'crystalloids', label: 'Crystalloids' },
          { id: 'colloids', label: 'Colloids' },
          { id: 'blood', label: 'Blood Products' },
          { id: 'calculators', label: 'Calculators' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} style={{
            padding: '10px 16px', border: 'none', background: 'none',
            color: tab === t.id ? '#06b6d4' : '#64748b',
            borderBottom: tab === t.id ? '2px solid #06b6d4' : '2px solid transparent',
            fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'crystalloids' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
          {crystalloids.map(fluid => (
            <div key={fluid.name} style={{
              padding: '20px', borderRadius: '12px',
              background: `${fluid.color}06`, border: `1px solid ${fluid.color}20`,
            }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '1rem', fontWeight: '700', color: fluid.color }}>{fluid.name}</h3>
              <div style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: '#60a5fa', marginBottom: '12px', padding: '6px 10px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)' }}>
                {fluid.composition}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Indications</div>
                  {fluid.indications.map((ind, i) => (
                    <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '3px' }}>
                      <span style={{ color: '#10b981', fontSize: '10px', marginTop: '4px' }}>✓</span>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{ind}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Cautions</div>
                  {fluid.cautions.map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '3px' }}>
                      <span style={{ color: '#f59e0b', fontSize: '10px', marginTop: '4px' }}>⚠</span>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: '12px', padding: '10px 12px', borderRadius: '8px', background: `${fluid.color}10`, border: `1px solid ${fluid.color}20` }}>
                <span style={{ fontSize: '0.78rem', color: fluid.color }}>✦ {fluid.pearls}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'colloids' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
          {colloids.map(coll => (
            <div key={coll.name} style={{ padding: '20px', borderRadius: '12px', background: `${coll.color}06`, border: `1px solid ${coll.color}20` }}>
              <h3 style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: '700', color: coll.color }}>{coll.name}</h3>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '0.68rem', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Volume Expansion: </span>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{coll.expansion}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Indications</div>
                  {coll.indications.map((ind, i) => <p key={i} style={{ margin: '0 0 3px', fontSize: '0.78rem', color: '#94a3b8' }}>• {ind}</p>)}
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Cautions</div>
                  {coll.cautions.map((c, i) => <p key={i} style={{ margin: '0 0 3px', fontSize: '0.78rem', color: '#fca5a5' }}>⚠ {c}</p>)}
                </div>
              </div>
              <div style={{ padding: '8px 12px', borderRadius: '6px', background: `${coll.color}10` }}>
                <span style={{ fontSize: '0.78rem', color: coll.color }}>✦ {coll.pearls}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'blood' && (
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {bloodProducts.map(bp => (
              <div key={bp.product} style={{
                padding: '18px', borderRadius: '12px',
                background: `${bp.color}06`, border: `1px solid ${bp.color}20`,
                display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'start',
              }}>
                <div>
                  <div style={{ fontWeight: '700', color: bp.color, fontSize: '0.95rem', marginBottom: '4px' }}>{bp.product}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}><strong style={{ color: '#64748b' }}>Volume:</strong> {bp.volume}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}><strong style={{ color: '#64748b' }}>Indication:</strong> {bp.indication}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}><strong style={{ color: '#64748b' }}>Expected:</strong> {bp.expected}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            padding: '16px', borderRadius: '10px',
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#f87171', marginBottom: '6px' }}>Massive Transfusion Protocol (MTP)</div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#fca5a5' }}>
              Target ratio: pRBC:FFP:Platelets = 1:1:1. Activate MTP when estimating &gt;10 units pRBC transfusion. Include TXA 1 g IV (then 1 g infusion) within first 3 hours of trauma. Target Fibrinogen &gt;1.5 g/L (give cryoprecipitate).
            </p>
          </div>
        </div>
      )}

      {tab === 'calculators' && (
        <div style={{ marginBottom: '48px' }}>
          {/* Maintenance fluid calculator */}
          <div style={{ padding: '24px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: '700', color: '#f1f5f9' }}>Maintenance Fluid Calculator</h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.8rem', color: '#64748b' }}>Holliday-Segar formula (4-2-1 rule)</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>Weight (kg)</label>
                <input
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  type="number"
                  placeholder="70"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>NPO hours (for deficit)</label>
                <input
                  value={hours}
                  onChange={e => setHours(e.target.value)}
                  type="number"
                  placeholder="8"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>
            </div>
            <button onClick={calcMaintenance} style={{
              padding: '9px 18px', borderRadius: '8px',
              background: 'rgba(59,130,246,0.8)', border: 'none',
              color: 'white', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer',
            }}>Calculate</button>
            {calcResult && (
              <div style={{ marginTop: '14px', padding: '12px 16px', borderRadius: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <span style={{ color: '#60a5fa', fontSize: '0.85rem', fontWeight: '600', fontFamily: 'monospace' }}>{calcResult}</span>
              </div>
            )}
            <div style={{ marginTop: '12px', padding: '10px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ fontSize: '0.72rem', color: '#475569', marginBottom: '4px', fontWeight: '700' }}>4-2-1 Rule</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>4 mL/kg/hr for first 10 kg | + 2 mL/kg/hr for 10–20 kg | + 1 mL/kg/hr for each kg above 20</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>References</h3>
        {[
          "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018. Chapter 51.",
          "CRASH-2 trial collaborators. TXA in adults with significant haemorrhage. Lancet, 2010.",
          "Serpa Neto A, et al. PRoVENT trial. Anesthesiology, 2017.",
          "Semler MW, et al. SMART trial — Balanced crystalloids. NEJM, 2018.",
        ].map((r, i) => <p key={i} style={{ margin: '0 0 4px', fontSize: '0.78rem', color: '#475569' }}>[{i+1}] {r}</p>)}
      </div>
    </div>
  )
}
