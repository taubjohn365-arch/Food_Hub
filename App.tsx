import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { RootStackParamList } from "./src/types/navigation";
import { CartProvider } from "./src/context/CartContext";
import HomeScreen from "./src/screens/HomeScreen";
import FoodListScreen from "./src/screens/FoodListScreen";
import FoodDetailsScreen from "./src/screens/FoodDetailsScreen";
import AddOrderScreen from "./src/screens/AddOrderScreen";
import CartScreen from "./src/screens/CartScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleAlign: "center",
            headerTintColor: "#1D3557",
            headerShadowVisible: false,
            contentStyle: { backgroundColor: "#F7F8FA" }
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "FoodHub" }} />
          <Stack.Screen name="FoodList" component={FoodListScreen} options={{ title: "Food Menu" }} />
          <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} options={{ title: "Food Details" }} />
          <Stack.Screen name="AddOrder" component={AddOrderScreen} options={{ title: "Create Order" }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: "My Cart" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
