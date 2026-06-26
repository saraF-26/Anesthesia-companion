export interface Drug {
  id: string
  name: string
  class: string
  color: string
  mechanism: string
  dose: string
  onset: string
  duration: string
  sideEffects: string[]
  contraindications: string[]
  pearls: string[]
  references: string[]
}

export const drugs: Drug[] = [
  {
    id: 'propofol',
    name: 'Propofol',
    class: 'Induction Agent / Sedative-Hypnotic',
    color: 'blue',
    mechanism: 'Potentiates GABA-A receptor chloride ion channel → ↑ CNS inhibition. Decreases cerebral metabolic rate and ICP.',
    dose: 'Induction: 1–2.5 mg/kg IV (reduce 30–50% in elderly/compromised). Maintenance: 25–75 mcg/kg/min infusion. Sedation: 5–50 mcg/kg/min.',
    onset: '30–60 seconds',
    duration: '5–10 minutes',
    sideEffects: [
      'Hypotension (↓ SVR and myocardial depression)',
      'Apnea / respiratory depression',
      'Pain on injection (reduce with lidocaine 40 mg IV prior)',
      'Propofol Infusion Syndrome (rare, with prolonged high-dose)',
      'Transient excitatory movements',
    ],
    contraindications: [
      'Allergy to propofol or soy/egg lecithin',
      'Use with caution in hemodynamically unstable patients',
      'Propofol Infusion Syndrome risk with >4 mg/kg/hr >48 hrs',
    ],
    pearls: [
      'Milky white emulsion — bacterial growth risk, use within 12 hrs of opening',
      'Antiemetic properties — reduces PONV',
      'Anticonvulsant at clinical doses',
      'Context-sensitive half-time is short — good for infusions',
      'Reduces ICP and CBF — useful in neuroanaesthesia',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018. Ch 9.",
      "Patel PM, Drummond JC. Cerebral physiology and the effects of anesthetic drugs. In: Miller's Anesthesia, 8th ed. 2015.",
    ],
  },
  {
    id: 'ketamine',
    name: 'Ketamine',
    class: 'Dissociative Anesthetic / NMDA Antagonist',
    color: 'purple',
    mechanism: 'Non-competitive NMDA receptor antagonist → dissociative anesthesia. Stimulates sympathetic nervous system.',
    dose: 'Induction: 1–2 mg/kg IV or 4–6 mg/kg IM. Analgesia: 0.1–0.5 mg/kg IV. Infusion: 0.1–0.5 mg/kg/hr.',
    onset: 'IV: 30–60 sec | IM: 3–5 min',
    duration: 'IV: 10–15 min | IM: 12–25 min',
    sideEffects: [
      'Emergence reactions / dysphoria (reduce with midazolam)',
      'Increased secretions (consider glycopyrrolate)',
      'Tachycardia and hypertension',
      'Nystagmus, increased muscle tone',
      'PONV',
    ],
    contraindications: [
      'Uncontrolled hypertension',
      'Ischemic heart disease (relative — sympathomimetic)',
      'History of psychosis or schizophrenia',
      'Raised intracranial pressure (controversial — may be safe with controlled ventilation)',
    ],
    pearls: [
      'Maintains airway reflexes and respiratory drive — useful in trauma/hemodynamically unstable',
      'Bronchodilator — excellent choice in reactive airway disease',
      'Provides analgesia — useful for painful procedures',
      'Ketamine does NOT require IV access initially (IM route available)',
      'Excellent for burn patients and pediatric procedural sedation',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018. Ch 9.",
      "Green SM, et al. Ketamine: A new look at an old drug. Lancet, 2011.",
    ],
  },
  {
    id: 'etomidate',
    name: 'Etomidate',
    class: 'Imidazole Induction Agent',
    color: 'teal',
    mechanism: 'Enhances GABA-A receptor activity. Minimal cardiovascular effects.',
    dose: 'Induction: 0.2–0.4 mg/kg IV. Elderly: 0.1–0.2 mg/kg IV.',
    onset: '15–45 seconds',
    duration: '5–10 minutes',
    sideEffects: [
      'Myoclonus (in up to 30% — not seizure)',
      'Pain on injection',
      'PONV (high incidence)',
      'Adrenocortical suppression (even single dose — cortisol synthesis inhibited for 4–8 hrs)',
    ],
    contraindications: [
      'Septic shock (adrenal suppression concerns)',
      'Adrenal insufficiency',
      'Repeated dosing / prolonged infusion',
    ],
    pearls: [
      'Drug of choice for hemodynamically unstable patients — minimal cardiac depression',
      'Reduces ICP and preserves CPP — useful for emergency neuro cases',
      'RSI agent of choice in cardiac/trauma patients',
      'Adrenal suppression: single dose reduces cortisol 4–8 hrs — controversial in sepsis',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018. Ch 9.",
      "Miller RD. Miller's Anesthesia, 8th ed. Elsevier, 2015. Ch 30.",
    ],
  },
  {
    id: 'thiopental',
    name: 'Thiopental',
    class: 'Barbiturate Induction Agent',
    color: 'amber',
    mechanism: 'Binds GABA-A receptor → prolongs Cl⁻ channel opening. Reduces CMRO₂ and ICP.',
    dose: 'Induction: 3–5 mg/kg IV (reduce in elderly, compromised). Cerebral protection: 3–5 mg/kg.',
    onset: '15–30 seconds',
    duration: '5–10 minutes',
    sideEffects: [
      'Hypotension (cardiac depression + ↓ SVR)',
      'Respiratory depression / apnea',
      'Histamine release (not common at standard doses)',
      'Thrombophlebitis if extravasated',
      'Cumulative effect with repeat dosing',
    ],
    contraindications: [
      'Porphyria (absolute — precipitates acute attack)',
      'Severe hypovolemia',
      'Severe hepatic disease',
      'Airway obstruction',
    ],
    pearls: [
      'Highly alkaline (pH 10.8) — causes tissue necrosis if intra-arterial injection',
      'Gold standard for cerebral protection in neurosurgery historically',
      'Intravenous only — never intra-arterial',
      'Availability limited in many countries — largely replaced by propofol',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018. Ch 9.",
    ],
  },
  {
    id: 'fentanyl',
    name: 'Fentanyl',
    class: 'Opioid Analgesic (Synthetic μ-agonist)',
    color: 'green',
    mechanism: 'Binds μ-opioid receptors in brain and spinal cord → analgesia, sedation, respiratory depression.',
    dose: 'Analgesia: 1–2 mcg/kg IV. Induction supplement: 2–3 mcg/kg. Infusion: 1–3 mcg/kg/hr. Intrathecal: 10–25 mcg.',
    onset: 'IV: 1–3 min',
    duration: '30–60 minutes (single dose)',
    sideEffects: [
      'Respiratory depression (dose-dependent)',
      'Chest wall rigidity (high doses — treat with succinylcholine)',
      'Nausea and vomiting',
      'Bradycardia',
      'Pruritus (especially neuraxial)',
    ],
    contraindications: [
      'Respiratory depression without airway control',
      'MAO inhibitors (relative — risk of serotonin syndrome)',
    ],
    pearls: [
      '100x more potent than morphine',
      'Context-sensitive half-time increases with infusion duration',
      'Excellent for blunting laryngoscopy response (1–2 mcg/kg 3 min before)',
      'Hepatically metabolized — renal failure does not significantly alter elimination',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018. Ch 10.",
      "Miller RD. Miller's Anesthesia, 8th ed. 2015. Ch 31.",
    ],
  },
  {
    id: 'remifentanil',
    name: 'Remifentanil',
    class: 'Ultra-Short-Acting Opioid',
    color: 'cyan',
    mechanism: 'μ-opioid agonist with ester linkage → metabolized by non-specific plasma and tissue esterases.',
    dose: 'Infusion: 0.05–0.2 mcg/kg/min (maintenance). Bolus: 0.5–1 mcg/kg (slow push). Intubation: 1–2 mcg/kg over 30 sec.',
    onset: 'IV: <1 minute',
    duration: '3–5 minutes (esterase metabolism)',
    sideEffects: [
      'Profound respiratory depression',
      'Bradycardia and hypotension',
      'Chest wall rigidity (high dose boluses)',
      'Post-infusion hyperalgesia (opioid-induced hyperalgesia)',
      'No residual analgesia after stopping infusion',
    ],
    contraindications: [
      'Spontaneous breathing without airway protection',
      'Epidural or intrathecal use (contains glycine — neurotoxic)',
    ],
    pearls: [
      'Context-sensitive half-time is 3–5 min REGARDLESS of infusion duration',
      'Ideal for procedures requiring rapid awakening (craniotomy, MEP monitoring)',
      'Must have multimodal analgesia plan at end of case — remifentanil provides zero residual',
      'Can use in renal/hepatic failure without dose adjustment',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 10.",
    ],
  },
  {
    id: 'morphine',
    name: 'Morphine',
    class: 'Opioid Analgesic (Natural μ-agonist)',
    color: 'amber',
    mechanism: 'μ > κ > δ opioid receptor agonist. Active metabolite morphine-6-glucuronide (M6G) accumulates in renal failure.',
    dose: 'IV: 0.05–0.1 mg/kg (titrate). PCA: 1–2 mg bolus, 5–10 min lockout. Neuraxial: 0.1–0.3 mg epidural, 0.1–0.3 mg intrathecal.',
    onset: 'IV: 5–10 min',
    duration: '3–5 hours',
    sideEffects: [
      'Histamine release (especially with fast injection)',
      'Nausea and vomiting',
      'Itching (especially neuraxial)',
      'Constipation',
      'Urinary retention (neuraxial)',
      'Delayed respiratory depression with neuraxial route',
    ],
    contraindications: [
      'Renal failure (M6G accumulation — prolonged sedation)',
      'MAO inhibitor use',
    ],
    pearls: [
      'Gold standard opioid for comparison',
      'Neuraxial morphine provides extended analgesia (12–24 hrs intrathecal)',
      'Avoid in renal failure — M6G accumulates → prolonged respiratory depression',
      'Histamine release can cause bronchospasm in asthmatics',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 10.",
    ],
  },
  {
    id: 'midazolam',
    name: 'Midazolam',
    class: 'Benzodiazepine',
    color: 'purple',
    mechanism: 'Positive allosteric modulator of GABA-A receptor → anxiolysis, amnesia, anticonvulsant, muscle relaxation.',
    dose: 'Premedication: 0.02–0.04 mg/kg IV (1–2 mg in adults). Sedation: 0.5–2 mg IV titrated. Induction (adjunct): 0.05–0.1 mg/kg.',
    onset: 'IV: 2–3 min | IM: 5–10 min',
    duration: '30–60 minutes',
    sideEffects: [
      'Respiratory depression (synergistic with opioids)',
      'Anterograde amnesia',
      'Paradoxical agitation (elderly/pediatric)',
      'Hypotension',
    ],
    contraindications: [
      'Acute narrow-angle glaucoma',
      'Pregnancy (teratogen in first trimester — relative)',
    ],
    pearls: [
      'Water-soluble at acidic pH, lipid-soluble at body pH — less pain on injection than diazepam',
      'Reversal agent: flumazenil (short-acting — resedation risk)',
      'Useful for reducing emergence dysphoria with ketamine',
      'Accumulates in elderly and hepatic failure',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 11.",
    ],
  },
  {
    id: 'lidocaine',
    name: 'Lidocaine',
    class: 'Local Anesthetic (Amide) / Antiarrhythmic',
    color: 'teal',
    mechanism: 'Blocks voltage-gated sodium channels → prevents nerve action potential propagation. Class 1b antiarrhythmic.',
    dose: 'Topical/infiltration: max 3 mg/kg (plain), 7 mg/kg (with epi). Epidural: 1–2% 15–20 ml. Spinal: 5% hyperbaric 1.5–2 ml. IV for LAST treatment: 1.5 mg/kg bolus.',
    onset: '2–5 min (infiltration)',
    duration: '60–120 min (plain), 2–4 hrs (with epinephrine)',
    sideEffects: [
      'CNS toxicity: perioral numbness → tinnitus → seizures (dose-dependent)',
      'Cardiovascular toxicity: arrhythmias, cardiac arrest',
      'Methemoglobinemia (rare)',
    ],
    contraindications: [
      'Allergy to amide local anesthetics',
      'High-dose IV in cardiac conduction disease',
    ],
    pearls: [
      'Most widely used local anesthetic',
      'IV lidocaine reduces opioid requirements and PONV (2 mg/kg infusion during case)',
      'Amide — metabolized by liver (cytochrome P450)',
      'First-line treatment for VT in cardiac arrest',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 14.",
      "NYSORA. Local Anesthetic Systemic Toxicity. nysora.com",
    ],
  },
  {
    id: 'bupivacaine',
    name: 'Bupivacaine',
    class: 'Long-Acting Local Anesthetic (Amide)',
    color: 'blue',
    mechanism: 'Blocks Na⁺ channels preferentially in sensory over motor nerves. Greater cardiac toxicity than lidocaine.',
    dose: 'Spinal: 0.5% heavy 2–3.5 ml. Epidural: 0.5% 15–20 ml (dense block), 0.0625–0.125% for labor. Peripheral nerve: 0.25–0.5% up to 2 mg/kg.',
    onset: '5–10 min (epidural)',
    duration: '3–10 hours (neuraxial)',
    sideEffects: [
      'Cardiac toxicity — ventricular arrhythmias (binds Na⁺ channels with high affinity)',
      'Cardiotoxicity worse in pregnancy',
      'CNS toxicity at high doses',
    ],
    contraindications: [
      'Intravenous regional anesthesia (Bier block) — highly cardiotoxic IV',
      '0.75% concentration for epidural in obstetrics (cardiac arrest reported)',
    ],
    pearls: [
      'Long duration makes it ideal for spinal anesthesia',
      'Hyperbaric (heavy) for spinal anesthesia — settles with gravity',
      'LAST treatment: Intralipid 20% 1.5 ml/kg IV bolus, then infusion',
      'Levobupivacaine and ropivacaine have lower cardiac toxicity profiles',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 14.",
      "AAGBI Guidelines on Local Anesthetic Toxicity. aagbi.org, 2020.",
    ],
  },
  {
    id: 'phenylephrine',
    name: 'Phenylephrine',
    class: 'Alpha-1 Adrenergic Agonist / Vasopressor',
    color: 'red',
    mechanism: 'Selective α₁ agonist → arteriolar vasoconstriction → ↑ SVR → ↑ MAP. No β effect → reflex bradycardia.',
    dose: 'Bolus: 50–200 mcg IV. Infusion: 25–100 mcg/min titrated.',
    onset: '<1 minute',
    duration: '10–15 minutes',
    sideEffects: [
      'Reflex bradycardia (baroreflex mediated)',
      'Reduced cardiac output (increased afterload)',
      'Hypertension if overdosed',
    ],
    contraindications: [
      'Bradycardia (worsens)',
      'Severe hypovolemia (treat underlying cause)',
    ],
    pearls: [
      'First-line vasopressor for spinal hypotension in obstetrics (maintains uteroplacental blood flow)',
      'Reflex bradycardia can reduce CO — use ephedrine if HR is already low',
      'Does not cause tachycardia — good for high-heart-rate patients',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 12.",
      "Kinsella SM, et al. ESRA Obstetric Anaesthesia Guidelines, 2018.",
    ],
  },
  {
    id: 'ephedrine',
    name: 'Ephedrine',
    class: 'Mixed Adrenergic Agonist / Vasopressor',
    color: 'orange',
    mechanism: 'Indirect sympathomimetic (releases catecholamines) + direct α and β agonism → ↑ HR, ↑ CO, ↑ SVR.',
    dose: 'Bolus: 5–10 mg IV repeated as needed. IM: 25–50 mg.',
    onset: 'IV: 1–2 min',
    duration: '10–20 minutes',
    sideEffects: [
      'Tachycardia',
      'Hypertension',
      'Tachyphylaxis with repeated dosing',
      'Crosses placenta — fetal tachycardia',
    ],
    contraindications: [
      'Tachyarrhythmias',
      'Severe hypertension',
    ],
    pearls: [
      'Good for spinal hypotension with concurrent bradycardia',
      'Preserves cardiac output via β-effect — useful in low CO states',
      'Tachyphylaxis develops quickly — switch to direct acting agent',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 12.",
    ],
  },
  {
    id: 'norepinephrine',
    name: 'Norepinephrine',
    class: 'Alpha + Beta Adrenergic Agonist / Vasopressor',
    color: 'red',
    mechanism: 'Potent α₁ and α₂ agonist, mild β₁ agonist → ↑↑ SVR, modest ↑ CO. First-line for distributive shock.',
    dose: 'Infusion: 0.01–3 mcg/kg/min IV (titrate to MAP). Must be given via central line ideally.',
    onset: 'Immediate',
    duration: 'Infusion duration',
    sideEffects: [
      'Reflex bradycardia',
      'Limb ischemia (peripheral vasoconstriction)',
      'Tissue necrosis with extravasation',
      'Arrhythmias (high doses)',
    ],
    contraindications: [
      'Hypovolemia (without concurrent fluid resuscitation)',
    ],
    pearls: [
      'First-line vasopressor in septic shock (Surviving Sepsis Campaign)',
      'Target MAP ≥65 mmHg in septic shock',
      'Add vasopressin 0.03 units/min to reduce NE requirements',
      'Central/intra-arterial access preferred for infusion',
    ],
    references: [
      "Rhodes A, et al. Surviving Sepsis Campaign. Intensive Care Med, 2017.",
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 12.",
    ],
  },
  {
    id: 'atropine',
    name: 'Atropine',
    class: 'Anticholinergic / Muscarinic Antagonist',
    color: 'amber',
    mechanism: 'Competitive antagonist at muscarinic receptors → ↑ HR, ↓ secretions, bronchodilation, ↓ GI motility.',
    dose: 'Bradycardia: 0.5 mg IV (repeat every 3–5 min, max 3 mg). Glycopyrrolate alternative: 0.2 mg per 1 mg neostigmine.',
    onset: 'IV: 1 min',
    duration: '30–60 minutes',
    sideEffects: [
      'Tachycardia',
      'Dry mouth',
      'Urinary retention',
      'Confusion (crosses BBB — esp. elderly)',
      'Blurred vision / mydriasis',
    ],
    contraindications: [
      'Narrow-angle glaucoma',
      'Obstructive uropathy',
      'Tachyarrhythmia',
    ],
    pearls: [
      'Crosses blood-brain barrier — central anticholinergic syndrome possible in elderly',
      'Dose <0.5 mg IV can cause paradoxical bradycardia via central vagal stimulation',
      'In ACLS: 1 mg IV every 3–5 min for sinus bradycardia',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 12.",
      "AHA ACLS Guidelines, 2020.",
    ],
  },
  {
    id: 'glycopyrrolate',
    name: 'Glycopyrrolate',
    class: 'Anticholinergic / Quaternary Ammonium',
    color: 'teal',
    mechanism: 'Muscarinic antagonist (quaternary ammonium) → does NOT cross blood-brain barrier. ↓ secretions, ↑ HR, bronchodilation.',
    dose: 'Antisialagogue: 0.1–0.2 mg IV/IM. Reversal adjunct: 0.2 mg per 1 mg neostigmine. Bradycardia: 0.1–0.2 mg IV.',
    onset: 'IV: 2–3 min | IM: 10–15 min',
    duration: '2–4 hours',
    sideEffects: [
      'Tachycardia (less than atropine)',
      'Dry mouth and thickened secretions',
      'Urinary retention',
    ],
    contraindications: [
      'Narrow-angle glaucoma',
      'Obstructive uropathy',
    ],
    pearls: [
      'Does NOT cross BBB — no central effects (preferred over atropine in elderly)',
      'Given with neostigmine for reversal of NDMR to counteract muscarinic side effects',
      'Slower onset than atropine — give simultaneously with neostigmine',
    ],
    references: [
      "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. 2018. Ch 12.",
    ],
  },
]

