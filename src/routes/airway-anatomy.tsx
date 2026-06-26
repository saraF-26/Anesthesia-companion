import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/airway-anatomy')({
  component: AirwayAnatomyPage,
})

const structures = [
  {
    id: 'nasopharynx',
    name: 'Nasopharynx',
    color: '#06b6d4',
    description: 'Space posterior to the nasal cavity above the soft palate. Contains adenoids (nasopharyngeal tonsil). The nasopharynx connects to the oropharynx at the soft palate.',
    clinicalRelevance: 'NPA bypasses oral cavity obstruction. Nasopharyngoscopy allows visualization of supraglottic airway.',
    landmarks: ['Choanae (posterior nasal apertures)', 'Eustachian tube orifice', 'Adenoids'],
  },
  {
    id: 'oropharynx',
    name: 'Oropharynx',
    color: '#8b5cf6',
    description: 'Between the soft palate and epiglottis. Contains the palatine tonsils, posterior tongue, soft palate, uvula, and tonsillar pillars. Site of Mallampati assessment.',
    clinicalRelevance: 'Mallampati class assessed here. Obstructed by tongue in unconscious patients — OPA or jaw thrust needed.',
    landmarks: ['Soft palate', 'Uvula', 'Palatine tonsils', 'Posterior pharyngeal wall'],
  },
  {
    id: 'laryngopharynx',
    name: 'Laryngopharynx (Hypopharynx)',
    color: '#3b82f6',
    description: 'Below the epiglottis to the inferior border of the cricoid. Contains the pyriform sinuses laterally. Bifurcates into trachea (anteriorly) and esophagus (posteriorly).',
    clinicalRelevance: 'Pyriform sinuses can cause resistance during intubation. Foreign bodies often lodge here.',
    landmarks: ['Pyriform sinuses', 'Arytenoids', 'Cricopharyngeus (upper esophageal sphincter)'],
  },
  {
    id: 'epiglottis',
    name: 'Epiglottis',
    color: '#10b981',
    description: 'Leaf-shaped elastic cartilage attached to the base of the tongue. Folds over the laryngeal inlet during swallowing to prevent aspiration.',
    clinicalRelevance: 'Macintosh blade tip goes into the vallecula (space between base of tongue and epiglottis) to lift epiglottis indirectly. Miller blade goes directly under epiglottis.',
    landmarks: ['Vallecula (anterior to epiglottis)', 'Aryepiglottic folds', 'Laryngeal inlet'],
  },
  {
    id: 'larynx',
    name: 'Larynx',
    color: '#f59e0b',
    description: 'Formed by thyroid cartilage, cricoid cartilage, arytenoids, epiglottis. The thyroid cartilage (Adam\'s apple) is anterior. The cricoid is the only complete ring of cartilage in the airway.',
    clinicalRelevance: 'Cricothyroid membrane is the site for emergency front-of-neck access (FONA/cricothyrotomy). Laryngospasm is closure of the vocal cords.',
    landmarks: ['Thyroid cartilage', 'Cricoid cartilage (complete ring)', 'Cricothyroid membrane', 'Arytenoid cartilages'],
  },
  {
    id: 'vocal_cords',
    name: 'Vocal Cords (Glottis)',
    color: '#ef4444',
    description: 'Two folds of mucous membrane: true vocal cords (inferior, glottic opening) and false vocal cords (superior, vestibular folds). The glottis is the space between the true vocal cords.',
    clinicalRelevance: 'ETT passes between the true vocal cords. Laryngospasm = adduction of true cords. Grade 1 laryngoscopy = full view of glottis.',
    landmarks: ['True vocal cords (arytenoids to thyroid)', 'False vocal cords', 'Arytenoid cartilages', 'Anterior commissure'],
  },
  {
    id: 'trachea',
    name: 'Trachea',
    color: '#14b8a6',
    description: 'Fibrocartilaginous tube from cricoid cartilage (C6) to carina (T4–T5). 10–15 cm long in adults. Contains 16–20 incomplete (C-shaped) cartilaginous rings. The carina is the bifurcation into left and right main bronchi.',
    clinicalRelevance: 'ETT tip should rest 2–4 cm above carina (~T2–T3 on CXR). Right main bronchus is straighter — right main-stem intubation is common.',
    landmarks: ['Cricoid cartilage (start)', 'Carina (T4–T5 bifurcation)', '16–20 tracheal rings', 'Right main bronchus (more vertical)'],
  },
  {
    id: 'ctm',
    name: 'Cricothyroid Membrane',
    color: '#f97316',
    description: 'Elastic membrane between the thyroid cartilage (superior) and cricoid cartilage (inferior). Average dimensions: 9 mm high × 30 mm wide. Located in the midline, just inferior to the thyroid cartilage notch.',
    clinicalRelevance: 'FONA landmark for emergency cricothyrotomy (Plan D in DAS). Identify by palpating the notch of the thyroid cartilage, moving inferiorly to the soft/hollow "dip" before the hard cricoid.',
    landmarks: ['Thyroid cartilage notch (superior landmark)', 'Inferior thyroid border', 'Superior cricoid border', 'Midline soft triangle (the CTM)'],
  },
]

