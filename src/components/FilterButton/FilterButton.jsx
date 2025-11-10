import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function FilterButton({ label, value, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text>{label} {value ? value : ""}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    backgroundColor: "#E8F9E7",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
};
