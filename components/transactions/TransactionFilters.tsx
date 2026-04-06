'use client';

import { useState } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/data/transactions';
import { Category, SortField } from '@/types';
import { Search, X, SlidersHorizontal, ArrowUpDown, Download, ChevronDown, ChevronUp } from 'lucide-react';

const inputBaseClasses = "py-2 px-3 rounded-[10px] bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] text-[13px] outline-none transition-colors duration-200 cursor-pointer";

/* ── Type pill buttons ─────────────────────────────────────── */
interface TypeButtonsProps {
  activeType: 'all' | 'income' | 'expense';
  onSelect: (type: 'all' | 'income' | 'expense') => void;
}

function TypeButtons({ activeType, onSelect }: TypeButtonsProps) {
  return (
    <div className="flex items-center bg-[var(--input-bg)] border border-[var(--border-color)] rounded-[10px] p-1 gap-0.5">
      {(['all', 'income', 'expense'] as const).map((type) => {
        const isActive = activeType === type;
        const activeColor = type === 'income' ? '#10b981' : type === 'expense' ? '#f43f5e' : '#6366f1';
        return (
          <button
            key={type}
            id={`filter-type-${type}`}
            onClick={() => onSelect(type)}
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
  );
}

/* ── Category select ──────────────────────────────────────── */
interface CategorySelectProps {
  value: Category | 'all';
  onChange: (value: Category | 'all') => void;
}

function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <select
      id="filter-category"
      value={value}
      onChange={(e) => onChange(e.target.value as Category | 'all')}
      className={`${inputBaseClasses} w-full`}
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
  );
}

/* ── Sort buttons ─────────────────────────────────────────── */
interface SortButtonsProps {
  sortField: SortField;
  sortDirection: 'asc' | 'desc';
  onToggle: (field: SortField) => void;
}

function SortButtons({ sortField, sortDirection, onToggle }: SortButtonsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <SlidersHorizontal size={14} className="text-[var(--text-muted)]" />
      <span className="text-[12px] text-[var(--text-muted)]">Sort:</span>
      {(['date', 'amount'] as SortField[]).map((field) => {
        const isActive = sortField === field;
        return (
          <button
            key={field}
            id={`sort-${field}`}
            onClick={() => onToggle(field)}
            className={`flex items-center gap-1 py-1 px-2.5 rounded-lg text-[12px] font-medium cursor-pointer transition-all duration-200 border ${
              isActive
                ? 'bg-[rgba(99,102,241,0.15)] text-[#818cf8] border-[rgba(99,102,241,0.3)]'
                : 'bg-[var(--input-bg)] text-[var(--text-muted)] border-[var(--border-color)] hover:bg-[var(--card-hover)]'
            }`}
          >
            <ArrowUpDown size={11} />
            {field.charAt(0).toUpperCase() + field.slice(1)}
            {isActive && (
              <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

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

  const [filtersOpen, setFiltersOpen] = useState(false);

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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 min-w-0">
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

        <button
          id="mobile-filter-toggle"
          onClick={() => setFiltersOpen((v) => !v)}
          className={`sm:hidden flex items-center gap-1.5 py-2 px-3 rounded-[10px] text-[12px] font-medium cursor-pointer border transition-all duration-200 shrink-0 ${
            filtersOpen || hasActiveFilters
              ? 'bg-[rgba(99,102,241,0.15)] text-[#818cf8] border-[rgba(99,102,241,0.3)]'
              : 'bg-[var(--input-bg)] text-[var(--text-muted)] border-[var(--border-color)]'
          }`}
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal size={13} />
          Filters
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
          )}
          {filtersOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        {hasActiveFilters && (
          <button
            id="reset-filters"
            onClick={resetFilters}
            className="sm:hidden flex items-center gap-1 py-2 px-2.5 text-[12px] font-medium text-[#f87171] bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.2)] rounded-[10px] cursor-pointer transition-colors duration-200 shrink-0"
          >
            <X size={12} />
          </button>
        )}

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 py-2 px-3 text-[12px] font-medium text-[var(--text-primary)] bg-[var(--input-bg)] border border-[var(--border-color)] rounded-[10px] cursor-pointer transition-colors duration-200 shrink-0 hover:bg-[var(--card-hover)]"
          title="Export Filtered Transactions to CSV"
        >
          <Download size={12} />
          <span className="hidden xs:inline sm:inline">Export</span>
        </button>
      </div>

      <div className={`flex-col gap-2 ${filtersOpen ? 'flex' : 'hidden'} sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5`}>
        {/* Type */}
        <TypeButtons activeType={filters.type} onSelect={setTypeFilter} />

        {/* Category */}
        <div className="sm:w-auto w-full">
          <CategorySelect value={filters.category} onChange={setCategoryFilter} />
        </div>

        {/* Sort */}
        <SortButtons
          sortField={filters.sortField}
          sortDirection={filters.sortDirection}
          onToggle={handleSortToggle}
        />

        {hasActiveFilters && (
          <button
            id="reset-filters-desktop"
            onClick={resetFilters}
            className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 text-[12px] font-medium text-[#f87171] bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.2)] rounded-[10px] cursor-pointer transition-colors duration-200 hover:bg-[rgba(244,63,94,0.18)]"
          >
            <X size={12} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
