import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert, StyleSheet, ImageBackground } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { parkingService } from "../../services";
import Footer from "../../components/Footer/Footer";
import exempleImage from '../../assets/image.png';

// Mapping des icônes de véhicules
const getVehicleIcon = (iconName) => {
  const iconMap = {
    'car-icon': 'car',
    'bike-icon': 'bicycle',
    'motorcycle-icon': 'bicycle', // ou 'motorcycle' si disponible
    'van-icon': 'bus',
    'truck-icon': 'car-sport',
    'scooter-icon': 'bicycle',
  };
  return iconMap[iconName] || 'car'; // Icône par défaut
};

export default function ParkingDetails({ route, navigation }) {
  const { parkingId, title: initialTitle, address: initialAddress, price: initialPrice, rating: initialRating, image } = route.params;
  
  console.log('🎯 ParkingDetails - Paramètres reçus:');
  console.log('  - parkingId:', parkingId);
  console.log('  - initialTitle:', initialTitle);
  console.log('  - route.params:', route.params);
  
  const [parking, setParking] = useState(null);
  const [availability, setAvailability] = useState(null);
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
      console.log('   - ID retourné:', data.Id_Parking || data.id_Parking || data.id);
      console.log('   - Label retourné:', data.label);
      console.log('   - User retourné:', data.user);
      setParking(data);

      // Charger la disponibilité du parking
      try {
        const availabilityData = await parkingService.getParkingAvailability(parkingId);
        console.log('✅ Disponibilité parking:', availabilityData);
        setAvailability(availabilityData);
      } catch (availError) {
        console.error('⚠️ Erreur chargement disponibilité:', availError);
        // Ne pas bloquer si la disponibilité n'est pas disponible
      }
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6BBF47" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  const title = parking?.label || initialTitle;
  const address = parking?.description || initialAddress;
  const priceValue = parking?.hourlyRate || (initialPrice ? parseFloat(initialPrice.replace('$/heure', '')) : 0);
  const price = `${priceValue}$/heure`;
  const rating = initialRating || 4;
  const userName = parking?.user ? `${parking.user.name || ''} ${parking.user.first_name || ''}`.trim() : 'Propriétaire';

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
      <ImageBackground
        source={exempleImage}
        style={styles.imageHeader}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="location" color="#6BBF47" size={18} />
          <Text style={styles.infoText}>{address}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.ownerContainer}>
            <View>
                <Text style={styles.ownerLabel}>Proposé par</Text>
                <Text style={styles.ownerName}>{userName}</Text>
            </View>
        </View>

        <View style={styles.separator} />


        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Note</Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name="star"
                color={i < rating ? "#FFD700" : "#E0E0E0"}
                size={18}
              />
            ))}
            <Text style={styles.ratingText}>{rating} / 5</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Ce parking est sécurisé, accessible 24h/24 et proche des centres d'activité.
          Vous pouvez réserver rapidement et garantir votre place à l'avance.
        </Text>

        {/* DISPONIBILITÉS HORAIRES */}
        {availability && availability.availabilitySchedule && (
          <View style={styles.scheduleSection}>
            <Text style={styles.scheduleTitle}>Disponibilités</Text>
            <View style={styles.scheduleContent}>
              <Ionicons name="time-outline" size={20} color="#6BBF47" style={styles.scheduleIcon} />
              <Text style={styles.scheduleText}>{availability.availabilitySchedule}</Text>
            </View>
          </View>
        )}

        {/* PLACES DISPONIBLES PAR TYPE DE VÉHICULE */}
        {availability && availability.vehicleAvailabilities && availability.vehicleAvailabilities.length > 0 && (
          <View style={styles.availabilitySection}>
            <Text style={styles.availabilityTitle}>Places disponibles</Text>
            {availability.vehicleAvailabilities
              .filter(va => va.totalCapacity > 0) // Afficher seulement les types acceptés
              .map((vehicleAvail, index) => (
                <View key={index} style={styles.vehicleAvailRow}>
                  <View style={styles.vehicleInfo}>
                    <Ionicons 
                      name={getVehicleIcon(vehicleAvail.vehicleIcon)} 
                      size={24} 
                      color="#6BBF47" 
                      style={styles.vehicleIconStyle}
                    />
                    <Text style={styles.vehicleType}>{vehicleAvail.vehicleType}</Text>
                  </View>
                  <View style={styles.capacityInfo}>
                    <Text style={[
                      styles.capacityText,
                      vehicleAvail.availableCapacity === 0 && styles.capacityTextUnavailable
                    ]}>
                      {vehicleAvail.availableCapacity} / {vehicleAvail.totalCapacity} places
                    </Text>
                    {vehicleAvail.availableCapacity === 0 && (
                      <Text style={styles.unavailableLabel}>Complet</Text>
                    )}
                  </View>
                </View>
              ))}
          </View>
        )}

        <View style={styles.footer}>
            <Text style={styles.price}>{price}</Text>
            <TouchableOpacity
                onPress={() => {
                console.log('Navigation vers Réservation avec:', { parkingId, title, price: priceValue });
                navigation.navigate("Réservation", {
                    parkingId,
                    title,
                    price: priceValue.toString()
                });
                }}
                style={styles.reserveButton}>
                <Text style={styles.reserveButtonText}>Réserver</Text>
            </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
    
    {/* FOOTER */}
    <Footer navigation={navigation} activeRoute="Détails du parking" />
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    imageHeader: {
        width: '100%',
        height: 250,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 50,
    },
    contentContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        padding: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoText: {
        marginLeft: 8,
        color: '#555',
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#EFEFEF',
        marginVertical: 15,
    },
    ownerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ownerLabel: {
        fontSize: 14,
        color: '#888',
    },
    ownerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    ratingContainer: {
        marginBottom: 15,
    },
    ratingLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#555',
    },
    description: {
        marginTop: 10,
        lineHeight: 22,
        color: '#555',
        fontSize: 15,
    },
    scheduleSection: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#EFEFEF',
    },
    scheduleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    scheduleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        padding: 15,
        borderRadius: 10,
    },
    scheduleIcon: {
        marginRight: 10,
    },
    scheduleText: {
        fontSize: 15,
        color: '#555',
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#EFEFEF',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6BBF47',
    },
    reserveButton: {
        backgroundColor: '#A4E66E',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
    },
    reserveButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333'
    },
    availabilitySection: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#EFEFEF',
    },
    availabilityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    vehicleAvailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    vehicleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    vehicleIconStyle: {
        marginRight: 12,
    },
    vehicleType: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    capacityInfo: {
        alignItems: 'flex-end',
    },
    capacityText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6BBF47',
    },
    capacityTextUnavailable: {
        color: '#999',
    },
    unavailableLabel: {
        fontSize: 12,
        color: '#FF6B6B',
        marginTop: 2,
    },
});
