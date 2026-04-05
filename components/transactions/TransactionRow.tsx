'use client';

import { useState } from 'react';
import { Transaction } from '@/types';
import { CATEGORY_COLORS } from '@/data/transactions';
import { ArrowUpRight, ArrowDownRight, Pencil, Trash2 } from 'lucide-react';

interface Props {
  transaction: Transaction;
  isAdmin: boolean;
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionRow({ transaction, isAdmin, onEdit, onDelete }: Props) {
  const { id, date, description, category, type, amount } = transaction;
  const isIncome = type === 'income';
  const color = CATEGORY_COLORS[category];

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <tr className="group border-b border-[var(--border-color)] hover:bg-[var(--card-hover)] transition-colors duration-150 ease-out bg-transparent">
      {/* Transaction description + date */}
      <td className="py-[14px] pr-4 pl-6 min-w-[200px]">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-[10px] shrink-0 flex items-center justify-center border"
            style={{
              backgroundColor: `${color}18`,
              borderColor: `${color}28`,
              color,
            }}
          >
            {isIncome ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-medium text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[260px] m-0 leading-[1.3]">
              {description}
            </p>
            <p className="text-[11px] text-[var(--text-muted)] mt-[2px]">
              {formattedDate}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="py-[14px] px-4 whitespace-nowrap">
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-lg text-[12px] font-medium border"
          style={{
            backgroundColor: `${color}15`,
            color,
            borderColor: `${color}22`,
          }}
        >
          {category}
        </span>
      </td>

      {/* Type */}
      <td className="py-[14px] px-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[12px] font-medium capitalize border ${
            isIncome 
              ? 'bg-[#10b9811e] text-[#10b981] border-[#10b98138]' 
              : 'bg-[#f43f5e1e] text-[#f43f5e] border-[#f43f5e38]'
          }`}
        >
          {isIncome ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {type}
        </span>
      </td>

      {/* Amount */}
      <td className="py-[14px] pr-6 pl-4 text-right whitespace-nowrap">
        <span
          className={`text-[14px] font-bold ${isIncome ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}
        >
          {isIncome ? '+' : '-'}${amount.toLocaleString('en-US')}
        </span>
      </td>

      {/* Admin actions */}
      {isAdmin && (
        <td className="py-[14px] pr-6 pl-2 w-[80px]">
          <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100">
            <button
              id={`edit-${id}`}
              onClick={() => onEdit(transaction)}
              aria-label="Edit transaction"
              title="Edit"
              className="w-7 h-7 rounded-[7px] flex items-center justify-center text-[var(--text-muted)] bg-transparent border-none cursor-pointer transition-all duration-200 hover:text-[#818cf8] hover:bg-[#6366f11f]"
            >
              <Pencil size={13} />
            </button>
            <button
              id={`delete-${id}`}
              onClick={() => onDelete(id)}
              aria-label="Delete transaction"
              title="Delete"
              className="w-7 h-7 rounded-[7px] flex items-center justify-center text-[var(--text-muted)] bg-transparent border-none cursor-pointer transition-all duration-200 hover:text-[#f43f5e] hover:bg-[#f43f5e1f]"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
