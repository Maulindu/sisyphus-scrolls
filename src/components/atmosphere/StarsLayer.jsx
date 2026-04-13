'use client';
import { motion, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function StarsLayer({ scrollYProgress }) {
  const starsOpacity = useTransform(scrollYProgress, [0.7, 0.82, 0.93], [0, 0.4, 0.3]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 70}%`,
      size: Math.random() * 1.5 + 0.5,
      brightness: Math.random(),
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 3
    })));
  }, []);

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: starsOpacity }}>
      {stars.map(star => (
        <motion.div key={star.id} className="absolute bg-slate-100 rounded-full"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size, opacity: star.brightness * 0.6 }}
          animate={{ opacity: [star.brightness * 0.4, star.brightness * 0.8, star.brightness * 0.4] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
        />
      ))}
    </motion.div>
  );
}