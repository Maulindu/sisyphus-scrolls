import './page.css';
import { timelineData } from '../lib/data';
import TimelineItem from '../components/TimelineItems';

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
          </div>
        ))}
      </div>
    </div>
  );
}