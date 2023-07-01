import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { Expense } from "../../types/expenses/expenses";

interface Props {
  expenses: Expense[];
}

const ExpensesList = ({ expenses }: Props) => {
  return (
    <FlatList 
      data={expenses} 
      keyExtractor={(item) => item.id} 
      renderItem={({item}) => 
        <ExpenseItem id={item.id} description={item.description} amount={item.amount} date={item.date} />
      } 
    />
  );
};

export default ExpensesList;
