'use client';
import { motion, useTransform } from 'framer-motion';

export default function CloudsLayer ({ scrollYProgress }) {
  const morningCloudsOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 0.3, 0]);
  const afternoonCloudsOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.7], [0, 0.25, 0]);
  const stormCloudsOpacity = useTransform(scrollYProgress, [0.88, 0.95, 1], [0, 0.6, 0.8]);

  const cloudDrift = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <>
      {/* Morning Clouds */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: morningCloudsOpacity, x: cloudDrift, zIndex: -35 }}
      >
        <div className="absolute top-[18%] left-[10%] w-48 h-20 bg-slate-300/30 rounded-full blur-xl" />
        <div className="absolute top-[35%] right-[15%] w-56 h-24 bg-slate-300/25 rounded-full blur-xl" />
      </motion.div>

      {/* Afternoon Clouds */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: afternoonCloudsOpacity, x: cloudDrift, zIndex: -35 }}
      >
        <div className="absolute top-[25%] left-[20%] w-52 h-22 bg-slate-400/30 rounded-full blur-xl" />
        <div className="absolute top-[40%] right-[25%] w-60 h-26 bg-slate-400/25 rounded-full blur-xl" />
      </motion.div>

      {/* Storm Clouds */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: stormCloudsOpacity, zIndex: -33 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`storm-cloud-${i}`}
            className="absolute w-80 h-32 bg-slate-700/50 rounded-full blur-2xl"
            style={{
              top: `${10 + i * 12}%`,
              left: `${i * 20}%`
            }}
            animate={{
              x: [0, -30, 0],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
          />
        ))}
      </motion.div>
    </>
  );
};