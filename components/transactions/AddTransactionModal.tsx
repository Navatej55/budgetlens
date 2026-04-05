'use client';

import { useState, useEffect } from 'react';
import { Transaction, Category, TransactionType } from '@/types';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/data/transactions';
import { X, Plus, Save } from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editTarget?: Transaction | null;
}

const defaultForm = {
  description: '',
  date: new Date().toISOString().split('T')[0],
  category: 'Food & Dining' as Category,
  type: 'expense' as TransactionType,
  amount: '',
};


const inputClass = (hasError?: boolean) => 
  `w-full py-2.5 px-3 rounded-[10px] text-[14px] bg-[var(--input-bg)] border ${hasError ? 'border-[rgba(244,63,94,0.6)]' : 'border-[var(--border-color)]'} text-[var(--text-primary)] outline-none transition-colors duration-200 box-border`;

const labelClass = "block text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-[0.07em] mb-1.5";

const errorClass = "text-[11px] text-[#f87171] mt-1";

export default function AddTransactionModal({ isOpen, onClose, editTarget }: Props) {
  const { addTransaction, updateTransaction } = useFinanceStore();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState<Partial<typeof defaultForm>>({});

  useEffect(() => {
    if (editTarget) {
      setForm({
        description: editTarget.description,
        date: editTarget.date,
        category: editTarget.category,
        type: editTarget.type,
        amount: String(editTarget.amount),
      });
    } else {
      setForm({ ...defaultForm, date: new Date().toISOString().split('T')[0] });
    }
    setErrors({});
  }, [editTarget, isOpen]);

  const validate = () => {
    const newErrors: Partial<typeof defaultForm> = {};
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      newErrors.amount = 'Enter a valid positive amount';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      description: form.description.trim(),
      date: form.date,
      category: form.category,
      type: form.type,
      amount: parseFloat(form.amount),
    };

    if (editTarget) {
      updateTransaction(editTarget.id, data);
    } else {
      addTransaction(data);
    }
    onClose();
  };

  const allCategories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={editTarget ? 'Edit transaction' : 'Add transaction'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-[4px]"
      />

      {/* Modal card */}
      <div className="animate-modal-in relative w-full max-w-[440px] bg-[var(--modal-bg)] border border-[var(--border-color)] rounded-[18px] shadow-[0_24px_64px_rgba(0,0,0,0.45)] overflow-hidden">
        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between py-[18px] px-5 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="w-[30px] h-[30px] rounded-[9px] bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.3)] flex items-center justify-center text-[#818cf8] shrink-0">
              {editTarget ? <Save size={14} /> : <Plus size={14} />}
            </div>
            <h2 className="text-[15px] font-semibold text-[var(--text-primary)] m-0">
              {editTarget ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
          </div>

          <button
            id="modal-close-btn"
            onClick={onClose}
            className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-[var(--text-muted)] bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">

          {/* Type toggle */}
          <div>
            <span className={labelClass}>Type</span>
            <div className="flex gap-2">
              {(['income', 'expense'] as TransactionType[]).map((t) => {
                const isActive = form.type === t;
                const activeColor = t === 'income' ? '#10b981' : '#f43f5e';
                return (
                  <button
                    key={t}
                    type="button"
                    id={`modal-type-${t}`}
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        type: t,
                        category: t === 'income' ? 'Salary' : 'Food & Dining',
                      }))
                    }
                    className={`flex-1 py-[9px] px-3 rounded-[10px] text-[13px] font-medium capitalize cursor-pointer transition-all duration-200 border ${
                      isActive ? '' : 'bg-transparent text-[var(--text-muted)] border-[var(--border-color)]'
                    }`}
                    style={isActive ? { borderColor: `${activeColor}55`, backgroundColor: `${activeColor}18`, color: activeColor } : {}}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="modal-description" className={labelClass}>Description</label>
            <input
              id="modal-description"
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="e.g. Monthly Salary"
              className={inputClass(!!errors.description)}
            />
            {errors.description && <p className={errorClass}>{errors.description}</p>}
          </div>

          {/* Category & Date row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Category */}
            <div>
              <label htmlFor="modal-category" className={labelClass}>Category</label>
              <select
                id="modal-category"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))}
                className={`${inputClass()} cursor-pointer`}
              >
                {allCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="modal-date" className={labelClass}>Date</label>
              <input
                id="modal-date"
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className={inputClass(!!errors.date)}
              />
              {errors.date && <p className={errorClass}>{errors.date}</p>}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="modal-amount" className={labelClass}>Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[var(--text-muted)] pointer-events-none">
                $
              </span>
              <input
                id="modal-amount"
                type="number"
                min="0.01"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                placeholder="0.00"
                className={`${inputClass(!!errors.amount)} pl-7`}
              />
            </div>
            {errors.amount && <p className={errorClass}>{errors.amount}</p>}
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--border-color)] -mx-5" />

          {/* Action buttons */}
          <div className="flex gap-2.5">
            <button
              type="button"
              id="modal-cancel-btn"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-[10px] text-[13px] font-medium cursor-pointer transition-colors duration-200 bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-[rgba(99,102,241,0.35)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="modal-submit-btn"
              className="flex-1 py-2.5 px-4 rounded-[10px] text-[13px] font-semibold cursor-pointer transition-colors duration-200 bg-[#6366f1] text-white border-none shadow-[0_2px_10px_rgba(99,102,241,0.35)] hover:bg-[#4f46e5]"
            >
              {editTarget ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
