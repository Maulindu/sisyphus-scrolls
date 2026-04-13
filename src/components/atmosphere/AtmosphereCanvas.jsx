// src/components/atmosphere/AtmosphereCanvas.jsx
// THE FIX: All atmosphere layers must live inside ONE fixed container.
// Previously each layer tried to be `fixed` individually inside a non-fixed parent,
// which broke stacking contexts. Now one fixed container holds all layers as `absolute`.
'use client';

import SkyLayer from './SkyLayer';
import AtmosphericLayer from './AtmosphericLayer';
import CelestialLayer from './CelestialLayer';
import StarsLayer from './StarsLayer';
import CloudsLayer from './CloudsLayer';
import WindLayer from './WindLayer';
import LightningLayer from './LightningLayer';
import RainLayer from './RainLayer';
import FogLayer from './FogLayer';

export default function AtmosphereCanvas({ scrollYProgress }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -10 }}
    >
      <SkyLayer scrollYProgress={scrollYProgress} />
      <CelestialLayer scrollYProgress={scrollYProgress} />
      <StarsLayer scrollYProgress={scrollYProgress} />
      <CloudsLayer scrollYProgress={scrollYProgress} />
      <AtmosphericLayer scrollYProgress={scrollYProgress} />
      <WindLayer scrollYProgress={scrollYProgress} />
      <LightningLayer scrollYProgress={scrollYProgress} />
      <RainLayer scrollYProgress={scrollYProgress} />
      <FogLayer scrollYProgress={scrollYProgress} />
    </div>
  );
}