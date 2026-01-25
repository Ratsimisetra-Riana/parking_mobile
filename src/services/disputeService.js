/**
 * Service de gestion des litiges
 * Connecté au backend via /api/v1/disputes
 */

import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_PATH = '/v1/disputes';
const PROOFS_PATH = '/v1/dispute-proofs';

// Types de motifs disponibles
export const DISPUTE_MOTIFS = [
  { value: 'occupied', label: 'Place occupée par un autre véhicule' },
  { value: 'non_compliant', label: 'Parking non conforme à la description' },
  { value: 'access', label: "Problème d'accès / Code invalide" },
  { value: 'damage', label: 'Véhicule endommagé' },
  { value: 'other', label: 'Autre problème' },
];

const disputeService = {
  /**
   * Créer un nouveau litige
   * @param {Object} disputeData - Données du litige
   * @param {number} disputeData.reservationId - ID de la réservation concernée
   * @param {string} disputeData.motif - Type de litige
   * @param {string} disputeData.description - Description détaillée
   * @returns {Promise<Object>} - Litige créé
   */
  createDispute: async (disputeData) => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;

      if (!user || !user.Id_Users) {
        throw new Error('Utilisateur non connecté');
      }

      // Préparer les données pour le backend
      const payload = {
        motif: disputeData.motif,
        description: disputeData.description || '',
        reservation: {
          Id_Reservation: disputeData.reservationId,
        },
      };

      if (__DEV__) {
        console.log('📤 Création litige:', payload);
      }

      const response = await api.post(BASE_PATH, payload);

      if (__DEV__) {
        console.log(' Litige créé:', response.data);
      }

      return {
        success: true,
        message: 'Litige signalé avec succès',
        data: response.data,
      };
    } catch (error) {
      console.error('Erreur: Erreur création litige:', error);
      throw error;
    }
  },

  /**
   * Récupérer les litiges d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Array>} - Liste des litiges
   */
  getUserDisputes: async (userId) => {
    try {
      if (__DEV__) {
        console.log('📥 Récupération litiges utilisateur:', userId);
      }

      const response = await api.get(`${BASE_PATH}/user/${userId}`);

      // Mapper les données backend vers le format frontend
      const disputes = response.data.map((dispute) => ({
        id: dispute.id,
        motif: dispute.motif,
        description: dispute.description,
        createdAt: dispute.createdAt,
        reservation: dispute.reservation
          ? {
              id: dispute.reservation.Id_Reservation,
              parkingName: dispute.reservation.parking?.label || 'Parking',
              parkingAddress: dispute.reservation.parking?.description || '',
              startDateTime: dispute.reservation.startDatetime,
              endDateTime: dispute.reservation.endDatetime,
              totalPrice: dispute.reservation.totalPrice,
            }
          : null,
      }));

      if (__DEV__) {
        console.log(` ${disputes.length} litige(s) trouvé(s)`);
      }

      return disputes;
    } catch (error) {
      console.error('Erreur: Erreur récupération litiges:', error);
      throw error;
    }
  },

  /**
   * Récupérer les litiges d'une réservation
   * @param {number} reservationId - ID de la réservation
   * @returns {Promise<Array>} - Liste des litiges
   */
  getDisputesByReservation: async (reservationId) => {
    try {
      if (__DEV__) {
        console.log('📥 Récupération litiges réservation:', reservationId);
      }

      const response = await api.get(`${BASE_PATH}/reservation/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur récupération litiges réservation:', error);
      throw error;
    }
  },

  /**
   * Récupérer un litige par son ID
   * @param {number} disputeId - ID du litige
   * @returns {Promise<Object>} - Détails du litige
   */
  getDisputeById: async (disputeId) => {
    try {
      const response = await api.get(`${BASE_PATH}/${disputeId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur récupération litige:', error);
      throw error;
    }
  },

  /**
   * Mettre à jour un litige
   * @param {number} disputeId - ID du litige
   * @param {Object} disputeData - Nouvelles données
   * @returns {Promise<Object>} - Litige mis à jour
   */
  updateDispute: async (disputeId, disputeData) => {
    try {
      const payload = {
        motif: disputeData.motif,
        description: disputeData.description,
      };

      const response = await api.put(`${BASE_PATH}/${disputeId}`, payload);

      return {
        success: true,
        message: 'Litige mis à jour',
        data: response.data,
      };
    } catch (error) {
      console.error('Erreur: Erreur mise à jour litige:', error);
      throw error;
    }
  },

  /**
   * Supprimer un litige
   * @param {number} disputeId - ID du litige
   * @returns {Promise<Object>} - Résultat de la suppression
   */
  deleteDispute: async (disputeId) => {
    try {
      await api.delete(`${BASE_PATH}/${disputeId}`);
      return {
        success: true,
        message: 'Litige supprimé',
      };
    } catch (error) {
      console.error('Erreur: Erreur suppression litige:', error);
      throw error;
    }
  },

  // ============== GESTION DES PREUVES ==============

  /**
   * Ajouter une preuve (photo) à un litige
   * @param {number} disputeId - ID du litige
   * @param {string} proofUrl - URL de la preuve
   * @returns {Promise<Object>} - Preuve créée
   */
  addProof: async (disputeId, proofUrl) => {
    try {
      const payload = {
        proofUrl: proofUrl,
        dispute: {
          id: disputeId,
        },
      };

      if (__DEV__) {
        console.log('📤 Ajout preuve litige:', payload);
      }

      const response = await api.post(PROOFS_PATH, payload);

      return {
        success: true,
        message: 'Preuve ajoutée',
        data: response.data,
      };
    } catch (error) {
      console.error('Erreur: Erreur ajout preuve:', error);
      throw error;
    }
  },

  /**
   * Récupérer les preuves d'un litige
   * @param {number} disputeId - ID du litige
   * @returns {Promise<Array>} - Liste des preuves
   */
  getProofsByDispute: async (disputeId) => {
    try {
      const response = await api.get(`${PROOFS_PATH}/dispute/${disputeId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur récupération preuves:', error);
      throw error;
    }
  },

  /**
   * Supprimer une preuve
   * @param {number} proofId - ID de la preuve
   * @returns {Promise<Object>} - Résultat
   */
  deleteProof: async (proofId) => {
    try {
      await api.delete(`${PROOFS_PATH}/${proofId}`);
      return {
        success: true,
        message: 'Preuve supprimée',
      };
    } catch (error) {
      console.error('Erreur: Erreur suppression preuve:', error);
      throw error;
    }
  },

  /**
   * Vérifier si une réservation a déjà un litige
   * @param {number} reservationId - ID de la réservation
   * @returns {Promise<boolean>} - true si un litige existe
   */
  hasDispute: async (reservationId) => {
    try {
      const disputes = await disputeService.getDisputesByReservation(reservationId);
      return disputes && disputes.length > 0;
    } catch (error) {
      return false;
    }
  },
};

export default disputeService;
