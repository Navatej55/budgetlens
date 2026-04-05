'use client';

import { useFinanceStore } from '@/store/useFinanceStore';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/data/transactions';
import { Category, TransactionType, SortField } from '@/types';
import { Search, X, SlidersHorizontal, ArrowUpDown, Download } from 'lucide-react';

export default function TransactionFilters() {
  const {
    filters,
    setSearch,
    setTypeFilter,
    setCategoryFilter,
    setSort,
    resetFilters,
    getFilteredTransactions,
  } = useFinanceStore();

  const hasActiveFilters =
    filters.search !== '' || filters.type !== 'all' || filters.category !== 'all';

  const handleSortToggle = (field: SortField) => {
    if (filters.sortField === field) {
      setSort(field, filters.sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(field, 'desc');
    }
  };

  const handleExportCSV = () => {
    const data = getFilteredTransactions();
    if (data.length === 0) return;

    const formatDate = (dateStr: string): string => {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const [yyyy, mm, dd] = parts;
        return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
      }
      return dateStr;
    };

    const quoteField = (value: string): string =>
      `"${value.replace(/"/g, '""')}"`;

    const excelTextDate = (dateStr: string): string =>
      `="` + formatDate(dateStr) + `"`;

    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = data.map(t => [
      excelTextDate(t.date),
      quoteField(t.description),
      quoteField(t.category),
      quoteField(t.type),
      t.amount.toFixed(2),
    ].join(','));

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `transactions_export_${formatDate(new Date().toISOString().split('T')[0])}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const inputBaseClasses = "py-2 px-3 rounded-[10px] bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] text-[13px] outline-none transition-colors duration-200 cursor-pointer";

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Search */}
      <div className="relative flex-1 basis-[200px] min-w-[180px]">
        <Search
          size={14}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
        />
        <input
          id="transaction-search"
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputBaseClasses} pl-8 w-full cursor-text ${filters.search ? 'pr-8' : 'pr-3'}`}
        />
        {filters.search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] bg-transparent border-none cursor-pointer flex items-center"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Type filter buttons */}
      <div className="flex items-center bg-[var(--input-bg)] border border-[var(--border-color)] rounded-[10px] p-1 gap-0.5 shrink-0">
        {(['all', 'income', 'expense'] as const).map((type) => {
          const isActive = filters.type === type;
          const activeColor = type === 'income' ? '#10b981' : type === 'expense' ? '#f43f5e' : '#6366f1';
          return (
            <button
              key={type}
              id={`filter-type-${type}`}
              onClick={() => setTypeFilter(type)}
              className={`py-1.5 px-3 rounded-[7px] text-[12px] font-medium cursor-pointer border-none transition-all duration-200 ${
                isActive
                  ? 'text-white'
                  : 'bg-transparent text-[var(--text-muted)] hover:bg-[var(--card-hover)]'
              }`}
              style={isActive ? { backgroundColor: activeColor } : {}}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Category select */}
      <select
        id="filter-category"
        value={filters.category}
        onChange={(e) => setCategoryFilter(e.target.value as Category | 'all')}
        className={`${inputBaseClasses} shrink-0`}
      >
        <option value="all">All Categories</option>
        <optgroup label="Income">
          {INCOME_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </optgroup>
        <optgroup label="Expenses">
          {EXPENSE_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </optgroup>
      </select>

      {/* Sort buttons */}
      <div className="flex items-center gap-1.5 shrink-0">
        <SlidersHorizontal size={14} className="text-[var(--text-muted)]" />
        <span className="text-[12px] text-[var(--text-muted)]">Sort:</span>
        {(['date', 'amount'] as SortField[]).map((field) => {
          const isActive = filters.sortField === field;
          return (
            <button
              key={field}
              id={`sort-${field}`}
              onClick={() => handleSortToggle(field)}
              className={`flex items-center gap-1 py-1 px-2.5 rounded-lg text-[12px] font-medium cursor-pointer transition-all duration-200 border ${
                isActive
                  ? 'bg-[rgba(99,102,241,0.15)] text-[#818cf8] border-[rgba(99,102,241,0.3)]'
                  : 'bg-[var(--input-bg)] text-[var(--text-muted)] border-[var(--border-color)] hover:bg-[var(--card-hover)]'
              }`}
            >
              <ArrowUpDown size={11} />
              {field.charAt(0).toUpperCase() + field.slice(1)}
              {isActive && (
                <span>{filters.sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Reset button */}
      {hasActiveFilters && (
        <button
          id="reset-filters"
          onClick={resetFilters}
          className="flex items-center gap-1.5 py-1.5 px-3 text-[12px] font-medium text-[#f87171] bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.2)] rounded-[10px] cursor-pointer transition-colors duration-200 shrink-0 hover:bg-[rgba(244,63,94,0.18)]"
        >
          <X size={12} />
          Reset
        </button>
      )}

      {/* Export CSV button */}
      <div className="flex-1 min-w-[10px]" />
      <button
        onClick={handleExportCSV}
        className="flex items-center gap-1.5 py-1.5 px-3 text-[12px] font-medium text-[var(--text-primary)] bg-[var(--input-bg)] border border-[var(--border-color)] rounded-[10px] cursor-pointer transition-colors duration-200 shrink-0 hover:bg-[var(--card-hover)] ml-auto"
        title="Export Filtered Transactions to CSV"
      >
        <Download size={12} />
        Export CSV
      </button>
    </div>
  );
}
