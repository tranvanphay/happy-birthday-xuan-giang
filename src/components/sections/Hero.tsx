'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Particle = {
  id: number;
  emoji: string;
  left: string;
  delay: number;
  duration: number;
  size: number;
};

type Star = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
};

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const fullText = 'Xuân Giang';
  const nameChars = fullText.split('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Generate particles and stars
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        emoji: ['🎂', '🎉', '✨', '🎈', '💫', '⭐', '🌸', '💖', '🎊', '🕯️'][i % 10],
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 5,
        size: 16 + Math.random() * 20,
      }))
    );
    setStars(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
      }))
    );
  }, []);

  // Framer motion variants for typing effect
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.8,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, display: 'none' },
    visible: { opacity: 1, display: 'inline-block' },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a0a2e 0%, #0a0a0f 60%)' }}
    >
      {/* Stars background */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white star-particle"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            ['--duration' as string]: `${star.duration}s`,
            ['--delay' as string]: `${star.delay}s`,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: p.left,
            bottom: '-40px',
            fontSize: p.size,
            animation: `balloon-rise ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Radial glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: '#8b5cf6' }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: '#ff6b9d' }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-sm mx-auto">
        {/* Cake Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="text-7xl mb-4 float-animation select-none"
        >
          🎂
        </motion.div>

        {/* Happy Birthday text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-sm uppercase tracking-[0.4em] text-[#a78bfa] mb-2 font-medium"
        >
          ✨ Happy Birthday ✨
        </motion.p>

        {/* Name with typing effect using Framer Motion */}
        <div className="relative mb-2 flex items-center justify-center">
          <motion.h1
            className="text-5xl font-bold glow-pink inline-block"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => {
              // Show subtitle slightly after typing finishes
              setTimeout(() => setShowSubtitle(true), 300);
            }}
            style={{
              fontFamily: "'Dancing Script', cursive",
              background: 'linear-gradient(135deg, #ff6b9d, #c44fd8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              minHeight: '64px',
              WebkitTransform: 'translateZ(0)', // Force Safari hardware acceleration to fix clipping
            }}
          >
            {nameChars.map((char, index) => (
              <motion.span key={index} variants={charVariants}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
          <span
            className="inline-block w-0.5 h-10 ml-1"
            style={{
              background: '#ff6b9d',
              animation: 'twinkle 0.8s ease-in-out infinite',
              verticalAlign: 'middle',
              display: showSubtitle ? 'none' : 'inline-block',
            }}
          />
        </div>

        {/* Animations for showing secondary content */}
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center w-full"
          >
            {/* Date badge */}
            <div className="glass-card px-5 py-2 mt-2 mb-6">
              <span className="gradient-gold font-semibold text-base">
                🎉 Chúc mừng sinh nhật! 🎉
              </span>
            </div>

            {/* Decorative row */}
            <div className="flex gap-4 mb-8">
              {['🕯️', '🎈', '💫', '🎈', '🕯️'].map((e, i) => (
                <span
                  key={i}
                  className="text-2xl select-none"
                  style={{
                    animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  {e}
                </span>
              ))}
            </div>

            {/* Quote */}
            <p
              className="text-[#c4b5fd] text-base leading-relaxed px-2 mb-12"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
            >
              "Một tuổi mới, một chương mới,<br />
              rực rỡ và tuyệt vời hơn mỗi ngày!"
            </p>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-1 bounce-scroll"
            >
              <span className="text-xs text-[#8b8b9a] tracking-widest uppercase">Scroll</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="#8b8b9a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
