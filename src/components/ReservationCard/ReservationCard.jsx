import { View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- ReservationCard Component ---
export function ReservationCard ({ reservation, styles }) {
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

  return (
    <View style={[styles.card, getCardStyle(reservation.color)]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.parkingName}> {reservation.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
          <Ionicons name="location-outline" size={14} color="#666" style={{ marginRight: 5 }} />
          <Text style={styles.detailItem}>{reservation.location}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
          <Ionicons name="time-outline" size={14} color="#666" style={{ marginRight: 5 }} />
          <Text style={styles.detailItem}>{reservation.dateTime}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
          <Ionicons name="cash-outline" size={14} color="#666" style={{ marginRight: 5 }} />
          <Text style={styles.detailItem}>{reservation.totalPrice?.toLocaleString('fr-FR') || '0'} Ar</Text>
        </View>
        {reservation.paymentMethod && reservation.paymentMethod !== 'Non défini' && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
            <Ionicons name="card-outline" size={14} color="#666" style={{ marginRight: 5 }} />
            <Text style={styles.detailItem}>{reservation.paymentMethod}</Text>
          </View>
        )}
      </View>
      <View style={[styles.statusBadge, getBadgeStyle(reservation.color)]}>
        <Text style={styles.badgeText}>{reservation.status}</Text>
      </View>
    </View>
  );
};