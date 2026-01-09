import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { vehicleCountModalStyles as styles } from './VehicleCountModal.styles';

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
          <Text style={styles.closeBtnText}>Valider</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
