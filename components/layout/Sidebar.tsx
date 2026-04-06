'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  Lightbulb,
  DollarSign,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Analytics', href: '#analytics', icon: TrendingUp },
  { label: 'Insights', href: '#insights', icon: Lightbulb },
  { label: 'Transactions', href: '#transactions', icon: ArrowLeftRight },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[256px] min-w-[256px] shrink-0 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] flex-col gap-6 py-6 px-4 sticky top-0 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
          <DollarSign className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="font-bold text-sm tracking-wide text-[var(--text-primary)]">FinFlow</p>
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Dashboard</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : false;
          return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-[14px] font-medium no-underline transition-all duration-200 relative group hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] ${
                  isActive
                    ? 'text-[#818cf8] bg-[rgba(99,102,241,0.12)]'
                    : 'text-[var(--text-muted)] bg-transparent'
                }`}
              >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#6366f1] rounded-r" />
              )}
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
