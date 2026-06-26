import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/cases')({
  component: CasesPage,
})

const cases = [
  {
    id: 'c1',
    title: 'Appendectomy in a Young Male',
    scenario: 'A 22-year-old male presents for emergency laparoscopic appendectomy. He had a meal 4 hours ago. He has no significant medical history, no allergies, no medications.',
    vitals: 'BP 124/76, HR 92, SpO₂ 98%, Temp 38.2°C, Weight 80 kg',
    preop: {
      asa: 'ASA II (appendicitis with low-grade fever)',
      airway: 'Mallampati I, mouth opening 4 cm, normal thyromental distance, full neck mobility',
      labs: 'WBC 14 × 10⁹/L (elevated), otherwise normal',
      riskFactors: ['Full stomach (ate 4 hours ago — aspiration risk)', 'Tachycardia (pain, fever, or early sepsis?)', 'Slight fever'],
    },
    plan: {
      airway: 'RSI — full stomach protocol. Plan A: RSI with succinylcholine or rocuronium 1.2 mg/kg. Have Plan B (LMA) and Plan C ready.',
      induction: 'Preoxygenate → Fentanyl 150 mcg → Propofol 150 mg → Succinylcholine 120 mg. Apply cricoid pressure. Intubate.',
      maintenance: 'Sevoflurane 1.0–1.3 MAC + Fentanyl infusion. Rocuronium 0.6 mg/kg for muscle relaxation.',
      emergence: 'Reverse with neostigmine + glycopyrrolate (TOF ≥2 twitches) or sugammadex. Extubate awake with good protective reflexes.',
      postop: 'Multimodal analgesia: paracetamol + NSAID + PRN opioid. PONV prophylaxis (two agents).',
    },
    questions: [
      {
        q: 'Why is RSI indicated in this patient?',
        options: ['A. All emergency cases require RSI', 'B. He ate 4 hours ago — full stomach protocol', 'C. He is febrile', 'D. Laparoscopic surgery always requires RSI'],
        answer: 1,
        explanation: 'The patient ate 4 hours ago. Clear liquids are cleared at 2 hours but solids take 6–8 hours. This patient is at high risk of aspiration — RSI is mandatory.',
      },
      {
        q: 'Which vasopressor is most appropriate for spinal hypotension in obstetrics?',
        options: ['A. Ephedrine', 'B. Phenylephrine', 'C. Norepinephrine', 'D. Dopamine'],
        answer: 1,
        explanation: 'Phenylephrine is first-line for spinal hypotension in obstetrics. It maintains uteroplacental blood flow better than ephedrine. Ephedrine can cause fetal tachycardia.',
      },
    ],
  },
  {
    id: 'c2',
    title: 'Hip Replacement in an Elderly Patient',
    scenario: 'A 78-year-old female presents for elective right total hip replacement. She has hypertension (on amlodipine), type 2 diabetes (metformin), and mild aortic stenosis (gradient 30 mmHg). She uses a hearing aid. Last meal was last night.',
    vitals: 'BP 155/88, HR 72, SpO₂ 96% on room air, Weight 70 kg',
    preop: {
      asa: 'ASA III (controlled HTN, DM, mild AS)',
      airway: 'Mallampati II, mouth opening 3 cm, slightly reduced neck mobility, dentures (remove)',
      labs: 'HbA1c 7.8%, Cr 105 μmol/L (slightly elevated), Echo: mild AS (valve area 1.5 cm²)',
      riskFactors: ['Aortic stenosis — fixed cardiac output, avoid tachycardia and drops in SVR', 'Elderly — MAC ↓, sensitivity to all agents ↑, reduce all doses 30–50%', 'DM — check glucose pre and intraop'],
    },
    plan: {
      airway: 'Spinal anesthesia preferred for hip replacement (reduces DVT, blood loss, PONV). Alternatively: GA with careful hemodynamic management.',
      induction: 'If GA: reduce propofol to 0.5–1 mg/kg. Ketamine may be better (maintains SVR). Pre-treat with small doses.',
      maintenance: 'If GA: low-dose volatile + opioid. Avoid tachycardia. Maintain SVR (phenylephrine/norepinephrine ready).',
      emergence: 'No rush to extubate. Ensure full reversal before extubation.',
      postop: 'Regional block (femoral nerve block or fascia iliaca block). Avoid NSAIDs (renal impairment). DVT prophylaxis.',
    },
    questions: [
      {
        q: 'What is the most important hemodynamic goal in aortic stenosis?',
        options: ['A. Maintain tachycardia to increase cardiac output', 'B. Reduce afterload aggressively', 'C. Maintain normal HR (60–80) and adequate SVR', 'D. Increase heart rate to compensate for fixed stroke volume'],
        answer: 2,
        explanation: 'Aortic stenosis has fixed cardiac output. Tachycardia reduces diastolic filling time, reducing preload and output. SVR drops → catastrophic hypotension. Maintain HR 60–80, adequate preload, normal-high SVR.',
      },
      {
        q: 'In the elderly, what adjustment should be made to propofol induction dose?',
        options: ['A. Increase by 30%', 'B. No change needed', 'C. Reduce by 30–50%', 'D. Replace with ketamine always'],
        answer: 2,
        explanation: 'Elderly patients have: reduced cardiac output (slower drug redistribution), reduced plasma proteins (more free drug), reduced hepatic metabolism, reduced MAC. Reduce all induction agents by 30–50%. Inject slowly.',
      },
    ],
  },
  {
    id: 'c3',
    title: 'Obstetric Cesarean Section',
    scenario: 'A 32-year-old G2P1 at 38 weeks gestation requires emergency Cesarean section for non-reassuring fetal heart rate. She has no relevant medical history. Pre-eclampsia has been ruled out.',
    vitals: 'BP 118/74, HR 96, SpO₂ 98%, Weight 85 kg',
    preop: {
      asa: 'ASA II (pregnancy)',
      airway: 'Mallampati III (pregnancy changes — airway edema), neck slightly reduced mobility, BMI 32',
      labs: 'Hb 115 g/L, platelets 185 × 10⁹/L, normal coagulation',
      riskFactors: ['Full stomach — aspiration risk (gastric emptying delayed in pregnancy)', 'Difficult airway risk (Mallampati III, obese, edematous airway)', 'Aortocaval compression (lie in left lateral tilt)', 'Rapid desaturation (reduced FRC in pregnancy)'],
    },
    plan: {
      airway: 'Spinal anesthesia preferred for elective/semi-elective C-section. For true emergency (category 1): GA with RSI.',
      induction: 'If GA (RSI): Max pre-ox with HFNO. Propofol 1.5–2 mg/kg or ketamine + succinylcholine 1.5 mg/kg. Video laryngoscope preferred. Have failed intubation plan ready.',
      maintenance: 'Spinal: hyperbaric bupivacaine 0.5% 2–2.5 mL + fentanyl 25 mcg + morphine 0.1 mg intrathecal.',
      emergence: 'If GA: extubate awake. If spinal: monitor motor block regression.',
      postop: 'Spinal morphine 0.1 mg provides 12–24 hr analgesia. Anti-emetics essential.',
    },
    questions: [
      {
        q: 'Why does pregnancy increase the risk of failed intubation?',
        options: ['A. Larger tongue', 'B. Airway edema, increased breast size, Mallampati worsens, reduced FRC', 'C. Increased gastric acid only', 'D. Hormonal effects on vocal cords'],
        answer: 1,
        explanation: 'Multiple factors increase difficult/failed intubation in pregnancy: airway edema (especially in pre-eclampsia), Mallampati class worsens through pregnancy, increased breast size obstructs laryngoscope handling, reduced FRC means faster desaturation, full stomach.',
      },
      {
        q: 'What drug is first-line for spinal hypotension in obstetrics?',
        options: ['A. Ephedrine', 'B. Metaraminol', 'C. Phenylephrine', 'D. Dopamine'],
        answer: 2,
        explanation: 'Phenylephrine is first-line for spinal hypotension in obstetrics. It does NOT cause fetal tachycardia and maintains uteroplacental perfusion better than ephedrine. Norepinephrine infusion is an emerging alternative.',
      },
    ],
  },
]

