import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'KOREA RANDOM TRAVEL',
  description: '국내 여행지 (지역) 룰렛 사이트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-site-verification" content="Lv6mEVE9dzaGiao-qDkBRxkRSI35vz8-Iv9gvRjG_oQ" />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="relative flex-grow">
          <div className="relative mx-auto w-full max-w-[1280px]">
            <div
              className="absolute bottom-0 left-1/2 top-0 w-px bg-primary"
              style={{ transform: 'translateX(-50%)' }}
            ></div>
            {children}
          </div>
        </main>
        <div id="portal"></div>
        <Footer />
      </body>
    </html>
  );
}
