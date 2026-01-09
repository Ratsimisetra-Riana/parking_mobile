import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { filterButtonStyles as styles } from './FilterButton.styles';
import { colors } from '../../../theme';

export default function FilterButton({ label, value, onPress, icon }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.content}>
        {icon && <Ionicons name={icon} size={20} color={colors.primary.dark} style={styles.icon} />}
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          {value && <Text style={styles.value}>{value}</Text>}
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#B2BEB5" />
      </View>
    </TouchableOpacity>
  );
}
