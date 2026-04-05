'use client';

import { useFinanceStore } from '@/store/useFinanceStore';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CardProps {
  id: string;
  label: string;
  value: string;
  subtext: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  accent: string;
  gradientFrom: string;
  gradientTo: string;
}

function StatCard({ id, label, value, subtext, trend, icon, accent, gradientFrom, gradientTo }: CardProps) {
  return (
    <div
      id={id}
      className="group relative overflow-hidden rounded-2xl p-5 bg-[var(--card-bg)] border border-[var(--border-color)] transition-all duration-300 ease-in-out cursor-default flex-1 basis-[200px] min-w-0 hover:-translate-y-0.5 hover:shadow-[var(--hover-shadow)] hover:border-[var(--hover-border)]"
      style={{
        '--hover-shadow': `0 20px 40px -10px ${accent}30`,
        '--hover-border': `${accent}40`,
      } as React.CSSProperties}
    >
      {/* Gradient blob */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${gradientFrom}, ${gradientTo})`,
        }}
      />

      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-4 relative">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}22, ${gradientTo}22)`,
            border: `1px solid ${gradientFrom}30`,
            color: gradientFrom,
          }}
        >
          {icon}
        </div>
        <span
          className="flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg"
          style={{
            background: `${accent}18`,
            color: accent,
          }}
        >
          {trend === 'up' ? <TrendingUp size={11} /> : trend === 'down' ? <TrendingDown size={11} /> : null}
          {subtext}
        </span>
      </div>

      {/* Label + Value */}
      <div className="relative">
        <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-[0.08em] mb-1">
          {label}
        </p>
        <p className="text-[26px] font-bold text-[var(--text-primary)] tracking-tight leading-tight">
          {value}
        </p>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full opacity-0 transition-opacity duration-300 rounded-b-2xl group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
        }}
      />
    </div>
  );
}

export default function SummaryCards() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { getSummaryStats } = useFinanceStore();
  const stats = getSummaryStats();

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <section
      id="summary-cards"
      className="flex gap-4 flex-wrap"
    >
      <StatCard
        id="card-balance"
        label="Total Balance"
        value={mounted ? fmt(stats.totalBalance) : '—'}
        subtext="Net balance"
        trend="neutral"
        icon={<Wallet size={20} />}
        accent="#6366f1"
        gradientFrom="#6366f1"
        gradientTo="#8b5cf6"
      />
      <StatCard
        id="card-income"
        label="Total Income"
        value={mounted ? fmt(stats.totalIncome) : '—'}
        subtext="All time"
        trend="up"
        icon={<TrendingUp size={20} />}
        accent="#10b981"
        gradientFrom="#10b981"
        gradientTo="#06b6d4"
      />
      <StatCard
        id="card-expenses"
        label="Total Expenses"
        value={mounted ? fmt(stats.totalExpenses) : '—'}
        subtext="All time"
        trend="down"
        icon={<TrendingDown size={20} />}
        accent="#f43f5e"
        gradientFrom="#f43f5e"
        gradientTo="#f97316"
      />
    </section>
  );
}
