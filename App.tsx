//interface
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider, Card, Button, Text } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Login from './src/screens/Login/Login'; // relative path
import Home from './src/screens/Home/Home'; // relative path
import Registration from './src/screens/Registration/Registration'; // relative path
import ParkingList from './src/screens/ParkingList/ParkingList'; // relative path
import ParkingDetails from "./src/screens/ParkingDetails/ParkingDetails";
import Reservation from "./src/screens/Reservation/Reservation";
import ReservationConfirmation from "./src/screens/ReservationConfirmation/ReservationConfirmation";
import ReservationList from "./src/screens/ReservationList/ReservationList";


const Stack = createNativeStackNavigator();



export default function App() {
  const [count, setCount] = React.useState(0);

  return (
     <GestureHandlerRootView style={{ flex: 1  }}>
           <PaperProvider>
                <NavigationContainer>
                 
                 <Stack.Navigator initialRouteName="Home">
                   <Stack.Screen name="Home" component={Home} />
                   <Stack.Screen name="Login" component={Login} />
                   <Stack.Screen name="Registration" component={Registration} />
                    <Stack.Screen name="Liste des parkings" component={ParkingList} />
                    <Stack.Screen name="Détails du parking" component={ParkingDetails} />
                    <Stack.Screen name="Réservation" component={Reservation} />
                    <Stack.Screen name="Confirmation de la réservation" component={ReservationConfirmation} />
                    <Stack.Screen name="Mes réservations" component={ReservationList} />
                 </Stack.Navigator>
               </NavigationContainer>
           </PaperProvider>
         </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: { width: '100%', padding: 16 },
});
