import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import messaging from '@react-native-firebase/messaging';
import { deactivateDeviceToken } from './notificationService';

// Base path pour l'API d'authentification
const BASE_PATH = '/auth';


const authService = {
  
  login: async (user_name, password) => {
    try {
      const response = await api.post(`${BASE_PATH}/authenticate`, {
        user_name,
        password,
      });

      const { token, userId, userName, email } = response.data;

      if (token) {
        await AsyncStorage.setItem('jwt_token', token);

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

 
  register: async (userData) => {
    try {
      const response = await api.post(`${BASE_PATH}/register`, {
        name: userData.name,
        first_name: userData.first_name,
        user_name: userData.user_name,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phone_number,
        role: 'USER', 
      });

      const { token, userId, userName, email } = response.data;

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

 
  logout: async () => {
    try {
      console.log(' Déconnexion complète en cours...');

      try {
        const fcmToken = await messaging().getToken();
        const userJson = await AsyncStorage.getItem('user');
        const userId = userJson ? JSON.parse(userJson).Id_Users : null;

        if (fcmToken) {
          await deactivateDeviceToken(fcmToken, userId);
          console.log(' Token FCM désactivé en BDD');
        }
      } catch (fcmError) {
        console.log(' Erreur désactivation token FCM:', fcmError);
      }

      await AsyncStorage.removeItem('jwt_token');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('username');
      console.log(' Données de l\'app supprimées');

      try {
        const isGoogleSignedIn = await GoogleSignin.isSignedIn();
        if (isGoogleSignedIn) {
          await GoogleSignin.signOut();
          console.log(' Déconnexion Google effectuée');
        }
      } catch (googleError) {
        console.log('️ Pas de session Google active');
      }

      try {
        const fbToken = await AccessToken.getCurrentAccessToken();
        if (fbToken) {
          await LoginManager.logOut();
          console.log(' Déconnexion Facebook effectuée');
        }
      } catch (facebookError) {
        console.log('️ Pas de session Facebook active');
      }

      console.log(' Déconnexion complète terminée');
    } catch (error) {
      console.error('Erreur: Erreur lors de la déconnexion:', error);
    }
  },

 
  clearStorage: async () => {
    try {
      await AsyncStorage.clear();
      console.log('Stockage nettoyé avec succès');
    } catch (error) {
      console.error('Erreur lors du nettoyage du stockage:', error);
    }
  },

 
  isAuthenticated: async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      return !!token;
    } catch (error) {
      return false;
    }
  },

  getToken: async () => {
    try {
      return await AsyncStorage.getItem('jwt_token');
    } catch (error) {
      return null;
    }
  },

  
  isTokenExpired: async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (!token) return true;

      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convertir en secondes

      return decoded.exp < (currentTime + 60);
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      return true; // En cas d'erreur, considérer comme expiré
    }
  },

 //recup connected user data
  getCurrentUser: async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
  },

 //connex google
  loginWithGoogle: async () => {
    try {
      console.log(' Démarrage connexion Google...');

      
      await GoogleSignin.configure({
        webClientId: '918409349260-uqfla9m7seh995bjgojo6t7mt7e9smj6.apps.googleusercontent.com',
        offlineAccess: false,
      });

      
      await GoogleSignin.hasPlayServices();

      try {
        await GoogleSignin.signOut();
        console.log(' Déconnexion Google précédente effectuée');
      } catch (signOutError) {
        console.log('️ Pas de session Google précédente');
      }

      
      const userInfo = await GoogleSignin.signIn();
      console.log(' Connexion Google réussie:', userInfo);

      
      const tokens = await GoogleSignin.getTokens();
      const idToken = tokens.idToken;
      console.log(' Token Google récupéré (nouveau)');

      
      const response = await api.post(`${BASE_PATH}/oauth/google`, {
        token: idToken,
        provider: 'google',
      });

      const { token, userId, userName, email } = response.data;

      
      if (token) {
        await AsyncStorage.setItem('jwt_token', token);

        const userData = {
          Id_Users: userId,
          user_name: userName,
          email: email,
          oauth_provider: 'google',
        };

        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await AsyncStorage.setItem('username', userName);
      }

      console.log(' Connexion Google complète');
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur connexion Google:', error);

      if (error.code === 'SIGN_IN_CANCELLED') {
        throw new Error('Connexion annulée');
      } else if (error.code === 'IN_PROGRESS') {
        throw new Error('Connexion en cours');
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        throw new Error('Google Play Services non disponible');
      }

      throw error;
    }
  },

 //connex facebook
  loginWithFacebook: async () => {
    try {
      console.log(' Démarrage connexion Facebook...');

    
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('Connexion Facebook annulée');
      }

      console.log(' Connexion Facebook réussie');

      
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Impossible de récupérer le token Facebook');
      }

      const accessToken = data.accessToken;
      console.log(' Token Facebook récupéré');

      
      const response = await api.post(`${BASE_PATH}/oauth/facebook`, {
        token: accessToken,
        provider: 'facebook',
      });

      const { token, userId, userName, email } = response.data;

      
      if (token) {
        await AsyncStorage.setItem('jwt_token', token);

        const userData = {
          Id_Users: userId,
          user_name: userName,
          email: email,
          oauth_provider: 'facebook',
        };

        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await AsyncStorage.setItem('username', userName);
      }

      console.log(' Connexion Facebook complète');
      return response.data;
    } catch (error) {
      console.error('Erreur: Erreur connexion Facebook:', error);
      throw error;
    }
  },

  
  forgotPassword: async (email) => {
    try {
      console.log(' Demande de réinitialisation pour:', email);
      const response = await api.post(`${BASE_PATH}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      console.error('Erreur forgot-password:', error);
      throw error;
    }
  },

  
  verifyResetCode: async (email, code) => {
    try {
      console.log(' Vérification du code pour:', email);
      const response = await api.post(`${BASE_PATH}/verify-reset-code`, { email, code });
      return response.data;
    } catch (error) {
      console.error('Erreur verify-reset-code:', error);
      throw error;
    }
  },

  
  resetPassword: async (email, code, newPassword) => {
    try {
      console.log(' Réinitialisation du mot de passe pour:', email);
      const response = await api.post(`${BASE_PATH}/reset-password`, {
        email,
        code,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Erreur reset-password:', error);
      throw error;
    }
  },
};

export default authService;

