import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chúc Mừng Sinh Nhật Xuân Giang 🎂',
  description:
    'Một trang sinh nhật đặc biệt dành tặng Xuân Giang – chúc bạn một tuổi mới rực rỡ, hạnh phúc và tràn đầy niềm vui!',
  keywords: ['happy birthday', 'sinh nhật', 'xuân giang', 'chúc mừng'],
  openGraph: {
    title: 'Chúc Mừng Sinh Nhật Xuân Giang 🎂',
    description: 'Một trang sinh nhật đặc biệt dành tặng Xuân Giang!',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
