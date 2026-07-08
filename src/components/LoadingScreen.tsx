import { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';

const bootLines = [
  { text: "[BOOT] Initializing portfolio...", delay: 0 },
  { text: "[OK]   Loading assets...", delay: 400 },
  { text: "[OK]   Mounting components...", delay: 800 },
  { text: "[OK]   Establishing connections...", delay: 1200 },
  { text: "[OK]   Compiling shaders...", delay: 1400 },
  { text: "[OK]   Portfolio ready.", delay: 1700 },
];

interface Props {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        if (i === bootLines.length - 1) {
          setTimeout(() => setShowWelcome(true), 200);
          setTimeout(() => onDone(), 2600);
        }
      }, line.delay);
    });
  }, [onDone]);

  return (
    <div className="loading-screen flex-col gap-2 px-8">
      <div className="w-full max-w-md">
        {/* ASCII Art Logo */}
        <pre className="text-green-400 text-xs mb-6 opacity-80 select-none" style={{ color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono', lineHeight: 1.2 }}>
{` ███╗   ███╗ █████╗ 
 ████╗ ████║██╔══██╗
 ██╔████╔██║███████║
 ██║╚██╔╝██║██╔══██║
 ██║ ╚═╝ ██║██║  ██║
 ╚═╝     ╚═╝╚═╝  ╚═╝`}
        </pre>

        {/* Boot lines */}
        <div className="space-y-1 mb-4">
          {bootLines.map((line, i) => (
            <div
              key={i}
              className="font-mono text-sm transition-all duration-300"
              style={{
                opacity: visibleLines.includes(i) ? 1 : 0,
                transform: visibleLines.includes(i) ? 'translateX(0)' : 'translateX(-10px)',
                color: line.text.startsWith('[OK]') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontFamily: 'JetBrains Mono',
                fontSize: '13px',
              }}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Loading bar */}
        <div className="loading-bar w-full">
          <div className="loading-bar-fill" />
        </div>

        {/* Welcome message */}
        <div
          className="mt-4 font-mono"
          style={{
            opacity: showWelcome ? 1 : 0,
            transition: 'opacity 0.5s ease',
            color: 'var(--text-primary)',
            fontFamily: 'JetBrains Mono',
            fontSize: '14px',
          }}
        >
          {'> Welcome, '}
          <span style={{ color: 'var(--accent-primary)' }}>{siteConfig.name}</span>
          <span className="blink" style={{ color: 'var(--accent-primary)' }}>_</span>
        </div>
      </div>
    </div>
  );
}
