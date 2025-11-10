import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ReservationScreen({ route, navigation }) {
  const { title, price } = route.params;

  const [selectedTypes, setSelectedTypes] = useState([]);

  const toggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const vehicles = [
    { type: "Moto", icon: "bicycle" },
    { type: "Voiture", icon: "car-sport" },
    { type: "Bus", icon: "bus" },
    { type: "Camion", icon: "trail-sign" }
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", paddingTop: 50, paddingHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <Ionicons name="menu" size={28} />
        <Text style={{ fontSize: 24, fontWeight: "700" }}>Logo</Text>
        <TouchableOpacity style={{ backgroundColor: "#A4E66E", padding: 12, borderRadius: 10 }}>
          <Text style={{ fontWeight: "700" }}>L</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 18 }}>Réservation</Text>

      {/* DATES */}
      <Text style={{ fontWeight: "600" }}>Date et heure de début</Text>
      <TextInput placeholder="dd/mm/yy" style={input} />

      <Text style={{ fontWeight: "600", marginTop: 14 }}>Date et heure de fin</Text>
      <TextInput placeholder="dd/mm/yy" style={input} />

      {/* VEHICLE SELECTION */}
      <Text style={{ fontWeight: "600", marginTop: 20, marginBottom: 10 }}>Places</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {vehicles.map(v => (
          <TouchableOpacity
            key={v.type}
            onPress={() => toggle(v.type)}
            style={{
              width: 55,
              height: 55,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: selectedTypes.includes(v.type) ? "#A4E66E" : "#FFD6D6"
            }}
          >
            <Ionicons name={v.icon} size={22} />
          </TouchableOpacity>
        ))}
      </View>

      {/* PAYMENT */}
      <Text style={{ fontWeight: "600", marginTop: 25 }}>Mode de paiement</Text>

      <TextInput placeholder="0000 0000 0000 0000" style={input} />
      <TextInput placeholder="Date d’expiration" style={input} />
      <TextInput placeholder="CVV" style={input} />

      {/* PRICE DISPLAY */}
      <Text style={{ textAlign: "center", fontSize: 18, marginTop: 18 }}>Total du montant</Text>
      <Text style={{ textAlign: "center", fontSize: 28, fontWeight: "800", color: "#A019FF" }}>
        {price}
      </Text>

      {/* CONFIRM BUTTON */}
      <TouchableOpacity
        style={{
          backgroundColor: "#DCDCDC",
          paddingVertical: 14,
          borderRadius: 10,
          marginTop: 25,
          marginBottom: 60,
          alignItems: "center"
        }}
        onPress={() => navigation.navigate("Confirmation de la réservation")}
      >
        <Text style={{ fontWeight: "600", color: "#444" }}>Confirmer la réservation</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const input = {
  borderWidth: 1,
  borderRadius: 10,
  padding: 12,
  marginTop: 6
};
