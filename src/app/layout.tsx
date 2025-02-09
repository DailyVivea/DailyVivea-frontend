import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import "@/style/globals.css";

import Header from "@/components/Layout/Header";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>
          {/* 항상 record 페이지가 먼저 렌더링되도록 설정 */}
          <div id="record">{children}</div>
          <div id="goal">{children}</div>
        </main>
      </body>
    </html>
  );
}
