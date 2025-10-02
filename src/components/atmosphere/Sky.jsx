const SkyLayer = ({ scrollYProgress }) => {
  // Much more gradual transitions with overlapping ranges
  const dawnOpacity = useTransform(scrollYProgress, 
    [0, 0.08, 0.15, 0.22],
    [1, 1, 0.3, 0]
  );
  
  const morningOpacity = useTransform(scrollYProgress,
    [0.1, 0.18, 0.28, 0.35],
    [0, 0.7, 1, 0.3]
  );
  
  const noonOpacity = useTransform(scrollYProgress,
    [0.25, 0.33, 0.43, 0.50],
    [0, 0.7, 1, 0.3]
  );

  const afternoonOpacity = useTransform(scrollYProgress,
    [0.40, 0.48, 0.58, 0.65],
    [0, 0.7, 1, 0.3]
  );
  
  const duskOpacity = useTransform(scrollYProgress,
    [0.55, 0.63, 0.73, 0.80],
    [0, 0.7, 1, 0.3]
  );
  
  const twilightOpacity = useTransform(scrollYProgress,
    [0.70, 0.78, 0.85, 0.90],
    [0, 0.7, 1, 0.5]
  );

  const nightOpacity = useTransform(scrollYProgress,
    [0.82, 0.88, 0.93, 0.97],
    [0, 0.7, 1, 0.7]
  );
  
  const stormOpacity = useTransform(scrollYProgress,
    [0.90, 0.95, 1],
    [0, 0.8, 1]
  );

  return (
    <div className="fixed inset-0 -z-50">
      {/* Dawn - Pale, cold beginning */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-slate-400 via-rose-200 to-amber-100"
        style={{ opacity: dawnOpacity }}
      />
      
      {/* Morning - Hope and light */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-200 to-amber-50"
        style={{ opacity: morningOpacity }}
      />

      {/* Noon - Harsh, unforgiving light */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-cyan-200 via-sky-100 to-stone-100"
        style={{ opacity: noonOpacity }}
      />

      {/* Afternoon - Weariness sets in */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-amber-200 via-orange-100 to-stone-200"
        style={{ opacity: afternoonOpacity }}
      />
      
      {/* Dusk - Fading strength */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-slate-500 via-orange-300 to-rose-200"
        style={{ opacity: duskOpacity }}
      />

      {/* Twilight - Deepening despair */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-800 via-purple-600 to-slate-500"
        style={{ opacity: twilightOpacity }}
      />
      
      {/* Night - Exhaustion and solitude */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-800"
        style={{ opacity: nightOpacity }}
      />
      
      {/* Storm - The culmination of struggle */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-slate-800 to-stone-700"
        style={{ opacity: stormOpacity }}
      />
    </div>
  );
};