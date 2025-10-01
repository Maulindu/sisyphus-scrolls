'use client';
import './page.css';
import { timelineData } from '../lib/data';
import TimelineItem from '../components/TimelineItems';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Boulder rotation animation - rotates as you scroll
  const boulderRotation = useTransform(scrollYProgress, [0, 1], [0, 2160]);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage: "url('/Socrates1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed" 
        }}>

      <div ref={containerRef} className="relative w-full" style={{ minHeight: '200vh' }}>
        
        {/* Timeline Content */}
        <div className="relative pt-24 pb-12">
          {timelineData.map((event, index) => (
            <div 
              key={`${event.year}-${event.title}`} 
              className={`timeline-wrapper ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}
            >
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
      </div>
    </div>
  );
}