import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';


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

//get fcm
export const getFCMToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(' FCM Token obtenu:', fcmToken.substring(0, 20) + '...');
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

//refresh FCm
export const onTokenRefresh = (callback) => {
  return messaging().onTokenRefresh((token) => {
    console.log(' Token FCM rafraîchi:', token.substring(0, 20) + '...');
    callback(token);
  });
};


export const onForegroundMessage = (callback) => {
  return messaging().onMessage(async (remoteMessage) => {
    console.log(' Notification foreground:', remoteMessage);
    callback(remoteMessage);
  });
};


export const setBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('📭 Notification background:', remoteMessage);
    // Vous pouvez traiter la notification ici si besoin
  });
};


export const onNotificationOpenedApp = (callback) => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(' Notification cliquée (app fermée):', remoteMessage);
    callback(remoteMessage);
  });
};


export const getInitialNotification = async (callback) => {
  const remoteMessage = await messaging().getInitialNotification();
  if (remoteMessage) {
    console.log(' App ouverte via notification:', remoteMessage);
    callback(remoteMessage);
  }
};
