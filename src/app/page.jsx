'use client';
import './page.css';
import { timelineData } from '../lib/data';
import TimelineItem from '../components/TimelineItems';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef }  from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    
  });

  // boulder animations
  const boulderRotation = useTransform(scrollYProgress, [0, 1], [0, 2160]);
  const figureY = useTransform(scrollYProgress, [0, 1], ['10%', '-30%']);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden">

          <div 
            ref={containerRef} 
            className="relative min-h-screen w-full overflow-hidden"
            style={{
              backgroundImage: "url('/Socrates1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed" 
            }}
          >
      {/* Timeline */}
            <div className="relative">
          {timelineData.map((event, index) => (
            <div key={`${event.year}-${event.title}`} 
                 className={`timeline-wrapper ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}>
              <TimelineItem 
                event={event}
                isLeft={index % 2 === 0}
                index={index}
              />
              <div className={`timeline-year absolute top-1/2 transform -translate-y-1/2
                ${index % 2 === 0 ? 'right-[calc(50%+1rem)]' : 'left-[calc(50%+1rem)]'}`}>
                <p className="text-amber-500">{event.year}</p>
              </div>
            </div>
          ))}
        </div>

            
          {/* Boulder animation */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute w-1/3 h-1/3 boulder"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >   
        <svg viewBox="0 0 1200 900" className="w-full h-full opacity-30">
          <defs>
            <radialGradient id="boulderArt" cx="25%" cy="25%">
              <stop offset="0%" stopColor="#A3A3A3" />
              <stop offset="100%" stopColor="#4B4B4B" />
            </radialGradient>

          </defs>
        
          {/* ROTATING BOULDER */}
          <motion.g 
          
            style={{ rotate: boulderRotation }}
            transformOrigin="550px 350px">

            <circle cx="550" cy="350" r="60" fill="url(#boulderArt)" stroke="#404040" strokeWidth="3" opacity="0.9"/>
          </motion.g>
        </svg>
      </motion.div>
      </div>

      
    </div>
  );
}
 