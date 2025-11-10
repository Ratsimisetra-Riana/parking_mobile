import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

export default function VehicleTypeModal({ visible, onClose, options, selected, toggle }) {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modal}>
        <Text style={styles.title}>Types de véhicules</Text>

        {options.map((v) => (
          <TouchableOpacity
            key={v}
            onPress={() => toggle(v)}
            style={[styles.item, { backgroundColor: selected.includes(v) ? "#A4E66E" : "#eee" }]}
          >
            <Text>{v}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text>Valider</Text>
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
