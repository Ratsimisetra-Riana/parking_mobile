import api from '../config/api';

/**
 * Service pour la gestion des types de véhicules
 */
const vehicleService = {
  /**
   * Récupérer tous les types de véhicules
   * @returns {Promise} Liste des types de véhicules
   */
  getAllVehicles: async () => {
    try {
      const response = await api.get('/vehicles');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des types de véhicules:', error);
      throw error;
    }
  },

  /**
   * Récupérer un type de véhicule par son ID
   * @param {number} id - ID du type de véhicule
   * @returns {Promise} Détails du type de véhicule
   */
  getVehicleById: async (id) => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du véhicule ${id}:`, error);
      throw error;
    }
  },
};

export default vehicleService;
