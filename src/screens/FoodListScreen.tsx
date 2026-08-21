import React, { useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { foods } from "../data/foods";
import FoodCard from "../components/FoodCard";

type Props = NativeStackScreenProps<RootStackParamList, "FoodList">;

export default function FoodListScreen({ navigation }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return foods;
    return foods.filter((food) =>
      `${food.name} ${food.category}`.toLowerCase().includes(text)
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>🍴 Food Menu</Text>
        <Text style={styles.subtitle}>Tap an item to see details and add it to your cart.</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search food or category..."
          style={styles.search}
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<Text style={styles.empty}>No food found.</Text>}
        renderItem={({ item }) => (
          <FoodCard
            food={item}
            onPress={() => navigation.navigate("FoodDetails", { food: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8FA" },
  header: { padding: 18 },
  title: { fontSize: 28, fontWeight: "900", color: "#1D3557" },
  subtitle: { color: "#6B7280", marginTop: 5 },
  search: { backgroundColor: "#FFF", borderRadius: 13, borderWidth: 1, borderColor: "#E1E5EA", padding: 14, marginTop: 14 },
  list: { paddingHorizontal: 18, paddingBottom: 25 },
  empty: { textAlign: "center", color: "#6B7280", marginTop: 40 }
});
