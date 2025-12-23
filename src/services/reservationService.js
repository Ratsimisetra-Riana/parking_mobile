import api from '../config/api';

// Base path pour l'API des réservations
const BASE_PATH = '/reservations';

const reservationService = {

  getAllReservations: async () => {
    try {
      const response = await api.get(BASE_PATH);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      throw error;
    }
  },


  getReservationById: async (id) => {
    try {
      const response = await api.get(`${BASE_PATH}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la réservation ${id}:`, error);
      throw error;
    }
  },


  getUserReservations: async (userId) => {
    try {
      const response = await api.get(`${BASE_PATH}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des réservations de l'utilisateur ${userId}:`, error);
      throw error;
    }
  },


  createReservation: async (reservationData) => {
    try {
      console.log('📤 Envoi des données de réservation:', reservationData);

      // Vérifier si l'utilisateur est authentifié
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      const token = await AsyncStorage.getItem('jwt_token');

      if (!token) {
        console.error('❌ Pas de token JWT - utilisateur non authentifié');
        throw new Error('Vous devez être connecté pour effectuer une réservation');
      }

      console.log('🔑 Token présent, envoi de la requête...');

      const response = await api.post(BASE_PATH, {
        parkingId: reservationData.parkingId,
        userId: reservationData.userId,
        startDateTime: reservationData.startDateTime,
        endDateTime: reservationData.endDateTime,
        paymentMethod: reservationData.paymentMethod || 'CARTE_BANCAIRE',
        selectedVehicles: reservationData.selectedVehicles || [],
      });

      console.log('✅ Réponse du backend:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);

      // Afficher plus de détails sur l'erreur
      if (error.response) {
        console.error('Détails de l\'erreur:', {
          status: error.response.status,
          data: error.response.data,
          dataType: typeof error.response.data,
          headers: error.response.headers
        });

        // Extraire le message d'erreur
        let errorMessage = 'Données de réservation invalides';

        if (typeof error.response.data === 'string' && error.response.data) {
          errorMessage = error.response.data;
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        }

        // Messages d'erreur plus clairs
        if (error.response.status === 401) {
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        } else if (error.response.status === 400) {
          throw new Error(`Erreur de validation: ${errorMessage}`);
        } else if (error.response.status === 403) {
          throw new Error('Accès refusé. Vérifiez vos permissions.');
        } else if (error.response.status === 404) {
          throw new Error('Parking ou utilisateur non trouvé.');
        }
      }

      throw error;
    }
  },


  calculatePrice: async (priceData) => {
    try {
      const response = await api.post(`${BASE_PATH}/calculate-price`, {
        parkingId: priceData.parkingId,
        startDateTime: priceData.startDateTime,
        endDateTime: priceData.endDateTime,
        selectedVehicles: priceData.selectedVehicles || [],
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du calcul du prix:', error);
      throw error;
    }
  },


  checkAvailability: async (availabilityData) => {
    try {
      const response = await api.post(`${BASE_PATH}/check-availability`, {
        parkingId: availabilityData.parkingId,
        startDateTime: availabilityData.startDateTime,
        endDateTime: availabilityData.endDateTime,
        selectedVehicles: availabilityData.selectedVehicles || [],
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la vérification de disponibilité:', error);
      throw error;
    }
  },


  filterReservations: async (filters = {}) => {
    try {
      const params = {};

      if (filters.statusId) params.statusId = filters.statusId;
      if (filters.userId) params.userId = filters.userId;
      if (filters.parkingId) params.parkingId = filters.parkingId;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;

      const response = await api.get(`${BASE_PATH}/filter`, { params });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du filtrage des réservations:', error);
      throw error;
    }
  },

  testPublicEndpoint: async () => {
    try {
      const response = await api.get(`${BASE_PATH}/test-public`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du test du endpoint public:', error);
      throw error;
    }
  },
};

export default reservationService;
