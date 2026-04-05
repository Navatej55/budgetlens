# FinFlow — Finance Dashboard

A modern, professional-grade personal finance dashboard built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, and **Zustand**. All data is mock-generated — no external APIs are required.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Summary Cards** | Total Balance, Total Income, Total Expenses (dynamically computed) |
| **Balance Trend Chart** | Monthly area chart with income, expenses, and net balance lines |
| **Spending Breakdown** | Donut chart showing top expense categories |
| **Insights Panel** | Top spending category, month-over-month comparison, savings rate, largest expense |
| **Transaction Table** | Full data table with date, description, category, type, and amount |
| **Search, Filter & Sort** | Free-text search, type filter (all/income/expense), category dropdown, date/amount sort |
| **Role-Based UI** | Viewer (read-only) and Admin (add/edit/delete) — toggleable from the header |
| **Add/Edit Modal** | Admin-only form with validation, type-aware category options |
| **Dark/Light Mode** | Toggle in header, persisted to localStorage |
| **Pagination** | 10 rows per page with smart ellipsis navigation |
| **Local Storage** | Zustand `persist` middleware — transactions + role + theme survive refresh |
| **Responsive Design** | Works on mobile, tablet, and desktop |

---

## 🛠 Tech Stack

- **[Next.js 16.2](https://nextjs.org/)** — App Router, Server + Client Components
- **[React 19](https://react.dev/)** — Latest stable
- **[TypeScript 5](https://www.typescriptlang.org/)** — Full type safety
- **[Tailwind CSS v4](https://tailwindcss.com/)** — New `@import 'tailwindcss'` syntax
- **[Zustand](https://zustand-demo.pmnd.rs/)** — Lightweight state management with persist
- **[Recharts](https://recharts.org/)** — Composable chart library for React
- **[Lucide React](https://lucide.dev/)** — Clean icon set

---

## 📁 Project Structure

```
finance-frontend/
├── app/
│   ├── layout.tsx              # Root layout — Inter font, metadata, ThemeProvider
│   ├── page.tsx                # Main dashboard page (Server Component)
│   └── globals.css             # Tailwind v4 + CSS custom properties (dark/light tokens)
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Left navigation sidebar
│   │   ├── Header.tsx          # Top bar: role toggle, dark mode, avatar
│   │   └── ThemeProvider.tsx   # Client component that applies data-theme attribute
│   ├── dashboard/
│   │   ├── SummaryCards.tsx    # 3 summary stat cards
│   │   ├── BalanceChart.tsx    # Recharts AreaChart — monthly balance trends
│   │   ├── SpendingChart.tsx   # Recharts PieChart — spending by category
│   │   └── InsightsPanel.tsx   # Computed insights from transaction data
│   └── transactions/
│       ├── TransactionTable.tsx    # Full table with pagination + modal wiring
│       ├── TransactionRow.tsx      # Single row component with admin controls
│       ├── TransactionFilters.tsx  # Search/filter/sort bar
│       └── AddTransactionModal.tsx # Add/Edit modal with form validation
│
├── data/
│   └── transactions.ts         # 63 realistic mock transactions (Jan–Jul 2025)
│                               # + category color map
│
├── store/
│   └── useFinanceStore.ts      # Zustand store with persist middleware
│                               # All state + computed selectors
│
└── types/
    └── index.ts                # Transaction, Category, Role, FilterState, etc.
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd finance-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## 🎨 Design Decisions

### Color Palette
- **Background**: Deep navy (`#0c0e16`) for a premium fintech feel
- **Primary**: Indigo (`#6366f1`) — consistent accent for interactive elements
- **Income**: Emerald (`#10b981`) — intuitive positive color
- **Expense**: Rose (`#f43f5e`) — clear negative indicator
- **Cards**: Slightly elevated dark (`#13161f`) with subtle borders

### State Management (Zustand)
Chose Zustand over Redux/Context because:
- No boilerplate — store definition is a single function
- `persist` middleware handles localStorage with zero configuration
- All computed values are selectors defined inside the store rather than separate hooks, keeping logic co-located

### Architecture Choices
- **Server vs Client Components**: `page.tsx` and `layout.tsx` are Server Components. Interactive components (charts, table, header, sidebar) are Client Components (`'use client'`)
- **CSS Custom Properties**: Theme tokens defined as CSS variables for smooth dark/light transitions — Tailwind v4 utilities reference these vars via inline style where needed
- **Computed Data**: All derived values (totals, monthly data, category breakdown, insights) are computed inside the Zustand store as selectors — never duplicated in component state

---

## 📊 Mock Data

Located in `data/transactions.ts`, the mock dataset includes:
- **63 transactions** spanning January–July 2025
- **13 categories**: Salary, Freelance, Investment, Food & Dining, Shopping, Housing, Transport, Healthcare, Entertainment, Utilities, Travel, Education, Other
- Realistic amounts reflecting a typical professional's finances (salary ~$5,500–5,800/month)
- The store's `persist` middleware lets you add your own transactions; they'll survive page refresh

---

## 🔐 Role-Based UI

Toggle between **Admin** and **Viewer** in the top-right header:

| Feature | Viewer | Admin |
|---|---|---|
| View all data | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |

---

## 🌙 Dark / Light Mode

Click the **sun/moon** icon in the header. The preference is saved to localStorage via Zustand persist.

---

## 📦 Build for Production

```bash
npm run build
npm start
```
