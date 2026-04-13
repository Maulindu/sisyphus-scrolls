'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function TimelineItem({ event, isLeft, index }) {
  const router = useRouter();

  const handleClick = () => {
    if (event.slug) router.push(`/philosophers/${event.slug}`);
  };

  return (
    <motion.article
      onClick={handleClick}
      className="phil-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
    >
      {/* Full-bleed image */}
      {event.containerImage && (
        <div className="card-img-wrap">
          <motion.div
            className="card-img-inner"
            variants={{ hover: { scale: 1.06 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={event.containerImage}
              alt={event.title}
              fill
              className="card-img"
              priority={index < 4}
              sizes="(max-width: 768px) 90vw, 44vw"
            />
          </motion.div>
          {/* Dark gradient — stronger at bottom where text lives */}
          <div className="card-grad" />
        </div>
      )}

      {/* Text sits at bottom of card */}
      <div className={`card-body ${isLeft ? 'body-left' : 'body-right'}`}>
        <motion.span
          className="card-year"
          variants={{ hover: { color: 'rgba(251,191,36,0.95)', y: -2 } }}
          transition={{ duration: 0.3 }}
        >
          {event.year}
        </motion.span>
        <motion.h2
          className="card-name"
          variants={{ hover: { color: '#ffffff', y: -2 } }}
          transition={{ duration: 0.3, delay: 0.04 }}
        >
          {event.title}
        </motion.h2>
      </div>

      {/* Gold accent line on the spine side */}
      <motion.div
        className={`card-line ${isLeft ? 'line-right' : 'line-left'}`}
        variants={{ hover: { opacity: 1, scaleY: 1 } }}
        initial={{ opacity: 0, scaleY: 0.3 }}
        transition={{ duration: 0.4 }}
      />

      {/* Connector dot */}
      <div className={`card-dot ${isLeft ? 'dot-right' : 'dot-left'}`} />
    </motion.article>
  );
}