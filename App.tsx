//interface
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, Card, Button, Text } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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


const Stack = createNativeStackNavigator();



export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <NavigationContainer>

          <Stack.Navigator
            initialRouteName="Home"
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
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: { width: '100%', padding: 16 },
});
