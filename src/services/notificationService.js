import api from '../config/api';

/**
 * Enregistrer le token FCM dans le backend
 * @param {number} userId - ID de l'utilisateur
 * @param {string} token - Token FCM
 * @param {string} platform - 'android' ou 'ios'
 */
export const registerDeviceToken = async (userId, token, platform = 'android') => {
  try {
    const response = await api.post('/device-tokens', {
      userId,
      token,
      platform,
    });
    console.log(' Token enregistré:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur: Erreur enregistrement token:', error);
    throw error;
  }
};

/**
 * Récupérer les notifications de l'utilisateur
 * @param {number} userId - ID de l'utilisateur
 * @param {number} limit - Nombre de notifications à récupérer
 */
export const getNotifications = async (userId, limit = 50) => {
  try {
    const response = await api.get(`/notifications/user/${userId}`, {
      params: { limit },
    });
    console.log(` ${response.data.length} notification(s) récupérée(s)`);
    return response.data;
  } catch (error) {
    console.error('Erreur: Erreur récupération notifications:', error);
    throw error;
  }
};

/**
 * Marquer une notification comme lue
 * @param {number} notificationId - ID de la notification
 */
export const markAsRead = async (notificationId) => {
  try {
    const response = await api.put(`/notifications/${notificationId}/read`);
    console.log(' Notification marquée comme lue:', notificationId);
    return response.data;
  } catch (error) {
    console.error('Erreur: Erreur marquage notification:', error);
    throw error;
  }
};

/**
 * Marquer toutes les notifications comme lues
 * @param {number} userId - ID de l'utilisateur
 */
export const markAllAsRead = async (userId) => {
  try {
    const response = await api.put(`/notifications/user/${userId}/read-all`);
    console.log(' Toutes les notifications marquées comme lues');
    return response.data;
  } catch (error) {
    console.error('Erreur: Erreur marquage toutes notifications:', error);
    throw error;
  }
};

/**
 * Supprimer une notification
 * @param {number} notificationId - ID de la notification
 */
export const deleteNotification = async (notificationId) => {
  try {
    await api.delete(`/notifications/${notificationId}`);
    console.log('🗑️ Notification supprimée:', notificationId);
  } catch (error) {
    console.error('Erreur: Erreur suppression notification:', error);
    throw error;
  }
};

/**
 * Obtenir le nombre de notifications non lues
 * @param {number} userId - ID de l'utilisateur
 */
export const getUnreadCount = async (userId) => {
  try {
    const response = await api.get(`/notifications/user/${userId}/unread-count`);
    console.log('📊 Notifications non lues:', response.data.count);
    return response.data.count;
  } catch (error) {
    console.error('Erreur: Erreur comptage notifications:', error);
    throw error;
  }
};

export default {
  registerDeviceToken,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
};
