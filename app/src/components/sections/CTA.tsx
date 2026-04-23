'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const CANDLES = Array.from({ length: 5 }, (_, i) => i);

function Candle({ index }: { index: number }) {
  const [blown, setBlown] = useState(false);

  return (
    <motion.button
      onClick={() => setBlown(true)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center gap-1 focus:outline-none"
      aria-label={`Nến ${index + 1}`}
    >
      {/* Flame */}
      <AnimatePresence>
        {!blown && (
          <motion.div
            exit={{ scale: 0, opacity: 0 }}
            className="candle-flame"
          >
            <div
              className="w-3 h-4 rounded-full"
              style={{
                background: 'linear-gradient(to top, #ff9a00, #ffd700, #fff)',
                boxShadow: '0 0 8px #ffd700, 0 0 16px rgba(255, 154, 0, 0.5)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {blown && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-lg"
        >
          💨
        </motion.span>
      )}

      {/* Candle body */}
      <div
        className="w-4 h-10 rounded-sm"
        style={{
          background: `linear-gradient(to bottom, hsl(${index * 40 + 280}, 80%, 70%), hsl(${index * 40 + 280}, 70%, 50%))`,
          boxShadow: `0 0 8px hsla(${index * 40 + 280}, 70%, 60%, 0.4)`,
        }}
      />
    </motion.button>
  );
}

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [showFireworks, setShowFireworks] = useState(false);

  const handleCelebrate = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 3000);
  };

  return (
    <section
      className="section-padding relative overflow-hidden"
      id="cta"
      style={{
        background:
          'radial-gradient(ellipse at 50% 100%, #1a0a2e 0%, #0a0a0f 60%)',
      }}
    >
      {/* Fireworks */}
      <AnimatePresence>
        {showFireworks &&
          Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
              animate={{
                opacity: 0,
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                scale: 1.5,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: i * 0.05 }}
              className="absolute top-1/2 left-1/2 text-2xl pointer-events-none"
              style={{ zIndex: 50 }}
            >
              {['✨', '🎉', '💫', '⭐', '🌟', '🎊'][i % 6]}
            </motion.div>
          ))}
      </AnimatePresence>

      <div className="max-w-sm mx-auto text-center" ref={ref}>
        {/* Cake with candles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, type: 'spring' }}
          className="mb-8"
        >
          <div className="text-7xl mb-4 float-slow select-none">🎂</div>

          {/* Candles row */}
          <div className="flex justify-center gap-3 mb-4">
            {CANDLES.map((i) => (
              <Candle key={i} index={i} />
            ))}
          </div>

          <p className="text-[#8b8b9a] text-xs mt-2">
            Nhấn vào nến để thổi tắt! 🌬️
          </p>
        </motion.div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-card p-6 mb-8"
        >
          <h2
            className="text-3xl font-bold mb-3"
            style={{
              fontFamily: "'Dancing Script', cursive",
              background: 'linear-gradient(135deg, #f5c518, #ff6b9d, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Chúc mừng sinh nhật!
          </h2>
          <p
            className="text-[#c4b5fd] text-sm leading-relaxed mb-1"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
          >
            Chúc bạn một tuổi mới đầy niềm vui, bình an và thành công.
            Mong rằng mọi ước mơ của bạn sẽ trở thành hiện thực!
          </p>
          <p className="text-[#8b8b9a] text-xs mt-3">💖 With love 💖</p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          id="celebrate-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCelebrate}
          className="shimmer-btn pulse-glow-animation text-white font-bold py-4 px-10 rounded-full text-base shadow-xl border-0 cursor-pointer"
        >
          🎉 Ăn mừng nào! 🎉
        </motion.button>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-[#8b8b9a] text-xs mt-8"
        >
          Made with 💖 for Xuân Giang
        </motion.p>
      </div>
    </section>
  );
}
