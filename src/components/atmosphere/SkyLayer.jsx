// src/components/atmosphere/SkyLayer.jsx
'use client';
import { motion, useTransform } from 'framer-motion';

export default function SkyLayer({ scrollYProgress }) {
  // Smoother, more gradual transitions
  const dawnOpacity = useTransform(scrollYProgress, 
    [0, 0.12, 0.18],
    [1, 0.8, 0]
  );
  
  const morningOpacity = useTransform(scrollYProgress,
    [0.10, 0.20, 0.30],
    [0, 1, 0.5]
  );
  
  const noonOpacity = useTransform(scrollYProgress,
    [0.25, 0.35, 0.45],
    [0, 1, 0.5]
  );

  const afternoonOpacity = useTransform(scrollYProgress,
    [0.40, 0.50, 0.60],
    [0, 1, 0.5]
  );
  
  const duskOpacity = useTransform(scrollYProgress,
    [0.55, 0.65, 0.75],
    [0, 1, 0.5]
  );

  const twilightOpacity = useTransform(scrollYProgress,
    [0.70, 0.78, 0.88],
    [0, 1, 0.6]
  );

  const nightOpacity = useTransform(scrollYProgress,
    [0.82, 0.90, 1],
    [0, 1, 1]
  );

  return (
    <div className="fixed inset-0 -z-50">
      {/* Dawn - Pale, cold beginning */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity: dawnOpacity,
          background: 'linear-gradient(to bottom, #94a3b8 0%, #fecaca 30%, #fde68a 70%, #fef3c7 100%)'
        }}
      />
      
      {/* Morning - Hope and light */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity: morningOpacity,
          background: 'linear-gradient(to bottom, #7dd3fc 0%, #bfdbfe 40%, #fef3c7 100%)'
        }}
      />

      {/* Noon - Harsh, unforgiving light */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity: noonOpacity,
          background: 'linear-gradient(to bottom, #67e8f9 0%, #e0f2fe 50%, #f5f5f4 100%)'
        }}
      />

      {/* Afternoon - Weariness sets in */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity: afternoonOpacity,
          background: 'linear-gradient(to bottom, #fde68a 0%, #fed7aa 50%, #e7e5e4 100%)'
        }}
      />
      
      {/* Dusk - Fading strength */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity: duskOpacity,
          background: 'linear-gradient(to bottom, #64748b 0%, #fb923c 30%, #fda4af 70%, #fecaca 100%)'
        }}
      />

      {/* Twilight - Deepening despair */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity: twilightOpacity,
          background: 'linear-gradient(to bottom, #4338ca 0%, #7c3aed 30%, #c084fc 60%, #64748b 100%)'
        }}
      />
      
      {/* Night - Exhaustion and solitude */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity: nightOpacity,
          background: 'linear-gradient(to bottom, #0f172a 0%, #1e1b4b 50%, #1e293b 100%)'
        }}
      />
    </div>
  );
}