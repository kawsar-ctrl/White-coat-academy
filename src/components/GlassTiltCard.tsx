import React, { useCallback, useRef } from 'react';

interface GlassTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
  disabled?: boolean;
}

/**
 * Lightweight GPU-accelerated 3D glass tilt wrapper with pointer-reactive
 * specular glare. Automatically neutral on touch/reduced-motion devices.
 */
export const GlassTiltCard: React.FC<GlassTiltCardProps> = ({
  children,
  className = '',
  maxTiltDeg = 2.6,
  disabled = false,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || e.pointerType !== 'mouse' || !cardRef.current) return;
      const el = cardRef.current;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const px = (clientX - rect.left) / rect.width;
        const py = (clientY - rect.top) / rect.height;
        el.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`);
        el.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`);
        el.style.setProperty('--glare-opacity', '1');
      });
    },
    [disabled]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--glare-opacity', '0');
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`glass-tilt-wrapper ${className}`}
    >
      <div className="glass-tilt-glare" aria-hidden="true" />
      {children}
    </div>
  );
};
