import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "../../types/screen/screenType";
import ManageExpensesScreen from "../ManageExpensesScreen";
import BottomTabScreen from "./BottomTabScreen";
import { GlobalStyles } from "../../const/styles";

const StackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="ExpensesOverview"
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500
          },
          headerTintColor: "white",
        }}
      >
        <RootStack.Screen
          name="ExpensesOverview"
          component={BottomTabScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="ManageExpenses"
          component={ManageExpensesScreen}
          options={{
            presentation: "modal"
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default StackScreen;