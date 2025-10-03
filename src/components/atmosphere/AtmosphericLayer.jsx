const AtmosphericLayer = ({ scrollYProgress }) => {
  const heatShimmerOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.55], [0, 0.15, 0]);
  const dustOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 0.2, 0]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0.3, 0.15, 0]);

  return (
    <>
      {/* Morning Mist */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: mistOpacity, zIndex: -42 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-200/20 via-transparent to-transparent" />
      </motion.div>

      {/* Heat Shimmer Effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: heatShimmerOpacity, zIndex: -41 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`shimmer-${i}`}
            className="absolute inset-0 bg-gradient-to-t from-amber-100/10 via-transparent to-transparent"
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </motion.div>

      {/* Dust Particles */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: dustOpacity, zIndex: -40 }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-1 h-1 bg-amber-900/20 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>
    </>
  );
};