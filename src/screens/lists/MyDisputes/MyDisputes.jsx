/**
 *  MY DISPUTES SCREEN
 * Écran listant les litiges de l'utilisateur
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { disputeService } from '../../../services/disputeService';
import Header from '../../../components/ui/Header/Header';
import Footer from '../../../components/ui/Footer/Footer';
import { myDisputesStyles as styles } from './MyDisputes.styles';

export default function MyDisputes({ navigation }) {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Recharger les données quand l'écran devient actif
  useFocusEffect(
    useCallback(() => {
      loadDisputes();
    }, [])
  );

  const loadDisputes = async () => {
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

      if (__DEV__) {
        console.log('📥 Chargement litiges pour user:', userId);
      }

      const data = await disputeService.getUserDisputes(userId);
      setDisputes(data);

      if (__DEV__) {
        console.log(` ${data.length} litige(s) chargé(s)`);
      }
    } catch (err) {
      console.error('Erreur: Erreur chargement litiges:', err);
      setError('Impossible de charger vos litiges');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDisputes();
  };

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Tronquer la description
  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Rendu d'une carte litige
  const renderDisputeCard = ({ item }) => (
    <View style={styles.disputeCard}>
      {/* Header: Motif + Date */}
      <View style={styles.disputeHeader}>
        <Text style={styles.disputeMotif} numberOfLines={2}>
          {item.motif}
        </Text>
        <Text style={styles.disputeDate}>{formatDate(item.createdAt)}</Text>
      </View>

      {/* Réservation concernée */}
      {item.reservation && (
        <View style={styles.disputeReservation}>
          <Ionicons name="car" size={14} color="#6BBF47" />
          <Text style={styles.disputeReservationText} numberOfLines={1}>
            {item.reservation.parkingName || 'Réservation'}
          </Text>
        </View>
      )}

      {/* Description */}
      <Text style={styles.disputeDescription}>
        {truncateDescription(item.description)}
      </Text>

      {/* Footer: Preuves + Voir détails */}
      <View style={styles.disputeFooter}>
        {item.proofsCount > 0 ? (
          <View style={styles.proofsBadge}>
            <Ionicons name="images" size={14} color="#6BBF47" />
            <Text style={styles.proofsText}>{item.proofsCount} photo(s)</Text>
          </View>
        ) : (
          <View />
        )}

        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => {
            // TODO: Navigation vers détail du litige
            if (__DEV__) {
              console.log('📄 Voir détails litige:', item.id);
            }
          }}
        >
          <Text style={styles.viewDetailsText}>Voir détails</Text>
          <Ionicons name="chevron-forward" size={16} color="#6BBF47" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // État vide
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Ionicons name="checkmark-circle-outline" size={80} color="#6BBF47" />
      </View>
      <Text style={styles.emptyTitle}>Aucun litige</Text>
      <Text style={styles.emptySubtitle}>
        Vous n'avez signalé aucun problème pour le moment. Si vous rencontrez un souci avec une réservation, vous pouvez le signaler depuis vos réservations.
      </Text>
    </View>
  );

  // Affichage chargement
  if (loading) {
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Mes litiges" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#6BBF47" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
        <Footer navigation={navigation} activeRoute="Mes litiges" />
      </View>
    );
  }

  // Affichage erreur
  if (error) {
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Mes litiges" />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadDisputes}>
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
        <Footer navigation={navigation} activeRoute="Mes litiges" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title="Mes litiges" />

      {/* Titre + Badge count */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mes litiges</Text>
        {disputes.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{disputes.length}</Text>
          </View>
        )}
      </View>

      {/* Liste des litiges */}
      <FlatList
        data={disputes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDisputeCard}
        contentContainerStyle={disputes.length > 0 ? styles.listContent : { flex: 1 }}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6BBF47']}
            tintColor="#6BBF47"
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <Footer navigation={navigation} activeRoute="Mes litiges" />
    </View>
  );
}
