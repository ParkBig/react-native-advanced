import axios from "axios";
import { Expense, ExpenseProps } from "../types/expenses/expenses";

const axiosIns = axios.create({
  baseURL: "https://react-native-prac-58e11-default-rtdb.firebaseio.com",
});

export const fetchExpensesREQ = async () => {
  const { data }: { data: Record<string, Expense> } = await axiosIns.get(
    "/expenses.json"
  );

  const expenses: Expense[] = [];
  for (const key in data) {
    const expenseObj = {
      id: key,
      amount: data[key].amount,
      date: data[key].date,
      description: data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const addExpenseREQ = async (expenseData: ExpenseProps) => {
  const { data } = await axiosIns.post("/expenses.json", expenseData);
  const id = data.name;
  return id;
};

export const updateExpenseREQ = (id: string, expenseData: ExpenseProps) => {
  return axiosIns.put(`/expenses/${id}.json`, expenseData);
};

export const deleteExpenseREQ = (id: string) => {
  return axiosIns.delete(`/expenses/${id}.json`);
};
