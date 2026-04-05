export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Food & Dining'
  | 'Shopping'
  | 'Housing'
  | 'Transport'
  | 'Healthcare'
  | 'Entertainment'
  | 'Utilities'
  | 'Travel'
  | 'Education'
  | 'Other';

export type Role = 'admin' | 'viewer';

export interface Transaction {
  id: string;
  date: string; // ISO date string
  description: string;
  category: Category;
  type: TransactionType;
  amount: number;
}

export interface SummaryStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryData {
  category: Category;
  amount: number;
  percentage: number;
  color: string;
}

export interface Insight {
  title: string;
  value: string;
  description: string;
  trend: 'positive' | 'negative' | 'neutral';
}

export type SortField = 'date' | 'amount' | 'category' | 'type';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  search: string;
  type: TransactionType | 'all';
  category: Category | 'all';
  sortField: SortField;
  sortDirection: SortDirection;
}
