'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const PHOTOS = [
  {
    src: '/photos/photo1.jpg',
    caption: 'Khoảnh khắc tuyệt vời 🌸',
    rotate: -3,
    delay: 0,
    fallbackEmoji: '📸',
  },
  {
    src: '/photos/photo2.jpg',
    caption: 'Nụ cười rạng rỡ ✨',
    rotate: 2,
    delay: 0.1,
    fallbackEmoji: '🌟',
  },
  {
    src: '/photos/photo3.jpg',
    caption: 'Kỷ niệm đẹp 💫',
    rotate: -2,
    delay: 0.2,
    fallbackEmoji: '💖',
  },
  {
    src: '/photos/photo4.jpg',
    caption: 'Mãi bên nhau 💖',
    rotate: 3,
    delay: 0.3,
    fallbackEmoji: '✨',
  },
];

function PhotoCard({
  photo,
  index,
}: {
  photo: (typeof PHOTOS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotate: photo.rotate * 2 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: photo.rotate } : {}}
      transition={{ duration: 0.7, delay: photo.delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, transition: { duration: 0.3 } }}
      className="relative cursor-pointer"
      style={{ transformOrigin: 'center center' }}
    >
      {/* Polaroid frame */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '10px 10px 40px',
        }}
      >
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          {/* Gradient fallback background */}
          <div
            className="absolute inset-0 flex items-center justify-center text-6xl"
            style={{
              background: `linear-gradient(135deg, hsl(${260 + index * 30}, 60%, 20%), hsl(${300 + index * 30}, 60%, 15%))`,
            }}
          >
            {photo.fallbackEmoji}
          </div>
          {/* Actual image on top */}
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            className="object-cover"
            style={{ position: 'absolute' }}
          />
          {/* Shine overlay */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)' }}
          />
        </div>

        {/* Caption */}
        <p
          className="text-center text-[#c4b5fd] mt-3 font-medium"
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: '14px' }}
        >
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden" id="gallery">
      {/* Blobs */}
      <motion.div
        style={{
          y: y1,
          position: 'absolute',
          top: 80,
          left: 0,
          width: 192,
          height: 192,
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.1,
          background: '#ff6b9d',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        style={{
          y: y2,
          position: 'absolute',
          bottom: 80,
          right: 0,
          width: 192,
          height: 192,
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.1,
          background: '#8b5cf6',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-sm mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-4xl">📷</span>
          <h2
            className="text-3xl font-bold mt-3 mb-2"
            style={{
              fontFamily: "'Dancing Script', cursive",
              background: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Khoảnh khắc đẹp
          </h2>
          <p className="text-[#8b8b9a] text-sm">
            Những kỷ niệm không thể quên 🎞️
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={i} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
