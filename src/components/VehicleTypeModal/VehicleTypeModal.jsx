import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";

export default function VehicleTypeModal({ visible, onClose, options, selected, toggle, loading }) {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modal}>
        <Text style={styles.title}>Types de véhicules</Text>

        {loading ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#A4E66E" />
            <Text style={{ marginTop: 10, color: '#666' }}>Chargement...</Text>
          </View>
        ) : options.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#666' }}>Aucun type de véhicule disponible</Text>
          </View>
        ) : (
          options.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              onPress={() => toggle(vehicle.id)}
              style={[styles.item, { backgroundColor: selected.includes(vehicle.id) ? "#A4E66E" : "#eee" }]}
            >
              <Text>{vehicle.name}</Text>
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text>Fermer</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = {
  modal: { backgroundColor: "#fff", padding: 20, borderRadius: 12 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 15 },
  item: { padding: 12, borderRadius: 6, marginVertical: 5 },
  closeBtn: { backgroundColor: "#A4E66E", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
};
