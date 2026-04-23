'use client';

export default function DesktopBlock() {
  return (
    <div className="hidden md:flex fixed inset-0 z-[9999] bg-[#0a0a0f] flex-col items-center justify-center text-center p-8">
      <div className="text-8xl mb-6 select-none">📵</div>
      <h1
        className="text-3xl font-bold mb-4"
        style={{
          fontFamily: "'Dancing Script', cursive",
          background: 'linear-gradient(135deg, #f5c518, #ff6b9d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Không hỗ trợ desktop đâu
      </h1>
      <p className="text-2xl text-[#f0ece6]">hẹ hẹ :D</p>
      <p className="text-[#8b8b9a] mt-4 text-sm">
        Hãy mở trên điện thoại để có trải nghiệm tốt nhất nhé! 🎂
      </p>
      <div className="mt-8 flex gap-3">
        {['📱', '✨', '🎉', '🎂', '✨', '📱'].map((e, i) => (
          <span
            key={i}
            className="text-2xl"
            style={{
              animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
