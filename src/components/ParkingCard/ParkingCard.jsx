import { TouchableOpacity, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function ParkingCard({ title, address, price, rating, image }) {
  const navigation = useNavigation();

  function openDetails() {
    navigation.navigate("Détails du parking", {
      title,
      address,
      price,
      rating,
      image
    });
  }

  return (
    <TouchableOpacity
      onPress={openDetails}
      style={{ width: 200, marginRight: 15 }}
    >
      <Image
        source={image}
        style={{ width: "100%", height: 120, borderRadius: 10 }}
      />

      <Text style={{ fontWeight: "bold", marginTop: 8, fontSize: 16 }}>
        {title}
      </Text>

      <Text style={{ color: "#555", marginBottom: 4 }}>
        {address}
      </Text>

      <Text style={{ fontWeight: "600", color: "#6BBF47" }}>
        {price}
      </Text>

      <Text style={{ marginTop: 4 }}>
        ⭐ {rating}
      </Text>
    </TouchableOpacity>
  );
}
