import api from '../config/api';

/**
 * Service pour la gestion des réservations
 */
const reservationService = {
  /**
   * Récupérer toutes les réservations
   * @returns {Promise} Liste des réservations
   */
  getAllReservations: async () => {
    try {
      const response = await api.get('/reservations');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      throw error;
    }
  },

  /**
   * Récupérer une réservation par son ID
   * @param {number} id - ID de la réservation
   * @returns {Promise} Détails de la réservation
   */
  getReservationById: async (id) => {
    try {
      const response = await api.get(`/reservations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la réservation ${id}:`, error);
      throw error;
    }
  },

  /**
   * Récupérer les réservations d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Liste des réservations de l'utilisateur
   */
  getUserReservations: async (userId) => {
    try {
      const response = await api.get(`/reservations/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des réservations de l'utilisateur ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Créer une nouvelle réservation
   * @param {Object} reservationData - Données de la réservation
   * @returns {Promise} Réservation créée
   */
  createReservation: async (reservationData) => {
    try {
      const response = await api.post('/reservations', {
        parkingId: reservationData.parkingId,
        userId: reservationData.userId,
        startDateTime: reservationData.startDateTime,
        endDateTime: reservationData.endDateTime,
        paymentMethod: reservationData.paymentMethod || 'CARD',
        selectedVehicles: reservationData.selectedVehicles || [],
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      throw error;
    }
  },

  /**
   * Calculer le prix d'une réservation
   * @param {Object} priceData - Données pour le calcul du prix
   * @returns {Promise} Prix total
   */
  calculatePrice: async (priceData) => {
    try {
      const response = await api.post('/reservations/calculate-price', {
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

  /**
   * Vérifier la disponibilité d'un parking
   * @param {Object} availabilityData - Données pour vérifier la disponibilité
   * @returns {Promise<boolean>} true si disponible
   */
  checkAvailability: async (availabilityData) => {
    try {
      const response = await api.post('/reservations/check-availability', {
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

  /**
   * Filtrer les réservations
   * @param {Object} filters - Filtres
   * @returns {Promise} Liste des réservations filtrées
   */
  filterReservations: async (filters = {}) => {
    try {
      const params = {};
      
      if (filters.statusId) params.statusId = filters.statusId;
      if (filters.userId) params.userId = filters.userId;
      if (filters.parkingId) params.parkingId = filters.parkingId;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      
      const response = await api.get('/reservations/filter', { params });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du filtrage des réservations:', error);
      throw error;
    }
  },
  /**
   * Test public endpoint
   * @returns {Promise} Test response
   */
  testPublicEndpoint: async () => {
    try {
      const response = await api.get('/reservations/test-public');
      return response.data;
    } catch (error) {
      console.error('Erreur lors du test du endpoint public:', error);
      throw error;
    }
  },
};

export default reservationService;
