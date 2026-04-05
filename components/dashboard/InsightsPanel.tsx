'use client';

import { useFinanceStore } from '@/store/useFinanceStore';
import { TrendingUp, TrendingDown, Minus, Lightbulb } from 'lucide-react';
import { Insight } from '@/types';

const trendConfig = {
  positive: { icon: TrendingUp, color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
  negative: { icon: TrendingDown, color: '#f43f5e', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.2)' },
  neutral:  { icon: Minus,       color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)' },
};

function InsightCard({ insight }: { insight: Insight }) {
  const config = trendConfig[insight.trend];
  const Icon = config.icon;

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl transition-transform duration-200 ease-out cursor-default hover:-translate-y-0.5 border"
      style={{
        backgroundColor: config.bg,
        borderColor: config.border,
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-[2px]"
        style={{
          backgroundColor: `${config.color}1a`,
          color: config.color,
        }}
      >
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-[0.08em] mb-1">
          {insight.title}
        </p>
        <p
          className="text-[16px] font-bold leading-[1.2] mb-1"
          style={{ color: config.color }}
        >
          {insight.value}
        </p>
        <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">
          {insight.description}
        </p>
      </div>
    </div>
  );
}

export default function InsightsPanel() {
  const { getInsights } = useFinanceStore();
  const insights = getInsights();

  return (
    <section
      id="insights"
      className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] py-5 px-6"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-7 h-7 rounded-lg bg-[#fbbf241f] border border-[#fbbf2440] flex items-center justify-center text-[#fbbf24] shrink-0">
          <Lightbulb size={14} />
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-[var(--text-primary)] m-0">
            Key Insights
          </h2>
          <p className="text-[12px] text-[var(--text-muted)] mt-[1px]">
            Computed from your transaction data
          </p>
        </div>
      </div>

      {insights.length === 0 ? (
        <div className="p-8 text-center text-[var(--text-muted)] text-[14px]">
          Add transactions to see insights
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3">
          {insights.map((insight) => (
            <InsightCard key={insight.title} insight={insight} />
          ))}
        </div>
      )}
    </section>
  );
}
