'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
    setShowToast(false);
  };

  return (
    <>
      {/* Toast hint */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            className="fixed bottom-24 right-4 z-50 glass-card px-4 py-2 text-xs text-[#c4b5fd] flex items-center gap-2 shadow-xl"
          >
            <span>🎵</span>
            <span>Bật nhạc nào!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player button */}
      <motion.button
        id="music-player-btn"
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border-0 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #ff6b9d)',
          boxShadow: playing
            ? '0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(255,107,157,0.3)'
            : '0 4px 20px rgba(0,0,0,0.4)',
        }}
        aria-label={playing ? 'Dừng nhạc' : 'Phát nhạc'}
      >
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.div
              key="pause"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              className="flex gap-1"
            >
              <div className="w-1 h-5 bg-white rounded-full" />
              <div className="w-1 h-5 bg-white rounded-full" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path d="M6 4l12 6-12 6V4z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spinning ring when playing */}
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </motion.button>

      {/* Music bars animation */}
      {playing && (
        <div className="fixed bottom-8 right-20 z-40 flex gap-1 items-end">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full"
              style={{ background: 'linear-gradient(to top, #8b5cf6, #ff6b9d)' }}
              animate={{ height: [8, 20 + i * 4, 8] }}
              transition={{
                duration: 0.6 + i * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}

      {/* Audio element - using a free birthday song from public domain */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />
    </>
  );
}
