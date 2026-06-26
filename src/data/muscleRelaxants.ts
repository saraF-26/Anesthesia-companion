export interface MuscleRelaxant {
  id: string
  name: string
  type: 'depolarizing' | 'non-depolarizing'
  color: string
  dose: string
  onset: string
  duration: string
  metabolism: string
  reversal: string
  contraindications: string[]
  sideEffects: string[]
  tofMonitoring: string
  pearls: string[]
  references: string[]
}

export const muscleRelaxants: MuscleRelaxant[] = [
  {
    id: 'succinylcholine',
    name: 'Succinylcholine',
    type: 'depolarizing',
    color: 'red',
    dose: 'Intubation: 1–1.5 mg/kg IV. IM: 3–4 mg/kg. Pediatric: 2 mg/kg IV (up to 3 mg/kg <2 yr).',
    onset: '45–60 seconds (fastest of all NMBs)',
    duration: '7–10 minutes (hydrolysis by pseudocholinesterase)',
    metabolism: 'Rapid hydrolysis by plasma pseudocholinesterase (butyrylcholinesterase). Prolonged block with pseudocholinesterase deficiency.',
    reversal: 'None available — wait for spontaneous recovery. Fresh frozen plasma (FFP) can provide enzyme. Avoid sugammadex.',
    contraindications: [
      'Burns >24 hrs and <2 years post-burn (hyperkalemia risk)',
      'Crush injuries, prolonged immobilization',
      'Denervation injuries (paraplegia, stroke)',
      'Hyperkalemia (K+ >5.5 mEq/L)',
      'Personal or family history of malignant hyperthermia',
      'Muscular dystrophies (Duchenne, Becker)',
      'Known pseudocholinesterase deficiency',
      'Myopathies (rhabdomyolysis risk)',
    ],
    sideEffects: [
      'Fasciculations → myalgia (treat with defasciculating dose of rocuronium 0.1 mg/kg)',
      'Hyperkalemia (+0.5 mEq/L in normal patients; massive rise in denervation/burn)',
      'Increased intraocular pressure',
      'Increased intragastric pressure',
      'Malignant hyperthermia trigger',
      'Bradycardia (especially with second dose or in children)',
      'Masseter spasm (may precede MH)',
    ],
    tofMonitoring: 'Phase I block (depolarizing): TOF ratio preserved, all 4 twitches fade equally. Phase II block (with high doses): fade occurs, sugammadex NOT effective.',
    pearls: [
      'Only depolarizing NMB — fastest onset and shortest duration',
      'Drug of choice for RSI when rocuronium contraindicated or not available',
      'Succinylcholine + volatile anesthetics = MH trigger combination',
      '"Can\'t intubate, can\'t oxygenate" — succinylcholine allows fastest spontaneous recovery',
      'Prolonged block (phase II) with pseudocholinesterase deficiency — may last hours',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 12.",
      "Miller RD. Miller's Anesthesia, 8th ed. 2015. Ch 34.",
    ],
  },
  {
    id: 'rocuronium',
    name: 'Rocuronium',
    type: 'non-depolarizing',
    color: 'blue',
    dose: 'Intubation: 0.6 mg/kg (1.2 mg/kg for RSI). Maintenance: 0.15 mg/kg. Infusion: 5–12 mcg/kg/min.',
    onset: '1–1.5 min (0.6 mg/kg), 60 sec (1.2 mg/kg)',
    duration: '30–60 min (dose-dependent)',
    metabolism: 'Hepatic elimination (deacetylation). Renal and biliary excretion. Avoid or reduce in hepatic failure.',
    reversal: 'Sugammadex 2 mg/kg (routine), 4 mg/kg (deep block), 16 mg/kg (immediate reversal of 1.2 mg/kg dose). Neostigmine for shallow block.',
    contraindications: [
      'Known hypersensitivity (cross-reactivity with sugammadex – cyclodextrin complex)',
      'Caution in hepatic failure (prolonged duration)',
    ],
    sideEffects: [
      'Residual neuromuscular blockade (most common complication)',
      'Anaphylaxis (rare but more common than other NMBs)',
    ],
    tofMonitoring: 'Non-depolarizing: fade (T4/T1 ratio decreases). Adequate reversal: TOF ratio >0.9 before extubation.',
    pearls: [
      'RSI dose 1.2 mg/kg = same onset as succinylcholine; reversible with sugammadex 16 mg/kg',
      'Can be reversed immediately with sugammadex — valuable for "can\'t intubate, can\'t oxygenate"',
      'Most common NDMB worldwide',
      'Prolonged block in hepatic failure and hypothermia',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 12.",
      "Difficult Airway Society Guidelines. dasairway.org, 2015.",
    ],
  },
  {
    id: 'vecuronium',
    name: 'Vecuronium',
    type: 'non-depolarizing',
    color: 'teal',
    dose: 'Intubation: 0.1 mg/kg. Maintenance: 0.015–0.02 mg/kg. Infusion: 1–2 mcg/kg/min.',
    onset: '2–3 minutes',
    duration: '25–40 minutes',
    metabolism: 'Hepatic metabolism (3-desacetyl active metabolite). Biliary and renal excretion.',
    reversal: 'Neostigmine 0.04–0.07 mg/kg + glycopyrrolate. Sugammadex (off-label in some countries).',
    contraindications: [
      'Hepatic failure (prolonged duration due to metabolite accumulation)',
    ],
    sideEffects: [
      'Residual neuromuscular blockade',
      'Active metabolite accumulates in renal/hepatic failure',
    ],
    tofMonitoring: 'Non-depolarizing: fade pattern. TOF ratio >0.9 before extubation.',
    pearls: [
      'Intermediate-acting NDMB',
      'Minimal cardiovascular effects — good for cardiac patients',
      'Active metabolite (3-desacetyl) has 50–70% potency — accumulates in ICU patients',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 12.",
    ],
  },
  {
    id: 'atracurium',
    name: 'Atracurium',
    type: 'non-depolarizing',
    color: 'purple',
    dose: 'Intubation: 0.4–0.5 mg/kg. Maintenance: 0.1 mg/kg. Infusion: 4–12 mcg/kg/min.',
    onset: '2–3 minutes',
    duration: '25–35 minutes',
    metabolism: 'Hofmann elimination (spontaneous degradation at body temperature/pH) + ester hydrolysis by plasma esterases. ORGAN-INDEPENDENT.',
    reversal: 'Neostigmine + glycopyrrolate. Sugammadex not effective — no cyclodextrin binding.',
    contraindications: [
      'Laudanosine allergy (rare CNS stimulation with high doses in ICU)',
    ],
    sideEffects: [
      'Histamine release (dose-dependent, especially with rapid injection)',
      'Bronchospasm from histamine',
      'Laudanosine metabolite — CNS stimulation in large ICU doses',
    ],
    tofMonitoring: 'Standard NDMB TOF monitoring. Fade pattern.',
    pearls: [
      'Drug of choice in renal and hepatic failure — organ-independent elimination',
      'Hofmann elimination makes it ideal for ICU patients with multi-organ failure',
      'Inject slowly to reduce histamine release',
      'Cisatracurium is preferred over atracurium in ICU (less laudanosine, less histamine)',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 12.",
    ],
  },
  {
    id: 'cisatracurium',
    name: 'Cisatracurium',
    type: 'non-depolarizing',
    color: 'cyan',
    dose: 'Intubation: 0.15–0.2 mg/kg. Maintenance: 0.03 mg/kg. Infusion: 1–3 mcg/kg/min.',
    onset: '3–5 minutes',
    duration: '40–60 minutes',
    metabolism: 'Hofmann elimination (predominantly). Organ-independent. 3x less laudanosine than atracurium.',
    reversal: 'Neostigmine + glycopyrrolate.',
    contraindications: [
      'None absolute. Caution: Hofmann elimination slower in acidosis/hypothermia',
    ],
    sideEffects: [
      'Minimal histamine release (advantage over atracurium)',
      'Laudanosine metabolite (much less than atracurium)',
    ],
    tofMonitoring: 'Standard NDMB monitoring.',
    pearls: [
      'Preferred NDMB in ICU (ARDS, multi-organ failure) — organ independent, less histamine',
      'ACURASYS trial: cisatracurium infusion in early ARDS improved outcomes',
      'Slower onset than atracurium — plan ahead',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 12.",
      "Papazian L, et al. ACURASYS Trial. NEJM, 2010.",
    ],
  },
]

export const nmbaComparison = [
  { name: 'Succinylcholine', type: 'Depolarizing', dose: '1–2 mg/kg', onset: '45–60 sec', duration: '7–10 min', reversal: 'None', organIndependent: 'No' },
  { name: 'Rocuronium', type: 'Non-dep.', dose: '0.6–1.2 mg/kg', onset: '1–1.5 min', duration: '30–60 min', reversal: 'Sugammadex', organIndependent: 'No (hepatic)' },
  { name: 'Vecuronium', type: 'Non-dep.', dose: '0.1 mg/kg', onset: '2–3 min', duration: '25–40 min', reversal: 'Neostigmine', organIndependent: 'No (hepatic)' },
  { name: 'Atracurium', type: 'Non-dep.', dose: '0.4–0.5 mg/kg', onset: '2–3 min', duration: '25–35 min', reversal: 'Neostigmine', organIndependent: 'Yes' },
  { name: 'Cisatracurium', type: 'Non-dep.', dose: '0.15 mg/kg', onset: '3–5 min', duration: '40–60 min', reversal: 'Neostigmine', organIndependent: 'Yes' },
]
