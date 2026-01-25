import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { reservationCardStyles as rateButtonStyles } from './ReservationCard.styles';
import { colors } from '../../../theme';
import { useNavigation } from '@react-navigation/native';

// --- ReservationCard Component ---
/**
 * @param {Object} reservation - Données de la réservation
 * @param {Object} styles - Styles externes du parent
 * @param {function} onRate - Callback quand on clique sur "Noter" (optionnel)
 * @param {boolean} hasRated - Indique si déjà noté (optionnel)
 * @param {boolean} hasDispute - Indique si un litige existe déjà (optionnel)
 */
export function ReservationCard ({ reservation, styles, onRate, hasRated = false, hasDispute = false }) {
  const navigation = useNavigation();
  
  // Determine card style based on color
  const getCardStyle = (color) => {
    switch (color) {
      case 'green':
        return styles.cardGreen;
      case 'yellow':
        return styles.cardYellow;
      case 'blue':
        return styles.cardBlue;
      case 'gray':
        return styles.cardGray;
      case 'red':
        return styles.cardRed;
      default:
        return styles.cardDefault;
    }
  };

  // Determine status badge style based on color
  const getBadgeStyle = (color) => {
    switch (color) {
      case 'green':
        return styles.badgeGreen;
      case 'yellow':
        return styles.badgeYellow;
      case 'blue':
        return styles.badgeBlue;
      case 'gray':
        return styles.badgeGray;
      case 'red':
        return styles.badgeRed;
      default:
        return styles.badgeDefault;
    }
  };

  // Vérifier si le bouton "Noter" doit être affiché
  // Seulement si statut = "Terminée" et pas encore noté
  const canRate = reservation.status === 'Terminée' && !hasRated && onRate;

  // Vérifier si le bouton "Signaler" doit être affiché
  // Visible si statut = "Terminée" ou "En cours" et pas déjà de litige
  const canReport = (reservation.status === 'Terminée' || reservation.status === 'En cours') && !hasDispute;

  return (
    <View style={[styles.card, getCardStyle(reservation.color)]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.parkingName}> {reservation.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
          <Ionicons name="location-outline" size={14} color={colors.text.gray.medium} style={{ marginRight: 5 }} />
          <Text style={styles.detailItem}>{reservation.location}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
          <Ionicons name="time-outline" size={14} color={colors.text.gray.medium} style={{ marginRight: 5 }} />
          <Text style={styles.detailItem}>{reservation.dateTime}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
          <Ionicons name="cash-outline" size={14} color={colors.text.gray.medium} style={{ marginRight: 5 }} />
          <Text style={styles.detailItem}>{reservation.totalPrice?.toLocaleString('fr-FR') || '0'} Ar</Text>
        </View>
        {reservation.paymentMethod && reservation.paymentMethod !== 'Non défini' && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
            <Ionicons name="card-outline" size={14} color={colors.text.gray.medium} style={{ marginRight: 5 }} />
            <Text style={styles.detailItem}>{reservation.paymentMethod}</Text>
          </View>
        )}

        {/* Bouton Noter - visible uniquement si réservation terminée et pas encore notée */}
        {canRate && (
          <TouchableOpacity
            style={rateButtonStyles.rateButton}
            onPress={() => onRate(reservation)}
            activeOpacity={0.7}
          >
            <Ionicons name="star-outline" size={16} color={colors.text.darkGreen} />
            <Text style={rateButtonStyles.rateButtonText}>Noter</Text>
          </TouchableOpacity>
        )}

        {/* Bouton QR Code - visible pour réservations "À venir" et "En cours" */}
        {(reservation.status === 'À venir' || reservation.status === 'En cours') && (
          <TouchableOpacity
            style={rateButtonStyles.qrButton}
            onPress={() => navigation.navigate('QRCodeDisplay', { reservation })}
            activeOpacity={0.7}
          >
            <Ionicons name="qr-code-outline" size={16} color={colors.primary.green} />
            <Text style={rateButtonStyles.qrButtonText}>Voir QR Code</Text>
          </TouchableOpacity>
        )}

        {/* Badge "Déjà noté" - visible si terminée et déjà notée */}
        {reservation.status === 'Terminée' && hasRated && (
          <View style={rateButtonStyles.ratedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={colors.primary.bright} />
            <Text style={rateButtonStyles.ratedBadgeText}>Avis envoyé</Text>
          </View>
        )}

        {/* Bouton Signaler - visible si réservation en cours ou terminée */}
        {canReport && (
          <TouchableOpacity
            style={rateButtonStyles.reportButton}
            onPress={() => navigation.navigate('ReportIssue', { 
              reservationId: reservation.id,
              reservationData: reservation
            })}
            activeOpacity={0.7}
          >
            <Ionicons name="warning-outline" size={16} color="#F44336" />
            <Text style={rateButtonStyles.reportButtonText}>Signaler</Text>
          </TouchableOpacity>
        )}

        {/* Badge "Litige signalé" - visible si un litige existe */}
        {hasDispute && (
          <View style={rateButtonStyles.disputeBadge}>
            <Ionicons name="alert-circle" size={14} color="#FFA500" />
            <Text style={rateButtonStyles.disputeBadgeText}>Litige signalé</Text>
          </View>
        )}
      </View>
      <View style={[styles.statusBadge, getBadgeStyle(reservation.color)]}>
        <Text style={styles.badgeText}>{reservation.status}</Text>
      </View>
    </View>
  );
};