import { StyleSheet, View } from "react-native";
import { ManageExpensesScreenProps } from "../types/screen/screenType";
import { useLayoutEffect } from "react";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../const/styles";
import { useExpensesStore } from "../store/useExpensesStore";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { ExpenseProps } from "../types/expenses/expenses";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const ManageExpensesScreen = ({
  route,
  navigation,
}: ManageExpensesScreenProps) => {
  const { expenses, fetchingState, addExpense, updateExpense, deleteExpense } =
    useExpensesStore();

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData: ExpenseProps) => {
    if (isEditing) {
      await updateExpense(editedExpenseId, expenseData);
    } else {
      await addExpense(expenseData);
    }
    navigation.goBack();
  };

  const deleteExpenseHandler = async () => {
    if (editedExpenseId) {
      await deleteExpense(editedExpenseId);
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  if (fetchingState.isFetching) {
    return <LoadingOverlay />
  }

  if (fetchingState.isError) {
    return <ErrorOverlay message="Data communication Error!" />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValue={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
