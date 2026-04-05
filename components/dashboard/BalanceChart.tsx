'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Activity } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '12px 14px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}
      >
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '8px' }}>{label}</p>
        {payload.map((p) => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: p.color, flexShrink: 0 }} />
            <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{p.name}:</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>${p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function BalanceChart() {
  const { getMonthlyData } = useFinanceStore();
  const data = getMonthlyData();

  return (
    <div
      id="balance-chart"
      className="rounded-[16px] bg-[var(--card-bg)] border border-[var(--border-color)] py-5 px-4 sm:px-6 min-w-0"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
        <div>
          <h2 className="text-[15px] font-semibold text-[var(--text-primary)] m-0">Balance Trend</h2>
          <p className="text-[12px] text-[var(--text-muted)] mt-[2px]">Monthly income vs expenses</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { label: 'Income', color: '#6366f1' },
            { label: 'Expenses', color: '#f43f5e' },
            { label: 'Balance', color: '#10b981' },
          ].map(({ label, color }) => (
            <span key={label} className="flex items-center gap-1.5 text-[12px] text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      {data.length === 0 ? (
        <div className="h-[260px] flex flex-col items-center justify-center gap-3 text-[var(--text-muted)]">
          <Activity size={32} className="opacity-30" />
          <p className="text-[14px] font-medium">No data available</p>
          <p className="text-[12px] opacity-70">Add income or expenses to see trends</p>
        </div>
      ) : (
        <>
          <div className="block sm:hidden">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGradM" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGradM" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="balanceGradM" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={42} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={2} fill="url(#incomeGradM)" activeDot={{ r: 4, fill: '#6366f1' }} />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} fill="url(#expenseGradM)" activeDot={{ r: 4, fill: '#f43f5e' }} />
                <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={2} fill="url(#balanceGradM)" activeDot={{ r: 4, fill: '#10b981' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="hidden sm:block">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={2} fill="url(#incomeGrad)" activeDot={{ r: 4, fill: '#6366f1' }} />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} fill="url(#expenseGrad)" activeDot={{ r: 4, fill: '#f43f5e' }} />
                <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={2} fill="url(#balanceGrad)" activeDot={{ r: 4, fill: '#10b981' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
