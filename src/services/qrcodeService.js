import api from '../config/api';

// Base path pour l'API QR Code
const BASE_PATH = '/reservations';

const qrcodeService = {

  /**
   * 🔐 Récupérer le token QR Code d'une réservation
   * @param {number} reservationId - ID de la réservation
   * @returns {Promise<{qrToken: string, isValidated: boolean, validatedAt: string|null}>}
   */
  getQRToken: async (reservationId) => {
    try {
      console.log(`🔐 Récupération du token QR pour la réservation ${reservationId}...`);
      const response = await api.get(`${BASE_PATH}/${reservationId}/qr-token`);
      console.log(' Token QR récupéré:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erreur: Erreur lors de la récupération du token QR:`, error);
      throw error;
    }
  },


  /**
   * 🖼️ Récupérer l'image QR Code (PNG) d'une réservation
   * @param {number} reservationId - ID de la réservation
   * @returns {Promise<Blob>} Image PNG du QR Code
   */
  getQRImage: async (reservationId) => {
    try {
      console.log(`🖼️ Récupération de l'image QR pour la réservation ${reservationId}...`);
      const response = await api.get(`${BASE_PATH}/${reservationId}/qr-image`, {
        responseType: 'blob', // Important pour recevoir l'image
      });
      console.log(' Image QR récupérée');
      return response.data;
    } catch (error) {
      console.error(`Erreur: Erreur lors de la récupération de l'image QR:`, error);
      throw error;
    }
  },


  /**
   *  Valider un QR Code scanné (propriétaire du parking)
   * @param {string} qrToken - Token QR scanné
   * @returns {Promise<{message: string, reservation: object}>}
   */
  validateQR: async (qrToken) => {
    try {
      console.log(` Validation du QR Code: ${qrToken}...`);
      const response = await api.post(`${BASE_PATH}/validate-qr`, { qrToken });
      console.log(' QR Code validé avec succès:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erreur: Erreur lors de la validation du QR Code:`, error);
      
      // Extraire le message d'erreur du backend
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Impossible de valider le QR Code');
      }
    }
  },


  /**
   * 🔍 Vérifier le statut de validation d'un QR Code
   * @param {string} qrToken - Token QR à vérifier
   * @returns {Promise<{valid: boolean, isValidated: boolean, validatedAt: string|null, parking: object|null}>}
   */
  checkQRStatus: async (qrToken) => {
    try {
      console.log(`🔍 Vérification du statut QR: ${qrToken}...`);
      const response = await api.get(`${BASE_PATH}/check-qr/${qrToken}`);
      console.log(' Statut QR récupéré:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erreur: Erreur lors de la vérification du QR Code:`, error);
      throw error;
    }
  },

};

export default qrcodeService;
