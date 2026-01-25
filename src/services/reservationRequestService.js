import api from '../config/api';

// Base path pour l'API des demandes de réservation
const BASE_PATH = '/reservation-requests';

const reservationRequestService = {

  /**
   * Créer une nouvelle demande de réservation
   * @param {Object} requestData - Données de la demande
   * @returns {Promise<Object>} - Demande créée
   */
  createReservationRequest: async (requestData) => {
    try {
      console.log('📤 Envoi demande de réservation:', requestData);

      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      const token = await AsyncStorage.getItem('jwt_token');

      if (!token) {
        throw new Error('Vous devez être connecté pour faire une demande de réservation');
      }

      const response = await api.post(BASE_PATH, {
        requesterId: requestData.requesterId,
        announcementId: requestData.announcementId,
        startDateTime: requestData.startDateTime,
        endDateTime: requestData.endDateTime,
        totalGain: requestData.totalGain,
        selectedVehicles: requestData.selectedVehicles //  Ajout des véhicules sélectionnés
      });

      console.log(' Demande créée:', response.data);
      console.log(' Véhicules sélectionnés:', requestData.selectedVehicles);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur création demande:', error);
      
      if (error.response?.status === 401) {
        throw new Error('Session expirée. Reconnectez-vous.');
      } else if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Données invalides');
      }
      
      throw error;
    }
  },

  /**
   * Récupérer les demandes reçues par un propriétaire
   * @param {Number} ownerId - ID du propriétaire (optionnel, utilise l'utilisateur connecté si non fourni)
   * @returns {Promise<Array>} - Liste des demandes
   */
  getRequestsByOwner: async (ownerId) => {
    try {
      // Si ownerId n'est pas fourni, récupérer l'utilisateur connecté
      if (!ownerId) {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        const userJson = await AsyncStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;
        ownerId = user?.Id_Users;
        
        if (!ownerId) {
          console.warn(' Aucun utilisateur connecté pour getRequestsByOwner');
          return [];
        }
      }
      
      const response = await api.get(`${BASE_PATH}/owner/${ownerId}`);
      console.log(`📥 Demandes reçues pour propriétaire ${ownerId}:`, response.data.length);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur récupération demandes propriétaire:', error);
      throw error;
    }
  },

  /**
   * Récupérer les demandes envoyées par un client
   * @param {Number} requesterId - ID du client (optionnel, utilise l'utilisateur connecté si non fourni)
   * @returns {Promise<Array>} - Liste des demandes
   */
  getRequestsByRequester: async (requesterId) => {
    try {
      // Si requesterId n'est pas fourni, récupérer l'utilisateur connecté
      if (!requesterId) {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        const userJson = await AsyncStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;
        requesterId = user?.Id_Users;
        
        if (!requesterId) {
          console.warn(' Aucun utilisateur connecté pour getRequestsByRequester');
          return [];
        }
      }
      
      const response = await api.get(`${BASE_PATH}/requester/${requesterId}`);
      console.log(`📥 Demandes envoyées par client ${requesterId}:`, response.data.length);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur récupération demandes client:', error);
      throw error;
    }
  },

  /**
   * Récupérer les demandes par statut
   * @param {Number} state - Statut (10=En attente, 20=Acceptée, etc.)
   * @returns {Promise<Array>} - Liste des demandes
   */
  getRequestsByState: async (state) => {
    try {
      const response = await api.get(`${BASE_PATH}/status/${state}`);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur récupération demandes par statut:', error);
      throw error;
    }
  },

  /**
   * Accepter une demande de réservation (propriétaire)
   * @param {Number} requestId - ID de la demande
   * @returns {Promise<Object>} - Demande mise à jour
   */
  acceptRequest: async (requestId) => {
    try {
      console.log(` Acceptation demande ${requestId}`);
      const response = await api.put(`${BASE_PATH}/${requestId}/accept`);
      console.log(' Demande acceptée:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur acceptation demande:', error);
      throw new Error('Impossible d\'accepter la demande');
    }
  },

  /**
   * Refuser une demande de réservation (propriétaire)
   * @param {Number} requestId - ID de la demande
   * @returns {Promise<Object>} - Demande mise à jour
   */
  rejectRequest: async (requestId) => {
    try {
      console.log(`Erreur: Refus demande ${requestId}`);
      const response = await api.put(`${BASE_PATH}/${requestId}/reject`);
      console.log(' Demande refusée:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur refus demande:', error);
      throw new Error('Impossible de refuser la demande');
    }
  },

  /**
   * Finaliser le paiement et créer la réservation (client)
   * @param {Number} requestId - ID de la demande
   * @param {String} paymentMethod - Méthode de paiement
   * @returns {Promise<Object>} - Réservation créée
   */
  finalizeReservation: async (requestId, paymentMethod = 'CARTE_BANCAIRE') => {
    try {
      console.log(`💳 Finalisation paiement pour demande ${requestId}`);
      const response = await api.post(
        `${BASE_PATH}/${requestId}/finalize?paymentMethod=${paymentMethod}`
      );
      console.log(' Réservation finalisée:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur finalisation:', error);
      
      if (error.response?.data?.includes('expiré')) {
        throw new Error('Le délai de paiement est expiré (24h)');
      }
      
      throw new Error('Impossible de finaliser le paiement');
    }
  },

  /**
   * Annuler une demande (client)
   * @param {Number} requestId - ID de la demande
   * @returns {Promise<void>}
   */
  cancelRequest: async (requestId) => {
    try {
      console.log(`🗑️ Annulation demande ${requestId}`);
      await api.delete(`${BASE_PATH}/${requestId}`);
      console.log(' Demande annulée');
    } catch (error) {
      console.error('Erreur: Erreur annulation demande:', error);
      throw new Error('Impossible d\'annuler la demande');
    }
  },

  /**
   * Récupérer une demande par ID
   * @param {Number} requestId - ID de la demande
   * @returns {Promise<Object>} - Demande
   */
  getRequestById: async (requestId) => {
    try {
      const response = await api.get(`${BASE_PATH}/${requestId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur récupération demande:', error);
      throw error;
    }
  }
};

export default reservationRequestService;
