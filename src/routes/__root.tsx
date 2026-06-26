import { HeadContent, Link, Outlet, Scripts, createRootRoute, useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import '../styles.css'

const navItems = [
  { path: '/', label: 'Home', icon: '⊕' },
  { path: '/drugs', label: 'Drugs', icon: '💉' },
  { path: '/fluids', label: 'Fluids', icon: '🧪' },
  { path: '/airway', label: 'Airway', icon: '🫁' },
  { path: '/intubation', label: 'Intubation', icon: '🔬' },
  { path: '/airway-anatomy', label: 'Anatomy', icon: '🔭' },
  { path: '/inhalational', label: 'Inhalational', icon: '💨' },
  { path: '/muscle-relaxants', label: 'NMBs', icon: '⚡' },
  { path: '/hemodynamics', label: 'Hemodynamics', icon: '❤️' },
  { path: '/machine', label: 'Machine', icon: '🖥️' },
  { path: '/emergencies', label: 'Emergencies', icon: '🚨' },
  { path: '/pearls', label: 'Pearls', icon: '✦' },
  { path: '/cases', label: 'Cases', icon: '📋' },
  { path: '/notes', label: 'Notes', icon: '📝' },
  { path: '/favorites', label: 'Favorites', icon: '★' },
  { path: '/search', label: 'Search', icon: '🔍' },
]

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Anesthesia Companion' },
      { name: 'description', content: 'Your Buddy Through Every Anesthesia Rotation. Professional anesthesia education for medical students.' },
      { name: 'theme-color', content: '#0a0a0f' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#0a0a0f', color: '#f1f5f9' }}>
        {/* Top Navigation */}
        <header style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          background: 'rgba(10, 10, 15, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '1400px', margin: '0 auto', gap: '24px' }}>
            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
              <div style={{
                width: '30px', height: '30px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: '700', color: 'white',
              }}>
                A
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#f1f5f9', letterSpacing: '-0.02em' }}>
                Anesthesia Companion
              </span>
            </Link>

            {/* Desktop Nav - scrollable */}
            <nav style={{
              display: 'flex', alignItems: 'center', gap: '2px',
              overflowX: 'auto', flex: 1,
              scrollbarWidth: 'none', msOverflowStyle: 'none',
            }} className="hide-scrollbar">
              {navItems.slice(1, 12).map(item => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: '500',
                      color: isActive ? '#60a5fa' : '#94a3b8',
                      background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                      border: isActive ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = '#f1f5f9'
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = '#94a3b8'
                        ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <Link to="/search" style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '0.8rem',
              }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <span style={{ display: 'none' }} className="md-show">Search</span>
              </Link>
              <Link to="/favorites" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px',
                borderRadius: '8px',
                background: location.pathname === '/favorites' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: location.pathname === '/favorites' ? '#fbbf24' : '#64748b',
                textDecoration: 'none',
                fontSize: '14px',
              }}>
                ★
              </Link>
              <Link to="/notes" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '14px',
              }}>
                📝
              </Link>
              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '34px', height: '34px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94a3b8',
                  cursor: 'pointer',
                }}
                aria-label="Menu"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 60,
            }}
          />
        )}

        {/* Mobile side menu */}
        <div style={{
          position: 'fixed', top: 0, right: 0,
          width: '280px', height: '100vh',
          background: '#0f0f1a',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '0 0 0 16px',
          zIndex: 70,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
          padding: '20px 16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontWeight: '700', color: '#f1f5f9' }}>Navigation</span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}
            >
              ✕
            </button>
          </div>
          {navItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  marginBottom: '4px',
                  color: isActive ? '#60a5fa' : '#94a3b8',
                  background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Main content */}
        <main style={{ paddingTop: '56px', minHeight: '100vh' }}>
          <Outlet />
        </main>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '40px 20px',
          marginTop: '80px',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{
                  width: '28px', height: '28px',
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  borderRadius: '7px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: '700', color: 'white',
                }}>A</div>
                <span style={{ fontWeight: '700', color: '#f1f5f9' }}>Anesthesia Companion</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0 }}>
                Your Buddy Through Every Anesthesia Rotation.
              </p>
              <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>
                Created by <span style={{ color: '#60a5fa' }}>Sara Alsolami</span>
              </p>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#334155', maxWidth: '400px', textAlign: 'right' }}>
              <p style={{ margin: '0 0 4px' }}>
                Educational content based on: Morgan & Mikhail, Miller's Anesthesia, OpenAnesthesia, NYSORA, ASA/DAS/AAGBI Guidelines.
              </p>
              <p style={{ margin: 0, color: '#ef4444', opacity: 0.7 }}>
                ⚠ For educational purposes only. Always follow institutional protocols and consult supervisors.
              </p>
            </div>
          </div>
        </footer>

        <Scripts />
      </body>
    </html>
  )
}
