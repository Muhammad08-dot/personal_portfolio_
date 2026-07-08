import { useState, useEffect } from 'react';

interface Props {
  lines: string[];
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
}

export default function TypingEffect({ lines, speed = 50, className = '', style = {}, loop = false }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(c => !c), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      if (loop) {
        setTimeout(() => {
          setLineIndex(0);
          setCharIndex(0);
          setDisplayedText('');
        }, 1500);
      }
      return;
    }

    const currentLine = lines[lineIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentLine.length) {
          setDisplayedText(prev => prev + currentLine[charIndex]);
          setCharIndex(c => c + 1);
        } else {
          if (lineIndex < lines.length - 1) {
            setTimeout(() => {
              setDisplayedText(prev => prev + '\n');
              setLineIndex(l => l + 1);
              setCharIndex(0);
            }, 400);
          }
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, lines, speed, isDeleting, loop]);

  return (
    <span className={className} style={{ whiteSpace: 'pre-line', ...style }}>
      {displayedText}
      <span style={{ opacity: showCursor ? 1 : 0, color: 'var(--accent-primary)' }}>█</span>
    </span>
  );
}