function CasesPage() {
  const [selectedCase, setSelectedCase] = useState(cases[0])
  const [tab, setTab] = useState<'preop' | 'plan' | 'questions'>('preop')
  const [answered, setAnswered] = useState<Record<string, number | null>>({})

  const handleAnswer = (caseId: string, qIdx: number, optIdx: number) => {
    const key = `${caseId}-${qIdx}`
    if (answered[key] !== undefined) return
    setAnswered(prev => ({ ...prev, [key]: optIdx }))
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>📋</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Clinical Cases
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Interactive anesthesia cases with pre-op assessment, planning, and self-assessment questions.
        </p>
      </div>

      {/* Case selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {cases.map(c => (
          <button key={c.id} onClick={() => { setSelectedCase(c); setTab('preop') }} style={{
            padding: '8px 14px', borderRadius: '8px',
            border: selectedCase.id === c.id ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.07)',
            background: selectedCase.id === c.id ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
            color: selectedCase.id === c.id ? '#60a5fa' : '#64748b',
            fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer',
            transition: 'all 0.2s', textAlign: 'left',
          }}>
            Case {c.id.slice(1)}: {c.title}
          </button>
        ))}
      </div>

      {/* Scenario */}
      <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Case Scenario</div>
        <p style={{ margin: '0 0 10px', fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.6 }}>{selectedCase.scenario}</p>
        <div style={{ fontSize: '0.8rem', color: '#60a5fa', fontFamily: 'monospace' }}>Vitals: {selectedCase.vitals}</div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '20px' }}>
        {[
          { id: 'preop', label: 'Pre-op Assessment' },
          { id: 'plan', label: 'Anesthesia Plan' },
          { id: 'questions', label: 'Self Assessment' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} style={{
            padding: '10px 16px', border: 'none', background: 'none',
            color: tab === t.id ? '#3b82f6' : '#64748b',
            borderBottom: tab === t.id ? '2px solid #3b82f6' : '2px solid transparent',
            fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'preop' && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            <InfoCard label="ASA Classification" value={selectedCase.preop.asa} color="#3b82f6" />
            <InfoCard label="Airway Assessment" value={selectedCase.preop.airway} color="#06b6d4" />
            <InfoCard label="Relevant Labs" value={selectedCase.preop.labs} color="#10b981" />
          </div>
          <div style={{ marginTop: '14px', padding: '16px', borderRadius: '10px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Key Risk Factors</div>
            {selectedCase.preop.riskFactors.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                <span style={{ color: '#ef4444', fontSize: '10px', marginTop: '4px' }}>▸</span>
                <span style={{ fontSize: '0.82rem', color: '#fca5a5' }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'plan' && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(selectedCase.plan).map(([key, value]) => {
              const labelMap: Record<string, { label: string; color: string }> = {
                airway: { label: 'Airway Plan', color: '#06b6d4' },
                induction: { label: 'Induction', color: '#8b5cf6' },
                maintenance: { label: 'Maintenance', color: '#3b82f6' },
                emergence: { label: 'Emergence & Extubation', color: '#10b981' },
                postop: { label: 'Post-operative', color: '#f59e0b' },
              }
              const { label, color } = labelMap[key] || { label: key, color: '#94a3b8' }
              return (
                <div key={key} style={{
                  padding: '16px', borderRadius: '10px',
                  background: `${color}07`, border: `1px solid ${color}20`,
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{label}</div>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.6 }}>{value}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab === 'questions' && (
        <div style={{ marginBottom: '40px' }}>
          {selectedCase.questions.map((q, qIdx) => {
            const key = `${selectedCase.id}-${qIdx}`
            const userAnswer = answered[key]
            return (
              <div key={qIdx} style={{ marginBottom: '20px', padding: '20px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontWeight: '700', color: '#f1f5f9', fontSize: '0.9rem', marginBottom: '16px' }}>
                  Q{qIdx + 1}. {q.q}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                  {q.options.map((opt, optIdx) => {
                    let bg = 'rgba(255,255,255,0.03)'
                    let border = 'rgba(255,255,255,0.07)'
                    let color = '#94a3b8'
                    if (userAnswer !== null && userAnswer !== undefined) {
                      if (optIdx === q.answer) { bg = 'rgba(16,185,129,0.1)'; border = 'rgba(16,185,129,0.3)'; color = '#34d399' }
                      else if (optIdx === userAnswer) { bg = 'rgba(239,68,68,0.1)'; border = 'rgba(239,68,68,0.3)'; color = '#f87171' }
                    }
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswer(selectedCase.id, qIdx, optIdx)}
                        style={{
                          padding: '10px 14px', borderRadius: '8px',
                          background: bg, border: `1px solid ${border}`,
                          color, fontSize: '0.84rem', fontWeight: userAnswer !== null && optIdx === q.answer ? '600' : '400',
                          cursor: userAnswer !== null ? 'default' : 'pointer',
                          textAlign: 'left', transition: 'all 0.15s',
                        }}
                      >
                        {opt}
                        {userAnswer !== null && optIdx === q.answer && ' ✓'}
                        {userAnswer !== null && optIdx === userAnswer && optIdx !== q.answer && ' ✗'}
                      </button>
                    )
                  })}
                </div>
                {userAnswer !== null && (
                  <div style={{ padding: '12px 14px', borderRadius: '8px', background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.15)' }}>
                    <div style={{ fontSize: '0.68rem', color: '#60a5fa', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Explanation</div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#93c5fd', lineHeight: 1.6 }}>{q.explanation}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>References</h3>
        {[
          "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018.",
          "Miller RD. Miller's Anesthesia, 8th ed. Elsevier, 2015.",
          "Kinsella SM, et al. Management of hypotension during spinal anaesthesia for Caesarean section. ESRA, 2018.",
          "ASA Physical Status Classification System. asahq.org",
        ].map((r, i) => <p key={i} style={{ margin: '0 0 4px', fontSize: '0.78rem', color: '#475569' }}>[{i+1}] {r}</p>)}
      </div>
    </div>
  )
}

function InfoCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: '16px', borderRadius: '10px', background: `${color}07`, border: `1px solid ${color}20` }}>
      <div style={{ fontSize: '0.68rem', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{label}</div>
      <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>{value}</p>
    </div>
  )
}
