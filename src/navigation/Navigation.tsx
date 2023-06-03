import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

export type RootStackParamsList = {
  HomeScreen: undefined;
  TransactionsScreen: undefined;
  StatisticsScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
