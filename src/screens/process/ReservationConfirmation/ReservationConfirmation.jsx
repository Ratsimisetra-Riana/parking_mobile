import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import QRCode from 'react-native-qrcode-svg';
import Header from "../../../components/ui/Header/Header";
import Footer from "../../../components/ui/Footer/Footer";
import { reservationConfirmationStyles as styles } from './ReservationConfirmation.styles';
import { colors } from '../../../theme';

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
          <Text style={styles.checkmark}></Text>
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
            color={colors.text.charcoal}
            backgroundColor={colors.background.white}
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

export default ConfirmationScreen;