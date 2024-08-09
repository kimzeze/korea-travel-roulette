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
      <body>
        <Header />
        {children}
        <div id = "portal"></div>
        <Footer/>
      </body>
    </html>
  );
}
