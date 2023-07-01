interface UseStateProps {
  value: string;
  isValid: boolean
}

export interface UseExpenseState {
  amount: UseStateProps;
  date: UseStateProps;
  description: UseStateProps;
}

export interface ExpenseProps {
  description: string;
  amount: number;
  date: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
}