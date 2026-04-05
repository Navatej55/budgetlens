import { Transaction, Category } from '@/types';

export const CATEGORY_COLORS: Record<Category, string> = {
  Salary: '#6366f1',
  Freelance: '#8b5cf6',
  Investment: '#06b6d4',
  'Food & Dining': '#f97316',
  Shopping: '#ec4899',
  Housing: '#f43f5e',
  Transport: '#f59e0b',
  Healthcare: '#10b981',
  Entertainment: '#a78bfa',
  Utilities: '#64748b',
  Travel: '#0ea5e9',
  Education: '#14b8a6',
  Other: '#94a3b8',
};

export const INCOME_CATEGORIES: Category[] = ['Salary', 'Freelance', 'Investment'];
export const EXPENSE_CATEGORIES: Category[] = [
  'Food & Dining',
  'Shopping',
  'Housing',
  'Transport',
  'Healthcare',
  'Entertainment',
  'Utilities',
  'Travel',
  'Education',
  'Other',
];

export const mockTransactions: Transaction[] = [
  // January 2025
  { id: 't001', date: '2025-01-03', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 5500 },
  { id: 't002', date: '2025-01-05', description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 1400 },
  { id: 't003', date: '2025-01-08', description: 'Grocery Shopping', category: 'Food & Dining', type: 'expense', amount: 210 },
  { id: 't004', date: '2025-01-10', description: 'Netflix & Spotify', category: 'Entertainment', type: 'expense', amount: 28 },
  { id: 't005', date: '2025-01-12', description: 'Freelance Design Project', category: 'Freelance', type: 'income', amount: 850 },
  { id: 't006', date: '2025-01-15', description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 95 },
  { id: 't007', date: '2025-01-18', description: 'Dinner Out', category: 'Food & Dining', type: 'expense', amount: 67 },
  { id: 't008', date: '2025-01-22', description: 'Gym Membership', category: 'Healthcare', type: 'expense', amount: 45 },
  { id: 't009', date: '2025-01-25', description: 'Online Course — React Advanced', category: 'Education', type: 'expense', amount: 129 },
  { id: 't010', date: '2025-01-28', description: 'Uber Rides', category: 'Transport', type: 'expense', amount: 54 },

  // February 2025
  { id: 't011', date: '2025-02-03', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 5500 },
  { id: 't012', date: '2025-02-05', description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 1400 },
  { id: 't013', date: '2025-02-08', description: 'Stock Dividend — AAPL', category: 'Investment', type: 'income', amount: 320 },
  { id: 't014', date: '2025-02-10', description: 'Valentines Dinner', category: 'Food & Dining', type: 'expense', amount: 145 },
  { id: 't015', date: '2025-02-12', description: 'New Laptop Accessories', category: 'Shopping', type: 'expense', amount: 230 },
  { id: 't016', date: '2025-02-15', description: 'Internet Bill', category: 'Utilities', type: 'expense', amount: 60 },
  { id: 't017', date: '2025-02-20', description: 'Freelance Consulting', category: 'Freelance', type: 'income', amount: 600 },
  { id: 't018', date: '2025-02-22', description: 'Doctor Visit', category: 'Healthcare', type: 'expense', amount: 85 },
  { id: 't019', date: '2025-02-27', description: 'Coffee & Snacks', category: 'Food & Dining', type: 'expense', amount: 38 },

  // March 2025
  { id: 't020', date: '2025-03-03', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 5500 },
  { id: 't021', date: '2025-03-05', description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 1400 },
  { id: 't022', date: '2025-03-07', description: 'Grocery Run', category: 'Food & Dining', type: 'expense', amount: 195 },
  { id: 't023', date: '2025-03-10', description: 'Weekend Trip — Boston', category: 'Travel', type: 'expense', amount: 480 },
  { id: 't024', date: '2025-03-14', description: 'Freelance Website Build', category: 'Freelance', type: 'income', amount: 1200 },
  { id: 't025', date: '2025-03-18', description: 'Spring Clothing Haul', category: 'Shopping', type: 'expense', amount: 310 },
  { id: 't026', date: '2025-03-22', description: 'Gas & Electric', category: 'Utilities', type: 'expense', amount: 110 },
  { id: 't027', date: '2025-03-28', description: 'Movie Night', category: 'Entertainment', type: 'expense', amount: 35 },

  // April 2025
  { id: 't028', date: '2025-04-03', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 5500 },
  { id: 't029', date: '2025-04-05', description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 1400 },
  { id: 't030', date: '2025-04-08', description: 'Investment Returns — ETF', category: 'Investment', type: 'income', amount: 540 },
  { id: 't031', date: '2025-04-10', description: 'Grocery Shopping', category: 'Food & Dining', type: 'expense', amount: 220 },
  { id: 't032', date: '2025-04-15', description: 'Dental Checkup', category: 'Healthcare', type: 'expense', amount: 150 },
  { id: 't033', date: '2025-04-18', description: 'Uber Rides', category: 'Transport', type: 'expense', amount: 42 },
  { id: 't034', date: '2025-04-22', description: 'Freelance UI Design', category: 'Freelance', type: 'income', amount: 750 },
  { id: 't035', date: '2025-04-25', description: 'Amazon Shopping', category: 'Shopping', type: 'expense', amount: 178 },
  { id: 't036', date: '2025-04-29', description: 'Concert Tickets', category: 'Entertainment', type: 'expense', amount: 120 },

  // May 2025
  { id: 't037', date: '2025-05-03', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 5500 },
  { id: 't038', date: '2025-05-05', description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 1400 },
  { id: 't039', date: '2025-05-10', description: 'Farmers Market', category: 'Food & Dining', type: 'expense', amount: 95 },
  { id: 't040', date: '2025-05-12', description: 'Online Course — Python', category: 'Education', type: 'expense', amount: 79 },
  { id: 't041', date: '2025-05-15', description: 'Flight Tickets — Miami', category: 'Travel', type: 'expense', amount: 380 },
  { id: 't042', date: '2025-05-20', description: 'Freelance Data Analysis', category: 'Freelance', type: 'income', amount: 950 },
  { id: 't043', date: '2025-05-22', description: 'Pharmacy', category: 'Healthcare', type: 'expense', amount: 65 },
  { id: 't044', date: '2025-05-28', description: 'Gas Bill', category: 'Utilities', type: 'expense', amount: 75 },
  { id: 't045', date: '2025-05-30', description: 'Subway Pass', category: 'Transport', type: 'expense', amount: 110 },

  // June 2025
  { id: 't046', date: '2025-06-03', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 5800 },
  { id: 't047', date: '2025-06-05', description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 1400 },
  { id: 't048', date: '2025-06-08', description: 'Restaurant Week', category: 'Food & Dining', type: 'expense', amount: 260 },
  { id: 't049', date: '2025-06-10', description: 'Stock Returns — TSLA', category: 'Investment', type: 'income', amount: 680 },
  { id: 't050', date: '2025-06-15', description: 'Summer Fashion', category: 'Shopping', type: 'expense', amount: 420 },
  { id: 't051', date: '2025-06-18', description: 'Electric Bill', category: 'Utilities', type: 'expense', amount: 130 },
  { id: 't052', date: '2025-06-22', description: 'Weekend Getaway — NYC', category: 'Travel', type: 'expense', amount: 650 },
  { id: 't053', date: '2025-06-25', description: 'Freelance Brand Identity', category: 'Freelance', type: 'income', amount: 1500 },
  { id: 't054', date: '2025-06-28', description: 'Spotify Family Plan', category: 'Entertainment', type: 'expense', amount: 15 },

  // July 2025
  { id: 't055', date: '2025-07-03', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 5800 },
  { id: 't056', date: '2025-07-05', description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 1400 },
  { id: 't057', date: '2025-07-08', description: 'Independence Day BBQ', category: 'Food & Dining', type: 'expense', amount: 180 },
  { id: 't058', date: '2025-07-12', description: 'Gym Upgrade', category: 'Healthcare', type: 'expense', amount: 60 },
  { id: 't059', date: '2025-07-15', description: 'Car Insurance', category: 'Transport', type: 'expense', amount: 220 },
  { id: 't060', date: '2025-07-20', description: 'ETF Dividend', category: 'Investment', type: 'income', amount: 410 },
  { id: 't061', date: '2025-07-22', description: 'Tech Gadgets', category: 'Shopping', type: 'expense', amount: 395 },
  { id: 't062', date: '2025-07-25', description: 'Freelance App Development', category: 'Freelance', type: 'income', amount: 2000 },
  { id: 't063', date: '2025-07-28', description: 'Internet & Phone', category: 'Utilities', type: 'expense', amount: 120 },
];
