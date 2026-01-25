/**
 * Service de gestion des notations/avis
 * Connecté au backend via /api/user-notes
 */

import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_PATH = '/user-notes';

const ratingService = {
  /**
   * Soumettre un avis pour un parking
   * @param {Object} ratingData - Données de l'avis
   * @param {number} ratingData.note - Note de 1 à 5
   * @param {boolean} ratingData.cleanliness - Critère propreté
   * @param {boolean} ratingData.precision - Critère précision
   * @param {boolean} ratingData.communication - Critère communication
   * @param {boolean} ratingData.security - Critère sécurité
   * @param {string} ratingData.description - Commentaire
   * @param {number} ratingData.parkingId - ID du parking
   * @returns {Promise<Object>} - Résultat de la soumission
   */
  submitRating: async (ratingData) => {
    try {
      // Récupérer l'ID de l'utilisateur connecté
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      
      if (!user || !user.Id_Users) {
        throw new Error('Utilisateur non connecté');
      }

      // Préparer les données pour le backend
      const payload = {
        note: ratingData.note,
        cleanliness: ratingData.cleanliness,
        precision: ratingData.precision,
        communication: ratingData.communication,
        security: ratingData.security,
        description: ratingData.description || '',
        parking: {
          Id_Parking: ratingData.parkingId
        },
        user: {
          Id_Users: user.Id_Users
        }
      };

      console.log('📤 Soumission avis:', payload);
      
      const response = await api.post(BASE_PATH, payload);
      
      console.log(' Avis enregistré:', response.data);
      return {
        success: true,
        message: 'Avis enregistré avec succès',
        data: response.data,
      };
    } catch (error) {
      console.error('Erreur: Erreur soumission avis:', error);
      throw error;
    }
  },

  /**
   * Récupérer les avis d'un parking
   * @param {number} parkingId - ID du parking
   * @returns {Promise<Array>} - Liste des avis
   */
  getRatingsByParking: async (parkingId) => {
    try {
      console.log('📥 Récupération avis parking:', parkingId);
      
      const response = await api.get(`${BASE_PATH}/parking/${parkingId}`);
      
      // Mapper les données backend vers le format frontend
      const ratings = response.data.map(rating => ({
        id: rating.id,
        idUser: rating.user?.Id_Users,
        userName: rating.user?.name || rating.user?.user_name || 'Utilisateur',
        idParking: rating.parking?.Id_Parking,
        note: rating.note,
        cleanliness: rating.cleanliness,
        precision: rating.precision,
        communication: rating.communication,
        security: rating.security,
        description: rating.description,
        createdAt: rating.createdAt,
      }));
      
      console.log(` ${ratings.length} avis trouvés`);
      return ratings;
    } catch (error) {
      console.error('Erreur: Erreur récupération avis:', error);
      return [];
    }
  },

  /**
   * Récupérer la note moyenne d'un parking
   * @param {number} parkingId - ID du parking
   * @returns {Promise<Object>} - { average: number, total: number }
   */
  getParkingAverageRating: async (parkingId) => {
    try {
      console.log('📥 Récupération moyenne parking:', parkingId);
      
      const response = await api.get(`${BASE_PATH}/statistics/parking/${parkingId}`);
      
      return {
        average: response.data.average || 0,
        total: await ratingService.getRatingsByParking(parkingId).then(r => r.length),
      };
    } catch (error) {
      console.error('Erreur: Erreur récupération moyenne parking:', error);
      // En cas d'erreur, calculer manuellement depuis les avis
      const ratings = await ratingService.getRatingsByParking(parkingId);
      if (ratings.length === 0) {
        return { average: 0, total: 0 };
      }
      const sum = ratings.reduce((acc, r) => acc + r.note, 0);
      return {
        average: Math.round((sum / ratings.length) * 10) / 10,
        total: ratings.length,
      };
    }
  },

  /**
   * Récupérer la note moyenne d'un propriétaire (via ses parkings)
   * @param {number} userId - ID du propriétaire
   * @returns {Promise<Object>} - { average: number, total: number }
   */
  getUserAverageRating: async (userId) => {
    try {
      console.log('📥 Récupération moyenne utilisateur:', userId);
      
      const response = await api.get(`${BASE_PATH}/statistics/user/${userId}`);
      
      return {
        average: response.data.average || 0,
        total: 0, // La vue ne retourne pas le total, on pourrait le calculer si besoin
      };
    } catch (error) {
      console.error('Erreur: Erreur récupération moyenne utilisateur:', error);
      return { average: 0, total: 0 };
    }
  },

  /**
   * Vérifier si une réservation a déjà été notée
   * @param {number} reservationId - ID de la réservation
   * @returns {Promise<boolean>} - true si déjà notée
   */
  hasRatedReservation: async (reservationId) => {
    try {
      console.log('📥 Vérification notation réservation:', reservationId);
      
      // Pour l'instant, on vérifie en récupérant tous les avis de l'utilisateur
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      
      if (!user || !user.Id_Users) {
        return false;
      }
      
      const userRatings = await ratingService.getRatingsByUser(user.Id_Users);
      const hasRated = userRatings.some(r => r.reservationId === reservationId);
      
      console.log(` Réservation ${reservationId} déjà notée: ${hasRated}`);
      return hasRated;
    } catch (error) {
      console.error('Erreur: Erreur vérification notation:', error);
      return false;
    }
  },

  /**
   * Récupérer les avis donnés par un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Array>} - Liste des avis
   */
  getRatingsByUser: async (userId) => {
    try {
      console.log('📥 Récupération avis utilisateur:', userId);
      
      const response = await api.get(`${BASE_PATH}/user/${userId}`);
      
      // Mapper les données backend vers le format frontend
      const ratings = response.data.map(rating => ({
        id: rating.id,
        idUser: rating.user?.Id_Users,
        userName: rating.user?.name || rating.user?.user_name || 'Utilisateur',
        idParking: rating.parking?.Id_Parking,
        parkingName: rating.parking?.label || 'Parking',
        note: rating.note,
        cleanliness: rating.cleanliness,
        precision: rating.precision,
        communication: rating.communication,
        security: rating.security,
        description: rating.description,
        createdAt: rating.createdAt,
      }));
      
      console.log(` ${ratings.length} avis utilisateur trouvés`);
      return ratings;
    } catch (error) {
      console.error('Erreur: Erreur récupération avis utilisateur:', error);
      return [];
    }
  },

  /**
   * Supprimer un avis
   * @param {number} ratingId - ID de l'avis
   * @returns {Promise<boolean>} - true si supprimé avec succès
   */
  deleteRating: async (ratingId) => {
    try {
      console.log('🗑️ Suppression avis:', ratingId);
      
      await api.delete(`${BASE_PATH}/${ratingId}`);
      
      console.log(' Avis supprimé');
      return true;
    } catch (error) {
      console.error('Erreur: Erreur suppression avis:', error);
      return false;
    }
  },
};

export default ratingService;
