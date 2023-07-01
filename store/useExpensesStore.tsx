import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { UseExpensesStoreType } from "../types/store/useExpensesStoreType";
import {
  fetchExpensesREQ,
  addExpenseREQ,
  deleteExpenseREQ,
  updateExpenseREQ,
} from "../utils/http";

export const useExpensesStore = create(
  immer<UseExpensesStoreType>((set) => ({
    expenses: [],
    fetchingState: {
      isFetching: false,
      isError: false,
    },
    fetchExpenses: async () => {
      set((state) => {
        state.fetchingState.isFetching = true;
      });

      try {
        const expenses = await fetchExpensesREQ();
        set((state) => {
          state.expenses = expenses;
          state.fetchingState.isFetching = false;
          state.fetchingState.isError = false;
        });
      } catch (err) {
        set((state) => {
          state.fetchingState.isError = true;
          state.fetchingState.isFetching = false;
        });
      }
    },
    addExpense: async (expenseData) => {
      set((state) => {
        state.fetchingState.isFetching = true;
      });

      try {
        const id = await addExpenseREQ(expenseData);
        set((state) => {
          state.fetchingState.isFetching = false;
          state.fetchingState.isError = false;
          state.expenses = [{ ...expenseData, id }, ...state.expenses];
        });
      } catch (err) {
        set((state) => {
          state.fetchingState.isError = true;
          state.fetchingState.isFetching = false;
        });
      }
    },
    deleteExpense: async (id) => {
      // https 요청용
      set((state) => {
        state.fetchingState.isFetching = true;
      });

      try {
        await deleteExpenseREQ(id);
        set((state) => {
          state.fetchingState.isFetching = false;
          state.fetchingState.isError = false;
        });
      } catch (err) {
        set((state) => {
          state.fetchingState.isError = true;
          state.fetchingState.isFetching = false;
        });
      }

      // client용
      set((state) => {
        state.expenses = state.expenses.filter((expense) => expense.id !== id);
      });
    },
    updateExpense: async (id, expenseData) => {
      // https 요청용
      set((state) => {
        state.fetchingState.isFetching = true;
      });

      try {
        await updateExpenseREQ(id, expenseData);
        set((state) => {
          state.fetchingState.isFetching = false;
          state.fetchingState.isError = false;
        });
      } catch (err) {
        set((state) => {
          state.fetchingState.isError = true;
          state.fetchingState.isFetching = false;
        });
      }

      // client용
      set((state) => {
        const updatableExpenseIndex = state.expenses.findIndex(
          (expense) => expense.id === id
        );
        const updatableExpense = state.expenses[updatableExpenseIndex];
        const updatedItem = { ...updatableExpense, ...expenseData };
        state.expenses[updatableExpenseIndex] = updatedItem;
      });
    },
  }))
);
