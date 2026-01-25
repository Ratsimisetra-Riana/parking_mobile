import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reservationRequestService } from '../../../services';
import Header from '../../../components/ui/Header/Header';
import Footer from '../../../components/ui/Footer/Footer';
import { reservationRequestsStyles as styles } from './ReservationRequests.styles';

export default function ReservationRequests({ navigation }) {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, pending, accepted, rejected
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [selectedFilter, requests]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const userJson = await AsyncStorage.getItem('user');
      
      if (!userJson) {
        navigation.navigate('Login');
        return;
      }

      const user = JSON.parse(userJson);
      const ownerId = user.Id_Users;

      const data = await reservationRequestService.getRequestsByOwner(ownerId);
      
      console.log(' Demandes reçues:', data.length);
      
      // Trier par date (plus récentes en premier)
      const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setRequests(sorted);
    } catch (error) {
      console.error('Erreur: Erreur chargement demandes:', error);
      Alert.alert('Erreur', 'Impossible de charger les demandes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const applyFilter = () => {
    let filtered = requests;

    if (selectedFilter === 'pending') {
      filtered = requests.filter(r => r.state === 10);
    } else if (selectedFilter === 'accepted') {
      filtered = requests.filter(r => r.state === 20);
    } else if (selectedFilter === 'rejected') {
      filtered = requests.filter(r => r.state === 25);
    }

    setFilteredRequests(filtered);
  };

  const handleAccept = async (requestId) => {
    Alert.alert(
      'Accepter la demande',
      'Le client aura 24h pour effectuer le paiement',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Accepter',
          onPress: async () => {
            try {
              setProcessingId(requestId);
              await reservationRequestService.acceptRequest(requestId);
              Alert.alert('Succès', 'Demande acceptée ! Le client a été notifié.');
              loadRequests();
            } catch (error) {
              console.error('Erreur: Erreur acceptation:', error);
              Alert.alert('Erreur', error.message || 'Impossible d\'accepter la demande');
            } finally {
              setProcessingId(null);
            }
          }
        }
      ]
    );
  };

  const handleReject = async (requestId) => {
    Alert.alert(
      'Refuser la demande',
      'Êtes-vous sûr de vouloir refuser cette demande ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Refuser',
          style: 'destructive',
          onPress: async () => {
            try {
              setProcessingId(requestId);
              await reservationRequestService.rejectRequest(requestId);
              Alert.alert('Demande refusée', 'Le client a été notifié.');
              loadRequests();
            } catch (error) {
              console.error('Erreur: Erreur refus:', error);
              Alert.alert('Erreur', error.message || 'Impossible de refuser la demande');
            } finally {
              setProcessingId(null);
            }
          }
        }
      ]
    );
  };

  const getStatusInfo = (state) => {
    switch (state) {
      case 10:
        return { label: 'En attente', color: '#FFA500', bgColor: '#FFF3E0' };
      case 20:
        return { label: 'Acceptée', color: '#4CAF50', bgColor: '#E8F5E9' };
      case 25:
        return { label: 'Refusée', color: '#F44336', bgColor: '#FFEBEE' };
      case 35:
        return { label: 'Expirée', color: '#9E9E9E', bgColor: '#F5F5F5' };
      case 40:
        return { label: 'Finalisée', color: '#2196F3', bgColor: '#E3F2FD' };
      default:
        return { label: 'Inconnu', color: '#9E9E9E', bgColor: '#F5F5F5' };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('fr-FR', { month: 'short' });
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month}, ${hours}:${minutes}`;
  };

  const renderRequestCard = ({ item }) => {
    const statusInfo = getStatusInfo(item.state);
    const isProcessing = processingId === item.id;
    const isPending = item.state === 10;

    // Extraire infos de l'annonce et du requester
    const requesterName = item.requester?.user_name || item.requester?.name || 'Client';
    const parkingName = item.announcement?.parking?.label || 'Parking';
    const startDate = item.startDateTime ? formatDate(item.startDateTime) : 'N/A';
    const endDate = item.endDateTime ? formatDate(item.endDateTime) : 'N/A';
    const totalGain = item.totalGain?.toFixed(2) || '0.00';

    return (
      <View style={styles.card}>
        {/* Header: User + Status */}
        <View style={styles.cardHeader}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {requesterName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{requesterName}</Text>
              <Text style={styles.parkingName}>{parkingName}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
            <Text style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.label}
            </Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsBox}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{startDate} → {endDate}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Ionicons name="cash-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Gain total</Text>
            <Text style={styles.detailValueGreen}>{totalGain}€</Text>
          </View>
        </View>

        {/* Actions */}
        {isPending && (
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.button, styles.buttonReject]}
              onPress={() => handleReject(item.id)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="#666" />
              ) : (
                <Text style={styles.buttonTextReject}>Refuser</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonAccept]}
              onPress={() => handleAccept(item.id)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonTextAccept}>Accepter</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const pendingCount = requests.filter(r => r.state === 10).length;

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <Header navigation={navigation} />
      </View>

      {/* Title + Filter */}
      <View style={styles.header}>
        <Text style={styles.title}>Mes Demandes</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'all' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterText, selectedFilter === 'all' && styles.filterTextActive]}>
              Tout ({requests.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'pending' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('pending')}
          >
            <Text style={[styles.filterText, selectedFilter === 'pending' && styles.filterTextActive]}>
              En attente ({pendingCount})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6BBF47" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      ) : filteredRequests.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="mail-open-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Aucune demande</Text>
          <Text style={styles.emptySubtext}>
            {selectedFilter === 'pending'
              ? 'Aucune demande en attente'
              : 'Vous n\'avez reçu aucune demande'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRequests}
          renderItem={renderRequestCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadRequests(); }} />
          }
        />
      )}

      <Footer navigation={navigation} activeRoute="Mes Demandes" />
    </View>
  );
}
