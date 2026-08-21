import React, { useState } from "react";
import { ActivityIndicator, Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const { items, totalItems, totalPrice, increase, decrease, remove, clearCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmOrder = () => {
    setModalVisible(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      Alert.alert("Order Confirmed 🎉", "Your FoodHub order has been placed successfully!");
    }, 1400);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#E63946" />
        <Text style={styles.loadingText}>Processing your order...</Text>
      </SafeAreaView>
    );
  }

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.emptyScreen}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>Add some delicious food from the menu.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🛒 My Cart</Text>
        <Text style={styles.subtitle}>{totalItems} item(s) selected</Text>

        {items.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₱{item.price} each</Text>
            </View>

            <View style={styles.controls}>
              <Pressable style={styles.smallButton} onPress={() => decrease(item.id)}>
                <Text style={styles.smallText}>−</Text>
              </Pressable>
              <Text style={styles.qty}>{item.quantity}</Text>
              <Pressable style={styles.smallButton} onPress={() => increase(item.id)}>
                <Text style={styles.smallText}>+</Text>
              </Pressable>
            </View>

            <Text style={styles.lineTotal}>₱{item.price * item.quantity}</Text>

            <Pressable onPress={() => remove(item.id)} style={styles.remove}>
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        ))}

        <View style={styles.summary}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>₱{totalPrice}</Text>
        </View>

        <Pressable style={styles.checkout} onPress={() => setModalVisible(true)}>
          <Text style={styles.checkoutText}>Place Order</Text>
        </Pressable>

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Confirm Order</Text>
              <Text style={styles.modalText}>
                You are about to place {totalItems} item(s) for ₱{totalPrice}.
              </Text>
              <Pressable style={styles.checkout} onPress={confirmOrder}>
                <Text style={styles.checkoutText}>Confirm Order</Text>
              </Pressable>
              <Pressable style={styles.cancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8FA" },
  content: { padding: 18, paddingBottom: 35 },
  title: { fontSize: 29, fontWeight: "900", color: "#1D3557" },
  subtitle: { color: "#6B7280", marginTop: 5, marginBottom: 15 },
  item: { backgroundColor: "#FFF", borderRadius: 17, padding: 16, marginBottom: 12 },
  itemInfo: { marginBottom: 10 },
  itemName: { fontSize: 18, fontWeight: "900", color: "#1D3557" },
  itemPrice: { color: "#6B7280", marginTop: 3 },
  controls: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start" },
  smallButton: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#E63946", alignItems: "center", justifyContent: "center" },
  smallText: { color: "#FFF", fontSize: 22, lineHeight: 25 },
  qty: { fontSize: 17, fontWeight: "900", marginHorizontal: 15 },
  lineTotal: { position: "absolute", right: 16, top: 20, fontWeight: "900", fontSize: 17, color: "#E63946" },
  remove: { alignSelf: "flex-end", marginTop: 10 },
  removeText: { color: "#9B1C31", fontWeight: "700" },
  summary: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, paddingVertical: 12 },
  totalLabel: { fontSize: 22, fontWeight: "900", color: "#1D3557" },
  total: { fontSize: 24, fontWeight: "900", color: "#E63946" },
  checkout: { backgroundColor: "#E63946", borderRadius: 15, padding: 17, marginTop: 12 },
  checkoutText: { color: "#FFF", textAlign: "center", fontWeight: "900", fontSize: 16 },
  loading: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F7F8FA" },
  loadingText: { marginTop: 12, color: "#59636E" },
  emptyScreen: { flex: 1, alignItems: "center", justifyContent: "center", padding: 25, backgroundColor: "#F7F8FA" },
  emptyEmoji: { fontSize: 65 },
  emptyTitle: { marginTop: 15, fontSize: 25, fontWeight: "900", color: "#1D3557" },
  emptyText: { marginTop: 6, color: "#6B7280", textAlign: "center" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", padding: 22 },
  modal: { backgroundColor: "#FFF", borderRadius: 20, padding: 22 },
  modalTitle: { fontSize: 24, fontWeight: "900", color: "#1D3557" },
  modalText: { color: "#59636E", lineHeight: 21, marginTop: 8 },
  cancel: { padding: 15, alignItems: "center" },
  cancelText: { color: "#1D3557", fontWeight: "800" }
});
