import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Modal, Animated, Easing } from 'react-native';
import {ReservationCard} from "../../components/ReservationCard/ReservationCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { reservationService } from '../../services';

export default function ReservationList () {
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  // Filtres
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('Tous');
  const [selectedDateFilter, setSelectedDateFilter] = useState('Tous');
  
  // États pour les dropdowns
  const [statusDropdownVisible, setStatusDropdownVisible] = useState(false);
  const [periodDropdownVisible, setPeriodDropdownVisible] = useState(false);

  // Fonction pour déterminer le statut et la couleur selon le cahier des charges
  const getReservationStatus = (reservation) => {
    // Utiliser le statut du backend s'il existe
    const backendStatus = reservation.status;
    
    // Mapping des statuts backend (labels exacts de la DB) vers l'affichage
    // Backend labels: "à venir" (value=10), "En cours" (value=15), "Terminée" (value=20), "Annulée" (value=25)
    const statusMapping = {
      'à venir': { status: 'À venir', color: 'green', value: 10 },      // ✅ Vert selon CDC
      'En cours': { status: 'En cours', color: 'blue', value: 15 },     // ✅ Bleu selon CDC
      'Terminée': { status: 'Terminée', color: 'gray', value: 20 },     // ✅ Gris selon CDC
      'Annulée': { status: 'Annulée', color: 'red', value: 25 },        // ✅ Rouge selon CDC
    };

    // Si le statut backend existe, l'utiliser
    if (backendStatus && statusMapping[backendStatus]) {
      return statusMapping[backendStatus];
    }

    // Sinon, calculer en fonction des dates (fallback)
    const now = new Date();
    const startDate = new Date(reservation.startDateTime);
    const endDate = new Date(reservation.endDateTime);

    if (now < startDate) {
      return { status: 'À venir', color: 'green' };    // ✅ Vert
    } else if (now >= startDate && now <= endDate) {
      return { status: 'En cours', color: 'blue' };    // ✅ Bleu
    } else {
      return { status: 'Terminé', color: 'gray' };     // ✅ Gris
    }
  };

  // Formater les données de l'API pour le composant
  const formatReservation = (reservation, index) => {
    try {
      const { status, color } = getReservationStatus(reservation);
      
      // Formater la date
      const startDate = new Date(reservation.startDateTime);
      const endDate = new Date(reservation.endDateTime);
      const dateStr = `Le ${startDate.toLocaleDateString('fr-FR')} ${startDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}-${endDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}`;

      return {
        id: reservation.id ? reservation.id.toString() : `temp-${index}`,
        name: reservation.parking?.name || 'Parking non disponible',
        location: reservation.parking?.address || 'Adresse non disponible',
        dateTime: dateStr,
        status: status,
        color: color,
        totalPrice: reservation.totalPrice || 0,
        paymentMethod: reservation.paymentMethod || 'Non défini',
      };
    } catch (error) {
      console.error('Erreur formatage réservation:', error, reservation);
      // Retourner une réservation par défaut en cas d'erreur
      return {
        id: `error-${index}`,
        name: 'Erreur de chargement',
        location: 'Données incomplètes',
        dateTime: 'Date non disponible',
        status: 'Erreur',
        color: 'red',
        totalPrice: 0,
        paymentMethod: 'N/A',
      };
    }
  };

  // Charger les réservations
  const loadReservations = async () => {
    try {
      setError(null);
      const userJson = await AsyncStorage.getItem('user');
      
      if (!userJson) {
        setError('Utilisateur non connecté');
        navigation.navigate('Login');
        return;
      }

      const user = JSON.parse(userJson);
      const userId = user.Id_Users;

      const data = await reservationService.getUserReservations(userId);
      
      console.log('📋 Réservations reçues:', data);
      console.log('📋 Nombre de réservations:', data?.length || 0);
      
      // Vérifier que data est un tableau
      if (!Array.isArray(data)) {
        console.warn('Les données reçues ne sont pas un tableau:', data);
        setReservations([]);
        return;
      }
      
      // Formater les données pour l'affichage
      const formattedData = data.map((reservation, index) => formatReservation(reservation, index));
      
      // Trier par date (plus récentes en premier)
      formattedData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      
      setReservations(formattedData);
      setFilteredReservations(formattedData); // Initialiser les réservations filtrées
    } catch (error) {
      console.error('Erreur chargement réservations:', error);
      setError('Impossible de charger les réservations');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Charger au montage
  useEffect(() => {
    loadReservations();
  }, []);

  // Appliquer les filtres quand ils changent
  useEffect(() => {
    applyFilters();
  }, [selectedStatusFilter, selectedDateFilter, reservations]);

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    let filtered = [...reservations];

    // Filtre par statut
    if (selectedStatusFilter !== 'Tous') {
      filtered = filtered.filter(r => r.status === selectedStatusFilter);
    }

    // Filtre par date
    if (selectedDateFilter !== 'Tous') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(r => {
        const resDate = new Date(r.dateTime.split(' ')[1]); // Extraire la date
        
        switch (selectedDateFilter) {
          case 'Aujourd\'hui':
            return resDate.toDateString() === today.toDateString();
          
          case 'Cette semaine':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            return resDate >= weekStart && resDate <= weekEnd;
          
          case 'Ce mois':
            return resDate.getMonth() === now.getMonth() && 
                   resDate.getFullYear() === now.getFullYear();
          
          case 'Historique':
            // Afficher les réservations terminées et annulées (labels exacts de la DB)
            return r.status === 'Terminée' || r.status === 'Annulée';
          
          default:
            return true;
        }
      });
    }

    setFilteredReservations(filtered);
  };

  // Fonction refresh
  const onRefresh = () => {
    setRefreshing(true);
    loadReservations();
  };

  // Composant FilterDropdown
  const FilterDropdown = ({ visible, onClose, options, selectedValue, onSelect, label }) => {
    const [scaleValue] = useState(new Animated.Value(0));
    
    useEffect(() => {
      if (visible) {
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          friction: 5,
          tension: 50,
        }).start();
      } else {
        scaleValue.setValue(0);
      }
    }, [visible]);
    
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.dropdownOverlay}
          onPress={onClose}
          activeOpacity={1}
        >
          <Animated.View
            style={[
              styles.dropdownContainer,
              {
                transform: [{ scale: scaleValue }],
                opacity: scaleValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1]
                })
              }
            ]}
          >
            <Text style={styles.dropdownLabel}>{label}</Text>
            {options.map((option) => (
              <TouchableOpacity
                key={typeof option === 'string' ? option : option.label}
                style={[
                  styles.dropdownItem,
                  (typeof option === 'string' ? selectedValue === option : selectedValue === option.label) && styles.dropdownItemSelected
                ]}
                onPress={() => {
                  onSelect(typeof option === 'string' ? option : option.label);
                  onClose();
                }}
              >
                {typeof option === 'string' ? (
                  <Text style={[
                    styles.dropdownItemText,
                    (typeof option === 'string' ? selectedValue === option : selectedValue === option.label) && styles.dropdownItemTextSelected
                  ]}>
                    {option}
                  </Text>
                ) : (
                  <View style={styles.dropdownItemWithIndicator}>
                    <View style={[styles.dropdownItemIndicator, { backgroundColor: option.color }]} />
                    <Text style={[
                      styles.dropdownItemText,
                      selectedValue === option.label && styles.dropdownItemTextSelected
                    ]}>
                      {option.label}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  };

  // Données pour les filtres
  const statuses = [
    { label: 'Tous', color: '#333' },
    { label: 'À venir', color: '#4CAF50' },
    { label: 'En cours', color: '#2196F3' },
    { label: 'Terminée', color: '#9E9E9E' },
    { label: 'Annulée', color: '#F44336' },
  ];

  const periods = ['Tous', 'Aujourd\'hui', 'Cette semaine', 'Ce mois'];

  // Affichage du chargement
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#A4E66E" />
          <Text style={styles.loadingText}>Chargement des réservations...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Affichage de l'erreur
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={loadReservations}
          >
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Affichage liste vide
  if (reservations.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <Text style={styles.title}>Mes réservations</Text>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}> Aucune réservation</Text>
          <Text style={styles.emptySubText}>Vos réservations apparaîtront ici</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => navigation.navigate('Liste des parkings')}
          >
            <Text style={styles.retryButtonText}>Rechercher un parking</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ➡️ Header */}
      <Header navigation={navigation} />

      {/* ➡️ Title avec Badge */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mes réservations</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{filteredReservations.length}</Text>
        </View>
      </View>

      {/* ➡️ Filtres en Dropdown */}
      <View style={styles.filtersContainer}>
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setStatusDropdownVisible(true)}
          >
            <Text style={styles.filterButtonText} numberOfLines={1} ellipsizeMode="tail">
              Statut: {selectedStatusFilter}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterButton, styles.filterButtonSecondary]}
            onPress={() => setPeriodDropdownVisible(true)}
          >
            <Text style={styles.filterButtonText} numberOfLines={1} ellipsizeMode="tail">
              Période: {selectedDateFilter}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterButton, styles.historyButton]}
            onPress={() => {
              setSelectedDateFilter('Historique');
            }}
          >
            <Text style={styles.historyButtonText} numberOfLines={1}>Historique</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Modals */}
      <FilterDropdown
        visible={statusDropdownVisible}
        onClose={() => setStatusDropdownVisible(false)}
        options={statuses}
        selectedValue={selectedStatusFilter}
        onSelect={setSelectedStatusFilter}
        label="Filtrer par statut"
      />
      
      <FilterDropdown
        visible={periodDropdownVisible}
        onClose={() => setPeriodDropdownVisible(false)}
        options={periods}
        selectedValue={selectedDateFilter}
        onSelect={setSelectedDateFilter}
        label="Filtrer par période"
      />

      {/* ➡️ Message si aucune réservation après filtrage */}
      {filteredReservations.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Aucune réservation trouvée</Text>
          <Text style={styles.emptySubText}>Essayez de modifier les filtres</Text>
        </View>
      ) : (
        /* ➡️ Reservations List */
        <FlatList
          data={filteredReservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReservationCard reservation={item} styles={styles} />}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={['#A4E66E']}
            />
          }
        />
      )}
      
      {/* FOOTER */}
      <Footer navigation={navigation} activeRoute="Mes réservations" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#A4E66E',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  
  // --- Title and Badge Styles ---
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  countBadge: {
    backgroundColor: '#A4E66E',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
    minWidth: 32,
    alignItems: 'center',
  },
  countBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },

  // --- Filters Container Styles ---
  filtersContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#A4E66E',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButtonSecondary: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a1a',
    numberOfLines: 1,
  },
  historyButton: {
    backgroundColor: '#6c757d',
    flex: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  historyButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    numberOfLines: 1,
  },

  // --- Dropdown Styles ---
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dropdownLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
    textAlign: 'center',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemSelected: {
    backgroundColor: '#f0f9ff',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownItemTextSelected: {
    fontWeight: 'bold',
    color: '#A4E66E',
  },
  dropdownItemWithIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownItemIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  // --- Card Styles ---
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    // Base shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  // Specific Card Background Colors (using light colors) - CDC: À venir (vert), En cours (bleu), Terminé (gris), Annulé (rouge)
  cardGreen: {
    backgroundColor: '#e6ffe6', // Very light green - À venir
  },
  cardYellow: {
    backgroundColor: '#fffbe6', // Very light yellow (not used anymore)
  },
  cardBlue: {
    backgroundColor: '#e6f7ff', // Very light blue - En cours
  },
  cardGray: {
    backgroundColor: '#f5f5f5', // Very light gray - Terminé
  },
  cardRed: {
    backgroundColor: '#ffe6e6', // Very light red - Annulé
  },
  
  parkingName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
  },
  detailItem: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },

  // --- Status Badge Styles ---
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 10,
    // Base badge text style (will be overridden)
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  // Specific Badge Colors (using more saturated colors for the border/background) - CDC: À venir (vert), En cours (bleu), Terminé (gris), Annulé (rouge)
  badgeGreen: {
    backgroundColor: 'rgba(108, 255, 108, 0.3)', // Light green - À venir
    borderColor: '#6cff6c',
    borderWidth: 1,
  },
  badgeYellow: {
    backgroundColor: 'rgba(255, 230, 108, 0.3)', // Light yellow (not used anymore)
    borderColor: '#ffe66c',
    borderWidth: 1,
  },
  badgeBlue: {
    backgroundColor: 'rgba(108, 180, 255, 0.3)', // Light blue - En cours
    borderColor: '#6cb4ff',
    borderWidth: 1,
  },
  badgeGray: {
    backgroundColor: 'rgba(150, 150, 150, 0.2)', // Light gray - Terminé
    borderColor: '#999',
    borderWidth: 1,
  },
  badgeRed: {
    backgroundColor: 'rgba(255, 108, 108, 0.3)', // Light red - Annulé
    borderColor: '#ff6c6c',
    borderWidth: 1,
  },

  // --- Bottom Navigation Styles (Reused) ---
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  navItem: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  navItemActive: {
    fontSize: 12,
    color: '#000', // Assuming active item is darker
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

// export default ReservationsScreen; // Don't forget to export the component