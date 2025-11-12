import api from '../config/api';

/**
 * Service pour la gestion des parkings
 */
const parkingService = {
  /**
   * Récupérer tous les parkings
   * @returns {Promise} Liste des parkings
   */
  getAllParkings: async () => {
    try {
      const response = await api.get('/parkings');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des parkings:', error);
      throw error;
    }
  },

  /**
   * Récupérer un parking par son ID
   * @param {number} id - ID du parking
   * @returns {Promise} Détails du parking
   */
  getParkingById: async (id) => {
    try {
      const response = await api.get(`/parkings/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du parking ${id}:`, error);
      throw error;
    }
  },

  /**
   * Rechercher des parkings avec filtres
   * @param {Object} filters - Filtres de recherche
   * @returns {Promise} Liste des parkings filtrés
   */
  searchParkings: async (filters = {}) => {
    try {
      const params = {};
      
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.vehicleType) params.vehicleType = filters.vehicleType;
      if (filters.numberOfVehicles) params.numberOfVehicles = filters.numberOfVehicles;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      
      const response = await api.get('/parkings/search', { params });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche de parkings:', error);
      throw error;
    }
  },

  /**
   * Créer un nouveau parking
   * @param {Object} parkingData - Données du parking
   * @returns {Promise} Parking créé
   */
  createParking: async (parkingData) => {
    try {
      const response = await api.post('/parkings', parkingData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du parking:', error);
      throw error;
    }
  },

  /**
   * Mettre à jour un parking
   * @param {number} id - ID du parking
   * @param {Object} parkingData - Nouvelles données
   * @returns {Promise} Parking mis à jour
   */
  updateParking: async (id, parkingData) => {
    try {
      const response = await api.put(`/parkings/${id}`, parkingData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du parking ${id}:`, error);
      throw error;
    }
  },

  /**
   * Supprimer un parking
   * @param {number} id - ID du parking
   * @returns {Promise}
   */
  deleteParking: async (id) => {
    try {
      await api.delete(`/parkings/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression du parking ${id}:`, error);
      throw error;
    }
  },

  /**
   * Récupérer les véhicules d'un parking
   * @param {number} parkingId - ID du parking
   * @returns {Promise} Liste des véhicules du parking
   */
  getParkingVehicles: async (parkingId) => {
    try {
      const response = await api.get(`/parking-vehicles/by-parking/${parkingId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des véhicules du parking ${parkingId}:`, error);
      throw error;
    }
  },

  /**
   * Récupérer la disponibilité d'un parking par type de véhicule
   * @param {number} parkingId - ID du parking
   * @param {string} startDateTime - Date/heure de début (ISO format)
   * @param {string} endDateTime - Date/heure de fin (ISO format)
   * @returns {Promise} Disponibilité par type de véhicule
   */
  getParkingAvailability: async (parkingId, startDateTime, endDateTime) => {
    try {
      const params = {};
      if (startDateTime) params.startDateTime = startDateTime;
      if (endDateTime) params.endDateTime = endDateTime;
      
      const response = await api.get(`/parkings/${parkingId}/availability`, { params });
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la disponibilité du parking ${parkingId}:`, error);
      throw error;
    }
  },
};

export default parkingService;
