import { timelineData } from "../lib/data";
import { 
  motion, 
  useInView, 
  useScroll, 
  useTransform 
} from 'framer-motion';
import { useRef } from 'react';


const Timeline = () => {
  return (
    <div className="relative border-l-2 border-gray-300 ml-6">
      {timelineData.map((item, idx) => (
        <div key={idx} className="mb-10 ml-6">
          <div className="absolute -left-3 w-6 h-6 bg-gray-800 rounded-full border-2 border-white"></div>
          <h3 className="text-lg font-semibold">{item.year} — {item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
