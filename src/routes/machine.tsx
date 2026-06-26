import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/machine')({
  component: MachinePage,
})

interface Param {
  id: string
  label: string
  value: string
  unit: string
  normalRange: string
  color: string
  meaning: string
  whyItMatters: string
  ifAbnormal: string
  references: string[]
}

const machineParams: Param[] = [
  {
    id: 'fio2',
    label: 'FiO₂', value: '1.00', unit: '',
    normalRange: '0.21–1.00 (room air = 0.21, clinical often 0.3–0.8)',
    color: '#06b6d4',
    meaning: 'Fraction of Inspired Oxygen — the proportion of oxygen in the inspired gas mixture.',
    whyItMatters: 'Too low → hypoxia. Too high → absorption atelectasis, oxygen toxicity (prolonged >80% harmful). Set to 1.0 for induction/emergencies.',
    ifAbnormal: 'Low FiO₂: check flowmeters, gas supply. High FiO₂: acceptable short-term. Wean to 30–50% once stable.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'expo2',
    label: 'ExpO₂', value: '0.92', unit: '',
    normalRange: 'Should be near FiO₂ when adequately oxygenated. Gap = O₂ consumption.',
    color: '#06b6d4',
    meaning: 'Expired oxygen fraction. The difference between inspired and expired O₂ reflects O₂ consumption.',
    whyItMatters: 'Large O₂ gap (↑ consumption) may indicate MH, sepsis, or inadequate anesthesia.',
    ifAbnormal: 'Increased O₂ gap: rule out malignant hyperthermia, light anesthesia, shivering.',
    references: ['Miller RD. Millers Anesthesia, 8th ed. 2015.'],
  },
  {
    id: 'sevo_insp',
    label: 'Sevo Insp', value: '2.1', unit: '%',
    normalRange: 'Typically 1–3% during maintenance (target 1.0–1.3 MAC)',
    color: '#8b5cf6',
    meaning: 'Inspired sevoflurane concentration — the concentration of sevoflurane being delivered to the patient.',
    whyItMatters: 'Too low → awareness. Too high → hemodynamic depression, slow emergence.',
    ifAbnormal: 'Low: check vaporizer filled, fresh gas flow adequate, no leak. High: reduce to prevent cardiovascular depression.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'sevo_exp',
    label: 'Sevo Exp', value: '1.8', unit: '%',
    normalRange: 'Close to (or slightly below) inspired concentration at equilibrium',
    color: '#8b5cf6',
    meaning: 'End-tidal sevoflurane concentration — reflects brain concentration of sevoflurane.',
    whyItMatters: 'Best correlate of anesthetic depth. Use to calculate MAC delivered.',
    ifAbnormal: 'Big inspired-expired gap: patient not yet equilibrated. Monitor trend — should narrow over time.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'mac',
    label: 'MAC', value: '1.1', unit: '',
    normalRange: '0.7–1.3 MAC prevents movement in 50–95% of patients. Target >1.0 MAC for adequate anesthesia.',
    color: '#8b5cf6',
    meaning: 'Minimum Alveolar Concentration — the alveolar concentration that prevents movement in 50% of patients in response to surgical stimulus.',
    whyItMatters: 'Guides anesthetic depth. MAC <0.7 → awareness risk. MAC varies with age, hypothermia, other drugs.',
    ifAbnormal: 'Low MAC: risk of awareness — add opioids, consider BIS monitoring. High MAC: cardiovascular depression.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'etco2',
    label: 'EtCO₂', value: '38', unit: 'mmHg',
    normalRange: '35–45 mmHg (arterial CO₂ typically 2–5 mmHg higher)',
    color: '#f59e0b',
    meaning: 'End-tidal CO₂ — the CO₂ concentration at end of exhalation, approximating alveolar CO₂.',
    whyItMatters: 'Confirms ETT placement. Monitors ventilation adequacy, cardiac output, and metabolism. Essential for CPR quality assessment.',
    ifAbnormal: 'High EtCO₂: hypoventilation, fever, MH (rising EtCO₂ = earliest MH sign). Low EtCO₂: hyperventilation, ↓ cardiac output, PE, esophageal intubation.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'inspco2',
    label: 'Insp CO₂', value: '0', unit: 'mmHg',
    normalRange: '0 mmHg (any reading >0 indicates rebreathing)',
    color: '#f59e0b',
    meaning: 'Inspired CO₂ — should be zero in a properly functioning circuit.',
    whyItMatters: 'Rebreathing CO₂ causes hypercapnia. Indicates exhausted CO₂ absorbent or incompetent valve.',
    ifAbnormal: '>0: check CO₂ absorbent (change if exhausted), check circuit valves, increase fresh gas flow.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'vt',
    label: 'VT', value: '520', unit: 'mL',
    normalRange: '6–8 mL/kg IBW (protective ventilation). Target: 400–500 mL in average adult.',
    color: '#10b981',
    meaning: 'Tidal Volume — the volume of gas delivered with each mechanical breath.',
    whyItMatters: 'Lung-protective ventilation (6 mL/kg IBW) reduces barotrauma and VILI, especially in ARDS.',
    ifAbnormal: 'High VT: reduces to 6–8 mL/kg IBW — increases RR to maintain minute ventilation. Low VT: increase if permissible, check for leak.',
    references: ['Futier E, et al. IMPROVE trial. NEJM, 2013.'],
  },
  {
    id: 'rr',
    label: 'RR', value: '12', unit: '/min',
    normalRange: '10–14 /min in adults under general anesthesia (adjust for EtCO₂)',
    color: '#10b981',
    meaning: 'Respiratory Rate — number of machine-delivered breaths per minute.',
    whyItMatters: 'With tidal volume, determines minute ventilation and CO₂ clearance.',
    ifAbnormal: 'High RR with normal VT: patient attempting spontaneous breathing — check anesthetic depth. Adjust to maintain EtCO₂ 35–45.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'mv',
    label: 'MV', value: '6.2', unit: 'L/min',
    normalRange: '6–10 L/min (≈ 70 mL/kg/min)',
    color: '#10b981',
    meaning: 'Minute Ventilation — total volume of gas moved in or out of the lungs per minute (VT × RR).',
    whyItMatters: 'Primary determinant of CO₂ clearance. Must be adjusted based on EtCO₂ target.',
    ifAbnormal: 'Low MV with high EtCO₂: increase RR or VT. High MV with low EtCO₂: reduce RR or VT.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'ppeak',
    label: 'P Peak', value: '22', unit: 'cmH₂O',
    normalRange: '<30 cmH₂O (peak pressure). <20 ideal.',
    color: '#f97316',
    meaning: 'Peak Airway Pressure — maximum pressure reached during inspiration in the ventilator circuit.',
    whyItMatters: 'Reflects airway resistance + compliance. High peak pressure → barotrauma risk. Sudden increase = obstruction/bronchospasm/pneumothorax.',
    ifAbnormal: 'Sudden ↑: check ETT (kinked/clogged), bronchospasm, pneumothorax. Gradual ↑: secretions, position change.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'pplat',
    label: 'P Plateau', value: '18', unit: 'cmH₂O',
    normalRange: '<30 cmH₂O (should be <25 in ARDS)',
    color: '#f97316',
    meaning: 'Plateau Pressure — pressure at end of inspiratory hold, reflecting alveolar pressure and lung compliance.',
    whyItMatters: 'Best indicator of overdistension. High plateau → VILI even with low peak pressure.',
    ifAbnormal: '>30 cmH₂O: reduce VT (accept permissive hypercapnia). Check: pneumothorax, main-stem intubation, abdominal distension.',
    references: ['ARDSNet Protocol. NEJM, 2000.'],
  },
  {
    id: 'peep',
    label: 'PEEP', value: '5', unit: 'cmH₂O',
    normalRange: '5 cmH₂O routine. 8–15 in ARDS or obesity.',
    color: '#f97316',
    meaning: 'Positive End-Expiratory Pressure — pressure maintained in the airway at end of expiration to prevent alveolar collapse.',
    whyItMatters: 'Prevents atelectasis, improves oxygenation. Too much → ↓ venous return, hypotension, barotrauma.',
    ifAbnormal: 'Low SpO₂: increase PEEP in 2 cmH₂O increments, watch BP. Hypotension with high PEEP: reduce PEEP, give fluid bolus.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'fgf',
    label: 'FGF', value: '2.0', unit: 'L/min',
    normalRange: '2–4 L/min maintenance. >4 L/min for washout. 0.5–1 L/min low-flow.',
    color: '#06b6d4',
    meaning: 'Fresh Gas Flow — total flow of fresh gas (O₂ ± N₂O ± air) from the flowmeters into the circuit.',
    whyItMatters: 'Determines how quickly inspired concentration changes, CO₂ elimination, and anesthetic cost.',
    ifAbnormal: 'Too low: rebreathing, slow concentration changes. Too high: waste of agent, cost, environmental impact.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'o2flow',
    label: 'O₂ Flow', value: '1.5', unit: 'L/min',
    normalRange: 'Must maintain FiO₂ >0.21. Minimum 200 mL/min for metabolic consumption.',
    color: '#06b6d4',
    meaning: 'Oxygen flowmeter setting — the rate of oxygen being added to the breathing circuit.',
    whyItMatters: 'Must always be sufficient to meet patient O₂ consumption and maintain adequate FiO₂.',
    ifAbnormal: 'Ensure FiO₂ >0.25 minimum at all times. If O₂ supply fails: switch to cylinder, call biomedical engineering.',
    references: ['AAGBI. Checking Anaesthetic Equipment, 2012.'],
  },
  {
    id: 'airflow',
    label: 'Air Flow', value: '0.5', unit: 'L/min',
    normalRange: 'Variable — to blend with O₂ for target FiO₂',
    color: '#94a3b8',
    meaning: 'Air (21% O₂ + 78% N₂) flow — added to dilute pure oxygen to target FiO₂.',
    whyItMatters: 'Avoids hyperoxia. FiO₂ = (O₂ flow + 0.21 × air flow) ÷ total flow.',
    ifAbnormal: 'If air not available, use O₂ + N₂O or pure O₂ with reduced flow.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'vent_mode',
    label: 'Mode', value: 'VCV', unit: '',
    normalRange: 'VCV (Volume Control) or PCV (Pressure Control)',
    color: '#3b82f6',
    meaning: 'Ventilation mode — determines whether the ventilator delivers set volume (VCV) or set pressure (PCV) each breath.',
    whyItMatters: 'VCV guarantees minute ventilation. PCV limits barotrauma but VT may vary with compliance changes.',
    ifAbnormal: 'Switch to PCV if high airway pressures with VCV. Consider pressure support for weaning.',
    references: ['Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018.'],
  },
  {
    id: 'ie',
    label: 'I:E Ratio', value: '1:2', unit: '',
    normalRange: '1:2 standard. 1:3 or longer for obstructive disease.',
    color: '#3b82f6',
    meaning: 'Inspiratory:Expiratory ratio — time spent in inspiration versus expiration per breathing cycle.',
    whyItMatters: 'Adequate expiratory time prevents air trapping (intrinsic PEEP) — crucial in asthma/COPD.',
    ifAbnormal: 'Obstructive disease (asthma, COPD): use 1:3 or 1:4. Rising peak pressure with dynamic hyperinflation: lengthen expiratory time.',
    references: ['Levy BD, et al. Mechanical ventilation in COPD. NEJM, 2007.'],
  },
]

