import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native';
import {ReservationCard} from "../../components/ReservationCard/ReservationCard";

export default function  ReservationList () {

  // Reusing the header components from the previous screen for consistency
  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerIcon}>☰</Text>
      <Text style={styles.logo}>Logo</Text>
      <View style={styles.logoLContainer}>
        <Text style={styles.logoL}>L</Text>
      </View>
    </View>
  );

  const reservationsData = [
  {
    id: '1',
    name: 'Parking Atlantis',
    location: 'Lot BM 159 Ampitatafika 102',
    dateTime: 'Le 18/01/2025 13H40-15-05',
    status: 'Terminé',
    color: 'green', // Used for styling the card/badge
  },
  {
    id: '2',
    name: 'Parking Toukan',
    location: 'Saint Louis rue Vienne 201',
    dateTime: 'Le 12/06/2025 10H00-12-30',
    status: 'À venir',
    color: 'yellow',
  },
  {
    id: '3',
    name: 'Parking Palace HTD',
    location: 'Saint Étienne 2B',
    dateTime: 'Le 30/09/2025 09H00-23-30',
    status: 'Actif',
    color: 'blue',
  },
];

  return (
    <SafeAreaView style={styles.container}>
      {/* ➡️ Header */}
      <Header />

      {/* ➡️ Title */}
      <Text style={styles.title}>Mes réservations</Text>

      {/* ➡️ Reservations List */}
      <FlatList
        data={reservationsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReservationCard reservation={item} styles={styles} />}
        contentContainerStyle={styles.listContent}
      />

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // --- Header Styles (Reused from previous screen) ---
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerIcon: {
    fontSize: 24,
    color: '#000',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoLContainer: {
    backgroundColor: '#6cff6c', // Bright green color
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  logoL: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
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