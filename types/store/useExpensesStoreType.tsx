import { Expense, ExpenseProps } from "../expenses/expenses";

interface FetchingState {
  isFetching: boolean;
  isError: boolean;
}

export interface UseExpensesStoreType {
  expenses: Expense[];
  fetchingState: FetchingState;
  fetchExpenses: () => void;
  addExpense: (expenseData: ExpenseProps) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expenseData: ExpenseProps) => void;
}
