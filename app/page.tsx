 import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import SummaryCards from '@/components/dashboard/SummaryCards';
import BalanceChart from '@/components/dashboard/BalanceChart';
import SpendingChart from '@/components/dashboard/SpendingChart';
import InsightsPanel from '@/components/dashboard/InsightsPanel';
import TransactionTable from '@/components/transactions/TransactionTable';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 py-7 px-8 flex flex-col gap-6">
          {/* Summary Cards */}
          <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
            <SummaryCards />
          </div>

          {/* Charts row */}
          <div
            className="animate-fade-up grid grid-cols-[1fr_340px] gap-5"
            style={{ animationDelay: '60ms' }}
          >
            <BalanceChart />
            <SpendingChart />
          </div>

          {/* Insights */}
          <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
            <InsightsPanel />
          </div>

          {/* Transactions */}
          <div className="animate-fade-up" style={{ animationDelay: '180ms' }}>
            <TransactionTable />
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 px-8 border-t border-[var(--border-color)] flex items-center justify-end flex-wrap gap-2">
          {/* <p className="text-[12px] text-[var(--text-muted)]">
            © {new Date().getFullYear()} FinFlow. All data is mock for demonstration purposes.
          </p> */}
          <p className="text-[12px] text-[var(--text-muted)]">
            Built with Next.js 16 · Tailwind v4 · Zustand
          </p>
        </footer>
      </div>
    </div>
  );
}
