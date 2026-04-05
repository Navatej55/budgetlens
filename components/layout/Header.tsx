'use client';

import { useFinanceStore } from '@/store/useFinanceStore';
import { Moon, Sun, Shield, Eye, Bell } from 'lucide-react';

export default function Header() {
  const { role, setRole, isDarkMode, toggleDarkMode } = useFinanceStore();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between py-4 px-8 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-color)] flex-wrap gap-3">
      <div>
        <h1 className="text-[18px] font-semibold text-[var(--text-primary)] leading-[1.2] m-0">
          Financial Overview
        </h1>
        <p className="text-[12px] text-[var(--text-muted)] mt-[2px]">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          id="notifications-btn"
          aria-label="Notifications"
          className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-muted)] cursor-pointer relative transition-all duration-200 hover:text-[var(--text-primary)] hover:border-indigo-500/50"
        >
          <Bell size={16} />
          <span className="absolute top-[6px] right-[6px] w-1.5 h-1.5 bg-[#6366f1] rounded-full" />
        </button>

        {/* Dark mode toggle */}
        <button
          id="dark-mode-toggle"
          aria-label="Toggle dark mode"
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-muted)] cursor-pointer transition-all duration-200 hover:text-[var(--text-primary)] hover:border-indigo-500/50"
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Role toggle */}
        <div className="flex items-center bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-1 gap-1">
          <button
            id="role-viewer-btn"
            onClick={() => setRole('viewer')}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-[12px] font-medium cursor-pointer border-none transition-all duration-200 ${
              role === 'viewer'
                ? 'bg-[#6366f1] text-white shadow-[0_2px_8px_rgba(99,102,241,0.3)]'
                : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
            }`}
          >
            <Eye size={13} />
            Viewer
          </button>
          <button
            id="role-admin-btn"
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-[12px] font-medium cursor-pointer border-none transition-all duration-200 ${
              role === 'admin'
                ? 'bg-[#6366f1] text-white shadow-[0_2px_8px_rgba(99,102,241,0.3)]'
                : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card-hover)]'
            }`}
          >
            <Shield size={13} />
            Admin
          </button>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-[12px] font-semibold text-white cursor-pointer shadow-[0_4px_12px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.4)] transition-shadow duration-200">
          JD
        </div>
      </div>
    </header>
  );
}
