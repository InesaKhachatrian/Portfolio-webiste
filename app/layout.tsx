import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Inesa Khachatryan — Senior Product Designer',
  description: 'Senior Product Designer crafting scalable digital interfaces for Fintech & beyond. Six years of systems-thinking across web, mobile, and back-office platforms.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="fp-editorial">
        {children}
      </body>
    </html>
  );
}
