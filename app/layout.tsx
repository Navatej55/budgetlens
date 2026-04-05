import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/layout/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FinFlow — Finance Dashboard',
  description:
    'A modern, AI-powered personal finance dashboard. Track income, expenses, trends, and insights in real time.',
  keywords: ['finance', 'dashboard', 'budget', 'expenses', 'investments', 'personal finance'],
  openGraph: {
    title: 'FinFlow — Finance Dashboard',
    description: 'Track your financial health with FinFlow.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} data-theme="dark">
      <body className="h-full font-[var(--font-inter)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
