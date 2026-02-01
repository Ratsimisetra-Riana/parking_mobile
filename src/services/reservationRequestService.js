import api from '../config/api';

const BASE_PATH = '/reservation-requests';

const reservationRequestService = {


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

  
  getRequestsByRequester: async (requesterId) => {
    try {
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

  
  getRequestsByState: async (state) => {
    try {
      const response = await api.get(`${BASE_PATH}/status/${state}`);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur récupération demandes par statut:', error);
      throw error;
    }
  },

  
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

  
  cancelRequest: async (requestId) => {
    try {
      console.log(` Annulation demande ${requestId}`);
      await api.delete(`${BASE_PATH}/${requestId}`);
      console.log(' Demande annulée');
    } catch (error) {
      console.error('Erreur: Erreur annulation demande:', error);
      throw new Error('Impossible d\'annuler la demande');
    }
  },

  
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
