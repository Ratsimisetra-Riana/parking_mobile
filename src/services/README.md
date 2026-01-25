# 📡 Guide d'utilisation de la couche API

##  Architecture

```
src/
├── config/
│   └── api.js              # Configuration axios + interceptors
└── services/
    ├── index.js            # Point d'entrée centralisé
    ├── authService.js      # Authentification (login, register, logout)
    ├── parkingService.js   # Gestion des parkings
    ├── vehicleService.js   # Types de véhicules
    └── reservationService.js # Réservations
```

---

## 🔧 Configuration

### URL de l'API Backend

Le fichier `src/config/api.js` est configuré avec :
```javascript
const BASE_URL = 'http://10.0.2.2:8080/api';
```

**Selon votre environnement :**
-  **Android Emulator** : `http://10.0.2.2:8080/api` (déjà configuré)
- 📱 **Device physique Android/iOS** : Remplacer par l'IP de votre PC (ex: `http://192.168.1.100:8080/api`)
- 🍎 **iOS Simulator** : `http://localhost:8080/api`

Pour obtenir votre IP locale (Windows PowerShell) :
```powershell
ipconfig | findstr IPv4
```

---

## 📚 Utilisation dans les composants

### 1️⃣ Import des services

```javascript
import { authService, parkingService, reservationService, vehicleService } from '../services';
```

---

### 2️⃣ Authentification

#### **Login (Connexion)**
```javascript
import { authService } from '../services';

const handleLogin = async () => {
  try {
    const response = await authService.login('jean_rakoto', 'password123');
    console.log('Connecté !', response);
    // Le token est automatiquement stocké dans AsyncStorage
    // Navigation vers l'écran suivant
    navigation.navigate('Liste des parkings');
  } catch (error) {
    if (error.response) {
      Alert.alert('Erreur', 'Identifiants incorrects');
    } else {
      Alert.alert('Erreur', 'Impossible de se connecter au serveur');
    }
  }
};
```

#### **Register (Inscription)**
```javascript
const handleRegister = async () => {
  try {
    const userData = {
      name: 'Rakoto',
      first_name: 'Jean',
      user_name: 'jean_rakoto',
      email: 'jean.rakoto@example.com',
      password: 'password123',
      phone_number: '+261340000000',
    };
    
    const response = await authService.register(userData);
    console.log('Compte créé !', response);
    // Token stocké automatiquement
    navigation.navigate('Liste des parkings');
  } catch (error) {
    Alert.alert('Erreur', 'Impossible de créer le compte');
  }
};
```

#### **Logout (Déconnexion)**
```javascript
const handleLogout = async () => {
  await authService.logout();
  navigation.navigate('Home');
};
```

#### **Vérifier si connecté**
```javascript
useEffect(() => {
  const checkAuth = async () => {
    const isAuth = await authService.isAuthenticated();
    if (!isAuth) {
      navigation.navigate('Login');
    }
  };
  checkAuth();
}, []);
```

---

### 3️⃣ Parkings

#### **Récupérer tous les parkings**
```javascript
import { parkingService } from '../services';
import { useState, useEffect } from 'react';

const [parkings, setParkings] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchParkings = async () => {
    try {
      const data = await parkingService.getAllParkings();
      setParkings(data);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les parkings');
    } finally {
      setLoading(false);
    }
  };
  
  fetchParkings();
}, []);
```

#### **Rechercher avec filtres**
```javascript
const handleSearch = async () => {
  try {
    const filters = {
      startDate: '2025-01-18T13:00:00',
      endDate: '2025-01-18T15:00:00',
      vehicleType: 2, // ID du type de véhicule (2 = Voiture)
      numberOfVehicles: 1,
      minPrice: 0.5,
      maxPrice: 5.0,
      sortBy: 'price', // 'price' ou 'rating'
    };
    
    const results = await parkingService.searchParkings(filters);
    setParkings(results);
  } catch (error) {
    Alert.alert('Erreur', 'Recherche impossible');
  }
};
```

#### **Détails d'un parking**
```javascript
const [parking, setParking] = useState(null);

useEffect(() => {
  const fetchParkingDetails = async () => {
    try {
      const data = await parkingService.getParkingById(parkingId);
      setParking(data);
    } catch (error) {
      Alert.alert('Erreur', 'Parking non trouvé');
    }
  };
  
  fetchParkingDetails();
}, [parkingId]);
```

---

### 4️⃣ Véhicules

#### **Récupérer les types de véhicules**
```javascript
import { vehicleService } from '../services';

const [vehicleTypes, setVehicleTypes] = useState([]);

useEffect(() => {
  const fetchVehicleTypes = async () => {
    try {
      const data = await vehicleService.getAllVehicles();
      setVehicleTypes(data);
      // Exemple de data:
      // [
      //   { Id_Vehicles: 1, types: "Moto", icon: "bicycle" },
      //   { Id_Vehicles: 2, types: "Voiture", icon: "car-sport" },
      //   { Id_Vehicles: 3, types: "Bus", icon: "bus" },
      //   { Id_Vehicles: 4, types: "Camion", icon: "trail-sign" }
      // ]
    } catch (error) {
      console.error('Erreur chargement types véhicules');
    }
  };
  
  fetchVehicleTypes();
}, []);
```

