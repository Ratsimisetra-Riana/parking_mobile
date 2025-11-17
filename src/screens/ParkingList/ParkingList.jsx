import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from "react-native";
import DatePicker from "react-native-date-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import useFilters from "../../hooks/useFilters";
import FilterButton from "../../components/FilterButton/FilterButton";
import {ParkingCard} from "../../components/ParkingCard/ParkingCard";
import VehicleTypeModal from "../../components/VehicleTypeModal/VehicleTypeModal";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ParkingMap from "../../components/ParkingMap/ParkingMap";
import { parkingService, vehicleService } from "../../services";

export default function ParkingList({ navigation }) {
  const {
    activeFilter, setActiveFilter,
    startDate, setStartDate,
    endDate, setEndDate,
    selectedVehicles, toggleVehicleSelection,
    vehicleCount, setVehicleCount,
    vehicleOptions,
    loadingVehicles
  } = useFilters();

  const [openPicker, setOpenPicker] = useState(false);
  const [parkings, setParkings] = useState([]);
  const [allParkings, setAllParkings] = useState([]); // Stocker tous les parkings
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);

  // Charger les parkings au montage du composant
  useEffect(() => {
    loadParkings();
  }, []);

  // Filtrer les parkings par texte de recherche localement
  useEffect(() => {
    if (!searchText.trim()) {
      setParkings(allParkings);
      return;
    }

    const filtered = allParkings.filter(parking => {
      const label = (parking.label || '').toLowerCase();
      const description = (parking.description || '').toLowerCase();
      const search = searchText.toLowerCase();
      return label.includes(search) || description.includes(search);
    });

    setParkings(filtered);
  }, [searchText, allParkings]);

  const loadParkings = async () => {
    try {
      setLoading(true);
      const data = await parkingService.getAllParkings();
      setAllParkings(data); // Stocker tous les parkings
      setParkings(data);
    } catch (error) {
      console.error('Erreur chargement parkings:', error);
      if (error.response) {
        Alert.alert('Erreur', `Impossible de charger les parkings (${error.response.status})`);
      } else if (error.request) {
        Alert.alert('Erreur', 'Serveur inaccessible. Vérifiez que le backend est démarré.');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadParkings();
    setRefreshing(false);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      
      // Formater les dates pour l'API (si elles sont définies)
      const formatDateForAPI = (date) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      };

      const filters = {};

      // Ajouter les dates seulement si elles sont définies
      if (startDate) {
        filters.startDate = formatDateForAPI(startDate);
      }
      if (endDate) {
        filters.endDate = formatDateForAPI(endDate);
      }

      // Ajouter les autres filtres
      if (selectedVehicles.length > 0) {
        filters.vehicleType = selectedVehicles[0]; // Premier type sélectionné
      }

      if (vehicleCount) {
        filters.numberOfVehicles = parseInt(vehicleCount);
      }

      filters.sortBy = 'price'; // Tri par prix par défaut
      
      const results = await parkingService.searchParkings(filters);
      setAllParkings(results); // Stocker pour le filtre local
      setParkings(results);
      
      Alert.alert('Succès', `${results.length} parking(s) trouvé(s)`);
    } catch (error) {
      console.error('Erreur recherche:', error);
      Alert.alert('Erreur', 'Impossible d\'effectuer la recherche');
    } finally {
      setLoading(false);
    }
  };

  function openDatePicker(type) {
    setActiveFilter(type);
    setOpenPicker(true);
  }

  function handleDateConfirm(date) {
    if (activeFilter === "start") setStartDate(date);
    if (activeFilter === "end") setEndDate(date);
    setOpenPicker(false);
    setActiveFilter(null);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View style={{ paddingHorizontal: 18 }}>
        <Header navigation={navigation} />
      </View>

      <ScrollView 
        style={{ flex: 1, paddingHorizontal: 18 }}
        scrollEnabled={scrollViewEnabled}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

      {/* HERO */}
      <Image source={require("../../assets/find.png")} style={{ width: "100%", height: 180, resizeMode: "contain", marginVertical: 12 }} />
      <Text style={{ fontSize: 22, fontWeight: "700", color: "#2D3436", marginTop: 10 }}>Trouver vos parking avec nous</Text>
      <Text style={{ color: "#636E72", marginBottom: 16, fontSize: 14, lineHeight: 20 }}>Nous vous aidons à trouver votre place de parking où que vous alliez</Text>

      {/* SEARCH */}
      <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 10, paddingHorizontal: 10 }}>
        <TextInput 
          placeholder="Adresse ou localisation" 
          style={{ flex: 1, padding: 10 }} 
          value={searchText}
          onChangeText={setSearchText}
        />
        <Ionicons name="search" size={20} />
      </View>

      {/* FILTERS */}
      <Text style={{ marginTop: 20, fontWeight: "600", fontSize: 16, color: "#2D3436" }}>Filtres</Text>

      <FilterButton 
        icon="calendar-outline" 
        label="Date & heure de début" 
        onPress={() => openDatePicker("start")} 
        value={startDate ? startDate.toLocaleString() : "Sélectionner"} 
      />
      <FilterButton 
        icon="calendar-outline" 
        label="Date & heure de fin" 
        onPress={() => openDatePicker("end")} 
        value={endDate ? endDate.toLocaleString() : "Sélectionner"} 
      />
      <FilterButton 
        icon="car-outline" 
        label="Types de véhicules" 
        onPress={() => setActiveFilter("types")} 
        value={selectedVehicles.length > 0 ? `(${selectedVehicles.length})` : "Sélectionner"} 
      />
      <FilterButton 
        icon="apps-outline" 
        label="Nombre de véhicules" 
        onPress={() => setActiveFilter("count")} 
        value={vehicleCount ? vehicleCount : "Sélectionner"} 
      />

      <TouchableOpacity 
        style={{ backgroundColor: "#A4E66E", marginTop: 20, padding: 14, borderRadius: 10, alignItems: "center" }}
        onPress={handleSearch}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ fontWeight: "bold" }}>Rechercher</Text>
        )}
      </TouchableOpacity>

      {/* LIST */}
      <Text style={{ marginTop: 30, fontWeight: "700", fontSize: 18 }}>
        Liste de parking {parkings.length > 0 && `(${parkings.length})`}
      </Text>

      {loading && parkings.length === 0 ? (
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#A4E66E" />
          <Text style={{ marginTop: 10, color: '#666' }}>Chargement des parkings...</Text>
        </View>
      ) : parkings.length === 0 ? (
        <View style={{ padding: 40, alignItems: 'center' }}>
          <Ionicons name="car-outline" size={60} color="#ccc" />
          <Text style={{ marginTop: 10, color: '#666' }}>Aucun parking disponible</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
          {parkings.map((parking, index) => {
            // Essayer toutes les variantes possibles du nom de la propriété ID
            const parkingId = parking.id_Parking || parking.Id_Parking || parking.id_parking || parking.id || parking.parkingId;
            
            console.log('🅿️ Parking:', parking.label, '- ID extrait:', parkingId, '- Index:', index, '- Objet complet:', parking);
            
            if (!parkingId) {
              console.error('❌ ATTENTION: Impossible de trouver l\'ID du parking!', parking);
            }
            
            return (
              <ParkingCard
                key={`parking-${parkingId || index}`}
                title={parking.label || 'Parking'}
                address={parking.description || 'Adresse non disponible'}
                price={`${parking.hourlyRate || parking.hourly_rate || 0}$/heure`}
                rating={4}
                image={require("../../assets/image.png")}
                onPress={() => {
                  console.log('🔍 Navigation vers parking ID:', parkingId, '- Nom:', parking.label);
                  navigation.navigate("Détails du parking", {
                    parkingId: parkingId,
                    title: parking.label,
                    address: parking.description,
                    price: `${parking.hourlyRate || parking.hourly_rate || 0}$/heure`,
                    rating: 4,
                    image: require("../../assets/image.png")
                  });
                }}
              />
            );
          })}
        </ScrollView>
      )}

      {/* MAP */}
      <Text style={{ fontWeight: "700", fontSize: 18 }}>Positions des parkings</Text>
      {parkings.length > 0 ? (
        <ParkingMap 
          parkings={parkings}
          scrollEnabled={setScrollViewEnabled}
          onMarkerPress={(parking) => {
            const parkingId = parking.id_Parking || parking.Id_Parking || parking.id_parking || parking.id || parking.parkingId;
            console.log('🗺️ Marker cliqué - Navigation vers parking ID:', parkingId, '- Nom:', parking.label);
            navigation.navigate("Détails du parking", {
              parkingId: parkingId,
              title: parking.label,
              address: parking.description,
              price: `${parking.hourlyRate || parking.hourly_rate || 0}$/heure`,
              rating: 4,
              image: require("../../assets/image.png")
            });
          }}
        />
      ) : (
        <View style={{ width: "100%", height: 220, borderRadius: 10, marginVertical: 12, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="map-outline" size={50} color="#ccc" />
          <Text style={{ marginTop: 10, color: '#999' }}>Aucun parking à afficher</Text>
        </View>
      )}

      {/* DATE PICKER */}
      <DatePicker
        modal
        open={openPicker}
        date={activeFilter === "start" ? startDate || new Date() : endDate || new Date()}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={() => setOpenPicker(false)}
      />

      {/* VEHICLE TYPE MODAL */}
      <VehicleTypeModal
        visible={activeFilter === "types"}
        onClose={() => setActiveFilter(null)}
        options={vehicleOptions}
        selected={selectedVehicles}
        toggle={toggleVehicleSelection}
        loading={loadingVehicles}
      />

      </ScrollView>
      
      {/* FOOTER */}
      <Footer navigation={navigation} activeRoute="Liste des parkings" />
    </View>
  );
}
