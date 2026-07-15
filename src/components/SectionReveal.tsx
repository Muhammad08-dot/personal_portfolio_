import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  yOffset?: number;
}

const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * Scroll-driven reveal wrapper.
 * Content slides up from below as it enters the viewport,
 * and slides up + fades out as it leaves above.
 * Uses reduced motion on mobile for better performance.
 */
export default function SectionReveal({ children, style, className, yOffset }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Smaller offset on mobile to avoid layout jank
  const offset = yOffset ?? (isMobile ? 30 : 55);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [offset, 0, 0, -(offset * 0.6)]
  );
  const y = useSpring(rawY, { stiffness: 75, damping: 22, restDelta: 0.001 });
  const opacity = useTransform(scrollYProgress, [0, 0.13, 0.87, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.96, 1, 1, 0.98]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale, willChange: 'transform, opacity', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