const laryngoscopyGrades = [
  { grade: 'Grade 1', description: 'Full glottis visible (anterior and posterior commissures)', color: '#10b981', intubation: 'Easy' },
  { grade: 'Grade 2a', description: 'Posterior glottis visible (arytenoids)', color: '#3b82f6', intubation: 'Usually easy (bougie may help)' },
  { grade: 'Grade 2b', description: 'Only arytenoids visible', color: '#f59e0b', intubation: 'Potentially difficult' },
  { grade: 'Grade 3', description: 'Epiglottis only visible', color: '#f97316', intubation: 'Difficult — use bougie' },
  { grade: 'Grade 4', description: 'No laryngeal structures visible', color: '#ef4444', intubation: 'Very difficult' },
]

function AirwayAnatomyPage() {
  const [selectedStructure, setSelectedStructure] = useState(structures[0])

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>🔭</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Airway Anatomy
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Upper airway anatomy relevant to intubation, airway management, and emergency procedures.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '20px', marginBottom: '40px' }}>
        {/* Structure list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {structures.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedStructure(s)}
              style={{
                padding: '10px 14px', borderRadius: '8px', textAlign: 'left', border: 'none',
                background: selectedStructure.id === s.id ? `${s.color}15` : 'rgba(255,255,255,0.03)',
                borderLeft: selectedStructure.id === s.id ? `3px solid ${s.color}` : '3px solid transparent',
                color: selectedStructure.id === s.id ? s.color : '#64748b',
                fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Structure detail */}
        <div style={{
          padding: '24px', borderRadius: '14px',
          background: `${selectedStructure.color}07`, border: `1px solid ${selectedStructure.color}20`,
        }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '1.2rem', fontWeight: '800', color: selectedStructure.color }}>
            {selectedStructure.name}
          </h2>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Anatomy</div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              {selectedStructure.description}
            </p>
          </div>

          <div style={{
            padding: '14px', borderRadius: '10px', marginBottom: '16px',
            background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.15)',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Clinical Relevance
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#93c5fd', lineHeight: 1.6 }}>
              {selectedStructure.clinicalRelevance}
            </p>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
              Key Landmarks
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {selectedStructure.landmarks.map((l, i) => (
                <span key={i} style={{
                  padding: '4px 12px', borderRadius: '100px',
                  background: `${selectedStructure.color}12`,
                  border: `1px solid ${selectedStructure.color}25`,
                  color: selectedStructure.color, fontSize: '0.75rem', fontWeight: '500',
                }}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Laryngoscopy Grades */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Cormack-Lehane Laryngoscopy Grades
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '16px' }}>
          {laryngoscopyGrades.map(g => (
            <div key={g.grade} style={{
              padding: '14px', borderRadius: '10px',
              background: `${g.color}08`, border: `1px solid ${g.color}20`,
            }}>
              <div style={{ fontWeight: '800', color: g.color, fontSize: '0.95rem', marginBottom: '4px' }}>{g.grade}</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px', lineHeight: 1.4 }}>{g.description}</div>
              <div style={{ fontSize: '0.72rem', color: g.color, fontWeight: '600' }}>{g.intubation}</div>
            </div>
          ))}
        </div>
        <div style={{
          padding: '12px 16px', borderRadius: '8px',
          background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)',
          fontSize: '0.8rem', color: '#60a5fa',
        }}>
          ℹ Always note the laryngoscopy grade in the anesthesia record. Use a bougie for grade 3 views. Declare "difficult intubation" after 3 attempts and move to Plan B.
        </div>
      </div>

      {/* Laryngoscope blades */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Laryngoscope Blades
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {[
            {
              name: 'Macintosh Blade (Curved)',
              color: '#3b82f6',
              technique: 'Tip placed in the vallecula (anterior to epiglottis). Upward traction stretches hyoepiglottic ligament, lifting epiglottis indirectly.',
              sizes: 'Size 3 (standard), Size 4 (large/male)',
              advantage: 'Less stimulation of epiglottis. More space for ETT passage.',
            },
            {
              name: 'Miller Blade (Straight)',
              color: '#8b5cf6',
              technique: 'Tip goes directly beneath/posterior surface of epiglottis. Lifts epiglottis directly.',
              sizes: 'Size 2 (standard adult), Size 3 (large adult), Size 0–1 (pediatric)',
              advantage: 'Better visualization in anterior larynx, pediatric patients, floppy epiglottis.',
            },
          ].map(blade => (
            <div key={blade.name} style={{ padding: '18px', borderRadius: '12px', background: `${blade.color}07`, border: `1px solid ${blade.color}20` }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.9rem', fontWeight: '700', color: blade.color }}>{blade.name}</h4>
              <div style={{ fontSize: '0.7rem', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Technique</div>
              <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>{blade.technique}</p>
              <div style={{ fontSize: '0.7rem', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Sizes</div>
              <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: '#94a3b8' }}>{blade.sizes}</p>
              <div style={{ padding: '8px 10px', borderRadius: '6px', background: `${blade.color}12`, border: `1px solid ${blade.color}20` }}>
                <span style={{ fontSize: '0.75rem', color: blade.color }}>✦ {blade.advantage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>References</h3>
        {[
          "Morgan GE, Mikhail MS. Clinical Anesthesiology, 6th ed. McGraw-Hill, 2018. Chapter 5.",
          "Miller RD. Miller's Anesthesia, 8th ed. Elsevier, 2015. Chapter 55.",
          "Cormack RS, Lehane J. Difficult tracheal intubation in obstetrics. Anaesthesia, 1984.",
        ].map((r, i) => <p key={i} style={{ margin: '0 0 4px', fontSize: '0.78rem', color: '#475569' }}>[{i+1}] {r}</p>)}
      </div>
    </div>
  )
}
