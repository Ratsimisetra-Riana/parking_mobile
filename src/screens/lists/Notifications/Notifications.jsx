import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reservationRequestService } from '../../../services';
import Header from '../../../components/ui/Header/Header';
import Footer from '../../../components/ui/Footer/Footer';
import { notificationsStyles as styles } from './Notifications.styles';
import { colors } from '../../../theme';

export default function Notifications({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userType, setUserType] = useState(null); // 'owner' ou 'requester'

  useEffect(() => {
    loadNotifications();
    determineUserType();
  }, []);

  const determineUserType = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      // Cette logique peut être améliorée selon votre modèle de données
      // Pour l'instant, on suppose que l'utilisateur peut voir les deux types de notifications
      setUserType('both');
    } catch (error) {
      console.error('Erreur: Erreur détermination type user:', error);
    }
  };

  const loadNotifications = async () => {
    try {
      setLoading(true);

      // Charger les demandes reçues (si propriétaire)
      let receivedRequests = [];
      try {
        const received = await reservationRequestService.getRequestsByOwner();
        receivedRequests = Array.isArray(received) ? received : [];
        console.log('📥 Demandes reçues par propriétaire:', receivedRequests.length);
      } catch (error) {
        console.log(' Pas de demandes reçues:', error.message);
        receivedRequests = [];
      }

      // Charger les demandes envoyées (si client)
      let sentRequests = [];
      try {
        const sent = await reservationRequestService.getRequestsByRequester();
        sentRequests = Array.isArray(sent) ? sent : [];
        console.log('📤 Demandes envoyées par client:', sentRequests.length);
      } catch (error) {
        console.log(' Pas de demandes envoyées:', error.message);
        sentRequests = [];
      }

      // Convertir en notifications
      const allNotifications = [];

      // Demandes reçues -> notifications pour propriétaire
      if (Array.isArray(receivedRequests)) {
        receivedRequests.forEach(request => {
          const notif = createNotificationFromRequest(request, 'received');
          if (notif) allNotifications.push(notif);
        });
      }

      // Demandes envoyées -> notifications pour client
      if (Array.isArray(sentRequests)) {
        sentRequests.forEach(request => {
          const notif = createNotificationFromRequest(request, 'sent');
          if (notif) allNotifications.push(notif);
        });
      }

      // Trier par date (plus récent en premier)
      allNotifications.sort((a, b) => new Date(b.date) - new Date(a.date));

      setNotifications(allNotifications);
      console.log(` ${allNotifications.length} notifications chargées`);
    } catch (error) {
      console.error('Erreur: Erreur chargement notifications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const createNotificationFromRequest = (request, type) => {
    if (!request) return null;

    const state = request.state;
    let title = '';
    let message = '';
    let icon = 'notifications-outline';
    let color = '#666';
    let isRead = false;

    if (type === 'received') {
      // Notifications pour le propriétaire
      const requesterName = request.requester?.user_name || 'Un utilisateur';
      const parkingName = request.announcement?.parking?.label || 'Votre parking';

      if (state === 10) {
        title = 'Nouvelle demande';
        message = `${requesterName} souhaite réserver ${parkingName}`;
        icon = 'mail-unread-outline';
        color = '#2196F3';
        isRead = false;
      } else if (state === 40) {
        title = 'Réservation finalisée';
        message = `${requesterName} a finalisé le paiement pour ${parkingName}`;
        icon = 'checkmark-circle-outline';
        color = '#4CAF50';
        isRead = true;
      } else if (state === 35) {
        title = 'Demande expirée';
        message = `La demande de ${requesterName} pour ${parkingName} a expiré`;
        icon = 'time-outline';
        color = '#FF9800';
        isRead = true;
      }
    } else {
      // Notifications pour le client
      const parkingName = request.announcement?.parking?.label || 'Un parking';

      if (state === 20) {
        title = 'Demande acceptée !';
        message = `Votre demande pour ${parkingName} a été acceptée. Finalisez le paiement avant 24h.`;
        icon = 'checkmark-circle-outline';
        color = '#4CAF50';
        isRead = false;
      } else if (state === 25) {
        title = 'Demande refusée';
        message = `Votre demande pour ${parkingName} a été refusée`;
        icon = 'close-circle-outline';
        color = '#F44336';
        isRead = true;
      } else if (state === 35) {
        title = 'Demande expirée';
        message = `Votre demande pour ${parkingName} a expiré`;
        icon = 'time-outline';
        color = '#FF9800';
        isRead = true;
      } else if (state === 40) {
        title = 'Paiement confirmé';
        message = `Votre réservation pour ${parkingName} est confirmée`;
        icon = 'shield-checkmark-outline';
        color = '#4CAF50';
        isRead = true;
      } else if (state === 10) {
        title = 'Demande en attente';
        message = `Votre demande pour ${parkingName} est en attente de réponse`;
        icon = 'hourglass-outline';
        color = '#FF9800';
        isRead = true;
      }
    }

    if (!title) return null;

    return {
      id: `${type}-${request.id}`,
      requestId: request.id,
      type,
      title,
      message,
      icon,
      color,
      isRead,
      date: request.createdAt || new Date().toISOString(),
      request // Garder la requête complète pour navigation
    };
  };

  const handleNotificationPress = (notification) => {
    if (notification.type === 'received' && notification.request.state === 10) {
      // Demande en attente -> aller vers ReservationRequests
      navigation.navigate('ReservationRequests');
    } else if (notification.type === 'sent' && notification.request.state === 20) {
      // Demande acceptée -> aller vers PaymentFinalization
      navigation.navigate('PaymentFinalization', {
        requestId: notification.requestId,
        requestData: notification.request
      });
    } else if (notification.request.state === 40) {
      // Réservation finalisée -> aller vers Mes Réservations
      navigation.navigate('Mes réservations');
    }
    // Autres états: juste afficher la notification sans action
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadNotifications();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !item.isRead && styles.notificationUnread
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
      <Text style={styles.emptyText}>Aucune notification</Text>
      <Text style={styles.emptySubtext}>Vous serez notifié des demandes de réservation</Text>
    </View>
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <Header navigation={navigation} />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6BBF47" />
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#6BBF47']}
            />
          }
        />
      )}

      <Footer navigation={navigation} />
    </View>
  );
}
