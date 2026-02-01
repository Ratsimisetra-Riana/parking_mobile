import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_PATH = '/user-notes';

const ratingService = {
 
  submitRating: async (ratingData) => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;

      if (!user || !user.Id_Users) {
        throw new Error('Utilisateur non connecté');
      }

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

 
  getRatingsByParking: async (parkingId) => {
    try {
      console.log('📥 Récupération avis parking:', parkingId);

      const response = await api.get(`${BASE_PATH}/parking/${parkingId}`);

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

 
  getParkingAverageRating: async (parkingId) => {
    try {
      console.log('📥 Récupération moyenne parking:', parkingId);

      const response = await api.get(`${BASE_PATH}/statistics/parking/${parkingId}`);

      // Calculer le total des avis séparément pour éviter l'appel récursif
      let total = 0;
      try {
        const ratings = await api.get(`${BASE_PATH}/parking/${parkingId}`);
        total = ratings.data?.length || 0;
      } catch (e) {
      }

      return {
        average: response.data.average || 0,
        total: total,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('️ Aucune note pour le parking:', parkingId);
        return { average: null, total: 0 };
      }

      console.error('Erreur: Erreur récupération moyenne parking:', error);
      return { average: null, total: 0 };
    }
  },

 //note moyenne proprio via ses parkings
  getUserAverageRating: async (userId) => {
    try {
      console.log('📥 Récupération moyenne utilisateur:', userId);

      const response = await api.get(`${BASE_PATH}/statistics/user/${userId}`);

      return {
        average: response.data.average || 0,
        total: 0, 
      };
    } catch (error) {
      console.error('Erreur: Erreur récupération moyenne utilisateur:', error);
      return { average: 0, total: 0 };
    }
  },

 
  hasRatedReservation: async (reservationId) => {
    try {
      console.log('📥 Vérification notation réservation:', reservationId);
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

 //avis par user
  getRatingsByUser: async (userId) => {
    try {
      console.log('📥 Récupération avis utilisateur:', userId);

      const response = await api.get(`${BASE_PATH}/user/${userId}`);

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

  
  deleteRating: async (ratingId) => {
    try {
      console.log(' Suppression avis:', ratingId);

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
