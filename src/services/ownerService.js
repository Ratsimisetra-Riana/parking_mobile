import api from '../config/api';

/**
 * Service pour la gestion des parkings du propriétaire
 */
const ownerService = {
  /**
   * Récupérer tous les parkings de l'utilisateur connecté (via JWT)
   * @returns {Promise} Liste des parkings du propriétaire
   */
  getMyParkings: async () => {
    try {
      const response = await api.get('/parkings/my-parkings');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des parkings:', error);
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
   * Mettre à jour un parking existant
   * @param {number} id - ID du parking
   * @param {Object} parkingData - Nouvelles données du parking
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
      return { success: true };
    } catch (error) {
      console.error(`Erreur lors de la suppression du parking ${id}:`, error);
      throw error;
    }
  },

  /**
   * Activer/Désactiver un parking
   * @param {number} id - ID du parking
   * @returns {Promise} Parking avec statut mis à jour
   */
  toggleParkingActive: async (id) => {
    try {
      const response = await api.put(`/parkings/${id}/toggle-active`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors du toggle du parking ${id}:`, error);
      throw error;
    }
  },

  /**
   * Récupérer les détails d'un parking
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
   * Récupérer les véhicules associés à un parking
   * @param {number} id - ID du parking
   * @returns {Promise} Liste des véhicules du parking
   */
  getParkingVehicles: async (id) => {
    try {
      const response = await api.get(`/parkings/${id}/vehicles`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des véhicules du parking ${id}:`, error);
      throw error;
    }
  },
};

export default ownerService;
