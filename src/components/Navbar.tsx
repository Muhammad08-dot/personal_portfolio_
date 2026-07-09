import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Terminal, ArrowLeft } from 'lucide-react';
import { navLinks, siteConfig } from '../config/siteConfig';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleBack = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 1) {
      // Sub-page (e.g., viewing an article or a project)
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        // Fallback to category root, unless it's "article" which has no root page
        if (pathSegments[0] === 'article') {
          navigate('/');
        } else {
          navigate(`/${pathSegments[0]}`); 
        }
      }
    } else {
      // Top-level page
      navigate('/');
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[10000] transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            {location.pathname !== '/' && (
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors bg-[var(--bg-primary)]"
                title="Go Back"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              style={{ textDecoration: 'none' }}
            >
              <Terminal size={18} style={{ color: 'var(--accent-primary)' }} />
              <span
                className="font-mono font-bold text-base hidden sm:inline"
                style={{ color: 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}
              >
                <span style={{ color: 'var(--accent-primary)' }}>{siteConfig.name.split(' ')[0].toLowerCase()}</span>
                <span style={{ color: 'var(--text-secondary)' }}>@dev</span>
                <span className="blink" style={{ color: 'var(--accent-primary)' }}>_</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/resume"
              className="font-mono text-sm px-4 py-1.5 border rounded transition-all duration-200"
              style={{
                fontFamily: 'JetBrains Mono',
                color: 'var(--accent-primary)',
                borderColor: 'var(--accent-primary)',
                textDecoration: 'none',
                boxShadow: '0 0 10px rgba(0,255,65,0.1)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,65,0.1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(0,255,65,0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px rgba(0,255,65,0.1)';
              }}
            >
              Resume
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: 'var(--accent-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-[9999] md:hidden flex flex-col items-center justify-center transition-all duration-300"
        style={{
          background: 'rgba(10,10,10,0.98)',
          backdropFilter: 'blur(20px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-20px)',
        }}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-2xl font-bold"
              style={{
                fontFamily: 'JetBrains Mono',
                color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                transitionDelay: `${i * 50}ms`,
                transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              <span style={{ color: 'var(--accent-primary)', marginRight: '8px' }}>{String(i + 1).padStart(2, '0')}.</span>
              {link.label}
            </Link>
          ))}
          <Link
            to="/resume"
            onClick={() => setMenuOpen(false)}
            className="font-mono text-xl px-8 py-3 border-2 rounded-lg mt-4"
            style={{
              fontFamily: 'JetBrains Mono',
              color: 'var(--accent-primary)',
              borderColor: 'var(--accent-primary)',
              textDecoration: 'none',
            }}
          >
            Resume
          </Link>
        </div>
      </div>
    </>
  );
}
