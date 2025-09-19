import './page.css';
import Timeline from '../components/Timeline';
import { timelineData } from '../lib/data';
import TimelineItem from '../components/TimelineItems';

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      {timelineData.map((event, index) => (
        <TimelineItem 
          key={`${event.year}-${event.title}`}
          event={event}
          isLeft={index % 2 === 0}
        />
      ))}
    </div>
  );
}

export default Home;