function WaveformDisplay() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 50)
    return () => clearInterval(id)
  }, [])

  const capnoPath = () => {
    const points = []
    for (let x = 0; x <= 200; x += 4) {
      const phase = ((x + tick * 2) % 80)
      let y = 70
      if (phase >= 10 && phase < 20) y = 70 - (phase - 10) * 6
      else if (phase >= 20 && phase < 50) y = 10
      else if (phase >= 50 && phase < 60) y = 10 + (phase - 50) * 6
      points.push(`${x},${y}`)
    }
    return `M ${points.join(' L ')}`
  }

  const respPath = () => {
    const points = []
    for (let x = 0; x <= 200; x += 4) {
      const phase = ((x + tick) % 100)
      let y = 35
      if (phase < 35) y = 35 - Math.sin((phase / 35) * Math.PI) * 25
      points.push(`${x},${y}`)
    }
    return `M ${points.join(' L ')}`
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {/* Capnogram */}
      <div>
        <div style={{ fontSize: '0.6rem', color: '#fbbf24', marginBottom: '2px', letterSpacing: '0.05em' }}>CAPNOGRAM (EtCO₂)</div>
        <svg width="200" height="80" style={{ display: 'block' }}>
          <rect width="200" height="80" fill="transparent"/>
          <path d={capnoPath()} fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
        </svg>
      </div>
      {/* Pressure waveform */}
      <div>
        <div style={{ fontSize: '0.6rem', color: '#f97316', marginBottom: '2px', letterSpacing: '0.05em' }}>AIRWAY PRESSURE</div>
        <svg width="200" height="70" style={{ display: 'block' }}>
          <rect width="200" height="70" fill="transparent"/>
          <path d={respPath()} fill="none" stroke="#f97316" strokeWidth="1.5"/>
        </svg>
      </div>
    </div>
  )
}

