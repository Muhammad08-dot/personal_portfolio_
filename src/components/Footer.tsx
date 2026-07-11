import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-12 mt-20"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <Link
              to="/"
              className="font-mono font-bold text-lg"
              style={{ color: 'var(--text-primary)', textDecoration: 'none', fontFamily: 'JetBrains Mono' }}
            >
              <span style={{ color: 'var(--accent-primary)' }}>{siteConfig.name.split(' ')[0].toLowerCase()}</span>
              <span style={{ color: 'var(--text-secondary)' }}>@dev</span>
              <span className="blink" style={{ color: 'var(--accent-primary)' }}>_</span>
            </Link>

          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
            {['About', 'Projects', 'Blog', 'Connect'].map(link => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="font-mono text-sm"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'JetBrains Mono', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {[
              { icon: '⌥', label: 'GitHub', url: siteConfig.github },
              { icon: '▣', label: 'LinkedIn', url: siteConfig.linkedin },
              { icon: '◈', label: 'Twitter', url: siteConfig.twitter },
              { icon: <Mail size={16} />, label: 'Email', url: `mailto:${siteConfig.email}` },
            ].map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200 text-sm font-mono flex items-center justify-center w-9 h-9"
                style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'var(--accent-primary)';
                  el.style.borderColor = 'var(--accent-primary)';
                  el.style.boxShadow = '0 0 10px var(--glow)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'var(--text-secondary)';
                  el.style.borderColor = 'var(--border)';
                  el.style.boxShadow = 'none';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-8 pt-6 text-center font-mono text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
        >
          <span>Built with ❤️ using React + HTML5 Canvas | © {year} Muhammad Abdullah. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
