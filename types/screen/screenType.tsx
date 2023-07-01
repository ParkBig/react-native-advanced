import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  ManageExpenses: { expenseId: string } | undefined;
  ExpensesOverview: undefined;
};
export type RootBottomTabParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};
export type AllParamList = {
  ManageExpenses: { expenseId: string } | undefined;
  ExpensesOverview: undefined;
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

export type UseNavigation = NavigationProp<AllParamList>;

export type ManageExpensesScreenProps = NativeStackScreenProps<RootStackParamList, "ManageExpenses">;

export const RootStack = createNativeStackNavigator<RootStackParamList>();
export const RooTBottomTab = createBottomTabNavigator<RootBottomTabParamList>();
