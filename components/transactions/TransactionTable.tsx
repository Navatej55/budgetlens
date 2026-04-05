'use client';

import { useState } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import TransactionRow from './TransactionRow';
import TransactionFilters from './TransactionFilters';
import AddTransactionModal from './AddTransactionModal';
import { Transaction } from '@/types';
import { Plus, ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 10;

export default function TransactionTable() {
  const { role, getFilteredTransactions, deleteTransaction } = useFinanceStore();
  const isAdmin = role === 'admin';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Transaction | null>(null);
  const [page, setPage] = useState(1);

  const filtered = getFilteredTransactions();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleEdit = (t: Transaction) => {
    setEditTarget(t);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditTarget(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  return (
    <section
      id="transactions"
      className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 py-4 px-4 sm:py-5 sm:px-6 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.3)] flex items-center justify-center text-[#818cf8] shrink-0">
            <ArrowLeftRight size={14} />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-[var(--text-primary)] m-0">
              Transactions
            </h2>
            <p className="text-[12px] text-[var(--text-muted)] mt-[1px]">
              {filtered.length} records
            </p>
          </div>
        </div>

        {isAdmin && (
          <button
            id="add-transaction-btn"
            onClick={() => { setEditTarget(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 py-2 px-4 rounded-[10px] text-[13px] font-medium text-white bg-[#6366f1] border-none cursor-pointer shadow-[0_2px_8px_rgba(99,102,241,0.3)] transition-all duration-200 hover:bg-[#4f46e5]"
          >
            <Plus size={15} />
            Add Transaction
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="py-3 px-4 sm:py-4 sm:px-6 border-b border-[var(--border-color)] bg-[var(--card-bg)]">
        <TransactionFilters />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {paginated.length === 0 ? (
          <div className="py-16 px-6 flex flex-col items-center gap-3 text-[var(--text-muted)]">
            <ArrowLeftRight size={32} className="opacity-30" />
            <p className="text-[14px] font-medium">No transactions found</p>
            <p className="text-[12px] opacity-70">Try adjusting your filters or adding new transactions</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="py-3 px-4 pl-6 text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-[0.07em] whitespace-nowrap">
                  Transaction
                </th>
                <th className="py-3 px-4 text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-[0.07em] whitespace-nowrap">
                  Category
                </th>
                <th className="py-3 px-4 text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-[0.07em] whitespace-nowrap">
                  Type
                </th>
                <th className="py-3 pr-6 pl-4 text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-[0.07em] text-right whitespace-nowrap">
                  Amount
                </th>
                {isAdmin && <th className="py-3 pr-6 pl-2 w-[80px]" />}
              </tr>
            </thead>
            <tbody>
              {paginated.map((t) => (
                <TransactionRow
                  key={t.id}
                  transaction={t}
                  isAdmin={isAdmin}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex items-center justify-between flex-wrap gap-2 py-3 px-6 border-t border-[var(--border-color)]">
          <p className="text-[12px] text-[var(--text-muted)]">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              id="prev-page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] bg-transparent border-none transition-all duration-200 enabled:hover:bg-[var(--card-hover)] enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .map((p, idx, arr) => (
                <span key={p} className="flex items-center">
                  {idx > 0 && arr[idx - 1] !== p - 1 && (
                    <span className="text-[12px] text-[var(--text-muted)] px-1">…</span>
                  )}
                  <button
                    id={`page-${p}-btn`}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-[12px] font-medium cursor-pointer border-none transition-all duration-200 ${
                      page === p
                        ? 'bg-[#6366f1] text-white'
                        : 'bg-transparent text-[var(--text-muted)] hover:bg-[var(--card-hover)]'
                    }`}
                  >
                    {p}
                  </button>
                </span>
              ))}

            <button
              id="next-page-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] bg-transparent border-none transition-all duration-200 enabled:hover:bg-[var(--card-hover)] enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        editTarget={editTarget}
      />
    </section>
  );
}
