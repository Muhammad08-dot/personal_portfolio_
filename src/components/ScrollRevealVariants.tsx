import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * SlideReveal — slides content in from left or right as it enters the viewport,
 * and fades/slides back out as it leaves. Great for alternating content rows.
 */
export function SlideReveal({
  children,
  direction = 'left',
  style,
  className,
}: {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const xOffset = isMobile ? 30 : 60;
  const sign = direction === 'left' ? -1 : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawX = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [sign * xOffset, 0, 0, sign * -xOffset * 0.5]
  );
  const x = useSpring(rawX, { stiffness: 70, damping: 20, restDelta: 0.001 });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity, willChange: 'transform, opacity', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeReveal — a minimal fade + tiny scale, for pages that shouldn't move much.
 * Ideal for cards, blog posts, stats where horizontal/vertical slide feels excessive.
 */
export function FadeReveal({
  children,
  style,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.94, 1, 1, 0.97]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, willChange: 'transform, opacity', ...style }}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ZoomReveal — scales up from slightly smaller as the section enters.
 * Creates a dramatic "focus" effect for hero-style sections on inner pages.
 */
export function ZoomReveal({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.88, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const rawY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -20]);
  const y = useSpring(rawY, { stiffness: 65, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y, willChange: 'transform, opacity', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
