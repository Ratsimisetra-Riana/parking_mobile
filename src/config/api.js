import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl, getApiTimeout, log } from './environment';


// Récupération de la configuration depuis environment.js
const BASE_URL = getApiUrl();
const TIMEOUT = getApiTimeout();

console.log('🔧 Configuration API chargée:');
console.log('   - BASE_URL:', BASE_URL);
console.log('   - TIMEOUT:', TIMEOUT + 'ms');

// Création de l'instance axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUT,
});

api.interceptors.request.use(
  async (config) => {
    try {
      // Endpoints publics qui ne nécessitent PAS d'authentification
      const publicEndpoints = [
        '/auth/authenticate',
        '/auth/register',
        '/v1/auth/authenticate',      
        '/v1/auth/register',          
        '/vehicles',                    
        '/v1/vehicles',                
        '/reservations/calculate-price',  
        '/v1/reservations/calculate-price', 
        '/reservations/check-availability', 
        '/v1/reservations/check-availability', 
        '/reservations/test-public',    
        '/v1/reservations/test-public', 
      ];

      // Endpoints protégés qui NÉCESSITENT l'authentification (même s'ils commencent par /parkings)
      const protectedEndpoints = [
        '/parkings/my-parkings',
        '/v1/parkings/my-parkings',
        '/parkings/user/',
        '/v1/parkings/user/',
        '/user-notes',              
        '/v1/user-notes',
      ];

      // Endpoints parkings publics (pour la recherche)
      const publicParkingEndpoints = [
        '/parkings/search',             
        '/v1/parkings/search',          
        '/parkings/search/address',     
        '/v1/parkings/search/address',  
        '/parkings/search/location',    
        '/v1/parkings/search/location', 
        '/parkings/search/combined',    
        '/v1/parkings/search/combined', 
        '/parkings/*/availability',     
        '/v1/parkings/*/availability',  
      ];

      const isProtectedEndpoint = protectedEndpoints.some(endpoint => {
        if (!config.url) return false;
        return config.url === endpoint || config.url.startsWith(endpoint);
      });

      if (isProtectedEndpoint) {
        const token = await AsyncStorage.getItem('jwt_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log(' Endpoint protégé - Token ajouté pour:', config.url);
        } else {
          console.warn(' Endpoint protégé mais pas de token pour:', config.url);
        }
        return config;
      }

      const isPublicParkingEndpoint = publicParkingEndpoints.some(endpoint => {
        if (!config.url) return false;

        if (endpoint.includes('*')) {
          const regexPattern = endpoint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '[^/]*');
          const regex = new RegExp('^' + regexPattern + '(/.*)?$');
          return regex.test(config.url);
        }

        return config.url === endpoint || config.url.startsWith(endpoint + '?') || config.url.startsWith(endpoint + '/');
      });

      const isPublicEndpoint = publicEndpoints.some(endpoint => {
        if (!config.url) return false;
        return config.url === endpoint || config.url.startsWith(endpoint + '?') || config.url.startsWith(endpoint + '/');
      });

      const isParkingListOrDetail = config.method === 'get' && (
        config.url === '/parkings' ||
        config.url === '/v1/parkings' ||
        /^\/v?1?\/parkings\/\d+$/.test(config.url) || // Match /parkings/123 ou /v1/parkings/123
        /^\/v?1?\/parkings\/\d+\/vehicles$/.test(config.url) // Match /parkings/123/vehicles
      );

      const isTrulyPublic = isPublicEndpoint || isPublicParkingEndpoint || isParkingListOrDetail;

      console.log('🔍 Vérification URL:', config.url, '| Méthode:', config.method, '| Public?', isTrulyPublic);

      if (!isTrulyPublic) {
        const token = await AsyncStorage.getItem('jwt_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log(' Token ajouté pour:', config.url);
          console.log(' Token (premiers caractères):', token.substring(0, 20) + '...');
        } else {
          console.warn(' Pas de token pour:', config.url);
          console.warn(' Cette requête nécessite une authentification mais aucun token n\'a été trouvé!');
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

      console.error(`Erreur: Erreur ${status} pour ${error.config?.url}:`);
      console.error(' Détails de l\'erreur:', typeof data === 'string' ? data : JSON.stringify(data, null, 2));
      console.error(' Type de données:', typeof data);
      console.error(' Headers de réponse:', JSON.stringify(error.response.headers, null, 2));

      if (status === 401) {
        // Token expiré ou invalide - déconnecter l'utilisateur proprement
        console.warn('🚪 Token invalide ou expiré, déconnexion automatique...');

        // Suppression complète des données d'authentification
        await AsyncStorage.removeItem('jwt_token');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('username');

        console.log(' Données d\'authentification supprimées');
        // Note: La navigation vers Login doit être gérée dans les composants
      } else if (status === 403) {
        console.error('🚫 Accès refusé (403) - Vérifiez les permissions');
      } else if (status === 400) {
        console.error(' Requête invalide (400) - Vérifiez les données envoyées');
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
