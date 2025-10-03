const WindLayer = ({ scrollYProgress }) => {
  const windOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 0.08, 0]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: windOpacity, zIndex: -38 }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`wind-${i}`}
          className="absolute w-40 h-0.5 bg-slate-400/15 blur-sm"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: '-10%'
          }}
          animate={{
            x: ['0%', '120vw']
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
        />
      ))}
    </motion.div>
  );
};