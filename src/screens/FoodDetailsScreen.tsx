import React, { useState } from "react";
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useCart } from "../context/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "FoodDetails">;

export default function FoodDetailsScreen({ route, navigation }: Props) {
  const { food } = route.params;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const total = food.price * quantity;

  const handleAdd = () => {
    addToCart(food, quantity);
    Alert.alert("Added to Cart", `${quantity} × ${food.name} was added.`, [
      { text: "Continue", style: "cancel" },
      { text: "View Cart", onPress: () => navigation.navigate("Cart") }
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image source={{ uri: food.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name}>{food.name}</Text>
          <Text style={styles.category}>{food.category}</Text>
          <Text style={styles.description}>{food.description}</Text>
          <Text style={styles.price}>₱{food.price}</Text>

          <Text style={styles.label}>Quantity</Text>
          <View style={styles.quantityRow}>
            <Pressable style={styles.circle} onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
              <Text style={styles.circleText}>−</Text>
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable style={styles.circle} onPress={() => setQuantity((q) => q + 1)}>
              <Text style={styles.circleText}>+</Text>
            </Pressable>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>₱{total}</Text>
          </View>

          <Pressable style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>🛒 Add {quantity} to Cart</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF" },
  container: { flex: 1 },
  image: { width: "100%", height: 280 },
  content: { padding: 20 },
  name: { fontSize: 29, fontWeight: "900", color: "#1D3557" },
  category: { marginTop: 5, color: "#E63946", fontWeight: "800" },
  description: { marginTop: 15, color: "#606A75", lineHeight: 22 },
  price: { marginTop: 15, fontSize: 26, fontWeight: "900", color: "#E63946" },
  label: { marginTop: 18, fontWeight: "800", color: "#1D3557" },
  quantityRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  circle: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#E63946", alignItems: "center", justifyContent: "center" },
  circleText: { color: "#FFF", fontSize: 26, lineHeight: 30 },
  quantity: { fontSize: 21, fontWeight: "900", marginHorizontal: 22, color: "#1D3557" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 22 },
  totalLabel: { fontSize: 20, fontWeight: "800" },
  total: { fontSize: 24, fontWeight: "900", color: "#E63946" },
  button: { backgroundColor: "#E63946", padding: 17, borderRadius: 15, marginTop: 20 },
  buttonText: { color: "#FFF", textAlign: "center", fontWeight: "900", fontSize: 16 }
});
