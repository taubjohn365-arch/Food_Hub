import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Food } from "../types/navigation";

type Props = {
  food: Food;
  onPress: () => void;
};

export default function FoodCard({ food, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={{ uri: food.image }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name}>{food.name}</Text>
          <Text style={styles.price}>₱{food.price}</Text>
        </View>
        <Text style={styles.category}>{food.category}</Text>
        <Text style={styles.description} numberOfLines={2}>{food.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3
  },
  pressed: { opacity: 0.85 },
  image: { width: "100%", height: 175 },
  info: { padding: 15 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  name: { flex: 1, fontSize: 19, fontWeight: "800", color: "#1D3557" },
  price: { fontSize: 18, fontWeight: "800", color: "#E63946" },
  category: { marginTop: 5, color: "#E63946", fontWeight: "700" },
  description: { marginTop: 7, color: "#6B7280", lineHeight: 19 }
});
