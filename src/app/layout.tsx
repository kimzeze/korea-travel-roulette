import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "KOREA RANDOM TRAVEL",
  description: "국내 여행지 (지역) 룰렛 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head />
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow relative">
          <div className="max-w-[1280px] mx-auto w-full relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary" style={{ transform: 'translateX(-50%)' }}></div>
            {children}
          </div>
        </main>
        <div id="portal"></div>
        <Footer/>
      </body>
    </html>
  );
}