import { TouchableOpacity, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export function ParkingCard({ title, address, price, rating, image, onPress, parkingId }) {
  const navigation = useNavigation();

  function openDetails() {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("Détails du parking", {
        parkingId,
        title,
        address,
        price,
        rating,
        image
      });
    }
  }

  return (
    <TouchableOpacity
      onPress={openDetails}
      style={styles.card}
    >
      <Image
        source={image}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={14} color="#636E72" />
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>
            {price}
          </Text>
          
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFA500" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  card: {
    width: 220,
    marginRight: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "#2D3436",
    marginBottom: 6,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  address: {
    color: "#636E72",
    fontSize: 13,
    marginLeft: 4,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontWeight: "700",
    color: "#6BBF47",
    fontSize: 15,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#2D3436",
    fontWeight: "600",
  },
};
