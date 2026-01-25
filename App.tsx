//interface
import * as React from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Firebase & Notifications
import {
  requestUserPermission,
  getFCMToken,
  onTokenRefresh,
  onForegroundMessage,
  setBackgroundMessageHandler,
  onNotificationOpenedApp,
  getInitialNotification,
} from './src/config/firebase';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { registerDeviceToken } from './src/services/notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

//screens
import Login from './src/screens/auth/Login/Login'; // relative path
import Home from './src/screens/main/Home/Home'; // relative path
import Registration from './src/screens/auth/Registration/Registration'; // relative path
import ParkingList from './src/screens/main/ParkingList/ParkingList'; // relative path
import ParkingDetails from "./src/screens/main/ParkingDetails/ParkingDetails";
import MyParkingDetails from "./src/screens/main/ParkingDetails/MyParkingDetails";
import Reservation from "./src/screens/forms/Reservation/Reservation";
import ReservationConfirmation from "./src/screens/process/ReservationConfirmation/ReservationConfirmation";
import ReservationList from "./src/screens/lists/ReservationList/ReservationList";
import MyParkings from "./src/screens/profile/MyParkings/MyParkings";
import AddEditParking from "./src/screens/forms/AddEditParking/AddEditParking";
import MyAnnouncements from "./src/screens/profile/MyAnnouncements/MyAnnouncements";
import CreateAnnouncement from "./src/screens/forms/CreateAnnouncement/CreateAnnouncement";
import ReservationRequests from "./src/screens/lists/ReservationRequests/ReservationRequests";
import PaymentFinalization from "./src/screens/process/PaymentFinalization/PaymentFinalization";
import Notifications from "./src/screens/lists/Notifications/Notifications";
import QRCodeDisplay from "./src/screens/process/QRCodeDisplay/QRCodeDisplay";
import QRCodeScanner from "./src/screens/process/QRCodeScanner/QRCodeScanner";
import ReportIssue from "./src/screens/forms/ReportIssue/ReportIssue";
import MyDisputes from "./src/screens/lists/MyDisputes/MyDisputes";


const Stack = createNativeStackNavigator();

export default function App() {
  // Initialiser FCM au démarrage de l'app
  React.useEffect(() => {
    console.log(' DÉBUT initialisation FCM...');
    const initializeFCM = async () => {
      try {
        console.log(' Étape 1: Demande permissions...');
        // 1. Demander les permissions
        const hasPermission = await requestUserPermission();
        console.log(' Permissions résultat:', hasPermission);
        console.log(' Permissions résultat:', hasPermission);
        if (!hasPermission) {
          console.warn(' Permissions notifications non accordées');
          return;
        }

        console.log(' Étape 2: Récupération token FCM...');
        // 2. Obtenir le token FCM
        const fcmToken = await getFCMToken();
        console.log(' Token FCM reçu:', fcmToken ? 'OUI' : 'NON');
        if (fcmToken) {
          // Récupérer l'ID utilisateur depuis AsyncStorage (après login)
          const userDataString = await AsyncStorage.getItem('userData');
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            const userId = userData.id || userData.Id_Users;
            
            // Enregistrer le token dans le backend
            await registerDeviceToken(userId, fcmToken, Platform.OS);
          } else {
            console.log('ℹ️ Utilisateur non connecté, token sera enregistré après login');
          }
        }

        // 3. Écouter les rafraîchissements de token
        const unsubscribeTokenRefresh = onTokenRefresh(async (newToken: string) => {
          const userDataString = await AsyncStorage.getItem('userData');
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            const userId = userData.id || userData.Id_Users;
            await registerDeviceToken(userId, newToken, Platform.OS);
          }
        });

        // 4. Écouter les notifications en foreground
        const unsubscribeForeground = onForegroundMessage((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          console.log(' Notification reçue:', remoteMessage.notification?.title);
          // TODO: Afficher une notification locale ou un toast
        });

        // 5. Handler pour les notifications en background
        setBackgroundMessageHandler();

        // 6. Écouter les clics sur notifications (app fermée)
        onNotificationOpenedApp((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          console.log(' Notification cliquée:', remoteMessage.data);
          // TODO: Naviguer vers l'écran approprié
        });

        // 7. Vérifier si l'app a été ouverte via une notification
        getInitialNotification((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          console.log(' App ouverte via notification:', remoteMessage.data);
          // TODO: Naviguer vers l'écran approprié
        });

        // Cleanup
        return () => {
          unsubscribeTokenRefresh();
          unsubscribeForeground();
        };
      } catch (error) {
        console.error('Erreur: Erreur initialisation FCM:', error);
        console.error('Erreur: Stack trace:', error.stack);
      }
    };

    initializeFCM();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <NavigationContainer>

          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="Liste des parkings" component={ParkingList} />
            <Stack.Screen name="Détails du parking" component={ParkingDetails} />
            <Stack.Screen name="MyParkingDetails" component={MyParkingDetails} />
            <Stack.Screen name="Réservation" component={Reservation} />
            <Stack.Screen name="Confirmation de la réservation" component={ReservationConfirmation} />
            <Stack.Screen name="Mes réservations" component={ReservationList} />
            <Stack.Screen name="Mes Parkings" component={MyParkings} />
            <Stack.Screen name="AddEditParking" component={AddEditParking} />
            <Stack.Screen name="MyAnnouncements" component={MyAnnouncements} />
            <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncement} />
            <Stack.Screen name="ReservationRequests" component={ReservationRequests} />
            <Stack.Screen name="Mes Demandes" component={ReservationRequests} />
            <Stack.Screen name="PaymentFinalization" component={PaymentFinalization} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="QRCodeDisplay" component={QRCodeDisplay} />
            <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} />
            <Stack.Screen name="ReportIssue" component={ReportIssue} />
            <Stack.Screen name="MyDisputes" component={MyDisputes} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
