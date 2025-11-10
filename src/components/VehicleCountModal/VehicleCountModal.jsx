import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

export default function VehicleCountModal({ visible, count, setCount, onClose }) {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modal}>
        <Text style={styles.title}>Nombre de véhicules</Text>

        <TextInput
          keyboardType="number-pad"
          value={count}
          onChangeText={setCount}
          placeholder="Ex: 2"
          style={styles.input}
        />

        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={{ fontWeight: "600" }}>Valider</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = {
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  closeBtn: {
    backgroundColor: "#A4E66E",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
};
