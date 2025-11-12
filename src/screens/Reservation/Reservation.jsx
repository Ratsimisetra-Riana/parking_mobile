import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Modal } from "react-native";
import DatePicker from "react-native-date-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reservationService, vehicleService, parkingService } from "../../services";
import Header from "../../components/Header/Header";

export default function ReservationScreen({ route, navigation }) {
  const { parkingId, title, price } = route.params;

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [availabilities, setAvailabilities] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 3600000)); // +1 heure
  const [openPicker, setOpenPicker] = useState(false);
  const [pickerType, setPickerType] = useState('start');
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  // Charger les types de véhicules disponibles
  useEffect(() => {
    loadVehicleTypes();
  }, []);

  // Charger les disponibilités quand les dates changent
  useEffect(() => {
    if (parkingId) {
      loadParkingAvailability();
    }
  }, [startDate, endDate, parkingId]);

  // Recalculer le prix quand les dates ou véhicules changent
  useEffect(() => {
    if (selectedTypes.length > 0 && parkingId) {
      calculatePrice();
    }
  }, [startDate, endDate, selectedTypes]);

  const loadVehicleTypes = async () => {
    try {
      const vehicles = await vehicleService.getAllVehicles();
      setVehicleTypes(vehicles);
    } catch (error) {
      console.error('Erreur chargement véhicules:', error);
      // Utiliser les types par défaut si l'API échoue
      setVehicleTypes([
        { Id_Vehicles: 1, types: "Voiture", icon: "car-sport" },
        { Id_Vehicles: 2, types: "Moto", icon: "bicycle" },
        { Id_Vehicles: 3, types: "Utilitaire", icon: "bus" },
        { Id_Vehicles: 4, types: "Camion", icon: "trail-sign" }
      ]);
    }
  };

  const loadParkingAvailability = async () => {
    try {
      setLoadingAvailability(true);
      const startDateTime = startDate.toISOString();
      const endDateTime = endDate.toISOString();
      
      const data = await parkingService.getParkingAvailability(parkingId, startDateTime, endDateTime);
      
      console.log('📊 Réponse API disponibilités:', data);
      console.log('📊 Nombre de véhicules dans la réponse:', data.vehicleAvailabilities?.length);
      
      // Créer un objet de disponibilité indexé par vehicleTypeId
      const availabilityMap = {};
      data.vehicleAvailabilities.forEach(vehicle => {
        availabilityMap[vehicle.vehicleTypeId] = vehicle;
        console.log(`   🚗 Véhicule ${vehicle.vehicleType} (ID ${vehicle.vehicleTypeId}): ${vehicle.availableCapacity}/${vehicle.totalCapacity} places`);
      });
      
      setAvailabilities(availabilityMap);
      console.log('✅ Disponibilités stockées:', availabilityMap);
    } catch (error) {
      console.error('Erreur chargement disponibilités:', error);
    } finally {
      setLoadingAvailability(false);
    }
  };

  // Formatter la date pour le backend (sans millisecondes ni timezone)
  const formatDateForBackend = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  // Formatter la date pour l'affichage (format 24h)
  const formatDateForDisplay = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} à ${hours}:${minutes}`;
  };

  const calculatePrice = async () => {
    try {
      setLoadingPrice(true);
      
      // Vérifier le token avant l'appel
      const token = await AsyncStorage.getItem('jwt_token');
      
      if (!token) {
        Alert.alert('Erreur', 'Vous devez être connecté pour calculer le prix');
        navigation.navigate('Login');
        return;
      }
      
      // Formater les véhicules sélectionnés selon le format attendu par le backend
      const selectedVehicles = selectedTypes.map(vehicleId => ({
        vehicleTypeId: vehicleId,
        quantity: 1
      }));

      const formattedStartDate = formatDateForBackend(startDate);
      const formattedEndDate = formatDateForBackend(endDate);

      const priceData = await reservationService.calculatePrice({
        parkingId: parkingId,
        startDateTime: formattedStartDate,
        endDateTime: formattedEndDate,
        selectedVehicles: selectedVehicles
      });
      
      setCalculatedPrice(priceData.totalPrice || priceData);
    } catch (error) {
      console.error('Erreur calcul prix:', error);
      // Calculer un prix estimé en cas d'erreur
      const hours = Math.ceil((endDate - startDate) / (1000 * 60 * 60));
      const hourlyRate = parseFloat(price) || 2.5;
      setCalculatedPrice(hours * hourlyRate * selectedTypes.length);
    } finally {
      setLoadingPrice(false);
    }
  };

  const handleConfirmReservation = async () => {
    // Validation
    if (selectedTypes.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner au moins un type de véhicule');
      return;
    }

    if (startDate >= endDate) {
      Alert.alert('Erreur', 'La date de fin doit être après la date de début');
      return;
    }

    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs de paiement');
      return;
    }

    try {
      setLoading(true);
      
      // Vérifier la disponibilité une dernière fois avant de réserver
      await loadParkingAvailability();
      
      // Vérifier que tous les véhicules sélectionnés sont toujours disponibles
      for (const vehicleId of selectedTypes) {
        const availability = availabilities[vehicleId];
        if (!availability || !availability.isAvailable || availability.availableCapacity < 1) {
          Alert.alert(
            'Plus disponible', 
            `Le véhicule n'est plus disponible pour cette période. Veuillez en sélectionner un autre.`,
            [{ text: 'OK', onPress: () => setLoading(false) }]
          );
          return;
        }
      }
      
      // Récupérer l'utilisateur connecté
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      
      if (!user || !user.Id_Users) {
        Alert.alert('Erreur', 'Utilisateur non connecté');
        navigation.navigate('Login');
        return;
      }

      // Créer la réservation
      const selectedVehicles = selectedTypes.map(vehicleId => ({
        vehicleTypeId: vehicleId,
        quantity: 1
      }));

      const formattedStartDate = formatDateForBackend(startDate);
      const formattedEndDate = formatDateForBackend(endDate);

      const reservationData = {
        userId: user.Id_Users,
        parkingId: parkingId,
        startDateTime: formattedStartDate,
        endDateTime: formattedEndDate,
        selectedVehicles: selectedVehicles,
        paymentMethod: 'CARTE_BANCAIRE',
        totalPrice: calculatedPrice
      };

      const reservation = await reservationService.createReservation(reservationData);
      
      Alert.alert('Succès', 'Réservation confirmée !', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Confirmation de la réservation', {
            reservation: reservation,
            parkingTitle: title,
            totalPrice: calculatedPrice,
            startDate: formattedStartDate,
            endDate: formattedEndDate
          })
        }
      ]);

    } catch (error) {
      console.error('Erreur réservation:', error);
      Alert.alert('Erreur', error.message || 'Impossible de créer la réservation');
    } finally {
      setLoading(false);
    }
  };

  const toggle = (vehicleId) => {
    // Vérifier la disponibilité avant de sélectionner
    const availability = availabilities[vehicleId];
    
    if (availability && !availability.isAvailable) {
      Alert.alert(
        'Non disponible', 
        `${availability.vehicleType} n'est pas disponible pour ce parking ou cette période.`
      );
      return;
    }

    setSelectedTypes(prev =>
      prev.includes(vehicleId) ? prev.filter(t => t !== vehicleId) : [...prev, vehicleId]
    );
  };

  const openDateTimePicker = (type) => {
    setPickerType(type);
    setOpenPicker(true);
  };

  const handleDateConfirm = (date) => {
    if (pickerType === 'start') {
      // Vérifier que la date de début n'est pas dans le passé
      if (date < new Date()) {
        Alert.alert('Date invalide', 'La date de début ne peut pas être dans le passé');
        return;
      }
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setOpenPicker(false);
  };

  const vehicles = vehicleTypes.length > 0 ? vehicleTypes : [
    { Id_Vehicle: 1, type: "Moto", icon: "bicycle" },
    { Id_Vehicle: 2, type: "Voiture", icon: "car-sport" },
    { Id_Vehicle: 3, type: "Bus", icon: "bus" },
    { Id_Vehicle: 4, type: "Camion", icon: "trail-sign" }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 50 }}>
      {/* HEADER */}
      <View style={{ paddingHorizontal: 20 }}>
        <Header navigation={navigation} />
      </View>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >

      {/* Modal Menu */}
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={{ 
            position: 'absolute',
            top: 100,
            left: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            width: 250,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}
              onPress={async () => {
                setShowMenu(false);
                const token = await AsyncStorage.getItem('jwt_token');
                const userJson = await AsyncStorage.getItem('user');
                const user = userJson ? JSON.parse(userJson) : null;
                Alert.alert(
                  '✅ Connexion', 
                  `Token: ${token ? token.substring(0, 20) + '...' : 'Aucun'}\nUtilisateur ID: ${user?.Id_Users || 'N/A'}\nUsername: ${user?.user_name || 'N/A'}`
                );
              }}
            >
              <Ionicons name="information-circle-outline" size={22} color="#666" />
              <Text style={{ marginLeft: 10, fontSize: 16 }}>Infos connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
              onPress={async () => {
                setShowMenu(false);
                await AsyncStorage.clear();
                Alert.alert('Déconnecté', 'Reconnectez-vous pour obtenir le nouveau token', [
                  { text: 'OK', onPress: () => navigation.navigate('Login') }
                ]);
              }}
            >
              <Ionicons name="log-out-outline" size={22} color="#ff4444" />
              <Text style={{ marginLeft: 10, fontSize: 16, color: '#ff4444' }}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 18 }}>
        Réservation - {title}
      </Text>

      {/* DATES */}
      <Text style={{ fontWeight: "600" }}>Date et heure de début</Text>
      <TouchableOpacity 
        onPress={() => openDateTimePicker('start')}
        style={input}
      >
        <Text style={{ color: '#333' }}>{formatDateForDisplay(startDate)}</Text>
      </TouchableOpacity>

      <Text style={{ fontWeight: "600", marginTop: 14 }}>Date et heure de fin</Text>
      <TouchableOpacity 
        onPress={() => openDateTimePicker('end')}
        style={input}
      >
        <Text style={{ color: '#333' }}>{formatDateForDisplay(endDate)}</Text>
      </TouchableOpacity>

      {/* VEHICLE SELECTION */}
      <Text style={{ fontWeight: "600", marginTop: 20, marginBottom: 5 }}>
        Places disponibles {loadingAvailability && <ActivityIndicator size="small" color="#A4E66E" />}
      </Text>
      <Text style={{ fontSize: 12, color: "#666", marginBottom: 10, fontStyle: "italic" }}>
        Disponibilités pour la période sélectionnée
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {vehicles.map((v, index) => {
          const vehicleId = v.Id_Vehicles || v.Id_Vehicle || index;
          const availability = availabilities[vehicleId];
          const isAvailable = availability ? availability.isAvailable : true;
          const availableCapacity = availability ? availability.availableCapacity : 0;
          
          // Mapper les icônes du backend vers les icônes Ionicons
          const iconMap = {
            'car-icon': 'car-sport',
            'motorcycle-icon': 'bicycle',
            'van-icon': 'bus',
            'truck-icon': 'car',
            'city-car-icon': 'car-outline',
            'scooter-icon': 'bicycle-outline'
          };
          
          const iconName = iconMap[v.icon] || v.icon || "car";
          
          return (
            <TouchableOpacity
              key={`vehicle-${vehicleId}-${index}`}
              onPress={() => toggle(vehicleId)}
              disabled={!isAvailable || loadingAvailability}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: !isAvailable 
                  ? "#E0E0E0" 
                  : selectedTypes.includes(vehicleId) 
                    ? "#A4E66E" 
                    : "#FFD6D6",
                opacity: !isAvailable ? 0.5 : 1,
                borderWidth: 2,
                borderColor: !isAvailable ? "#999" : selectedTypes.includes(vehicleId) ? "#7AC142" : "#FFB6B6"
              }}
            >
              <Ionicons 
                name={iconName} 
                size={28} 
                color={!isAvailable ? "#666" : selectedTypes.includes(vehicleId) ? "#2C5F2D" : "#8B0000"}
              />
              <Text style={{ 
                fontSize: 10, 
                marginTop: 4, 
                fontWeight: '600',
                color: !isAvailable ? "#666" : "#333"
              }}>
                {v.types || v.type}
              </Text>
              {availability && (
                <Text style={{ 
                  fontSize: 10,  // Augmenté de 9 à 10 pour meilleure lisibilité
                  fontWeight: '600',
                  color: !isAvailable ? "#666" : isAvailable ? "#2C5F2D" : "#555"
                }}>
                  {isAvailable ? `${availableCapacity} dispo` : 'Complet'}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedTypes.length > 0 && (
        <Text style={{ marginTop: 10, color: '#666' }}>
          {selectedTypes.length} véhicule(s) sélectionné(s)
        </Text>
      )}

      {/* PAYMENT */}
      <Text style={{ fontWeight: "600", marginTop: 25 }}>Mode de paiement</Text>

      <TextInput 
        placeholder="Numéro de carte bancaire (16 chiffres)" 
        placeholderTextColor="#999"
        style={input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        maxLength={19}
      />
      <TextInput 
        placeholder="Date d'expiration (MM/AA)" 
        placeholderTextColor="#999"
        style={input}
        value={expiryDate}
        onChangeText={setExpiryDate}
        keyboardType="numeric"
        maxLength={5}
      />
      <TextInput 
        placeholder="Code de sécurité CVV (3 chiffres)" 
        placeholderTextColor="#999"
        style={input}
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
        maxLength={3}
        secureTextEntry
      />

      {/* PRICE DISPLAY */}
      <Text style={{ textAlign: "center", fontSize: 18, marginTop: 18 }}>Total du montant</Text>
      {loadingPrice ? (
        <ActivityIndicator size="small" color="#A019FF" style={{ marginVertical: 10 }} />
      ) : (
        <Text style={{ textAlign: "center", fontSize: 28, fontWeight: "800", color: "#A019FF" }}>
          {calculatedPrice ? `${calculatedPrice.toFixed(2)}$` : price}
        </Text>
      )}

      {/* CONFIRM BUTTON */}
      <TouchableOpacity
        style={{
          backgroundColor: loading ? "#DCDCDC" : "#A4E66E",
          paddingVertical: 14,
          borderRadius: 10,
          marginTop: 25,
          marginBottom: 60,
          alignItems: "center"
        }}
        onPress={handleConfirmReservation}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ fontWeight: "600", color: "#444" }}>Confirmer la réservation</Text>
        )}
      </TouchableOpacity>

      {/* DATE PICKER MODAL */}
      <DatePicker
        modal
        open={openPicker}
        date={pickerType === 'start' ? startDate : endDate}
        onConfirm={handleDateConfirm}
        onCancel={() => setOpenPicker(false)}
        mode="datetime"
        locale="fr"
        is24hourSource="locale"
        title={pickerType === 'start' ? 'Sélectionner la date de début' : 'Sélectionner la date de fin'}
        confirmText="Confirmer"
        cancelText="Annuler"
      />

      </ScrollView>
    </View>
  );
}

const input = {
  borderWidth: 1,
  borderRadius: 10,
  padding: 12,
  marginTop: 6
};
