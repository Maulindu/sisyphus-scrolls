'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function TimelineItem({ event, isLeft, index }) {
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-10, 10], [2, -2]);
  const rotateY = useTransform(mouseX, [-10, 10], [-2, 2]);

  const handleClick = () => {
    if (event.slug) router.push(`/philosophers/${event.slug}`);
  };

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left - r.width / 2) / 30);
    mouseY.set((e.clientY - r.top - r.height / 2) / 30);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`phil-card ${isLeft ? 'card-left' : 'card-right'}`}
      style={{ perspective: 1400, rotateX, rotateY }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.018, transition: { duration: 0.4, ease: 'easeOut' } }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Full-bleed image — barely there */}
      {event.containerImage && (
        <div className="card-bg">
          <Image
            src={event.containerImage}
            alt=""
            fill
            className="card-bg-img"
            priority={index < 4}
            sizes="(max-width: 768px) 90vw, 42vw"
          />
          <div className="card-bg-veil" />
        </div>
      )}

      {/* The only content: year + name */}
      <div className={`card-text ${isLeft ? 'text-right' : 'text-left'}`}>
        <span className="card-year">{event.year}</span>
        <h2 className="card-name">{event.title}</h2>
      </div>

      {/* Single gold accent line — reveals on hover */}
      <div className={`card-accent ${isLeft ? 'accent-right' : 'accent-left'}`} />

      {/* Connector dot to timeline spine */}
      <div className={`card-dot ${isLeft ? 'dot-right' : 'dot-left'}`} />
    </motion.article>
  );
}