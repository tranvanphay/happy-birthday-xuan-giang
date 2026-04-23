'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const TIMELINE = [
  { icon: '🌱', label: 'Sinh ra đã xinh', desc: 'Một ngày đẹp trời, thế giới có thêm một người tuyệt vời!' },
  { icon: '🌟', label: 'Lớn lên rực rỡ', desc: 'Từng bước trưởng thành, từng ngày thêm tỏa sáng.' },
  { icon: '🎯', label: 'Chinh phục ước mơ', desc: 'Không ngại khó khăn, luôn hướng tới điều tốt đẹp hơn.' },
  { icon: '🎂', label: 'Hôm nay sinh nhật', desc: 'Một tuổi mới, một trang mới rực rỡ đang chờ phía trước!' },
];

const STATS = [
  { value: '365', label: 'Ngày hạnh phúc' },
  { value: '∞', label: 'Tình yêu thương' },
  { value: '100%', label: 'Rực rỡ' },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof TIMELINE)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative mb-8 last:mb-0"
    >
      {/* Dot */}
      <div
        className="absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center text-sm"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #ff6b9d)',
          boxShadow: '0 0 12px rgba(139,92,246,0.5)',
        }}
      >
        {item.icon}
      </div>

      <div className="glass-card p-4 ml-3">
        <h3 className="text-sm font-bold gradient-pink mb-1">{item.label}</h3>
        <p className="text-[#c4b5fd] text-xs leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section
      ref={containerRef}
      className="section-padding relative overflow-hidden"
      id="about"
      style={{
        background:
          'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.07) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-4xl">🌸</span>
          <h2
            className="text-3xl font-bold mt-3 mb-2"
            style={{
              fontFamily: "'Dancing Script', cursive",
              background: 'linear-gradient(135deg, #ff6b9d, #f5c518)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Hành trình của bạn
          </h2>
          <p className="text-[#8b8b9a] text-sm">
            Mỗi khoảnh khắc đều đáng nhớ 💫
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mb-10"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-4 text-center"
            >
              <div
                className="text-2xl font-bold gradient-gold mb-1"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {stat.value}
              </div>
              <div className="text-[#8b8b9a] text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-6">
          {/* Vertical line */}
          <motion.div
            className="absolute left-3 top-0 bottom-0 w-0.5"
            style={{
              background:
                'linear-gradient(to bottom, #8b5cf6, #ff6b9d, #f5c518)',
              scaleY: scrollYProgress,
              transformOrigin: 'top',
            }}
          />

          {TIMELINE.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Rotating decoration */}
        <motion.div
          style={{ rotate }}
          className="absolute top-20 right-4 text-5xl opacity-10 pointer-events-none select-none"
        >
          🌸
        </motion.div>
      </div>
    </section>
  );
}
