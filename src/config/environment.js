/**
 * Configuration centralisée de l'environnement
 * Gère automatiquement les URLs selon l'environnement (dev/prod)
 */

import { Platform } from 'react-native';

// Détection de l'environnement
const isDevelopment = __DEV__;

/**
 * Configuration par environnement
 */
const ENV = {
  development: {
    // Backend URL selon la plateforme
    API_URL: Platform.select({
      android: 'http://10.0.2.2:8080',      // Émulateur Android
      ios: 'http://localhost:8080',         // Simulateur iOS
      default: 'http://localhost:8080',
    }),
    
    // Configuration images
    USE_IMAGE_PROXY: true,  // ✅ ACTIVÉ: Utiliser le proxy backend pour éviter problèmes SSL
    SUPABASE_URL: 'https://fbpefbjoxzkxombdcqif.supabase.co',
    
    // Autres configs dev
    ENABLE_LOGS: true,
    TIMEOUT: 10000, // 10 secondes
  },
  
  production: {
    // Backend URL production (Render)
    API_URL: 'https://uparkbackfinal.onrender.com',
    
    // Configuration images
    USE_IMAGE_PROXY: false,  // Utiliser Supabase direct (bucket public)
    SUPABASE_URL: 'https://fbpefbjoxzkxombdcqif.supabase.co',
    
    // Autres configs prod
    ENABLE_LOGS: false,
    TIMEOUT: 15000, // 15 secondes
  },
  
  // Environnement de staging (optionnel)
  staging: {
    API_URL: 'https://uparkback-staging.onrender.com',
    USE_IMAGE_PROXY: true,
    SUPABASE_URL: 'https://fbpefbjoxzkxombdcqif.supabase.co',
    ENABLE_LOGS: true,
    TIMEOUT: 15000,
  },
};

/**
 * Configuration pour appareil physique (développement)
 * À utiliser quand on teste sur un vrai téléphone
 */
const PHYSICAL_DEVICE_CONFIG = {
  // ⚠️ REMPLACER PAR VOTRE IP LOCALE
  // Pour trouver votre IP: Windows > cmd > ipconfig
  // Chercher "Adresse IPv4" de votre carte réseau WiFi/Ethernet
  API_URL: 'http://192.168.88.9:8080',  // 🔧 MODIFIER CETTE IP
  USE_IMAGE_PROXY: false,
  SUPABASE_URL: 'https://fbpefbjoxzkxombdcqif.supabase.co',
  ENABLE_LOGS: true,
  TIMEOUT: 10000,
};

/**
 * Force l'utilisation d'un environnement spécifique
 * Utile pour tester en mode staging ou physical device
 */
const FORCE_ENV = null; // 'development' | 'production' | 'staging' | 'physical_device'

/**
 * Récupérer la configuration active
 * @returns {Object} Configuration de l'environnement actuel
 */
export const getConfig = () => {
  // Si on force un environnement
  if (FORCE_ENV === 'physical_device') {
    return PHYSICAL_DEVICE_CONFIG;
  }
  if (FORCE_ENV && ENV[FORCE_ENV]) {
    return ENV[FORCE_ENV];
  }
  
  // Sinon, utiliser dev ou prod selon __DEV__
  return isDevelopment ? ENV.development : ENV.production;
};

/**
 * Récupérer l'URL de base de l'API
 * @returns {string} URL du backend
 */
export const getApiBaseUrl = () => {
  const config = getConfig();
  return config.API_URL;
};

/**
 * Récupérer l'URL complète de l'API (avec /api/v1)
 * @returns {string} URL complète de l'API
 */
export const getApiUrl = () => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/api/v1`;
};

/**
 * Vérifier si le proxy d'images est activé
 * @returns {boolean} true si proxy activé
 */
export const isImageProxyEnabled = () => {
  const config = getConfig();
  return config.USE_IMAGE_PROXY;
};

/**
 * Récupérer l'URL Supabase
 * @returns {string} URL de Supabase
 */
export const getSupabaseUrl = () => {
  const config = getConfig();
  return config.SUPABASE_URL;
};

/**
 * Vérifier si les logs sont activés
 * @returns {boolean} true si logs activés
 */
export const isLoggingEnabled = () => {
  const config = getConfig();
  return config.ENABLE_LOGS;
};

/**
 * Récupérer le timeout API
 * @returns {number} Timeout en millisecondes
 */
export const getApiTimeout = () => {
  const config = getConfig();
  return config.TIMEOUT;
};

/**
 * Logger conditionnel (actif seulement si ENABLE_LOGS = true)
 */
export const log = {
  info: (...args) => {
    if (isLoggingEnabled()) {
      console.log(...args);
    }
  },
  error: (...args) => {
    if (isLoggingEnabled()) {
      console.error(...args);
    }
  },
  warn: (...args) => {
    if (isLoggingEnabled()) {
      console.warn(...args);
    }
  },
};

// Export de la configuration complète
export default {
  getConfig,
  getApiBaseUrl,
  getApiUrl,
  isImageProxyEnabled,
  getSupabaseUrl,
  isLoggingEnabled,
  getApiTimeout,
  log,
  isDevelopment,
};
