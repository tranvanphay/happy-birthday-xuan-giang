'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MESSAGES = [
  {
    icon: '🌟',
    title: 'Chúc bạn luôn rạng rỡ',
    text: 'Như ánh sao đêm nay, ước mơ của bạn luôn sáng mãi không tắt. Hãy cứ tin vào bản thân và tỏa sáng theo cách của riêng mình!',
    color: 'from-[#f5c518] to-[#ff9a00]',
  },
  {
    icon: '💖',
    title: 'Sức khỏe & Hạnh phúc',
    text: 'Chúc bạn luôn khỏe mạnh, tràn đầy năng lượng và hạnh phúc mỗi ngày. Nụ cười của bạn là điều tuyệt vời nhất!',
    color: 'from-[#ff6b9d] to-[#c44fd8]',
  },
  {
    icon: '🚀',
    title: 'Bay cao, bay xa',
    text: 'Tuổi mới là cơ hội mới. Hãy dũng cảm bước tới, khám phá thế giới và chinh phục mọi ước mơ bạn hằng ấp ủ!',
    color: 'from-[#8b5cf6] to-[#06b6d4]',
  },
];

function MessageCard({
  item,
  index,
}: {
  item: (typeof MESSAGES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      {/* Gradient border top */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color}`}
      />
      
      <div className="relative z-10">
        <div className="text-4xl mb-3 float-animation">{item.icon}</div>
        <h3
          className={`text-lg font-bold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
        >
          {item.title}
        </h3>
        <p className="text-[#c4b5fd] text-sm leading-relaxed">{item.text}</p>
      </div>
    </motion.div>
  );
}

export default function MessagesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding relative" id="messages">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-sm mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-4xl">💌</span>
          <h2
            className="text-3xl font-bold mt-3 mb-2"
            style={{
              fontFamily: "'Dancing Script', cursive",
              background: 'linear-gradient(135deg, #f5c518, #ff6b9d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Lời chúc từ trái tim
          </h2>
          <p className="text-[#8b8b9a] text-sm">Gửi đến bạn với tất cả tình cảm 🌸</p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {MESSAGES.map((item, i) => (
            <MessageCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
