import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const commands = [
  { id: 'home', label: 'Go to Home', category: 'Navigate', action: 'navigate', path: '/', icon: '🏠' },
  { id: 'about', label: 'Go to About', category: 'Navigate', action: 'navigate', path: '/about', icon: '👤' },
  { id: 'skills', label: 'Go to Skills', category: 'Navigate', action: 'navigate', path: '/skills', icon: '⚡' },
  { id: 'experience', label: 'Go to Experience', category: 'Navigate', action: 'navigate', path: '/experience', icon: '💼' },
  { id: 'projects', label: 'Go to Projects', category: 'Navigate', action: 'navigate', path: '/projects', icon: '🚀' },
  { id: 'blog', label: 'Go to Blog', category: 'Navigate', action: 'navigate', path: '/blog', icon: '📝' },
  { id: 'connect', label: 'Go to Connect', category: 'Navigate', action: 'navigate', path: '/connect', icon: '🔗' },
  { id: 'resume', label: 'View Resume', category: 'Navigate', action: 'navigate', path: '/resume', icon: '📄' },
  { id: 'github', label: 'Open GitHub', category: 'Social', action: 'url', path: siteConfig.github, icon: '⌥' },
  { id: 'email', label: 'Send Email', category: 'Social', action: 'url', path: `mailto:${siteConfig.email}`, icon: '✉️' },
  { id: 'instagram', label: 'Open Instagram', category: 'Social', action: 'url', path: siteConfig.instagram, icon: '📷' },
  { id: 'top', label: 'Scroll to Top', category: 'Action', action: 'scroll-top', icon: '⬆️' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(c =>
    !query ||
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const runCommand = (cmd: typeof commands[0]) => {
    onClose();
    if (cmd.action === 'navigate' && cmd.path) navigate(cmd.path);
    else if (cmd.action === 'url' && cmd.path) window.open(cmd.path, '_blank');
    else if (cmd.action === 'scroll-top') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) runCommand(filtered[selected]);
    if (e.key === 'Escape') onClose();
  };

  if (!open) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '120px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{ width: '100%', maxWidth: '560px', borderRadius: '12px', border: '1px solid var(--accent-primary)', background: 'var(--bg-secondary)', boxShadow: '0 0 40px var(--glow), 0 20px 60px rgba(0,0,0,0.5)', overflow: 'hidden' }}
      >
        {/* Search input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <Search size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--text-primary)' }}
          />
          <kbd style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border)', color: 'var(--text-muted)', background: 'var(--bg-primary)' }}>ESC</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-muted)' }}>No commands found</div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                onClick={() => runCommand(cmd)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  width: '100%', padding: '12px 20px', border: 'none',
                  background: selected === i ? 'rgba(0,255,65,0.08)' : 'transparent',
                  cursor: 'pointer', transition: 'background 0.1s',
                  borderLeft: `2px solid ${selected === i ? 'var(--accent-primary)' : 'transparent'}`,
                }}
                onMouseEnter={() => setSelected(i)}
              >
                <span style={{ fontSize: '18px' }}>{cmd.icon}</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: selected === i ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{cmd.label}</div>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>{cmd.category}</span>
              </button>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div style={{ padding: '10px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '16px', alignItems: 'center' }}>
          {[['↑↓', 'Navigate'], ['↵', 'Select'], ['ESC', 'Close']].map(([key, label]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <kbd style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', padding: '1px 6px', borderRadius: '3px', border: '1px solid var(--border)', color: 'var(--text-muted)', background: 'var(--bg-primary)' }}>{key}</kbd>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--text-muted)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
