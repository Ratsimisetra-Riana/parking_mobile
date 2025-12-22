import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pour Android emulator: 10.0.2.2 = localhost de l'hôte Windows
const BASE_URL = 'https://uparkbackfinal.onrender.com/api';
// Création de l'instance axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 secondes
});

api.interceptors.request.use(
  async (config) => {
    try {
      // Endpoints publics qui ne nécessitent PAS d'authentification
      const publicEndpoints = [
        '/v1/auth/authenticate',
        '/v1/auth/register',
        '/parkings',                   // Liste des parkings 
        '/parkings/search',             // Recherche de parkings
        '/parkings/search/address',     // Recherche par adresse
        '/parkings/search/location',    // Recherche par localisation
        '/parkings/search/combined',    // Recherche combinée
        '/parkings/*/availability',     // Disponibilité des parkings
        '/vehicles',                    // Liste des types de véhicules
        '/reservations/calculate-price',  // Calcul du prix
        '/reservations/check-availability', // Vérification disponibilité
        '/reservations/test-public',    // Test endpoint public
      ];
      
      // Vérifier si l'URL correspond à un endpoint public
      const isPublicEndpoint = publicEndpoints.some(endpoint => {
        if (!config.url) return false;
        
        // Gérer les wildcards (*)
        if (endpoint.includes('*')) {
          // Convertir le pattern en regex (échapper les caractères spéciaux sauf *)
          const regexPattern = endpoint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '[^/]*');
          const regex = new RegExp('^' + regexPattern + '(/.*)?$');
          return regex.test(config.url);
        }
        
        // Pour les endpoints normaux, vérifier une correspondance exacte ou avec paramètres
        return config.url === endpoint || config.url.startsWith(endpoint + '?') || config.url.startsWith(endpoint + '/');
      });
      
      console.log('🔍 Vérification URL:', config.url, '| Public?', isPublicEndpoint);
      
      if (!isPublicEndpoint) {
        const token = await AsyncStorage.getItem('jwt_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log('🔑 Token ajouté pour:', config.url);
          console.log('🔑 Token (premiers caractères):', token.substring(0, 20) + '...');
        } else {
          console.warn('⚠️ Pas de token pour:', config.url);
          console.warn('⚠️ Cette requête nécessite une authentification mais aucun token n\'a été trouvé!');
        }
      } else {
        // S'assurer qu'aucun header Authorization n'est envoyé
        delete config.headers.Authorization;
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
      
      console.error(`❌ Erreur ${status} pour ${error.config?.url}:`);
      console.error('📋 Détails de l\'erreur:', typeof data === 'string' ? data : JSON.stringify(data, null, 2));
      console.error('📋 Type de données:', typeof data);
      console.error('📋 Headers de réponse:', JSON.stringify(error.response.headers, null, 2));
      
      if (status === 401) {
        // Token expiré ou invalide - déconnecter l'utilisateur proprement
        console.warn('🚪 Token invalide ou expiré, déconnexion automatique...');
        
        // Suppression complète des données d'authentification
        await AsyncStorage.removeItem('jwt_token');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('username');
        
        console.log('✅ Données d\'authentification supprimées');
        // Note: La navigation vers Login doit être gérée dans les composants
      } else if (status === 403) {
        console.error('🚫 Accès refusé (403) - Vérifiez les permissions');
      } else if (status === 400) {
        console.error('⚠️ Requête invalide (400) - Vérifiez les données envoyées');
        console.error('📦 Données de la requête:', error.config?.data);
      }
    } else if (error.request) {
      // La requête a été faite mais pas de réponse
      console.error('📡 Pas de réponse du serveur. Vérifiez que le backend est démarré.');
      console.error('📡 Détails de la requête:', error.request);
    } else {
      // Erreur lors de la configuration de la requête
      console.error('⚙️ Erreur configuration requête:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
