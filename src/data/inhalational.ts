export interface InhalationalAgent {
  id: string
  name: string
  color: string
  mac: string
  macElderly: string
  bloodGasCoeff: string
  smell: string
  airwayIrritation: string
  onset: string
  recovery: string
  cardioEffects: string[]
  respEffects: string[]
  contraindications: string[]
  pearls: string[]
  references: string[]
}

export const inhalationalAgents: InhalationalAgent[] = [
  {
    id: 'sevoflurane',
    name: 'Sevoflurane',
    color: 'blue',
    mac: '2.0%',
    macElderly: '1.4% (age 80)',
    bloodGasCoeff: '0.65',
    smell: 'Pleasant, ethereal',
    airwayIrritation: 'Minimal — suitable for inhalation induction',
    onset: 'Rapid (low blood:gas coefficient)',
    recovery: 'Rapid',
    cardioEffects: [
      '↓ SVR and MAP (dose-dependent)',
      'Minimal myocardial depression at clinical concentrations',
      'QTc prolongation possible',
    ],
    respEffects: [
      '↓ Tidal volume, ↑ respiratory rate',
      '↓ Response to CO₂ and O₂',
      'Bronchodilator at clinical concentrations',
    ],
    contraindications: [
      'Known susceptibility to malignant hyperthermia',
      'Sevoflurane-induced hepatitis (rare, less than halothane)',
      'Renal impairment (Compound A formation at low flows — avoid <2 L/min or use >1 MAC)',
    ],
    pearls: [
      'Most commonly used agent for inhalation induction — sweet smell, non-irritating',
      'Compound A is nephrotoxic in rats — minimize fresh gas flow <2 L/min',
      'MAC decreases 6% per decade of age',
      'Excellent choice for pediatric induction',
      'Carbon monoxide can form in dry CO₂ absorbent — change absorbent regularly',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 8.",
      "Miller RD. Miller's Anesthesia, 8th ed. 2015. Ch 26.",
    ],
  },
  {
    id: 'desflurane',
    name: 'Desflurane',
    color: 'cyan',
    mac: '6.0%',
    macElderly: '4.5%',
    bloodGasCoeff: '0.42',
    smell: 'Pungent',
    airwayIrritation: 'High — causes coughing, laryngospasm. NOT for inhalation induction.',
    onset: 'Very rapid (lowest blood:gas coefficient)',
    recovery: 'Fastest of all volatile agents',
    cardioEffects: [
      '↓ SVR and MAP',
      'Tachycardia with rapid increases in concentration',
      '↑ sympathetic stimulation with abrupt ↑ in desflurane',
    ],
    respEffects: [
      '↓ Tidal volume, ↑ respiratory rate',
      'Severe airway irritation — bronchospasm risk',
    ],
    contraindications: [
      'Malignant hyperthermia susceptibility',
      'Inhalation induction (pungent — causes airway complications)',
    ],
    pearls: [
      'Fastest recovery — ideal for day surgery and obese patients',
      'Requires heated vaporizer (boiling point 23.5°C)',
      'High global warming potential — environmental concerns led to discontinuation in UK/several countries',
      'Abrupt concentration increases → tachycardia + hypertension (autonomic activation)',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 8.",
    ],
  },
  {
    id: 'isoflurane',
    name: 'Isoflurane',
    color: 'teal',
    mac: '1.17%',
    macElderly: '0.9%',
    bloodGasCoeff: '1.4',
    smell: 'Pungent',
    airwayIrritation: 'Moderate',
    onset: 'Intermediate',
    recovery: 'Intermediate',
    cardioEffects: [
      '↓ SVR (coronary vasodilator — controversial coronary steal)',
      'Slight ↓ myocardial contractility',
      'HR relatively preserved',
    ],
    respEffects: [
      '↓ Tidal volume',
      'Bronchodilator at clinical concentrations',
    ],
    contraindications: [
      'Malignant hyperthermia',
      'Severe coronary artery disease (coronary steal — controversial)',
    ],
    pearls: [
      'Longest-used modern volatile agent',
      'Cheapest available agent',
      'Coronary steal phenomenon with isoflurane in CAD patients — controversial',
      'Inorganic fluoride metabolite — potential nephrotoxicity at high doses',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 8.",
    ],
  },
  {
    id: 'n2o',
    name: 'Nitrous Oxide',
    color: 'purple',
    mac: '104% (cannot achieve 1 MAC in clinical practice)',
    macElderly: '~80%',
    bloodGasCoeff: '0.46',
    smell: 'Sweet',
    airwayIrritation: 'None',
    onset: 'Rapid',
    recovery: 'Very rapid',
    cardioEffects: [
      'Mild myocardial depressant',
      'Sympathomimetic effect — HR/BP relatively maintained',
    ],
    respEffects: [
      '↑ Respiratory rate',
      '↓ Tidal volume',
      'Less respiratory depression than other volatiles',
    ],
    contraindications: [
      'Pneumothorax (expands gas-filled spaces)',
      'Middle ear surgery, tympanoplasty',
      'Intraocular gas injection (SF₆, C₃F₈)',
      'Raised intracranial pressure',
      'Bowel obstruction',
      'Vit B12/methionine deficiency (methylcobalamin synthesis inhibition)',
    ],
    pearls: [
      'Diffusion hypoxia on discontinuation — give 100% O₂ for 5–10 min',
      'Second gas effect: accelerates uptake of co-administered agents',
      'Significant additive MAC — use as adjunct with volatile agents',
      '35 times more soluble in blood than N₂ → expands closed spaces',
      'Inhibits methionine synthase → megaloblastic anemia with prolonged use',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 8.",
    ],
  },
]

export const macComparison = [
  { agent: 'Nitrous Oxide', mac: '104%', bloodGas: '0.46', onset: 'Rapid', recovery: 'Rapid', induction: 'No' },
  { agent: 'Desflurane', mac: '6.0%', bloodGas: '0.42', onset: 'Fastest', recovery: 'Fastest', induction: 'No (irritant)' },
  { agent: 'Sevoflurane', mac: '2.0%', bloodGas: '0.65', onset: 'Rapid', recovery: 'Rapid', induction: 'Yes' },
  { agent: 'Isoflurane', mac: '1.17%', bloodGas: '1.4', onset: 'Slow', recovery: 'Slow', induction: 'No (irritant)' },
]
