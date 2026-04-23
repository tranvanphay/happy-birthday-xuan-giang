'use client';

import { useEffect, useRef } from 'react';

interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  opacity: number;
}

const COLORS = [
  '#f5c518', '#ff6b9d', '#8b5cf6', '#06b6d4',
  '#10b981', '#f59e0b', '#ec4899', '#a78bfa',
];

export default function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Confetti[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn confetti
    const spawn = () => {
      for (let i = 0; i < 6; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: -10,
          vx: (Math.random() - 0.5) * 3,
          vy: 1 + Math.random() * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          width: 6 + Math.random() * 8,
          height: 4 + Math.random() * 4,
          opacity: 0.8 + Math.random() * 0.2,
        });
      }
    };

    const spawnInterval = setInterval(spawn, 300);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(
        (p) => p.y < canvas.height + 20
      );

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vy += 0.02; // gravity

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearInterval(spawnInterval);
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ opacity: 0.6 }}
    />
  );
}
