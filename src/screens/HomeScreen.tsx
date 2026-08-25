import React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useCart } from "../context/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { totalItems } = useCart();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.logo}>🍔 FoodHub</Text>
          <Text style={styles.tagline}>Good food. Great mood. Delivered.</Text>
          <Text style={styles.small}>Order your favorites quickly and easily.</Text>
        </View>

        <Text style={styles.heading}>What are you craving?</Text>

        <View style={styles.categories}>
  <Pressable
    style={styles.category}
    onPress={() => navigation.navigate("FoodList", { category: "Burgers" })}
  >
    <Text style={styles.categoryText}>🍔 Burgers</Text>
  </Pressable>

  <Pressable
    style={styles.category}
    onPress={() => navigation.navigate("FoodList", { category: "Pizza" })}
  >
    <Text style={styles.categoryText}>🍕 Pizza</Text>
  </Pressable>

  <Pressable
    style={styles.category}
    onPress={() => navigation.navigate("FoodList", { category: "Chicken" })}
  >
    <Text style={styles.categoryText}>🍗 Chicken</Text>
  </Pressable>

  <Pressable
    style={styles.category}
    onPress={() => navigation.navigate("FoodList", { category: "Drinks" })}
  >
    <Text style={styles.categoryText}>🥤 Drinks</Text>
  </Pressable>
</View>

        <Pressable style={styles.primary} onPress={() => navigation.navigate("FoodList")}>
          <Text style={styles.primaryText}>Browse Food Menu →</Text>
        </Pressable>

        <Pressable style={styles.secondary} onPress={() => navigation.navigate("AddOrder")}>
          <Text style={styles.secondaryText}>📝 Create Quick Order</Text>
        </Pressable>

        <Pressable style={styles.cart} onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.cartText}>🛒 My Cart ({totalItems})</Text>
        </Pressable>

  
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8FA" },
  content: { padding: 20, paddingBottom: 35 },
  hero: { backgroundColor: "#FFE8E6", borderRadius: 24, padding: 24, marginBottom: 25 },
  logo: { fontSize: 34, fontWeight: "900", color: "#1D3557" },
  tagline: { marginTop: 8, fontSize: 19, fontWeight: "800", color: "#E63946" },
  small: { marginTop: 7, color: "#5B6470" },
  heading: { fontSize: 23, fontWeight: "900", color: "#1D3557", marginBottom: 14 },
  categories: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  category: { backgroundColor: "#FFF", paddingVertical: 14, paddingHorizontal: 13, borderRadius: 15, borderWidth: 1, borderColor: "#E5E7EB" },
  categoryText: { fontWeight: "700", color: "#374151" },
  primary: { backgroundColor: "#E63946", padding: 17, borderRadius: 15, marginTop: 25 },
  primaryText: { color: "#FFF", textAlign: "center", fontSize: 17, fontWeight: "900" },
  secondary: { backgroundColor: "#1D3557", padding: 17, borderRadius: 15, marginTop: 12 },
  secondaryText: { color: "#FFF", textAlign: "center", fontSize: 17, fontWeight: "900" },
  cart: { backgroundColor: "#FFF", padding: 16, borderRadius: 15, marginTop: 12, borderWidth: 1, borderColor: "#D9DEE5" },
  cartText: { color: "#1D3557", textAlign: "center", fontWeight: "900", fontSize: 16 }
  
});
