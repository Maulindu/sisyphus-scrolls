// src/components/TimelineItems.jsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function TimelineItem({ event, isLeft }) {
  return (
    <Link 
        href={`/philosophers/${event.slug}`} 
        className="flex items-center w-full no-underline text-gray-900 dark:text-gray-100"
      >
        <div className={`timeline-item flex items-center w-full ${isLeft ? "justify-start" : "justify-end"}`}>
          <div className={`timeline-content relative w-5/12 p-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 ${
            isLeft ? "text-right" : "text-left"
          }`}>

            {/* Background Image */}
            {event.containerImage && event.containerImage !== "" && (
              <div className="absolute inset-0">
                <Image 
                  src={event.containerImage} 
                  alt="" 
                  fill
                  className="object-cover opacity-20 dark:opacity-10"
                  priority={false}
                />
              </div>
            )}

            {/* Content */}
            <div className="itemContainer relative z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 text-gray-900 dark:text-gray-100">
              <h3 className="authName text-lg font-bold">{event.title}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{event.description}</p>
              <span className="inline-block mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
                Learn More
              </span>
            </div>

            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-700 left-1/2 transform -translate-x-1/2"></div>

            {/* Connector dot */}
            <div className={`absolute top-5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-slate-800
              ${isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"}`}>
            </div>
          </div>
        </div>
      </Link>

    
  );
}