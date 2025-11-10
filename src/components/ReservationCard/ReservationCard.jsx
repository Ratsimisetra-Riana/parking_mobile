import { View, Text} from 'react-native';

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
      default:
        return styles.badgeDefault;
    }
  };

  return (
    <View style={[styles.card, getCardStyle(reservation.color)]}>
      <View>
        <Text style={styles.parkingName}>{reservation.name}</Text>
        <Text style={styles.detailItem}>{reservation.location}</Text>
        <Text style={styles.detailItem}>{reservation.dateTime}</Text>
      </View>
      <View style={[styles.statusBadge, getBadgeStyle(reservation.color)]}>
        <Text style={styles.badgeText}>{reservation.status}</Text>
      </View>
    </View>
  );
};