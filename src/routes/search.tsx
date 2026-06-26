import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { drugs } from '@/data/drugs'
import { emergencies } from '@/data/emergencies'
import { pearls } from '@/data/pearls'
import { inhalationalAgents } from '@/data/inhalational'
import { muscleRelaxants } from '@/data/muscleRelaxants'
import { z } from 'zod'

export const Route = createFileRoute('/search')({
  validateSearch: z.object({ q: z.string().optional() }),
  component: SearchPage,
})

interface SearchResult {
  id: string
  title: string
  category: string
  path: string
  snippet: string
  color: string
}

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = []

  drugs.forEach(d => {
    results.push({
      id: `drug-${d.id}`, title: d.name, category: 'Drug',
      path: '/drugs', snippet: `${d.class} — ${d.mechanism.substring(0, 100)}`, color: '#3b82f6',
    })
  })

  emergencies.forEach(e => {
    results.push({
      id: `em-${e.id}`, title: e.title, category: 'Emergency',
      path: '/emergencies', snippet: e.recognition[0] || '', color: '#ef4444',
    })
  })

  pearls.forEach(p => {
    results.push({
      id: `pearl-${p.id}`, title: p.title, category: 'Pearl',
      path: '/pearls', snippet: p.content.substring(0, 120), color: '#f59e0b',
    })
  })

  inhalationalAgents.forEach(a => {
    results.push({
      id: `inh-${a.id}`, title: a.name, category: 'Inhalational Agent',
      path: '/inhalational', snippet: `MAC: ${a.mac} | Blood:Gas: ${a.bloodGasCoeff} | ${a.airwayIrritation}`, color: '#8b5cf6',
    })
  })

  muscleRelaxants.forEach(m => {
    results.push({
      id: `nmb-${m.id}`, title: m.name, category: 'Muscle Relaxant',
      path: '/muscle-relaxants', snippet: `${m.type} — Onset: ${m.onset} | Duration: ${m.duration}`, color: '#f97316',
    })
  })

  const sections = [
    { id: 'airway', title: 'Airway Management', category: 'Section', path: '/airway', snippet: 'Mallampati, difficult airway predictors, BMV, SGAs, intubation algorithm', color: '#06b6d4' },
    { id: 'intubation', title: 'Intubation Guide', category: 'Section', path: '/intubation', snippet: 'Step-by-step intubation, RSI sequence, confirming tube placement', color: '#10b981' },
    { id: 'anatomy', title: 'Airway Anatomy', category: 'Section', path: '/airway-anatomy', snippet: 'Upper airway, larynx, vocal cords, trachea, landmarks for intubation', color: '#14b8a6' },
    { id: 'fluids', title: 'Fluid Management', category: 'Section', path: '/fluids', snippet: 'Crystalloids, colloids, blood products, fluid calculators', color: '#06b6d4' },
    { id: 'hemo', title: 'Hemodynamics', category: 'Section', path: '/hemodynamics', snippet: 'Hypotension, hypertension, vasopressors, MAP targets', color: '#ef4444' },
    { id: 'machine', title: 'Anesthesia Machine', category: 'Section', path: '/machine', snippet: 'FiO₂, EtCO₂, MAC, PEEP, ventilation parameters', color: '#8b5cf6' },
    { id: 'cases', title: 'Clinical Cases', category: 'Section', path: '/cases', snippet: 'Interactive anesthesia cases, pre-op assessment, ASA classification', color: '#3b82f6' },
    { id: 'notes', title: 'Quick Notes', category: 'Section', path: '/notes', snippet: 'Personal anesthesia study notes, save and edit locally', color: '#94a3b8' },
  ]

  sections.forEach(s => results.push(s))
  return results
}

const searchIndex = buildSearchIndex()

function SearchPage() {
  const searchParams = useSearch({ from: '/search' })
  const [query, setQuery] = useState(searchParams.q || '')
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()
    const matched = searchIndex.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
    setResults(matched.slice(0, 40))
  }, [query])

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>🔍</span>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
            Search
          </h1>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Search across all sections — drugs, emergencies, airway, machine, fluids, pearls.
        </p>
      </div>

      {/* Search input */}
      <div style={{ position: 'relative', marginBottom: '28px' }}>
        <svg width="18" height="18" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24"
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search drugs, emergencies, airway, machine settings, fluids..."
          autoFocus
          style={{
            width: '100%', padding: '14px 16px 14px 48px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#f1f5f9', fontSize: '1rem',
            outline: 'none', transition: 'all 0.2s',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'
            e.currentTarget.style.background = 'rgba(59,130,246,0.05)'
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%',
              width: '24px', height: '24px', color: '#94a3b8', cursor: 'pointer', fontSize: '14px',
            }}
          >×</button>
        )}
      </div>

      {/* Empty state */}
      {!query && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.4 }}>🔍</div>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>
            Start typing to search across all anesthesia topics
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
            {['propofol', 'laryngospasm', 'malignant hyperthermia', 'EtCO₂', 'rocuronium', 'sevoflurane'].map(term => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                style={{
                  padding: '6px 14px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#64748b', fontSize: '0.8rem', cursor: 'pointer',
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {query && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>
          No results found for "{query}"
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '16px' }}>
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {results.map(result => (
              <Link
                key={result.id}
                to={result.path}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  padding: '16px 18px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  cursor: 'pointer',
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = `${result.color}40`
                  ;(e.currentTarget as HTMLElement).style.background = `${result.color}07`
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                }}
                >
                  <div style={{ flexShrink: 0 }}>
                    <span style={{
                      padding: '3px 9px', borderRadius: '6px',
                      background: `${result.color}15`, color: result.color,
                      fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                      {result.category}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '4px' }}>
                      {result.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>
                      {result.snippet}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
