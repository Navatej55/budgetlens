'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useFinanceStore } from '@/store/useFinanceStore';
import { PieChart as PieChartIcon } from 'lucide-react';

const CustomTooltip = ({ active, payload }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { percentage: number; color: string } }>;
}) => {
  if (active && payload && payload.length) {
    const { name, value, payload: d } = payload[0];
    return (
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl py-2.5 px-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
        <p className="text-[13px] font-semibold text-[var(--text-primary)] mb-0.5">{name}</p>
        <p className="text-[12px] text-[var(--text-muted)]">
          ${value.toLocaleString()} · {d.percentage.toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;

const PieLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  if (percent < 0.06) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-[11px] font-semibold pointer-events-none"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function SpendingChart() {
  const { getCategoryData } = useFinanceStore();
  const data = getCategoryData();
  const top6 = data.slice(0, 6);

  return (
    <div
      id="spending-chart"
      className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] py-5 px-4 sm:px-6 flex flex-col min-w-0"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-[15px] font-semibold text-[var(--text-primary)] m-0">
          Spending Breakdown
        </h2>
        <p className="text-[12px] text-[var(--text-muted)] mt-0.5">
          Top categories by expense
        </p>
      </div>

      {top6.length === 0 ? (
        <div className="h-[200px] flex flex-col items-center justify-center gap-3 text-[var(--text-muted)]">
          <PieChartIcon size={32} className="opacity-30" />
          <p className="text-[14px] font-medium">No expense data</p>
          <p className="text-[12px] opacity-70">Add an expense to see breakdown</p>
        </div>
      ) : (
        <>
          {/* Mobile chart */}
          <div className="block sm:hidden">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={top6}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={76}
                  paddingAngle={3}
                  labelLine={false}
                  label={PieLabel}
                >
                  {top6.map((entry) => (
                    <Cell key={entry.category} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Desktop chart */}
          <div className="hidden sm:block">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={top6}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={88}
                  paddingAngle={3}
                  labelLine={false}
                  label={PieLabel}
                >
                  {top6.map((entry) => (
                    <Cell key={entry.category} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {top6.map((item) => (
              <div key={item.category} className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[12px] text-[var(--text-muted)] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.category}
                </span>
                <span className="text-[12px] font-medium text-[var(--text-secondary)] shrink-0">
                  ${item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
