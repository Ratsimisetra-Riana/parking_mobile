import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/Header/Header";

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Récupérer les données passées depuis l'écran de réservation
  const { reservation, parkingTitle, totalPrice, startDate, endDate } = route.params || {};
  
  // Formater la date pour l'affichage
  const formatDateTime = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return `Le ${start.toLocaleDateString('fr-FR')} ${start.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}-${end.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}`;
    }
    return "Date non disponible";
  };

  const bookingDetails = {
    parkingName: parkingTitle || "Parking",
    location: reservation?.parking?.address || reservation?.parkingAddress || "Adresse non disponible",
    dateTime: formatDateTime(),
    price: totalPrice || reservation?.totalPrice || 0
  };

  const handleViewBookings = () => {
    // Logic to navigate to the "My Reservations" screen
    console.log("Navigating to My Reservations");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ➡️ Header (Simplified) */}
      <Header navigation={navigation} />

      {/* ➡️ Confirmation Message */}
      <View style={styles.confirmationHeader}>
        <Text style={styles.confirmationText}>
          Réservation confirmé
        </Text>
        {/* Replace with an actual icon component if using a library */}
        <Text style={styles.checkmark}>✅</Text> 
      </View>

      {/* ➡️ Booking Details Card */}
      <View style={styles.detailsCard}>
        <Text style={styles.parkingName}>{bookingDetails.parkingName}</Text>
        <Text style={styles.detailItem}>- {bookingDetails.location}</Text>
        <Text style={styles.detailItem}>- {bookingDetails.dateTime}</Text>
        <Text style={styles.detailItem}> Prix: {bookingDetails.price.toFixed(2)} €</Text>
      </View>

      {/* ➡️ QR Code */}
      {/* Replace this placeholder with an actual QR code component/image */}
      <Image 
        source={require('../../assets/parking_map.png')} // Replace with actual path or dynamic component
        style={styles.qrCode} 
        accessibilityLabel="QR Code for booking validation"
      />

      {/* ➡️ Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleViewBookings}
      >
        <Text style={styles.buttonText} onPress={() => navigation.navigate("Mes réservations")}>Voir mes réservations</Text>
      </TouchableOpacity>

      {/* ➡️ Bottom Navigation (Simplified) */}
      <View style={styles.bottomNav}>
        {/* You'd use icons and separate components for a real bottom nav */}
        <Text style={styles.navItem}>🏠 Accueil</Text>
        <Text style={styles.navItem}>✔️ Réservations</Text>
        <Text style={styles.navItem}>➕ Publier</Text>
        <Text style={styles.navItem}>💬 Chat</Text>
        <Text style={styles.navItem}>👤 Mon compte</Text>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 10, // Adjust for top spacing
  },

  // --- Confirmation Header Styles ---
  confirmationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
  },
  confirmationText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
  },
  checkmark: {
    fontSize: 22,
    // The screenshot uses a green checkmark icon, use an icon library for a better look
    // If using an emoji, this is fine
  },

  // --- Booking Details Card Styles ---
  detailsCard: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(173, 216, 230, 0.2)', // Light blue/purple background
    borderWidth: 1,
    borderColor: 'rgba(173, 216, 230, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  parkingName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  detailItem: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },

  // --- QR Code Styles ---
  qrCode: {
    width: 250, // Adjust size as needed
    height: 250, // QR codes are usually square
    marginTop: 40,
    marginBottom: 40,
    // You'd replace this with the actual QR code image source or a library component
    backgroundColor: '#000', // Placeholder color to show size
  },

  // --- Button Styles ---
  button: {
    backgroundColor: '#e0e0e0', // Light gray background
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  // --- Bottom Navigation Styles ---
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  navItem: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  }
});

export default ConfirmationScreen;