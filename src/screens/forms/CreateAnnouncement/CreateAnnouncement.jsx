import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ownerService from '../../../services/ownerService';
import parkingService from '../../../services/parkingService';
import announcementService from '../../../services/announcementService';
import { createAnnouncementStyles as styles } from './CreateAnnouncement.styles';

const CreateAnnouncement = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { parkingId: initialParkingId } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  
  // Données du formulaire
  const [selectedParkingId, setSelectedParkingId] = useState(initialParkingId || null);
  const [myParkings, setMyParkings] = useState([]);
  const [parkingVehicles, setParkingVehicles] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState([]); // [{parkingVehicleId, numbers}]
  
  // Type de disponibilité
  const [availabilityType, setAvailabilityType] = useState('recurring'); // 'recurring' ou 'calendar'
  
  // Disponibilités récurrentes
  const [weekdayEnabled, setWeekdayEnabled] = useState(false);
  const [weekdayHours, setWeekdayHours] = useState({ start: '08:00', end: '19:00' });
  const [weekendEnabled, setWeekendEnabled] = useState(false);
  const [weekendHours, setWeekendHours] = useState({ start: '00:00', end: '23:59' });

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedParkingId) {
      loadParkingVehicles(selectedParkingId);
    }
  }, [selectedParkingId]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        setUserId(user.Id_Users);
        
        // Charger les parkings de l'utilisateur
        const parkings = await ownerService.getMyParkings();
        setMyParkings(parkings);
        
        // Si un parking est pré-sélectionné
        if (initialParkingId) {
          setSelectedParkingId(initialParkingId);
        }
      }
    } catch (error) {
      console.error('Erreur chargement données initiales:', error);
      Alert.alert('Erreur', 'Impossible de charger les données');
    } finally {
      setLoading(false);
    }
  };

  const loadParkingVehicles = async (parkingId) => {
    try {
      console.log('📡 Chargement véhicules du parking ID:', parkingId);
      // Charger les véhicules via l'endpoint spécifique
      const vehicles = await parkingService.getParkingVehicles(parkingId);
      console.log(' Véhicules reçus:', vehicles);
      
      if (vehicles && vehicles.length > 0) {
        setParkingVehicles(vehicles);
        // Réinitialiser la sélection
        setSelectedVehicles([]);
      } else {
        console.warn(' Aucun véhicule trouvé pour ce parking');
        setParkingVehicles([]);
      }
    } catch (error) {
      console.error('Erreur: Erreur chargement véhicules:', error);
      setParkingVehicles([]);
    }
  };

  const toggleVehicle = (parkingVehicle) => {
    const vehicleId = parkingVehicle.id_Parking_vehicles || parkingVehicle.Id_Parking_Vehicles;
    const exists = selectedVehicles.find(
      v => v.parkingVehicleId === vehicleId
    );
    
    if (exists) {
      setSelectedVehicles(selectedVehicles.filter(
        v => v.parkingVehicleId !== vehicleId
      ));
    } else {
      setSelectedVehicles([
        ...selectedVehicles,
        {
          parkingVehicleId: vehicleId,
          numbers: '', // Champ vide par défaut
        }
      ]);
    }
  };

  const updateVehicleCount = (parkingVehicleId, count) => {
    const parsed = parseInt(count);
    const parkingVehicle = parkingVehicles.find(
      pv => (pv.id_Parking_vehicles || pv.Id_Parking_Vehicles) === parkingVehicleId
    );
    const maxPlaces = parkingVehicle?.numbers || parkingVehicle?.number_Of_Places || 999;
    
    // Permettre champ vide, sinon limiter au nombre de places disponibles
    const validCount = count === '' ? '' : Math.min(parsed || 0, maxPlaces);
    
    setSelectedVehicles(selectedVehicles.map(v => 
      v.parkingVehicleId === parkingVehicleId 
        ? { ...v, numbers: validCount }
        : v
    ));
  };

  const buildAvailabilitiesFrequence = () => {
    const availabilities = [];
    
    if (weekdayEnabled) {
      // Lundi (1) à Vendredi (5)
      for (let day = 1; day <= 5; day++) {
        availabilities.push({
          dayOfWeekId: day,
          startHour: weekdayHours.start,
          endHour: weekdayHours.end,
        });
      }
    }
    
    if (weekendEnabled) {
      // Samedi (6) et Dimanche (7)
      [6, 7].forEach(day => {
        availabilities.push({
          dayOfWeekId: day,
          startHour: weekendHours.start,
          endHour: weekendHours.end,
        });
      });
    }
    
    return availabilities;
  };

  const handleSubmit = async (isPublished) => {
    // Validation
    if (!selectedParkingId) {
      Alert.alert('Erreur', 'Veuillez sélectionner un parking');
      return;
    }
    
    if (selectedVehicles.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner au moins un type de véhicule');
      return;
    }
    
    // Vérifier que tous les véhicules ont un nombre de places valide
    const invalidVehicle = selectedVehicles.find(v => !v.numbers || v.numbers <= 0);
    if (invalidVehicle) {
      Alert.alert('Erreur', 'Veuillez saisir un nombre de places valide pour tous les véhicules');
      return;
    }
    
    if (availabilityType === 'recurring' && !weekdayEnabled && !weekendEnabled) {
      Alert.alert('Erreur', 'Veuillez définir au moins une plage horaire');
      return;
    }
    
    try {
      setSubmitting(true);
      
      const announcementData = {
        description: description.trim() || 'Disponible à la location',
        parkingId: selectedParkingId,
        published: true, // Toujours publié directement
        vehicles: selectedVehicles,
        availabilitiesDates: [], // Pour l'instant, pas de calendrier
        availabilitiesFrequence: availabilityType === 'recurring' 
          ? buildAvailabilitiesFrequence() 
          : [],
      };
      
      console.log('📤 Envoi données annonce:', announcementData);
      
      await announcementService.createCompleteAnnouncement(announcementData);
      
      Alert.alert(
        'Succès',
        'Annonce publiée avec succès !',
        [
          {
            text: 'OK',
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'Liste des parkings' }],
            }),
          },
        ]
      );
    } catch (error) {
      console.error('Erreur création annonce:', error);
      Alert.alert('Erreur', 'Impossible de créer l\'annonce. Vérifiez vos données.');
    } finally {
      setSubmitting(false);
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

  const selectedParking = myParkings.find(p => p.Id_Parking === selectedParkingId);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle Annonce</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        {/* Sélection du parking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parking</Text>
          {myParkings.length === 0 ? (
            <View style={styles.emptyParkings}>
              <Ionicons name="car-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>Aucun parking disponible</Text>
              <Text style={styles.emptySubtext}>Créez d'abord un parking avant de publier une annonce</Text>
            </View>
          ) : (
            <View style={styles.parkingList}>
              {myParkings.map(parking => (
                <TouchableOpacity
                  key={parking.Id_Parking}
                  onPress={() => setSelectedParkingId(parking.Id_Parking)}
                  style={[
                    styles.parkingOption,
                    selectedParkingId === parking.Id_Parking && styles.parkingOptionSelected
                  ]}
                >
                  <Ionicons 
                    name={selectedParkingId === parking.Id_Parking ? 'radio-button-on' : 'radio-button-off'} 
                    size={24} 
                    color={selectedParkingId === parking.Id_Parking ? '#6BBF47' : '#9ca3af'} 
                  />
                  <Text style={[
                    styles.parkingOptionText,
                    selectedParkingId === parking.Id_Parking && styles.parkingOptionTextSelected
                  ]}>
                    {parking.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionSubtitle}>Décrivez votre place (accès, sécurité, etc.)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Parking sécurisé, accès facile, proche du métro..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Véhicules acceptés */}
        {selectedParkingId && parkingVehicles.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Véhicules acceptés</Text>
            <Text style={styles.sectionSubtitle}>Sélectionnez les types et le nombre de places</Text>
            <View style={styles.vehiclesGrid}>
              {parkingVehicles.map((pv) => {
                const vehicleId = pv.id_Parking_vehicles || pv.Id_Parking_Vehicles;
                const isSelected = selectedVehicles.find(
                  v => v.parkingVehicleId === vehicleId
                );
                const selectedVehicle = selectedVehicles.find(
                  v => v.parkingVehicleId === vehicleId
                );
                
                // Mapper l'icône du véhicule
                const getVehicleIcon = (iconName) => {
                  const iconMap = {
                    'car-icon': 'car',
                    'bike-icon': 'bicycle',
                    'motorcycle-icon': 'bicycle',
                    'van-icon': 'bus',
                    'truck-icon': 'car-sport',
                    'scooter-icon': 'bicycle',
                  };
                  return iconMap[iconName] || 'car';
                };
                
                return (
                  <View key={vehicleId} style={styles.vehicleCard}>
                    <TouchableOpacity
                      onPress={() => toggleVehicle(pv)}
                      style={[
                        styles.vehicleButton,
                        isSelected && styles.vehicleButtonSelected
                      ]}
                    >
                      <Ionicons 
                        name={getVehicleIcon(pv.vehicle?.icon)} 
                        size={24} 
                        color={isSelected ? '#fff' : '#6BBF47'} 
                      />
                      <Text style={[
                        styles.vehicleButtonText,
                        isSelected && styles.vehicleButtonTextSelected
                      ]}>
                        {pv.vehicle?.types || 'Véhicule'}
                      </Text>
                    </TouchableOpacity>
                    
                    {isSelected && (
                      <View style={styles.vehicleCountContainer}>
                        <Text style={styles.vehicleCountLabel}>Places :</Text>
                        <TextInput
                          style={styles.vehicleCountInput}
                          keyboardType="numeric"
                          value={selectedVehicle?.numbers ? String(selectedVehicle.numbers) : ''}
                          onChangeText={(text) => updateVehicleCount(vehicleId, text)}
                          placeholder="0"
                        />
                        <Text style={styles.vehicleCountMax}>/ {pv.numbers}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Type de disponibilité */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disponibilités</Text>
          <View style={styles.availabilityTypeToggle}>
            <TouchableOpacity
              onPress={() => setAvailabilityType('recurring')}
              style={[
                styles.typeButton,
                availabilityType === 'recurring' && styles.typeButtonActive
              ]}
            >
              <Ionicons 
                name="repeat" 
                size={20} 
                color={availabilityType === 'recurring' ? '#fff' : '#6BBF47'} 
              />
              <Text style={[
                styles.typeButtonText,
                availabilityType === 'recurring' && styles.typeButtonTextActive
              ]}>
                Récurrent
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setAvailabilityType('calendar')}
              style={[
                styles.typeButton,
                availabilityType === 'calendar' && styles.typeButtonActive
              ]}
              disabled={true}
            >
              <Ionicons 
                name="calendar" 
                size={20} 
                color={availabilityType === 'calendar' ? '#fff' : '#9ca3af'} 
              />
              <Text style={[
                styles.typeButtonText,
                availabilityType === 'calendar' && styles.typeButtonTextActive,
                { color: '#9ca3af' }
              ]}>
                Calendrier (bientôt)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Disponibilités récurrentes */}
        {availabilityType === 'recurring' && (
          <View style={styles.section}>
            {/* Lundi - Vendredi */}
            <View style={styles.scheduleRow}>
              <View style={styles.scheduleHeader}>
                <Text style={styles.scheduleLabel}>Lundi - Vendredi</Text>
                <Switch
                  value={weekdayEnabled}
                  onValueChange={setWeekdayEnabled}
                  trackColor={{ false: '#d1d5db', true: '#86efac' }}
                  thumbColor={weekdayEnabled ? '#16a34a' : '#f3f4f6'}
                />
              </View>
              {weekdayEnabled && (
                <View style={styles.hoursContainer}>
                  <TextInput
                    style={styles.hourInput}
                    value={weekdayHours.start}
                    onChangeText={(text) => setWeekdayHours({ ...weekdayHours, start: text })}
                    placeholder="08:00"
                  />
                  <Text style={styles.hourSeparator}>-</Text>
                  <TextInput
                    style={styles.hourInput}
                    value={weekdayHours.end}
                    onChangeText={(text) => setWeekdayHours({ ...weekdayHours, end: text })}
                    placeholder="19:00"
                  />
                </View>
              )}
            </View>

            {/* Week-end */}
            <View style={styles.scheduleRow}>
              <View style={styles.scheduleHeader}>
                <Text style={styles.scheduleLabel}>Week-end</Text>
                <Switch
                  value={weekendEnabled}
                  onValueChange={setWeekendEnabled}
                  trackColor={{ false: '#d1d5db', true: '#86efac' }}
                  thumbColor={weekendEnabled ? '#16a34a' : '#f3f4f6'}
                />
              </View>
              {weekendEnabled && (
                <View style={styles.hoursContainer}>
                  <TextInput
                    style={styles.hourInput}
                    value={weekendHours.start}
                    onChangeText={(text) => setWeekendHours({ ...weekendHours, start: text })}
                    placeholder="00:00"
                  />
                  <Text style={styles.hourSeparator}>-</Text>
                  <TextInput
                    style={styles.hourInput}
                    value={weekendHours.end}
                    onChangeText={(text) => setWeekendHours({ ...weekendHours, end: text })}
                    placeholder="23:59"
                  />
                </View>
              )}
            </View>
          </View>
        )}

        {/* Espace en bas pour les boutons */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Footer fixe - Boutons d'action */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => handleSubmit(true)}
          style={[styles.footerButton, styles.publishButton]}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.publishButtonText}>Publier l'annonce</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAnnouncement;
