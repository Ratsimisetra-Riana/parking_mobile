import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import {ReservationCard} from "../../components/ReservationCard/ReservationCard";
import Header from "../../components/Header/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { reservationService } from '../../services';

export default function ReservationList () {
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour déterminer le statut et la couleur
  const getReservationStatus = (reservation) => {
    const now = new Date();
    const startDate = new Date(reservation.startDateTime);
    const endDate = new Date(reservation.endDateTime);

    if (reservation.status === 'CANCELLED') {
      return { status: 'Annulé', color: 'red' };
    }

    if (now < startDate) {
      return { status: 'À venir', color: 'yellow' };
    } else if (now >= startDate && now <= endDate) {
      return { status: 'En cours', color: 'blue' };
    } else {
      return { status: 'Terminé', color: 'green' };
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

  // Fonction refresh
  const onRefresh = () => {
    setRefreshing(true);
    loadReservations();
  };

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
          <Text style={styles.emptyText}>📭 Aucune réservation</Text>
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

      {/* ➡️ Title */}
      <Text style={styles.title}>Mes réservations ({reservations.length})</Text>

      {/* ➡️ Reservations List */}
      <FlatList
        data={reservations}
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
  
  // --- Title and List Styles ---
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Space for the bottom nav
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
  // Specific Card Background Colors (using light colors)
  cardGreen: {
    backgroundColor: '#e6ffe6', // Very light green
  },
  cardYellow: {
    backgroundColor: '#fffbe6', // Very light yellow
  },
  cardBlue: {
    backgroundColor: '#e6f7ff', // Very light blue
  },
  cardRed: {
    backgroundColor: '#ffe6e6', // Very light red
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
  // Specific Badge Colors (using more saturated colors for the border/background)
  badgeGreen: {
    backgroundColor: 'rgba(108, 255, 108, 0.3)', // Light green
    borderColor: '#6cff6c',
    borderWidth: 1,
  },
  badgeYellow: {
    backgroundColor: 'rgba(255, 230, 108, 0.3)', // Light yellow/khaki
    borderColor: '#ffe66c',
    borderWidth: 1,
  },
  badgeBlue: {
    backgroundColor: 'rgba(108, 180, 255, 0.3)', // Light blue
    borderColor: '#6cb4ff',
    borderWidth: 1,
  },
  badgeRed: {
    backgroundColor: 'rgba(255, 108, 108, 0.3)', // Light red
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