export interface Pearl {
  id: string
  category: string
  title: string
  content: string
  tags: string[]
}

export const pearls: Pearl[] = [
  {
    id: 'p1',
    category: 'Airway',
    title: 'Preoxygenation Target',
    content: 'Preoxygenate for 3 minutes with 100% O₂ via tight-fitting mask, or 8 vital capacity breaths in 60 sec. Target EtO₂ >90% to maximize apnea time before desaturation.',
    tags: ['airway', 'preoxygenation', 'RSI'],
  },
  {
    id: 'p2',
    category: 'Airway',
    title: 'Confirming ETT Placement',
    content: 'Continuous waveform capnography is the gold standard for confirming endotracheal tube placement. Colorimetric CO₂ detectors are unreliable in cardiac arrest. Do NOT extubate based on capnography alone — also check bilateral breath sounds and chest rise.',
    tags: ['airway', 'intubation', 'capnography'],
  },
  {
    id: 'p3',
    category: 'Monitoring',
    title: 'SpO₂ Lag Time',
    content: 'Pulse oximetry has a 30–90 second lag time from the finger. In rapidly deteriorating patients, clinical signs and EtCO₂ will detect problems before SpO₂ falls. Do not wait for the SpO₂ alarm.',
    tags: ['monitoring', 'SpO2', 'awareness'],
  },
  {
    id: 'p4',
    category: 'Induction',
    title: 'Hypotension After Induction',
    content: 'The three most common causes of hypotension after induction are: (1) anesthetic vasodilation, (2) hypovolemia, and (3) cardiac depression. Always check depth of anesthesia first — light anesthesia can masquerade as other causes.',
    tags: ['induction', 'hypotension', 'hemodynamics'],
  },
  {
    id: 'p5',
    category: 'NMB',
    title: 'Residual Neuromuscular Blockade',
    content: 'Residual neuromuscular blockade (TOF ratio <0.9) causes postoperative respiratory complications. Always confirm TOF ratio ≥0.9 at the adductor pollicis before extubation. Clinical signs (head lift, grip strength) are unreliable at TOF 0.7–0.8.',
    tags: ['NMB', 'extubation', 'safety'],
  },
  {
    id: 'p6',
    category: 'Fluids',
    title: 'Fluid Responsiveness',
    content: 'Stroke volume variation (SVV) >13% predicts fluid responsiveness in mechanically ventilated patients with regular rhythm. Passive leg raise is the gold standard dynamic test for spontaneously breathing patients.',
    tags: ['fluids', 'hemodynamics', 'monitoring'],
  },
  {
    id: 'p7',
    category: 'Drugs',
    title: 'Propofol Pain on Injection',
    content: 'Lidocaine 40 mg IV 30–60 sec before propofol (or mixed with propofol) significantly reduces injection pain. Use a large antecubital vein rather than a small hand vein to further reduce pain.',
    tags: ['propofol', 'injection', 'comfort'],
  },
  {
    id: 'p8',
    category: 'Emergence',
    title: 'Extubation Criteria',
    content: 'Safe extubation requires: awake and following commands, TOF ≥0.9, tidal volume >5 mL/kg, RR 10–20, SpO₂ >95% on supplemental O₂, temperature ≥36°C, hemodynamically stable, and protective airway reflexes present.',
    tags: ['extubation', 'emergence', 'safety'],
  },
  {
    id: 'p9',
    category: 'MAC',
    title: 'MAC Modifiers',
    content: 'MAC DECREASES with: age (6%/decade), hypothermia, hypotension, opioids, ketamine, pregnancy, alpha-2 agonists, acute alcohol. MAC INCREASES with: hyperthermia, chronic alcohol, hypernatremia, stimulant drugs. Children have higher MAC than adults.',
    tags: ['MAC', 'volatile', 'pharmacology'],
  },
  {
    id: 'p10',
    category: 'Airway',
    title: 'LMA vs ETT',
    content: 'LMA is suitable for: short elective procedures, low aspiration risk, spontaneous ventilation. ETT required for: aspiration risk (full stomach, GERD, obesity), prolonged procedures, prone/lateral position, thoracic surgery, procedures requiring high airway pressures.',
    tags: ['airway', 'LMA', 'ETT', 'decision'],
  },
  {
    id: 'p11',
    category: 'Emergency',
    title: 'MH — Earliest Sign',
    content: 'Unexplained rise in EtCO₂ is the EARLIEST clinical sign of malignant hyperthermia. Hyperthermia is a late sign. Masseter spasm after succinylcholine is a warning sign. Dantrolene must be available wherever volatile anesthetics or succinylcholine are used.',
    tags: ['MH', 'emergency', 'EtCO2'],
  },
  {
    id: 'p12',
    category: 'Regional',
    title: 'LAST Prevention',
    content: 'Prevent LAST with: aspiration before injection (aspirate every 5 mL), incremental injection with pauses, use of epinephrine marker dose (1:200,000), stay within maximum doses. Intralipid 20% must be immediately available wherever regional anesthesia is performed.',
    tags: ['LAST', 'regional', 'safety'],
  },
  {
    id: 'p13',
    category: 'Pharmacology',
    title: 'Succinylcholine Contraindications',
    content: 'Absolute contraindications to succinylcholine: burns >24h (hyperkalemia), crush injury/rhabdomyolysis, denervation injuries (paraplegia, CVA), muscular dystrophies, known MH susceptibility, hyperkalemia >5.5. The potassium rise is +0.5–1 mEq/L normally but can be massive in the above conditions.',
    tags: ['succinylcholine', 'hyperkalemia', 'contraindications'],
  },
  {
    id: 'p14',
    category: 'Monitoring',
    title: 'EtCO₂ Waveform Shapes',
    content: 'Normal capnogram: square wave with plateau. "Shark fin" (slanted rise): bronchospasm/COPD (expiratory flow limitation). No CO₂: esophageal intubation/disconnection/cardiac arrest. Beaking: rebreathing (exhausted CO₂ absorbent). Double hump: esophageal surgical manipulation.',
    tags: ['capnography', 'monitoring', 'waveform'],
  },
  {
    id: 'p15',
    category: 'Induction',
    title: 'RSI Modified Sequence',
    content: 'Classic RSI: preoxygenate → cricoid pressure → induction + succinylcholine → intubate. Modified RSI allows gentle BMV with <20 cmH₂O pressure. Rocuronium 1.2 mg/kg is an acceptable alternative to succinylcholine in RSI and is reversible with sugammadex.',
    tags: ['RSI', 'intubation', 'sequence'],
  },
  {
    id: 'p16',
    category: 'Pediatrics',
    title: 'Pediatric ETT Sizing',
    content: 'Cuffed ETT formula: (age/4) + 3.5 mm ID. Uncuffed: (age/4) + 4. Depth: (age/2) + 12 cm at lip. Or use a Broselow tape. Confirm: bilateral breath sounds, CO₂ waveform, symmetrical chest rise. Cuffed tubes are now preferred even in infants.',
    tags: ['pediatric', 'ETT', 'intubation'],
  },
  {
    id: 'p17',
    category: 'Fluids',
    title: 'Normal Saline vs Ringer\'s Lactate',
    content: 'Normal saline (0.9% NaCl): High chloride → hyperchloremic metabolic acidosis with large volumes. Use for: hyponatremia, neurosurgery, metabolic alkalosis. Lactated Ringer\'s: more physiologic, better for large volume resuscitation. Avoid in hyperkalemia (contains K⁺ 4 mEq/L). Plasma-Lyte is closest to plasma composition.',
    tags: ['fluids', 'crystalloids', 'acidosis'],
  },
  {
    id: 'p18',
    category: 'Monitoring',
    title: 'Arterial Line Waveform',
    content: 'Arterial line waveform: ascending limb = systole, dicrotic notch = aortic valve closure, descending limb = diastole. Dampened waveform: air bubble, clot, kinked tubing. Over-damped: underestimates systolic, overestimates diastolic. Check: flush test (square wave test) to assess dynamic response.',
    tags: ['arterial line', 'monitoring', 'waveform'],
  },
]

export const pearlCategories = ['All', 'Airway', 'Monitoring', 'Induction', 'NMB', 'Fluids', 'Drugs', 'Emergency', 'Emergence', 'Regional', 'Pharmacology', 'MAC', 'Pediatrics']
