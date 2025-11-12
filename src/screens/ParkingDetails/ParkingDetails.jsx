import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { parkingService } from "../../services";

export default function ParkingDetails({ route, navigation }) {
  const { parkingId, title: initialTitle, address: initialAddress, price: initialPrice, rating: initialRating, image } = route.params;
  
  console.log('🎯 ParkingDetails - Paramètres reçus:');
  console.log('  - parkingId:', parkingId);
  console.log('  - initialTitle:', initialTitle);
  console.log('  - route.params:', route.params);
  
  const [parking, setParking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParkingDetails();
  }, [parkingId]);

  const loadParkingDetails = async () => {
    try {
      setLoading(true);
      console.log('📡 Chargement parking ID:', parkingId);
      
      if (!parkingId) {
        console.warn('⚠️ parkingId est undefined, utilisation des données initiales');
        setParking({
          label: initialTitle,
          description: initialAddress,
          hourlyRate: parseFloat(initialPrice) || 0,
        });
        return;
      }
      
      const data = await parkingService.getParkingById(parkingId);
      console.log('✅ Réponse API détails parking:', data);
      console.log('   - ID retourné:', data.id_Parking || data.Id_Parking || data.id_parking || data.id);
      console.log('   - Label retourné:', data.label);
      setParking(data);
    } catch (error) {
      console.error('❌ Erreur chargement détails:', error);
      console.error('   Type erreur:', error.response?.status, error.message);
      // Ne pas afficher d'alerte, utiliser les données initiales
      setParking({
        label: initialTitle,
        description: initialAddress,
        hourlyRate: parseFloat(initialPrice) || 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" }}>
        <ActivityIndicator size="large" color="#6BBF47" />
        <Text style={{ marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }

  const title = parking?.label || initialTitle;
  const address = parking?.description || initialAddress;
  const priceValue = parking?.hourlyRate || (initialPrice ? parseFloat(initialPrice.replace('$/heure', '')) : 0);
  const price = `${priceValue}$/heure`;
  const rating = initialRating || 4;

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
            onPress={() => {
              console.log('Navigation vers Réservation avec:', { parkingId, title, price: priceValue });
              navigation.navigate("Réservation", {
                parkingId,
                title,
                price: priceValue.toString()
              });
            }}
            style={{ backgroundColor: "#A4E66E", padding: 14, borderRadius: 10, marginTop: 20 }}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>Réserver</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}
