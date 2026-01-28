import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notificationService from '../../../services/notificationService';
import Header from '../../../components/ui/Header/Header';
import Footer from '../../../components/ui/Footer/Footer';
import { notificationsStyles as styles } from './Notifications.styles';
import { colors } from '../../../theme';

export default function Notifications({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    if (userId) {
      loadNotifications();
    }
  }, [userId]);

  const initializeUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      if (user?.Id_Users) {
        setUserId(user.Id_Users);
      } else {
        console.warn('⚠️ Utilisateur non connecté');
        setLoading(false);
      }
    } catch (error) {
      console.error('Erreur: Erreur récupération utilisateur:', error);
      setLoading(false);
    }
  };

  const loadNotifications = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await notificationService.getNotifications(userId, 50);

      // Mapper les notifications pour l'affichage
      const mappedNotifications = (data || []).map(notif => ({
        id: notif.id,
        title: notif.title || 'Notification',
        message: notif.message || '',
        type: notif.type || 'system',
        isRead: notif.read || false,
        date: notif.sentAt || new Date().toISOString(),
        data: notif.data || {},
        icon: getIconForType(notif.type),
        color: getColorForType(notif.type),
      }));

      setNotifications(mappedNotifications);
      console.log(`📬 ${mappedNotifications.length} notification(s) chargée(s)`);
    } catch (error) {
      console.error('Erreur: Erreur chargement notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'reservation_accepted':
        return 'checkmark-circle-outline';
      case 'reservation_rejected':
        return 'close-circle-outline';
      case 'reservation_request':
        return 'mail-unread-outline';
      case 'payment_confirmed':
        return 'shield-checkmark-outline';
      case 'dispute':
        return 'warning-outline';
      case 'system':
      default:
        return 'notifications-outline';
    }
  };

  const getColorForType = (type) => {
    switch (type) {
      case 'reservation_accepted':
      case 'payment_confirmed':
        return '#4CAF50'; // Vert
      case 'reservation_rejected':
        return '#F44336'; // Rouge
      case 'reservation_request':
        return '#2196F3'; // Bleu
      case 'dispute':
        return '#FF9800'; // Orange
      case 'system':
      default:
        return '#666';
    }
  };

  const handleNotificationPress = async (notification) => {
    // Marquer comme lue si non lue
    if (!notification.isRead) {
      try {
        await notificationService.markAsRead(notification.id);
        // Mettre à jour l'état local
        setNotifications(prev =>
          prev.map(n =>
            n.id === notification.id ? { ...n, isRead: true } : n
          )
        );
      } catch (error) {
        console.error('Erreur: Erreur marquage notification:', error);
      }
    }

    // Navigation selon le type
    const { type, data } = notification;

    if (type === 'reservation_accepted' && data?.requestId) {
      navigation.navigate('PaymentFinalization', {
        requestId: parseInt(data.requestId),
      });
    } else if (type === 'reservation_request') {
      navigation.navigate('ReservationRequests');
    } else if (type === 'payment_confirmed' || type === 'reservation_rejected') {
      navigation.navigate('Mes réservations');
    } else if (type === 'dispute' && data?.disputeId) {
      navigation.navigate('MyDisputes');
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!userId || notifications.length === 0) return;

    try {
      await notificationService.markAllAsRead(userId);
      // Mettre à jour l'état local
      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      );
      console.log('✅ Toutes les notifications marquées comme lues');
    } catch (error) {
      console.error('Erreur: Erreur marquage toutes notifications:', error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadNotifications();
  }, [userId]);

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
        <Text style={styles.notificationMessage} numberOfLines={2}>{item.message}</Text>
        <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
      <Text style={styles.emptyText}>Aucune notification</Text>
      <Text style={styles.emptySubtext}>Vous serez notifié des demandes de réservation et autres événements</Text>
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
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
              <TouchableOpacity
                style={styles.markAllButton}
                onPress={handleMarkAllAsRead}
              >
                <Ionicons name="checkmark-done-outline" size={20} color={colors.primary.main} />
                <Text style={styles.markAllText}>Tout lire</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6BBF47" />
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => String(item.id)}
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

      <Footer navigation={navigation} activeRoute="Notifications" />
    </View>
  );
}
