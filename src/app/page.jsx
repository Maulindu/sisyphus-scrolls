import Timeline from '../components/Timeline';
import { timelineData } from '../lib/data';
import TimelineItem from '../components/TimelineItems';

const timeline = timelineData;
function Home() {
  return (
    <>
      
      <TimelineItem event = {timeline.map((item) => item)[1]} isLeft={true} />
    </>
  );
}

export default Home;