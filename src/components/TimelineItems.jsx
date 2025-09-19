import React from "react";

export default function TimelineItem({ event, isLeft }) {
  return (
    <div className={`timeline-item flex items-center w-full ${isLeft ? "justify-start" : "justify-end"}`}>
      <div
        className={`timeline-content relative w-5/12 p-4 bg-white shadow-md rounded-xl border border-gray-200 ${
          isLeft ? "text-right" : "text-left"
        }`}
      >
        <h3 className="text-lg font-bold">{event.title}</h3>
        <p className="text-sm text-gray-500">{event.year}</p>
        <p className="mt-2 text-gray-700">{event.description}</p>
        <p> isLeft: {String(isLeft)}</p>

        {/* Connector dot */}
        <div className="timeline-dot absolute top-5 w-4 h-4 bg-blue-500 rounded-full 
          border-2 border-white 
          left-full -ml-2
          transform -translate-x-1/2
        "></div>
      </div>
    </div>
  );
}
