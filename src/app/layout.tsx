import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "국내 여행지 룰렛",
  description: "국내 여행지 룰렛 사이트",
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
      </body>
    </html>
  );
}