export const drugColorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue: { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', text: '#60a5fa', badge: 'badge-blue' },
  purple: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', text: '#a78bfa', badge: 'badge-purple' },
  teal: { bg: 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.2)', text: '#2dd4bf', badge: 'badge-teal' },
  amber: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', text: '#fbbf24', badge: 'badge-amber' },
  green: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', text: '#34d399', badge: 'badge-green' },
  cyan: { bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)', text: '#22d3ee', badge: 'badge-cyan' },
  red: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', text: '#f87171', badge: 'badge-red' },
  orange: { bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', text: '#fb923c', badge: 'badge-amber' },
}

export const drugCategories = [
  { id: 'all', label: 'All Drugs' },
  { id: 'induction', label: 'Induction Agents', drugs: ['propofol', 'ketamine', 'etomidate', 'thiopental'] },
  { id: 'opioids', label: 'Opioids', drugs: ['fentanyl', 'remifentanil', 'morphine'] },
  { id: 'benzos', label: 'Benzodiazepines', drugs: ['midazolam'] },
  { id: 'local', label: 'Local Anesthetics', drugs: ['lidocaine', 'bupivacaine'] },
  { id: 'vasopressors', label: 'Vasopressors', drugs: ['phenylephrine', 'ephedrine', 'norepinephrine'] },
  { id: 'anticholinergics', label: 'Anticholinergics', drugs: ['atropine', 'glycopyrrolate'] },
]
