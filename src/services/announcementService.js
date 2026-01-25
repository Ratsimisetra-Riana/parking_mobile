import api from '../config/api';

/**
 * Service pour la gestion des annonces
 */
const announcementService = {
  /**
   * Récupérer toutes les annonces publiées
   * @returns {Promise} Liste des annonces publiées
   */
  getPublishedAnnouncements: async () => {
    try {
      const response = await api.get('/announcements/published');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces publiées:', error);
      throw error;
    }
  },

  /**
   * Récupérer les annonces d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Liste des annonces de l'utilisateur
   */
  getMyAnnouncements: async (userId) => {
    try {
      const response = await api.get(`/announcements/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de vos annonces:', error);
      throw error;
    }
  },

  /**
   * Récupérer les annonces d'un parking
   * @param {number} parkingId - ID du parking
   * @returns {Promise} Liste des annonces du parking
   */
  getAnnouncementsByParkingId: async (parkingId) => {
    try {
      const response = await api.get(`/announcements/parking/${parkingId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces du parking:', error);
      throw error;
    }
  },

  /**
   * Récupérer une annonce par son ID
   * @param {number} id - ID de l'annonce
   * @returns {Promise} Détails de l'annonce
   */
  getAnnouncementById: async (id) => {
    try {
      const response = await api.get(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'annonce ${id}:`, error);
      throw error;
    }
  },

  /**
   * Créer une annonce complète avec véhicules et disponibilités
   * @param {Object} announcementData - Données de l'annonce
   * @param {string} announcementData.description - Description de l'annonce
   * @param {number} announcementData.parkingId - ID du parking
   * @param {boolean} announcementData.isPublished - Statut de publication
   * @param {Array} announcementData.vehicles - [{parkingVehicleId, numbers}]
   * @param {Array} announcementData.availabilitiesDates - [{startDate, endDate, startHour, endHour}] (optionnel)
   * @param {Array} announcementData.availabilitiesFrequence - [{dayOfWeekId, startHour, endHour}] (optionnel)
   * @returns {Promise} Annonce créée
   */
  createCompleteAnnouncement: async (announcementData) => {
    try {
      console.log('📡 Création annonce complète:', announcementData);
      const response = await api.post('/announcements/complete', announcementData);
      console.log(' Annonce créée:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur lors de la création de l\'annonce:', error);
      console.error('Erreur: Réponse:', error.response?.data);
      throw error;
    }
  },

  /**
   * Mettre à jour une annonce
   * @param {number} id - ID de l'annonce
   * @param {Object} announcementData - Nouvelles données
   * @returns {Promise} Annonce mise à jour
   */
  updateAnnouncement: async (id, announcementData) => {
    try {
      const response = await api.put(`/announcements/${id}`, announcementData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'annonce ${id}:`, error);
      throw error;
    }
  },

  /**
   * Basculer le statut de publication d'une annonce
   * @param {number} id - ID de l'annonce
   * @returns {Promise} Annonce avec statut mis à jour
   */
  togglePublished: async (id) => {
    try {
      const response = await api.put(`/announcements/${id}/toggle-published`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors du toggle de l'annonce ${id}:`, error);
      throw error;
    }
  },

  /**
   * Supprimer une annonce
   * @param {number} id - ID de l'annonce
   * @returns {Promise}
   */
  deleteAnnouncement: async (id) => {
    try {
      await api.delete(`/announcements/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'annonce ${id}:`, error);
      throw error;
    }
  },
};

export default announcementService;
