import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/intubation')({
  component: IntubationPage,
})

const rsiSteps = [
  { step: 'Preparation', icon: '🔧', color: '#3b82f6', items: [
    'Check all equipment: laryngoscope, ETT (one size down available), stylet, 10mL syringe, tape/holder',
    'Suction: working and at the head of bed',
    'Pre-draw all drugs: induction agent + muscle relaxant',
    'IV access patent, fluids running',
    'Monitoring: SpO₂, NIBP, ECG, EtCO₂ probe ready',
    'Confirm: IV fentanyl 1–2 mcg/kg pre-drawn (optional, for blunting laryngoscopy response)',
  ]},
  { step: 'Positioning', icon: '📐', color: '#06b6d4', items: [
    'Ramping position for obese patients (tragus of ear to sternum level)',
    'Sniffing position: neck flexed forward, head extended on atlas',
    'Elevate head of bed 20–30° (reduces aspiration risk, improves view)',
    'Ensure bed at appropriate height for operator',
    'Both arms at sides or one arm abducted (for IV access)',
  ]},
  { step: 'Preoxygenation', icon: '💨', color: '#10b981', items: [
    '100% O₂ via tight-fitting face mask for 3 minutes (standard)',
    'OR: 8 vital capacity breaths in 60 seconds (rapid technique)',
    'Target: EtO₂ >90% (nitrogen washout complete)',
    'High flow nasal O₂ (HFNO) 15 L/min concurrently prolongs apnea time',
    'Obese/pregnant/critically ill: desaturate rapidly — extra preoxygenation essential',
  ]},
  { step: 'Induction (RSI)', icon: '💉', color: '#8b5cf6', items: [
    'Give induction agent IV rapidly:',
    '  • Propofol 1.5–2 mg/kg (reduce in elderly/hemodynamically unstable)',
    '  • OR Ketamine 1.5 mg/kg IV (hemodynamic instability, bronchospasm)',
    '  • OR Etomidate 0.3 mg/kg IV (cardiac/trauma cases)',
    'Immediately follow with muscle relaxant (NO VENTILATION in classic RSI):',
    '  • Succinylcholine 1.5 mg/kg IV — wait 60 sec for fasciculations to stop',
    '  • OR Rocuronium 1.2 mg/kg IV — wait 60 sec',
    'Cricoid pressure (modified RSI): optional, 30 N before induction, 44 N after loss of consciousness',
  ]},
  { step: 'Laryngoscopy', icon: '🔬', color: '#f59e0b', items: [
    'Open mouth: scissor technique (thumb on lower teeth, index finger on upper teeth)',
    'Insert laryngoscope blade (Macintosh) from right side of mouth, displace tongue left',
    'Advance to vallecula, lift in direction of handle (45°) — do NOT rock on teeth',
    'Visualize: ideally grade 1 (full glottis) or grade 2 (arytenoids visible)',
    'Apply OELM/BURP if needed to improve grade',
    'Use bougie for grade 3 views: tactile "clicks" confirm tracheal rings',
  ]},
  { step: 'Tube Insertion', icon: '📍', color: '#ef4444', items: [
    'Pass ETT from right corner of mouth (keep laryngoscope in situ)',
    'Advance through cords until cuff just disappears (2–3 cm past cords)',
    'Depth at teeth: ~21 cm (♀) or ~23 cm (♂)',
    'Remove stylet while maintaining ETT position',
    'Inflate cuff: 5–10 mL or until no air leak audible at 20 cmH₂O',
    'Aim for cuff pressure 20–30 cmH₂O (check with manometer)',
  ]},
  { step: 'Confirmation', icon: '✅', color: '#10b981', items: [
    '1. PRIMARY: Continuous waveform capnography — 5 or more consistent CO₂ waveforms',
    '2. Bilateral breath sounds on auscultation (axillae > apices)',
    '3. Absent epigastric sounds (if present — esophageal intubation — pull immediately)',
    '4. Visible mist in tube',
    '5. Symmetrical chest rise',
    '6. Stable SpO₂ and no unexpected desaturation',
    'CXR: tube tip should be 2–4 cm above carina (~T2–T3 level)',
  ]},
  { step: 'Securing the Tube', icon: '🔗', color: '#3b82f6', items: [
    'Apply adhesive tape or ETT holder',
    'Note and document depth at teeth/lips',
    'Bite block if appropriate',
    'Connect to ventilator/breathing circuit',
    'Confirm EtCO₂ waveform on ventilator display',
    'Set initial ventilator settings: VT 6–8 mL/kg IBW, RR 12/min, FiO₂ 1.0 initially',
  ]},
]

function IntubationPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [showChecklist, setShowChecklist] = useState(false)
  const [checked, setChecked] = useState<boolean[]>(Array(20).fill(false))

  const checklistItems = [
    'ETT (7.5 ♀ / 8.0 ♂) + size up and size down available',
    'Laryngoscope blade (Mac 3/4) — light working',
    'Stylet in ETT',
    '10 mL syringe for cuff',
    'ETT holder/tape',
    'Suction: Yankauer connected and working',
    'Bag-valve-mask with oxygen running',
    'IV access patent',
    'Induction agent drawn up',
    'Muscle relaxant drawn up',
    'Fentanyl drawn up (optional)',
    'SpO₂ probe applied and reading',
    'EtCO₂ probe connected to circuit',
    'NIBP cycling',
    'ECG leads applied',
    'Atropine available (especially pediatrics)',
    'Emergency drugs nearby (epinephrine)',
    'Video laryngoscope charged (if available)',
    'Difficult airway cart/trolley accessible',
    'Help available and team briefed',
  ]

  const toggleCheck = (i: number) => {
    const u = [...checked]; u[i] = !u[i]; setChecked(u)
  }

  const currentStep = rsiSteps[activeStep]

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>🔬</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Intubation Guide
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Step-by-step RSI and endotracheal intubation guide. Evidence-based approach.
        </p>
      </div>

      {/* Checklist toggle */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => setShowChecklist(!showChecklist)}
          style={{
            padding: '10px 18px', borderRadius: '10px',
            background: showChecklist ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
            border: showChecklist ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.08)',
            color: showChecklist ? '#34d399' : '#94a3b8',
            fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          <span>☑</span> Equipment Checklist ({checked.filter(Boolean).length}/{checklistItems.length})
        </button>

        {showChecklist && (
          <div style={{
            marginTop: '12px', padding: '20px', borderRadius: '12px',
            background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)',
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '0.9rem', fontWeight: '700', color: '#34d399' }}>Pre-Intubation Checklist</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '8px' }}>
              {checklistItems.map((item, i) => (
                <div
                  key={i}
                  onClick={() => toggleCheck(i)}
                  style={{
                    display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer',
                    padding: '6px 8px', borderRadius: '6px',
                    background: checked[i] ? 'rgba(16,185,129,0.08)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '4px',
                    border: `2px solid ${checked[i] ? '#10b981' : '#334155'}`,
                    background: checked[i] ? '#10b981' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '1px', transition: 'all 0.15s',
                  }}>
                    {checked[i] && <span style={{ color: 'white', fontSize: '11px', lineHeight: 1 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: checked[i] ? '#94a3b8' : '#cbd5e1', textDecoration: checked[i] ? 'line-through' : 'none' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setChecked(Array(checklistItems.length).fill(false))}
              style={{
                marginTop: '12px', padding: '6px 12px', borderRadius: '6px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#64748b', fontSize: '0.78rem', cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Step navigator */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '20px', scrollbarWidth: 'none' }}>
        {rsiSteps.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            style={{
              padding: '7px 12px', borderRadius: '8px', whiteSpace: 'nowrap',
              border: activeStep === i ? `1px solid ${s.color}40` : '1px solid rgba(255,255,255,0.07)',
              background: activeStep === i ? `${s.color}15` : 'rgba(255,255,255,0.03)',
              color: activeStep === i ? s.color : '#64748b',
              fontSize: '0.76rem', fontWeight: '600', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {s.icon} {s.step}
          </button>
        ))}
      </div>

      {/* Step content */}
      <div style={{
        padding: '24px', borderRadius: '14px', marginBottom: '24px',
        background: `${currentStep.color}07`, border: `1px solid ${currentStep.color}25`,
        borderLeft: `4px solid ${currentStep.color}`,
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '28px' }}>{currentStep.icon}</span>
          <div>
            <div style={{ fontSize: '0.7rem', color: currentStep.color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
              Step {activeStep + 1} of {rsiSteps.length}
            </div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#f1f5f9' }}>{currentStep.step}</h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {currentStep.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: currentStep.color, fontSize: '10px', marginTop: '5px', flexShrink: 0 }}>◆</span>
              <span style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          {activeStep > 0 && (
            <button
              onClick={() => setActiveStep(activeStep - 1)}
              style={{
                padding: '8px 14px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer',
              }}
            >
              ← Previous
            </button>
          )}
          {activeStep < rsiSteps.length - 1 && (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              style={{
                padding: '8px 14px', borderRadius: '8px',
                background: `${currentStep.color}20`, border: `1px solid ${currentStep.color}30`,
                color: currentStep.color, fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer',
              }}
            >
              Next: {rsiSteps[activeStep + 1].step} →
            </button>
          )}
        </div>
      </div>

      {/* Common mistakes */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#94a3b8', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Common Mistakes to Avoid
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
          {[
            { mistake: 'Not preoxygenating adequately', fix: 'Always target EtO₂ >90% before RSI' },
            { mistake: 'Rocking the laryngoscope on teeth', fix: 'Lift in the handle direction — no lever action' },
            { mistake: 'Confirming tube placement by clinical signs only', fix: 'Continuous waveform capnography is mandatory' },
            { mistake: 'Too many laryngoscopy attempts', fix: 'Max 3 attempts then declare failed intubation, move to Plan B' },
            { mistake: 'Inflating cuff too much', fix: 'Target cuff pressure 20–30 cmH₂O — use manometer' },
            { mistake: 'Not checking ETT depth', fix: 'Document depth at teeth, confirm bilateral breath sounds' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                <span style={{ color: '#ef4444', fontSize: '12px' }}>✕</span>
                <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#fca5a5' }}>{item.mistake}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: '#10b981', fontSize: '12px' }}>✓</span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{item.fix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>References</h3>
        {[
          "Frerk C, et al. Difficult Airway Society 2015 guidelines. BJA, 2015.",
          "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018.",
          "Weingart SD, Levitan RM. Preoxygenation and Prevention of Desaturation During Emergency Airway Management. Ann Emerg Med, 2012.",
          "Cook TM, et al. NAP4 Major Complications of Airway Management in the UK. BJA, 2011.",
        ].map((r, i) => <p key={i} style={{ margin: '0 0 4px', fontSize: '0.78rem', color: '#475569' }}>[{i+1}] {r}</p>)}
      </div>
    </div>
  )
}