function ParamDisplay({ param, onClick }: { param: Param; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'transparent',
        border: '1px solid transparent',
        borderRadius: '8px',
        padding: '8px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.background = `${param.color}10`
        ;(e.currentTarget as HTMLElement).style.borderColor = `${param.color}30`
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.background = 'transparent'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'transparent'
      }}
    >
      <div style={{ fontSize: '0.6rem', color: '#475569', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>
        {param.label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
        <span style={{ fontSize: '1.4rem', fontWeight: '800', color: param.color, fontFamily: 'monospace', lineHeight: 1 }}>
          {param.value}
        </span>
        {param.unit && (
          <span style={{ fontSize: '0.7rem', color: '#475569' }}>{param.unit}</span>
        )}
      </div>
    </button>
  )
}

function MachinePage() {
  const [selectedParam, setSelectedParam] = useState<Param | null>(null)

  const gasParams = machineParams.filter(p => ['fio2', 'expo2', 'fgf', 'o2flow', 'airflow'].includes(p.id))
  const agentParams = machineParams.filter(p => ['sevo_insp', 'sevo_exp', 'mac'].includes(p.id))
  const co2Params = machineParams.filter(p => ['etco2', 'inspco2'].includes(p.id))
  const ventParams = machineParams.filter(p => ['vt', 'rr', 'mv', 'ppeak', 'pplat', 'peep', 'vent_mode', 'ie'].includes(p.id))

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>🖥️</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Anesthesia Machine
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Interactive machine screen. Tap any parameter to learn what it means, normal ranges, and how to respond.
        </p>
      </div>

      {/* Machine screen */}
      <div style={{
        borderRadius: '16px',
        background: '#000d1a',
        border: '1px solid rgba(0,180,255,0.15)',
        boxShadow: '0 0 60px rgba(0,100,180,0.08), inset 0 0 60px rgba(0,0,0,0.4)',
        padding: '20px',
        marginBottom: '24px',
        overflow: 'hidden',
      }}>
        {/* Screen header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid rgba(0,180,255,0.1)',
          paddingBottom: '12px', marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span style={{ fontSize: '0.7rem', color: '#22d3ee', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Anesthesia Workstation
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontSize: '0.65rem', color: '#334155' }}>♥ 68 bpm</span>
            <span style={{ fontSize: '0.65rem', color: '#06b6d4' }}>SpO₂ 99%</span>
            <span style={{ fontSize: '0.65rem', color: '#10b981' }}>NIBP 118/72</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* Gas delivery */}
          <div style={{
            background: 'rgba(6,182,212,0.04)',
            border: '1px solid rgba(6,182,212,0.1)',
            borderRadius: '10px', padding: '12px',
          }}>
            <div style={{ fontSize: '0.58rem', color: '#06b6d4', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
              ◆ Gas Delivery
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              {gasParams.map(p => <ParamDisplay key={p.id} param={p} onClick={() => setSelectedParam(p)} />)}
            </div>
          </div>

          {/* Inhalational agent */}
          <div style={{
            background: 'rgba(139,92,246,0.04)',
            border: '1px solid rgba(139,92,246,0.1)',
            borderRadius: '10px', padding: '12px',
          }}>
            <div style={{ fontSize: '0.58rem', color: '#a78bfa', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
              ◆ Sevoflurane
            </div>
            {agentParams.map(p => <ParamDisplay key={p.id} param={p} onClick={() => setSelectedParam(p)} />)}
            <div style={{ marginTop: '8px' }}>
              <WaveformDisplay />
            </div>
          </div>

          {/* CO2 */}
          <div style={{
            background: 'rgba(245,158,11,0.04)',
            border: '1px solid rgba(245,158,11,0.1)',
            borderRadius: '10px', padding: '12px',
          }}>
            <div style={{ fontSize: '0.58rem', color: '#fbbf24', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
              ◆ Capnography
            </div>
            {co2Params.map(p => <ParamDisplay key={p.id} param={p} onClick={() => setSelectedParam(p)} />)}
          </div>

          {/* Ventilation */}
          <div style={{
            background: 'rgba(16,185,129,0.04)',
            border: '1px solid rgba(16,185,129,0.1)',
            borderRadius: '10px', padding: '12px',
          }}>
            <div style={{ fontSize: '0.58rem', color: '#34d399', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
              ◆ Ventilation
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              {ventParams.map(p => <ParamDisplay key={p.id} param={p} onClick={() => setSelectedParam(p)} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Info tip */}
      <div style={{
        padding: '12px 16px', marginBottom: '24px',
        borderRadius: '8px',
        background: 'rgba(59,130,246,0.05)',
        border: '1px solid rgba(59,130,246,0.1)',
        fontSize: '0.8rem', color: '#60a5fa',
        display: 'flex', gap: '8px', alignItems: 'center',
      }}>
        <span>ℹ</span>
        <span>Click / tap any parameter on the machine screen above for a detailed explanation.</span>
      </div>

      {/* Parameter detail modal */}
      {selectedParam && (
        <div
          onClick={() => setSelectedParam(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0f0f1a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              maxWidth: '540px', width: '100%',
              maxHeight: '80vh', overflowY: 'auto',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: selectedParam.color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  Parameter
                </div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: selectedParam.color }}>
                  {selectedParam.label}
                </h2>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: selectedParam.color, fontFamily: 'monospace', marginTop: '4px' }}>
                  {selectedParam.value} <span style={{ fontSize: '1rem', color: '#64748b' }}>{selectedParam.unit}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedParam(null)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <DetailSection title="What It Means" content={selectedParam.meaning} />
              <DetailSection title="Normal Range" content={selectedParam.normalRange} />
              <DetailSection title="Why It Matters" content={selectedParam.whyItMatters} />
              <div style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.15)',
              }}>
                <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  If Abnormal
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#fca5a5', lineHeight: 1.5 }}>
                  {selectedParam.ifAbnormal}
                </p>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  References
                </div>
                {selectedParam.references.map((r, i) => (
                  <p key={i} style={{ margin: '0 0 4px', fontSize: '0.75rem', color: '#475569' }}>[{i+1}] {r}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Parameters List */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          All Parameters Reference
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px' }}>
          {machineParams.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedParam(p)}
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = `${p.color}40`
                ;(e.currentTarget as HTMLElement).style.background = `${p.color}08`
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: '0.65rem', color: '#475569', fontWeight: '600', marginBottom: '2px' }}>{p.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: p.color, fontFamily: 'monospace' }}>
                  {p.value} <span style={{ fontSize: '0.65rem', color: '#475569' }}>{p.unit}</span>
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>
                {p.meaning.substring(0, 80)}...
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* References */}
      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          References
        </h3>
        {[
          "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018.",
          "Miller RD. Miller's Anesthesia, 8th ed. Elsevier, 2015.",
          "AAGBI. Checking Anaesthetic Equipment, 4th ed. aagbi.org, 2012.",
          "ARDSNet Protocol. Ventilation with lower tidal volumes. NEJM, 2000.",
          "Futier E, et al. A trial of intraoperative low-tidal-volume ventilation in abdominal surgery. NEJM, 2013.",
        ].map((ref, i) => (
          <p key={i} style={{ margin: '0 0 6px', fontSize: '0.78rem', color: '#475569', lineHeight: 1.5 }}>
            [{i + 1}] {ref}
          </p>
        ))}
      </div>
    </div>
  )
}

function DetailSection({ title, content }: { title: string; content: string }) {
  return (
    <div style={{
      padding: '14px',
      borderRadius: '10px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
        {title}
      </div>
      <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.6 }}>{content}</p>
    </div>
  )
}
