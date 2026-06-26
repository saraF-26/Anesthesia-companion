import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/airway')({
  component: AirwayPage,
})

const mallampatiData = [
  { grade: 'Class I', description: 'Full visualization of tonsils, uvula, soft palate', prediction: 'Easy intubation', color: '#10b981' },
  { grade: 'Class II', description: 'Visualization of hard/soft palate, upper uvula', prediction: 'Likely easy', color: '#3b82f6' },
  { grade: 'Class III', description: 'Only soft/hard palate visible', prediction: 'Potentially difficult', color: '#f59e0b' },
  { grade: 'Class IV', description: 'Only hard palate visible', prediction: 'Very likely difficult', color: '#ef4444' },
]

const difficultPredictors = [
  { test: 'Mallampati', normal: 'Class I–II', concern: 'Class III–IV', sensitivity: '~49%', specificity: '~86%' },
  { test: 'Thyromental Distance', normal: '>6.5 cm', concern: '<6 cm', sensitivity: '~60%', specificity: '~80%' },
  { test: 'Mouth Opening', normal: '>3 finger breadths (3–4 cm)', concern: '<3 cm', sensitivity: 'Variable', specificity: 'Variable' },
  { test: 'Neck Mobility', normal: 'Extension >35°', concern: '<15°', sensitivity: '~34%', specificity: '~92%' },
  { test: 'Upper Lip Bite Test', normal: 'Class I (lower teeth bite above upper lip)', concern: 'Class III (cannot bite)', sensitivity: '~60%', specificity: '~93%' },
  { test: 'Sternomental Distance', normal: '>12.5 cm', concern: '<12.5 cm', sensitivity: 'Moderate', specificity: 'Moderate' },
]

const airwayAdjuncts = [
  {
    name: 'Nasopharyngeal Airway (NPA)',
    use: 'Semi-conscious patients, nasal obstruction relative contraindication',
    size: 'Diameter: matches patient\'s nostril. Length: nostril tip to tragus.',
    caution: 'Avoid in basilar skull fracture. Lubricate well. May cause epistaxis.',
    color: '#06b6d4',
  },
  {
    name: 'Oropharyngeal Airway (OPA)',
    use: 'Unconscious patients only — stimulates gag reflex in conscious patients',
    size: 'Measure: corner of mouth to earlobe OR tip of mouth to mandible angle.',
    caution: 'Never use in conscious/semi-conscious patients. Secures tongue forward.',
    color: '#8b5cf6',
  },
  {
    name: 'LMA / iGel (SGA)',
    use: 'Suitable airway for elective low-risk procedures; rescue airway',
    size: 'Size 3: <50 kg, Size 4: 50–90 kg, Size 5: >90 kg',
    caution: 'Does NOT protect against aspiration. Contraindicated in full stomach, GERD.',
    color: '#10b981',
  },
  {
    name: 'Endotracheal Tube (ETT)',
    use: 'Definitive airway — protects against aspiration',
    size: 'Women: 7.0–7.5 mm ID | Men: 7.5–8.5 mm ID',
    caution: 'Confirm with waveform capnography. Depth: 21 cm at lip (♀), 23 cm (♂).',
    color: '#3b82f6',
  },
]

