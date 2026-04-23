'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/Hero';
import DesktopBlock from '@/components/DesktopBlock';

// Lazy load browser-only components
const MessagesSection = dynamic(() => import('@/components/sections/Messages'), { ssr: false });
const GallerySection = dynamic(() => import('@/components/sections/Gallery'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/sections/About'), { ssr: false });
const CTASection = dynamic(() => import('@/components/sections/CTA'), { ssr: false });
const MusicPlayer = dynamic(() => import('@/components/MusicPlayer'), { ssr: false });
const ConfettiCanvas = dynamic(() => import('@/components/ConfettiCanvas'), { ssr: false });

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen w-full overflow-x-hidden">
      {/* Desktop Blocker */}
      <DesktopBlock />

      {/* Main Content Flow */}
      <ConfettiCanvas />
      <MusicPlayer />
      
      <HeroSection />
      <MessagesSection />
      <AboutSection />
      <GallerySection />
      <CTASection />

      {/* Desktop Fallback Message (hidden on mobile) */}
      <div className="hidden md:flex min-h-screen items-center justify-center text-[#8b8b9a] text-center p-10">
        <p>Giao diện hiện chưa hỗ trợ màn hình lớn. Vui lòng mở trên thiết bị di động nhé! ✨</p>
      </div>
    </main>
  );
}
