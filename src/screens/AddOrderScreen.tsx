import React, { useState } from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { foods } from "../data/foods";
import { useCart } from "../context/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "AddOrder">;

export default function AddOrderScreen({ navigation }: Props) {
  const { addToCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");

  const submit = () => {
    if (!name.trim()) return Alert.alert("Validation Error", "Please enter your name.");
    if (!address.trim()) return Alert.alert("Validation Error", "Please enter your delivery address.");
    if (!foodName.trim()) return Alert.alert("Validation Error", "Please enter a food item.");
    const qty = Number(quantity);
    if (!quantity.trim() || !Number.isInteger(qty) || qty <= 0) {
      return Alert.alert("Validation Error", "Quantity must be a positive whole number.");
    }

    const match = foods.find((food) => food.name.toLowerCase() === foodName.trim().toLowerCase());
    if (!match) {
      return Alert.alert(
        "Food Not Found",
        "Please enter one of the menu names exactly, such as Classic Burger or Cheese Pizza."
      );
    }

    addToCart(match, qty);
    Alert.alert("Order Added", `Your ${qty} × ${match.name} order has been added to the cart.`, [
      { text: "Stay Here", style: "cancel" },
      { text: "View Cart", onPress: () => navigation.navigate("Cart") }
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>📝 Quick Order</Text>
        <Text style={styles.subtitle}>Fill out the form below. All fields are required.</Text>

        <Text style={styles.label}>Customer Name</Text>
        <TextInput style={styles.input} placeholder="e.g. Juan Dela Cruz" value={name} onChangeText={setName} />

        <Text style={styles.label}>Delivery Address</Text>
        <TextInput style={[styles.input, styles.multiline]} placeholder="House number, street, barangay..." value={address} onChangeText={setAddress} multiline />

        <Text style={styles.label}>Food Name</Text>
        <TextInput style={styles.input} placeholder="e.g. Classic Burger" value={foodName} onChangeText={setFoodName} />

        <Text style={styles.hint}>Available: Classic Burger, Cheese Pizza, Crispy Fried Chicken, French Fries, Iced Coffee, Chicken Sandwich</Text>

        <Text style={styles.label}>Quantity</Text>
        <TextInput style={styles.input} placeholder="e.g. 2" value={quantity} onChangeText={setQuantity} keyboardType="number-pad" />

        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Add Order to Cart</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8FA" },
  content: { padding: 20, paddingBottom: 35 },
  title: { fontSize: 29, fontWeight: "900", color: "#1D3557" },
  subtitle: { color: "#6B7280", marginTop: 6, marginBottom: 8 },
  label: { marginTop: 17, marginBottom: 7, fontWeight: "800", color: "#1D3557" },
  input: { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#DDE2E8", borderRadius: 13, padding: 14, fontSize: 15 },
  multiline: { minHeight: 90, textAlignVertical: "top" },
  hint: { color: "#7A828C", fontSize: 12, lineHeight: 17, marginTop: 7 },
  button: { backgroundColor: "#E63946", borderRadius: 15, padding: 17, marginTop: 25 },
  buttonText: { color: "#FFF", textAlign: "center", fontSize: 16, fontWeight: "900" }
});
