// src/components/atmosphere/SkyLayer.jsx
// NOTE: uses `position: absolute` — parent is the fixed portal div in page.jsx
'use client';
import { motion, useTransform } from 'framer-motion';

export default function SkyLayer({ scrollYProgress }) {
  const dawnOpacity      = useTransform(scrollYProgress, [0,    0.12, 0.20], [1,    0.8,  0]);
  const morningOpacity   = useTransform(scrollYProgress, [0.10, 0.20, 0.32], [0,    1,    0.4]);
  const noonOpacity      = useTransform(scrollYProgress, [0.25, 0.35, 0.47], [0,    1,    0.4]);
  const afternoonOpacity = useTransform(scrollYProgress, [0.40, 0.50, 0.62], [0,    1,    0.4]);
  const duskOpacity      = useTransform(scrollYProgress, [0.55, 0.65, 0.77], [0,    1,    0.4]);
  const twilightOpacity  = useTransform(scrollYProgress, [0.70, 0.78, 0.90], [0,    1,    0.5]);
  const nightOpacity     = useTransform(scrollYProgress, [0.82, 0.90, 1.00], [0,    1,    1]);

  const layers = [
    { opacity: dawnOpacity,      bg: 'linear-gradient(to bottom, #94a3b8 0%, #fecaca 30%, #fde68a 70%, #fef3c7 100%)' },
    { opacity: morningOpacity,   bg: 'linear-gradient(to bottom, #7dd3fc 0%, #bfdbfe 40%, #fef3c7 100%)' },
    { opacity: noonOpacity,      bg: 'linear-gradient(to bottom, #67e8f9 0%, #e0f2fe 50%, #f5f5f4 100%)' },
    { opacity: afternoonOpacity, bg: 'linear-gradient(to bottom, #fde68a 0%, #fed7aa 50%, #e7e5e4 100%)' },
    { opacity: duskOpacity,      bg: 'linear-gradient(to bottom, #64748b 0%, #fb923c 30%, #fda4af 70%, #fecaca 100%)' },
    { opacity: twilightOpacity,  bg: 'linear-gradient(to bottom, #4338ca 0%, #7c3aed 30%, #c084fc 60%, #64748b 100%)' },
    { opacity: nightOpacity,     bg: 'linear-gradient(to bottom, #0f172a 0%, #1e1b4b 50%, #1e293b 100%)' },
  ];

  return (
    <>
      {layers.map((l, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: l.opacity,
            background: l.bg,
          }}
        />
      ))}
    </>
  );
}