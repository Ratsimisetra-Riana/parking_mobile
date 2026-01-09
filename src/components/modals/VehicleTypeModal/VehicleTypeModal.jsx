import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { vehicleTypeModalStyles as styles } from './VehicleTypeModal.styles';
import { colors } from '../../../theme';

export default function VehicleTypeModal({ visible, onClose, options, selected, toggle, loading }) {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modal}>
        <Text style={styles.title}>Types de véhicules</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary.main} />
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : options.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun type de véhicule disponible</Text>
          </View>
        ) : (
          options.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              onPress={() => toggle(vehicle.id)}
              style={[styles.item, selected.includes(vehicle.id) ? styles.itemSelected : styles.itemUnselected]}
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
