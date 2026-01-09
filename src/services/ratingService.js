/**
 * Service de gestion des notations/avis
 * Pour l'instant en mode MOCK - sera connecté au backend plus tard
 */

import api from '../config/api';

const BASE_PATH = '/api/v1/ratings';

// Données mock pour simuler les avis existants
const mockRatings = [
  {
    id: 1,
    idUser: 1,
    userName: 'Jean Dupont',
    idParking: 1,
    note: 5,
    cleanliness: true,
    precision: true,
    communication: true,
    security: true,
    description: 'Excellent parking, très bien situé et sécurisé. Je recommande !',
    createdAt: '2025-12-15T10:30:00Z',
  },
  {
    id: 2,
    idUser: 2,
    userName: 'Marie Martin',
    idParking: 1,
    note: 4,
    cleanliness: true,
    precision: false,
    communication: true,
    security: true,
    description: 'Bon parking dans l\'ensemble. L\'adresse était un peu difficile à trouver.',
    createdAt: '2025-12-10T14:20:00Z',
  },
  {
    id: 3,
    idUser: 3,
    userName: 'Pierre Rakoto',
    idParking: 2,
    note: 3,
    cleanliness: false,
    precision: true,
    communication: false,
    security: true,
    description: 'Parking correct mais pourrait être plus propre.',
    createdAt: '2025-12-05T09:15:00Z',
  },
];

// Stockage local des notes soumises (simulation)
let submittedRatings = [];

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
   * @param {number} ratingData.reservationId - ID de la réservation
   * @returns {Promise<Object>} - Résultat de la soumission
   */
  submitRating: async (ratingData) => {
    console.log('📤 [MOCK] Soumission avis:', ratingData);
    
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Remplacer par l'appel API réel quand le backend sera prêt
    // return api.post(BASE_PATH, ratingData);
    
    // Simulation de la réponse
    const newRating = {
      id: Date.now(),
      ...ratingData,
      createdAt: new Date().toISOString(),
    };
    
    submittedRatings.push(newRating);
    console.log('✅ [MOCK] Avis enregistré:', newRating);
    
    return {
      success: true,
      message: 'Avis enregistré avec succès',
      data: newRating,
    };
  },

  /**
   * Récupérer les avis d'un parking
   * @param {number} parkingId - ID du parking
   * @returns {Promise<Array>} - Liste des avis
   */
  getRatingsByParking: async (parkingId) => {
    console.log('📥 [MOCK] Récupération avis parking:', parkingId);
    
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // TODO: Remplacer par l'appel API réel
    // return api.get(`${BASE_PATH}/parking/${parkingId}`);
    
    // Filtrer les avis mock + ceux soumis localement
    const allRatings = [...mockRatings, ...submittedRatings];
    const parkingRatings = allRatings.filter(r => r.idParking === parkingId);
    
    // Trier par date décroissante
    parkingRatings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    console.log(`✅ [MOCK] ${parkingRatings.length} avis trouvés`);
    return parkingRatings;
  },

  /**
   * Récupérer la note moyenne d'un parking
   * @param {number} parkingId - ID du parking
   * @returns {Promise<Object>} - { average: number, total: number }
   */
  getParkingAverageRating: async (parkingId) => {
    console.log('📥 [MOCK] Récupération moyenne parking:', parkingId);
    
    // TODO: Remplacer par l'appel API réel (utiliser la vue v_global_parking_note)
    // return api.get(`${BASE_PATH}/parking/${parkingId}/average`);
    
    const ratings = await ratingService.getRatingsByParking(parkingId);
    
    if (ratings.length === 0) {
      return { average: 0, total: 0 };
    }
    
    const sum = ratings.reduce((acc, r) => acc + r.note, 0);
    const average = sum / ratings.length;
    
    return {
      average: Math.round(average * 10) / 10, // Arrondi à 1 décimale
      total: ratings.length,
    };
  },

  /**
   * Récupérer la note moyenne d'un propriétaire (via ses parkings)
   * @param {number} userId - ID du propriétaire
   * @returns {Promise<Object>} - { average: number, total: number }
   */
  getUserAverageRating: async (userId) => {
    console.log('📥 [MOCK] Récupération moyenne utilisateur:', userId);
    
    // TODO: Remplacer par l'appel API réel (utiliser la vue v_global_user_note)
    // return api.get(`${BASE_PATH}/user/${userId}/average`);
    
    // Simulation
    return {
      average: 4.2,
      total: 15,
    };
  },

  /**
   * Vérifier si une réservation a déjà été notée
   * @param {number} reservationId - ID de la réservation
   * @returns {Promise<boolean>} - true si déjà notée
   */
  hasRatedReservation: async (reservationId) => {
    console.log('📥 [MOCK] Vérification notation réservation:', reservationId);
    
    // TODO: Remplacer par l'appel API réel
    // return api.get(`${BASE_PATH}/reservation/${reservationId}/exists`);
    
    // Vérifier dans les avis soumis localement
    const hasRated = submittedRatings.some(r => r.reservationId === reservationId);
    
    console.log(`✅ [MOCK] Réservation ${reservationId} déjà notée: ${hasRated}`);
    return hasRated;
  },

  /**
   * Récupérer les avis donnés par un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Array>} - Liste des avis
   */
  getRatingsByUser: async (userId) => {
    console.log('📥 [MOCK] Récupération avis utilisateur:', userId);
    
    // TODO: Remplacer par l'appel API réel
    // return api.get(`${BASE_PATH}/user/${userId}`);
    
    const allRatings = [...mockRatings, ...submittedRatings];
    const userRatings = allRatings.filter(r => r.idUser === userId);
    
    return userRatings;
  },

  /**
   * Réinitialiser les données mock (utile pour les tests)
   */
  resetMockData: () => {
    submittedRatings = [];
    console.log('🔄 [MOCK] Données réinitialisées');
  },
};

export default ratingService;
