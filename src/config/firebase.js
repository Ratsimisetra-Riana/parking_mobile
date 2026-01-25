import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';

/**
 * Demander la permission pour les notifications (Android 13+)
 */
export const requestUserPermission = async () => {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(' Permission notifications accordée');
      } else {
        console.log('Erreur: Permission notifications refusée');
        return false;
      }
    }

    // Demander la permission Firebase
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log(' Autorisation FCM:', authStatus);
      return true;
    } else {
      console.log('Erreur: Autorisation FCM refusée');
      return false;
    }
  } catch (error) {
    console.error('Erreur: Erreur permission FCM:', error);
    return false;
  }
};

/**
 * Obtenir le token FCM de l'appareil
 */
export const getFCMToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('🔑 FCM Token obtenu:', fcmToken.substring(0, 20) + '...');
      return fcmToken;
    } else {
      console.warn(' Aucun token FCM disponible');
      return null;
    }
  } catch (error) {
    console.error('Erreur: Erreur récupération token FCM:', error);
    return null;
  }
};

/**
 * Rafraîchir le token FCM (quand il change)
 */
export const onTokenRefresh = (callback) => {
  return messaging().onTokenRefresh((token) => {
    console.log('🔄 Token FCM rafraîchi:', token.substring(0, 20) + '...');
    callback(token);
  });
};

/**
 * Écouter les notifications en premier plan (app ouverte)
 */
export const onForegroundMessage = (callback) => {
  return messaging().onMessage(async (remoteMessage) => {
    console.log(' Notification foreground:', remoteMessage);
    callback(remoteMessage);
  });
};

/**
 * Écouter les notifications en arrière-plan (app fermée/minimisée)
 */
export const setBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('📭 Notification background:', remoteMessage);
    // Vous pouvez traiter la notification ici si besoin
  });
};

/**
 * Notification cliquée quand l'app est fermée
 */
export const onNotificationOpenedApp = (callback) => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(' Notification cliquée (app fermée):', remoteMessage);
    callback(remoteMessage);
  });
};

/**
 * Vérifier si l'app a été ouverte via une notification
 */
export const getInitialNotification = async (callback) => {
  const remoteMessage = await messaging().getInitialNotification();
  if (remoteMessage) {
    console.log(' App ouverte via notification:', remoteMessage);
    callback(remoteMessage);
  }
};
