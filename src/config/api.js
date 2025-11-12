import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration de l'URL de base de l'API
// Pour Android emulator: 10.0.2.2 = localhost de l'hôte Windows
// Pour device physique ou iOS: remplacer par l'IP de votre PC (ex: 192.168.1.x)
const BASE_URL = 'http://10.0.2.2:8080/api';

// Création de l'instance axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 secondes
});

// Intercepteur pour ajouter le token JWT à chaque requête (sauf pour les endpoints publics)
api.interceptors.request.use(
  async (config) => {
    try {
      // Endpoints publics qui ne nécessitent PAS d'authentification
      const publicEndpoints = [
        '/auth/authenticate',
        '/auth/register',
        '/parkings',                    // Liste des parkings
        '/parkings/search',             // Recherche de parkings
        '/parkings/*/availability',     // Disponibilité des parkings
        '/vehicles',                    // Liste des types de véhicules
      ];
      
      // Vérifier si l'URL correspond à un endpoint public
      const isPublicEndpoint = publicEndpoints.some(endpoint => {
        if (!config.url) return false;
        
        // Gérer les wildcards (*)
        if (endpoint.includes('*')) {
          // Convertir le pattern en regex (échapper les caractères spéciaux sauf *)
          const regexPattern = endpoint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '[^/]*');
          const regex = new RegExp(regexPattern);
          return regex.test(config.url);
        }
        
        return config.url.includes(endpoint);
      });
      
      if (!isPublicEndpoint) {
        const token = await AsyncStorage.getItem('jwt_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log('🔑 Token ajouté pour:', config.url);
        } else {
          console.warn('⚠️ Pas de token pour:', config.url);
        }
      } else {
        console.log('🌐 Endpoint public (pas de token):', config.url);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      const { status, data } = error.response;
      
      console.error(`❌ Erreur ${status} pour ${error.config?.url}:`, data);
      
      if (status === 401) {
        // Token expiré ou invalide - déconnecter l'utilisateur
        console.warn('🚪 Token invalide, déconnexion...');
        await AsyncStorage.removeItem('jwt_token');
        await AsyncStorage.removeItem('user');
        // Note: Vous devrez gérer la navigation vers Login depuis vos composants
      } else if (status === 403) {
        console.error('🚫 Accès refusé (403) - Vérifiez les permissions');
      }
    } else if (error.request) {
      // La requête a été faite mais pas de réponse
      console.error('📡 Pas de réponse du serveur. Vérifiez que le backend est démarré.');
    } else {
      // Erreur lors de la configuration de la requête
      console.error('⚙️ Erreur configuration requête:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
