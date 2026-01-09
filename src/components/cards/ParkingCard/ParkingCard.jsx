import { TouchableOpacity, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { parkingCardStyles as styles } from './ParkingCard.styles';
import { colors } from '../../../theme';

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

  // Déterminer la source de l'image (URI ou require)
  const imageSource = typeof image === 'string' 
    ? { uri: image }  // URL depuis Supabase
    : image;          // require() local

  return (
    <TouchableOpacity
      onPress={openDetails}
      style={styles.card}
    >
      {typeof image === 'string' ? (
        <SupabaseImage
          uri={convertToProxyUrl(image)}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={image}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={14} color={colors.text.secondary} />
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>
            {price}
          </Text>
          
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color={colors.status.warning} />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
