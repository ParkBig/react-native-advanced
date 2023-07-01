import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useExpensesStore } from "../store/useExpensesStore";

const AllExpensesScreen = () => {
  const { expenses, fetchingState } = useExpensesStore();

  if (fetchingState.isFetching) {
    return <LoadingOverlay />
  }

  if (fetchingState.isError) {
    return <ErrorOverlay message="Data communication Error!" />
  }

  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      fallbackText="No expense registered for the last 7days"
    />
  );
};

export default AllExpensesScreen;
