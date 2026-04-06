'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Transaction,
  FilterState,
  SortField,
  SortDirection,
  TransactionType,
  Category,
  Role,
  SummaryStats,
  MonthlyData,
  CategoryData,
  Insight,
} from '@/types';
import { mockTransactions, CATEGORY_COLORS } from '@/data/transactions';

interface FinanceStore {
  // Data
  transactions: Transaction[];
  role: Role;
  filters: FilterState;
  isDarkMode: boolean;

  // Actions
  setRole: (role: Role) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setSearch: (search: string) => void;
  setTypeFilter: (type: TransactionType | 'all') => void;
  setCategoryFilter: (category: Category | 'all') => void;
  setSort: (field: SortField, direction: SortDirection) => void;
  resetFilters: () => void;
  toggleDarkMode: () => void;

  // Computed (selectors)
  getFilteredTransactions: () => Transaction[];
  getSummaryStats: () => SummaryStats;
  getMonthlyData: () => MonthlyData[];
  getCategoryData: () => CategoryData[];
  getInsights: () => Insight[];
}

const defaultFilters: FilterState = {
  search: '',
  type: 'all',
  category: 'all',
  sortField: 'date',
  sortDirection: 'desc',
};

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: 'admin',
      filters: defaultFilters,
      isDarkMode: true,

      setRole: (role) => set({ role }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            { ...transaction, id: `t${Date.now()}` },
            ...state.transactions,
          ],
        })),

      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      setSearch: (search) =>
        set((state) => ({ filters: { ...state.filters, search } })),

      setTypeFilter: (type) =>
        set((state) => ({ filters: { ...state.filters, type } })),

      setCategoryFilter: (category) =>
        set((state) => ({ filters: { ...state.filters, category } })),

      setSort: (sortField, sortDirection) =>
        set((state) => ({
          filters: { ...state.filters, sortField, sortDirection },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let filtered = [...transactions];

        if (filters.search) {
          const query = filters.search.toLowerCase();
          filtered = filtered.filter(
            (t) =>
              t.description.toLowerCase().includes(query) ||
              t.category.toLowerCase().includes(query)
          );
        }

        if (filters.type !== 'all') {
          filtered = filtered.filter((t) => t.type === filters.type);
        }

        if (filters.category !== 'all') {
          filtered = filtered.filter((t) => t.category === filters.category);
        }

        filtered.sort((a, b) => {
          let comparison = 0;
          switch (filters.sortField) {
            case 'date':
              comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
              break;
            case 'amount':
              comparison = a.amount - b.amount;
              break;
            case 'category':
              comparison = a.category.localeCompare(b.category);
              break;
            case 'type':
              comparison = a.type.localeCompare(b.type);
              break;
          }
          return filters.sortDirection === 'asc' ? comparison : -comparison;
        });

        return filtered;
      },

      getSummaryStats: (): SummaryStats => {
        const { transactions } = get();
        const totalIncome = transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
        return {
          totalBalance: totalIncome - totalExpenses,
          totalIncome,
          totalExpenses,
        };
      },

      getMonthlyData: (): MonthlyData[] => {
        const { transactions } = get();
        const monthMap: Record<string, MonthlyData> = {};

        transactions.forEach((t) => {
          const date = new Date(t.date);
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          const label = date.toLocaleString('en-US', { month: 'short', year: '2-digit' });

          if (!monthMap[key]) {
            monthMap[key] = { month: label, income: 0, expenses: 0, balance: 0 };
          }

          if (t.type === 'income') {
            monthMap[key].income += t.amount;
          } else {
            monthMap[key].expenses += t.amount;
          }
        });

        return Object.entries(monthMap)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([, data]) => ({
            ...data,
            balance: data.income - data.expenses,
          }));
      },

      getCategoryData: (): CategoryData[] => {
        const { transactions } = get();
        const expenseTransactions = transactions.filter((t) => t.type === 'expense');
        const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

        const categoryMap: Partial<Record<Category, number>> = {};
        expenseTransactions.forEach((t) => {
          categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });

        return (Object.entries(categoryMap) as [Category, number][])
          .map(([category, amount]) => ({
            category,
            amount,
            percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
            color: CATEGORY_COLORS[category],
          }))
          .sort((a, b) => b.amount - a.amount);
      },

      getInsights: (): Insight[] => {
        const { transactions } = get();
        const monthlyData = get().getMonthlyData();
        const categoryData = get().getCategoryData();

        const insights: Insight[] = [];

        // Highest spending category
        if (categoryData.length > 0) {
          const top = categoryData[0];
          insights.push({
            title: 'Top Spending Category',
            value: top.category,
            description: `$${top.amount.toLocaleString('en-US')} spent (${top.percentage.toFixed(1)}% of total expenses)`,
            trend: 'negative',
          });
        }

        // Month-over-month comparison
        if (monthlyData.length >= 2) {
          const current = monthlyData[monthlyData.length - 1];
          const previous = monthlyData[monthlyData.length - 2];
          const expenseDiff = current.expenses - previous.expenses;
          const pct = previous.expenses > 0 ? ((expenseDiff / previous.expenses) * 100).toFixed(1) : '0';
          insights.push({
            title: 'Month-over-Month Spending',
            value: `${expenseDiff >= 0 ? '+' : ''}${pct}%`,
            description: `Compared to ${previous.month}: $${Math.abs(expenseDiff).toLocaleString('en-US')} ${expenseDiff >= 0 ? 'more' : 'less'} in expenses`,
            trend: expenseDiff > 0 ? 'negative' : expenseDiff < 0 ? 'positive' : 'neutral',
          });
        }

        // Savings rate
        const totalIncome = transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
        const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : '0';
        insights.push({
          title: 'Savings Rate',
          value: `${savingsRate}%`,
          description: 'Percentage of income saved across all recorded months',
          trend: parseFloat(savingsRate) >= 20 ? 'positive' : parseFloat(savingsRate) >= 10 ? 'neutral' : 'negative',
        });

        // Largest single expense
        const largestExpense = transactions
          .filter((t) => t.type === 'expense')
          .sort((a, b) => b.amount - a.amount)[0];
        if (largestExpense) {
          insights.push({
            title: 'Largest Single Expense',
            value: `$${largestExpense.amount.toLocaleString('en-US')}`,
            description: `${largestExpense.description} on ${new Date(largestExpense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
            trend: 'negative',
          });
        }

        return insights;
      },
    }),
    {
      name: 'finance-dashboard-store',
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
