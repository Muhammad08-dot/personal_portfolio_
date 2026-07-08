import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../utils/animations';
import { navLinks } from '../config/siteConfig';

export default function NotFound() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', paddingTop: '80px' }}>
      {/* Matrix rain background effect */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-100%',
              left: `${Math.random() * 100}%`,
              fontFamily: 'JetBrains Mono',
              fontSize: '14px',
              color: 'var(--accent-primary)',
              opacity: 0.1 + Math.random() * 0.15,
              animation: `fall ${3 + Math.random() * 7}s linear ${Math.random() * 5}s infinite`,
              userSelect: 'none',
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fall {
          from { transform: translateY(0); }
          to { transform: translateY(200vh); }
        }
      `}</style>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        style={{ textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: '600px' }}
      >
        {/* Glitchy 404 */}
        <motion.div
          variants={fadeUp}
          className="glitch"
          data-text="404"
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 'clamp(80px, 20vw, 160px)',
            fontWeight: 900,
            color: 'var(--accent-primary)',
            lineHeight: 1,
            marginBottom: '24px',
            textShadow: '0 0 30px var(--glow), 0 0 60px var(--glow)',
          }}
        >
          404
        </motion.div>

        <motion.div variants={fadeUp} className="terminal-window" style={{ marginBottom: '32px', textAlign: 'left' }}>
          <div className="terminal-titlebar">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
            <span style={{ marginLeft: '16px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>~ error.log</span>
          </div>
          <div className="terminal-body">
            <p style={{ color: 'var(--accent-error)' }}>ERROR 404: Page not found.</p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              The route you're looking for doesn't exist or has been moved.
            </p>
            <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '13px' }}>
              Possible causes:
            </p>
            <ul style={{ listStyle: 'none', marginTop: '6px' }}>
              {[
                'URL was mistyped',
                'Page was deleted or renamed',
                'You followed a broken link',
                'A cat walked on the keyboard',
              ].map((cause, i) => (
                <li key={i} style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-secondary)', padding: '3px 0' }}>
                  <span style={{ color: 'var(--accent-primary)', marginRight: '8px' }}>▸</span> {cause}
                </li>
              ))}
            </ul>
            <p style={{ color: 'var(--accent-primary)', marginTop: '16px' }}>$ <span className="blink" style={{ color: 'var(--text-primary)' }}>_</span></p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 28px', borderRadius: '8px',
              background: 'var(--accent-primary)', color: '#000',
              fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '14px',
              textDecoration: 'none', boxShadow: '0 0 20px var(--glow)',
              marginRight: '12px',
            }}
          >
            ← Go Home
          </Link>
          <Link
            to="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 28px', borderRadius: '8px',
              border: '1px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            View Projects
          </Link>
        </motion.div>

        {/* Sitemap links */}
        <motion.div variants={fadeUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
