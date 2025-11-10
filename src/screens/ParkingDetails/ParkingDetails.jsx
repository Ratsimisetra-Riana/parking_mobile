import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ParkingDetails({ route, navigation }) {
  const { title, address, price, rating, image } = route.params;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>

      {/* IMAGE HEADER */}
      <Image
        source={image}
        style={{ width: "100%", height: 220 }}
      />

      {/* BACK BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: 8,
          borderRadius: 50
        }}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity>

      {/* CONTENT */}
      <View style={{ padding: 20 }}>

        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          {title}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 6 }}>
          <Ionicons name="location" color="#6BBF47" size={18} />
          <Text style={{ marginLeft: 6, color: "#555" }}>
            {address}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 6 }}>
          <Ionicons name="star" color="#FFD700" size={18} />
          <Text style={{ marginLeft: 6, fontSize: 16 }}>
            {rating} / 5
          </Text>
        </View>

        <Text style={{ fontSize: 18, marginTop: 15, fontWeight: "600", color: "#6BBF47" }}>
          Tarif: {price}
        </Text>

        <Text style={{ marginTop: 14, lineHeight: 20, color: "#555" }}>
          Ce parking est sécurisé, accessible 24h/24 et proche des centres d'activité.
          Vous pouvez réserver rapidement et garantir votre place à l’avance.
        </Text>

      </View>

      {/* RESERVE BUTTON */}
      <View style={{ padding: 20 }}>
       <TouchableOpacity
            onPress={() => navigation.navigate("Réservation", {
                title,
                price
            })}
            style={{ backgroundColor: "#A4E66E", padding: 14, borderRadius: 10, marginTop: 20 }}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>Réserver</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}
