import IconButton from "../../components/ui/IconButton";
import { GlobalStyles } from "../../const/styles";
import { RooTBottomTab, UseNavigation } from "../../types/screen/screenType";
import AllExpensesScreen from "../AllExpensesScreen";
import RecentExpensesScreen from "../RecentExpensesScreen";
import { Ionicons } from "@expo/vector-icons";

const BottomTabScreen = () => {
  return (
    <RooTBottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpenses");
            }}
          />
        ),
      })}
    >
      <RooTBottomTab.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="hourglass" />
          ),
        }}
      />
      <RooTBottomTab.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="calendar" />
          ),
        }}
      />
    </RooTBottomTab.Navigator>
  );
};

export default BottomTabScreen;
