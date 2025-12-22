import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import QRCode from 'react-native-qrcode-svg';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

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
      return `Le ${start.toLocaleDateString('fr-FR')} ${start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}-${end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return "Date non disponible";
  };

  const bookingDetails = {
    parkingName: parkingTitle || "Parking",
    location: reservation?.parking?.address || reservation?.parkingAddress || "Adresse non disponible",
    dateTime: formatDateTime(),
    price: totalPrice || reservation?.totalPrice || 0
  };

  // Générer les données pour le QR Code
  const qrData = JSON.stringify({
    reservationId: reservation?.id || `TEMP-${Date.now()}`,
    parkingId: reservation?.parkingId || reservation?.parking?.id,
    parkingName: bookingDetails.parkingName,
    location: bookingDetails.location,
    startDate: startDate,
    endDate: endDate,
    totalPrice: bookingDetails.price,
    userId: reservation?.userId,
    createdAt: new Date().toISOString()
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Header navigation={navigation} />
      </View>

      {/* Contenu scrollable */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Confirmation Message */}
        <View style={styles.confirmationHeader}>
          <Text style={styles.confirmationText}>
            Réservation confirmée
          </Text>
          <Text style={styles.checkmark}>✅</Text>
        </View>

        {/* Booking Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.parkingName}>{bookingDetails.parkingName}</Text>
          <Text style={styles.detailItem}>- {bookingDetails.location}</Text>
          <Text style={styles.detailItem}>- {bookingDetails.dateTime}</Text>
          <Text style={styles.detailItem}>Prix: {bookingDetails.price.toFixed(2)} €</Text>
        </View>

        {/* QR Code */}
        <View style={styles.qrCodeContainer}>
          <QRCode
            value={qrData}
            size={200}
            color="#2D3436"
            backgroundColor="white"
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Mes réservations")}
        >
          <Text style={styles.buttonText}>Voir mes réservations</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <Footer navigation={navigation} activeRoute="Confirmation de la réservation" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingHorizontal: 18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  confirmationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  confirmationText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#2D3436',
  },
  checkmark: {
    fontSize: 22,
  },
  detailsCard: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(164, 230, 110, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(164, 230, 110, 0.3)',
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
    color: '#2D3436',
  },
  detailItem: {
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
  },
  qrCodeContainer: {
    marginTop: 30,
    marginBottom: 30,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#A4E66E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
  },
});

export default ConfirmationScreen;