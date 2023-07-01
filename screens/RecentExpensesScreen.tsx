import { useEffect } from "react";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { useExpensesStore } from "../store/useExpensesStore";
import { getDateMinusDays } from "../utils/date";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpensesScreen = () => {
  const { expenses, fetchingState, fetchExpenses } = useExpensesStore();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const date = new Date(expense.date.slice(0,10));
    return date > date7DaysAgo && date <= today;
  });

  useEffect(() => {
    fetchExpenses();
  }, [])

  if (fetchingState.isFetching) {
    return <LoadingOverlay />
  }

  if (fetchingState.isError) {
    return <ErrorOverlay message="Data Fetch Error!" />
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallbackText="No expense registered for the last 7days"
    />
  );
};

export default RecentExpensesScreen;
