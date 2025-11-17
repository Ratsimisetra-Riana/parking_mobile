import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FilterButton({ label, value, onPress, icon }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.content}>
        {icon && <Ionicons name={icon} size={20} color="#6BBF47" style={styles.icon} />}
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          {value && <Text style={styles.value}>{value}</Text>}
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#B2BEB5" />
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    backgroundColor: "#F8F9FA",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#2D3436",
    fontWeight: "500",
  },
  value: {
    fontSize: 12,
    color: "#636E72",
    marginTop: 2,
  },
};
