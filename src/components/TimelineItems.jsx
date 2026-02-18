'use client';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function TimelineItem({ event, isLeft, index }) {
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleClick = () => {
    if (event.slug) {
      router.push(`/philosophers/${event.slug}`);
    } else {
      console.error('No slug found for event:', event);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 20);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, [-10, 10], [5, -5]);
  const rotateY = useTransform(mouseX, [-10, 10], [-5, 5]);

  return (
    <motion.div 
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`timeline-item flex items-center w-full cursor-pointer ${
        isLeft ? "justify-start" : "justify-end"
      }`}
      style={{
        perspective: 1000,
        rotateX,
        rotateY
      }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className={`timeline-content relative w-5/12 overflow-hidden rounded-2xl border-2 ${
          isLeft ? "text-right" : "text-left"
        }`}
        style={{
          borderColor: 'rgba(251, 191, 36, 0.3)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        }}
        whileHover={{
          borderColor: 'rgba(251, 191, 36, 0.6)',
          boxShadow: '0 20px 60px rgba(251, 191, 36, 0.2), 0 0 40px rgba(251, 191, 36, 0.1)',
          transition: { duration: 0.3 }
        }}
      >
        {/* Enhanced Background Image with zoom effect */}
        {event.containerImage && (
          <motion.div 
            className="absolute inset-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image 
              src={event.containerImage} 
              alt="" 
              fill
              className="object-cover"
              style={{ 
                filter: 'brightness(0.4) contrast(1.1)'
              }}
              priority={index < 3}
            />
            
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)'
              }}
            />
          </motion.div>
        )}

        {/* Enhanced Content */}
        <motion.div 
          className="itemContainer relative z-10 backdrop-blur-md rounded-xl p-6"
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(251, 191, 36, 0.2)'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Title with gradient */}
          <motion.h3 
            className="authName text-2xl font-bold mb-3"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            {event.title}
          </motion.h3>
          
          {/* Description */}
          <motion.p 
            className="mt-2 text-gray-200 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {event.description}
          </motion.p>
          
          {/* Enhanced CTA Button */}
          <motion.span 
            className="inline-block mt-4 px-6 py-3 rounded-lg text-sm font-semibold relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 6px 25px rgba(59, 130, 246, 0.6)',
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-white">Learn More</span>
            
            {/* Button shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.span>
        </motion.div>

        {/* Enhanced connector dot */}
        <motion.div 
          className={`absolute top-1/2 w-6 h-6 rounded-full border-3 -translate-y-1/2
            ${isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"}`}
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
            borderColor: 'rgba(15, 23, 42, 0.9)',
            borderWidth: '3px'
          }}
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 20px rgba(251, 191, 36, 0.8)',
              '0 0 30px rgba(251, 191, 36, 1)',
              '0 0 20px rgba(251, 191, 36, 0.8)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
}