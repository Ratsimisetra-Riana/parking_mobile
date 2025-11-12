import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

/**
 * Service d'authentification
 */
const authService = {
  /**
   * Connexion utilisateur
   * @param {string} user_name - Nom d'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise} Données de l'utilisateur et token
   */
  login: async (user_name, password) => {
    try {
      const response = await api.post('/v1/auth/authenticate', {
        user_name,
        password,
      });
      
      const { token, userId, userName, email } = response.data;
      
      // Stocker le token
      if (token) {
        await AsyncStorage.setItem('jwt_token', token);
        
        // Stocker les données utilisateur reçues du backend
        const userData = {
          Id_Users: userId,
          user_name: userName,
          email: email,
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await AsyncStorage.setItem('username', userName);
      }
      
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  /**
   * Inscription utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise} Données de l'utilisateur créé
   */
  register: async (userData) => {
    try {
      const response = await api.post('/v1/auth/register', {
        name: userData.name,
        first_name: userData.first_name,
        user_name: userData.user_name,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phone_number,
        role: 'USER', // Par défaut
      });
      
      const { token, userId, userName, email } = response.data;
      
      // Stocker le token et les données utilisateur après inscription
      if (token) {
        await AsyncStorage.setItem('jwt_token', token);
        
        const userInfo = {
          Id_Users: userId,
          user_name: userName,
          email: email,
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(userInfo));
        await AsyncStorage.setItem('username', userName);
      }
      
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  },

  /**
   * Déconnexion utilisateur
   */
  logout: async () => {
    try {
      await AsyncStorage.removeItem('jwt_token');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('username');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  },

  /**
   * Nettoyer tout le stockage (utile pour les tests ou réinitialisation)
   */
  clearStorage: async () => {
    try {
      await AsyncStorage.clear();
      console.log('Stockage nettoyé avec succès');
    } catch (error) {
      console.error('Erreur lors du nettoyage du stockage:', error);
    }
  },

  /**
   * Vérifier si l'utilisateur est connecté
   * @returns {Promise<boolean>}
   */
  isAuthenticated: async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      return !!token;
    } catch (error) {
      return false;
    }
  },

  /**
   * Récupérer le token stocké
   * @returns {Promise<string|null>}
   */
  getToken: async () => {
    try {
      return await AsyncStorage.getItem('jwt_token');
    } catch (error) {
      return null;
    }
  },
};

export default authService;