function AirwayPage() {
  const [tab, setTab] = useState<'assessment' | 'adjuncts' | 'algorithm' | 'bvm'>('assessment')

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>🫁</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Airway Management
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Assessment, adjuncts, algorithms, and the DAS difficult airway management approach.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '28px' }}>
        {[
          { id: 'assessment', label: 'Assessment' },
          { id: 'adjuncts', label: 'Adjuncts & Devices' },
          { id: 'algorithm', label: 'DAS Algorithm' },
          { id: 'bvm', label: 'BMV Technique' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} style={{
            padding: '10px 16px', border: 'none', background: 'none',
            color: tab === t.id ? '#06b6d4' : '#64748b',
            borderBottom: tab === t.id ? '2px solid #06b6d4' : '2px solid transparent',
            fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'assessment' && (
        <div>
          {/* LEMON mnemonic */}
          <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.15)', marginBottom: '24px' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '0.9rem', fontWeight: '700', color: '#22d3ee' }}>LEMON Airway Assessment</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
              {[
                { letter: 'L', word: 'Look externally', detail: 'Facial trauma, obesity, beard, large teeth, small jaw' },
                { letter: 'E', word: 'Evaluate 3-3-2', detail: '3 fingers mouth opening, 3 finger hyoid–chin, 2 finger hyoid–thyroid cartilage' },
                { letter: 'M', word: 'Mallampati', detail: 'Class I–IV — assess oropharyngeal space' },
                { letter: 'O', word: 'Obstruction', detail: 'Epiglottitis, angioedema, peritonsillar abscess, foreign body' },
                { letter: 'N', word: 'Neck mobility', detail: 'Extension >35° required for optimal laryngoscopy' },
              ].map(item => (
                <div key={item.letter} style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#06b6d4', marginBottom: '2px' }}>{item.letter}</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#e2e8f0', marginBottom: '4px' }}>{item.word}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mallampati */}
          <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Mallampati Classification
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px', marginBottom: '28px' }}>
            {mallampatiData.map(m => (
              <div key={m.grade} style={{
                padding: '16px', borderRadius: '10px',
                background: `${m.color}08`, border: `1px solid ${m.color}25`,
              }}>
                <div style={{ fontWeight: '800', color: m.color, fontSize: '1rem', marginBottom: '6px' }}>{m.grade}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>{m.description}</div>
                <div style={{ fontSize: '0.72rem', color: m.color, fontWeight: '600' }}>{m.prediction}</div>
              </div>
            ))}
          </div>

          {/* Difficult predictors */}
          <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Difficult Airway Predictors
          </h3>
          <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '48px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {['Test', 'Normal', 'Concerning', 'Sensitivity', 'Specificity'].map(h => (
                    <th key={h} style={{ padding: '11px 14px', fontSize: '0.68rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {difficultPredictors.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '11px 14px', fontSize: '0.84rem', fontWeight: '600', color: '#e2e8f0' }}>{row.test}</td>
                    <td style={{ padding: '11px 14px', fontSize: '0.8rem', color: '#34d399' }}>{row.normal}</td>
                    <td style={{ padding: '11px 14px', fontSize: '0.8rem', color: '#f87171' }}>{row.concern}</td>
                    <td style={{ padding: '11px 14px', fontSize: '0.78rem', color: '#94a3b8' }}>{row.sensitivity}</td>
                    <td style={{ padding: '11px 14px', fontSize: '0.78rem', color: '#94a3b8' }}>{row.specificity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'adjuncts' && (
        <div>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '20px' }}>Airway adjuncts from simple to definitive.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px', marginBottom: '48px' }}>
            {airwayAdjuncts.map(adj => (
              <div key={adj.name} style={{
                padding: '20px', borderRadius: '12px',
                background: `${adj.color}06`, border: `1px solid ${adj.color}20`,
              }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '0.95rem', fontWeight: '700', color: adj.color }}>{adj.name}</h3>
                <div style={{ fontSize: '0.7rem', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>When to Use</div>
                <p style={{ margin: '0 0 10px', fontSize: '0.81rem', color: '#94a3b8' }}>{adj.use}</p>
                <div style={{ fontSize: '0.7rem', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Sizing</div>
                <p style={{ margin: '0 0 10px', fontSize: '0.81rem', color: '#94a3b8' }}>{adj.size}</p>
                <div style={{ padding: '8px 10px', borderRadius: '6px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <span style={{ fontSize: '0.72rem', color: '#fca5a5' }}>⚠ {adj.caution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'algorithm' && (
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            padding: '18px 20px', borderRadius: '12px', marginBottom: '20px',
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
          }}>
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#fca5a5' }}>
              Based on the <strong>Difficult Airway Society (DAS) 2015 Guidelines</strong> for unanticipated difficult intubation in adults. Always declare your plan out loud to the team.
            </p>
          </div>

          {[
            {
              plan: 'Plan A',
              title: 'Direct / Video Laryngoscopy',
              color: '#10b981',
              steps: [
                'Optimise patient position (ramping in obese, "sniffing" position)',
                'Pre-oxygenate: 3 min 100% O₂ (target EtO₂ >90%)',
                'Limit to 3 laryngoscopy attempts maximum',
                'Apply OELM (Optimal External Laryngeal Manipulation = BURP)',
                'Use video laryngoscope if available',
                'Use bougie for grade 3 views',
              ],
            },
            {
              plan: 'Plan B',
              title: 'Supraglottic Airway (SGA) as Rescue',
              color: '#f59e0b',
              steps: [
                'Insert iGel or ProSeal LMA',
                'Declare "Plan B — I am inserting a supraglottic airway"',
                'If oxygenation achieved: consider waking patient',
                'If surgery must continue: second-generation SGA allows ETT via fibrescope',
                'Maximum 3 SGA insertion attempts',
              ],
            },
            {
              plan: 'Plan C',
              title: 'Face Mask Ventilation',
              color: '#f97316',
              steps: [
                'If SGA fails: maintain O₂ via tight face mask',
                'Two-person technique if necessary',
                'Reduce anesthetic depth / wake patient',
                'Accept higher CO₂ temporarily if oxygenation adequate',
              ],
            },
            {
              plan: 'Plan D — CICO',
              title: 'Front of Neck Access (FONA)',
              color: '#ef4444',
              steps: [
                'CANNOT INTUBATE, CANNOT OXYGENATE — declare CICO emergency',
                'Call for surgical airway help immediately',
                'Scalpel-finger-bougie cricothyrotomy:',
                '  1. Palpate cricothyroid membrane',
                '  2. Horizontal stab incision through skin and membrane',
                '  3. Hook caudally, insert finger to enlarge opening',
                '  4. Insert bougie, railroad 6.0 cuffed ETT over bougie',
                '  5. Inflate cuff, confirm ventilation with CO₂',
              ],
            },
          ].map(plan => (
            <div key={plan.plan} style={{
              marginBottom: '12px', borderRadius: '12px',
              background: `${plan.color}06`, border: `1px solid ${plan.color}25`,
              borderLeft: `4px solid ${plan.color}`,
            }}>
              <div style={{ padding: '16px 18px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{
                  padding: '3px 10px', borderRadius: '6px',
                  background: `${plan.color}20`, color: plan.color,
                  fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase',
                }}>
                  {plan.plan}
                </span>
                <span style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '0.9rem' }}>{plan.title}</span>
              </div>
              <div style={{ padding: '0 18px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {plan.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: plan.color, fontSize: '10px', marginTop: '5px', flexShrink: 0 }}>▸</span>
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'bvm' && (
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Bag-Mask Ventilation (BMV) Technique
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            {[
              { step: '1', title: 'Correct mask seal', content: 'EC grip: thumb and index form C shape around mask, other 3 fingers form E grip under mandible. Maintain mask-face seal.', color: '#3b82f6' },
              { step: '2', title: 'Head position', content: 'Neutral or slight extension. Sniffing position: flex neck, extend head. DO NOT over-extend in suspected cervical injury.', color: '#06b6d4' },
              { step: '3', title: 'Jaw thrust', content: 'Jaw thrust opens airway: fingers behind angles of mandible, push forward and up. More effective than head-tilt alone in difficult BMV.', color: '#14b8a6' },
              { step: '4', title: 'Bag rate and volume', content: 'Rate: 10–12/min. Volume: gentle squeeze until visible chest rise (~500 mL). Avoid gastric insufflation (keep pressure <20 cmH₂O).', color: '#10b981' },
              { step: '5', title: 'Two-person BMV', content: 'One person maintains seal with both hands (EC on each side), second person squeezes bag. Significantly improves effectiveness in difficult cases.', color: '#8b5cf6' },
              { step: '6', title: 'MOANS predictors', content: 'M-Mask seal, O-Obesity/Obstruction, A-Age >55, N-No teeth, S-Snoring/Stiff (COPD). 3+ factors = difficult BMV.', color: '#f59e0b' },
            ].map(item => (
              <div key={item.step} style={{
                padding: '16px', borderRadius: '10px',
                background: `${item.color}07`, border: `1px solid ${item.color}20`,
              }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: `${item.color}20`, border: `1px solid ${item.color}40`,
                    color: item.color, fontSize: '0.75rem', fontWeight: '700',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {item.step}
                  </div>
                  <div style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '0.85rem' }}>{item.title}</div>
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>References</h3>
        {[
          "Frerk C, et al. Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults. BJA, 2015.",
          "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018.",
          "Cook TM, et al. Fourth National Audit Project (NAP4). BJA, 2011.",
          "El-Orbany M, Woehlck HJ. Difficult mask ventilation. Anesth Analg, 2009.",
        ].map((r, i) => <p key={i} style={{ margin: '0 0 4px', fontSize: '0.78rem', color: '#475569' }}>[{i+1}] {r}</p>)}
      </div>
    </div>
  )
}