---

### 5️⃣ Réservations

#### **Calculer le prix d'une réservation**
```javascript
import { reservationService } from '../services';

const [totalPrice, setTotalPrice] = useState(0);

const calculateReservationPrice = async () => {
  try {
    const priceData = {
      parkingId: 1,
      startDateTime: '2025-01-18T13:00:00',
      endDateTime: '2025-01-18T15:00:00',
      selectedVehicles: [
        { vehicleTypeId: 2, quantity: 1 } // 1 voiture
      ]
    };
    
    const price = await reservationService.calculatePrice(priceData);
    setTotalPrice(price); // Retourne un nombre (ex: 2.50)
  } catch (error) {
    Alert.alert('Erreur', 'Impossible de calculer le prix');
  }
};
```

#### **Créer une réservation**
```javascript
const handleConfirmReservation = async () => {
  try {
    const reservationData = {
      parkingId: 1,
      userId: 2, // ID de l'utilisateur connecté
      startDateTime: '2025-01-18T13:00:00',
      endDateTime: '2025-01-18T15:00:00',
      paymentMethod: 'CARD',
      selectedVehicles: [
        { vehicleTypeId: 2, quantity: 1 }
      ]
    };
    
    const newReservation = await reservationService.createReservation(reservationData);
    console.log('Réservation créée:', newReservation);
    
    // Naviguer vers la confirmation
    navigation.navigate('Confirmation de la réservation', {
      reservationId: newReservation.Id_Reservation
    });
  } catch (error) {
    Alert.alert('Erreur', 'Impossible de créer la réservation');
  }
};
```

#### **Récupérer les réservations d'un utilisateur**
```javascript
const [reservations, setReservations] = useState([]);

useEffect(() => {
  const fetchUserReservations = async () => {
    try {
      const userId = 2; // Récupérer depuis AsyncStorage ou Context
      const data = await reservationService.getUserReservations(userId);
      setReservations(data);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger vos réservations');
    }
  };
  
  fetchUserReservations();
}, []);
```

#### **Détails d'une réservation**
```javascript
const [reservation, setReservation] = useState(null);

useEffect(() => {
  const fetchReservation = async () => {
    try {
      const data = await reservationService.getReservationById(reservationId);
      setReservation(data);
    } catch (error) {
      Alert.alert('Erreur', 'Réservation non trouvée');
    }
  };
  
  fetchReservation();
}, [reservationId]);
```

---

## 🔒 Gestion du Token JWT

Le token JWT est **géré automatiquement** :
-  **Stockage** après login/register dans AsyncStorage
-  **Ajout automatique** dans les headers de chaque requête (interceptor)
-  **Suppression** lors du logout
-  **Redirection** si 401 (token expiré)

---

## 🚨 Gestion des erreurs

### Exemple complet avec gestion d'erreurs
```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const data = await parkingService.getAllParkings();
    setParkings(data);
  } catch (err) {
    if (err.response) {
      // Erreur du serveur (4xx, 5xx)
      setError(`Erreur ${err.response.status}: ${err.response.data.message || 'Erreur serveur'}`);
    } else if (err.request) {
      // Pas de réponse du serveur
      setError('Impossible de contacter le serveur. Vérifiez votre connexion.');
    } else {
      // Autre erreur
      setError('Une erreur est survenue');
    }
  } finally {
    setLoading(false);
  }
};
```

---

##  Format des dates

Les APIs backend attendent des dates au format ISO 8601 :
```
yyyy-MM-dd'T'HH:mm:ss
```

### Exemple de conversion
```javascript
const formatDateForAPI = (date) => {
  // date est un objet Date JavaScript
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

// Utilisation
const startDate = new Date();
const formattedDate = formatDateForAPI(startDate);
// Résultat: "2025-01-18T13:40:00"
```

---

##  Checklist avant de tester

1.  Backend démarré sur `http://localhost:8080`
2.  Base de données PostgreSQL avec données de test
3.  Android Emulator lancé (ou device physique avec IP configurée)
4.  Metro bundler démarré (`npm start`)
5.  App installée sur émulateur (`npm run android`)

---

## 🐛 Troubleshooting

### Erreur: "Network request failed"
- Erreur: Backend non démarré
- Erreur: Mauvaise URL (vérifier `src/config/api.js`)
- Erreur: Firewall bloquant le port 8080

### Erreur: "401 Unauthorized"
- Erreur: Token expiré → se reconnecter
- Erreur: Token invalide → vérifier AsyncStorage

### Erreur: "404 Not Found"
- Erreur: Endpoint incorrect → vérifier l'URL dans le service
- Erreur: Ressource n'existe pas (ID invalide)

---

## 🎉 Prochaines étapes

1. Intégrer `authService` dans `Login.jsx` et `Registration.jsx`
2. Intégrer `parkingService` dans `ParkingList.jsx`
3. Intégrer `reservationService` dans `Reservation.jsx`
4. Ajouter Context API pour gérer l'état global de l'utilisateur
5. Tester l'intégration complète !

---

**Note importante :** Ne JAMAIS commiter les tokens ou données sensibles dans le code. Utilisez toujours AsyncStorage pour le stockage local.
