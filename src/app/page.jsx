import './page.css';
import { timelineData } from '../lib/data';
import TimelineItem from '../components/TimelineItems';
import { 
  motion, 
  useInView, 
  useScroll, 
  useTransform 
} from 'framer-motion';
import { useRef } from 'react';


export default function Home() {
  return (
    <div className="timeline-container relative max-w-4xl mx-auto px-4">
      {/* Center line */}
      <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
      
      <div className="relative">
        {timelineData.map((event, index) => (
          <div key={`${event.year}-${event.title}`} 
               className={`timeline-wrapper ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}>
            <TimelineItem 
              event={event}
              isLeft={index % 2 === 0}
            />
            <div className={`timeline-year absolute top-1/2 transform -translate-y-1/2
              ${index % 2 === 0 ? 'right-[calc(50%+1rem)]' : 'left-[calc(50%+1rem)]'}`}>
              <p className="text-gray-500 dark:text-gray-400">{event.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}