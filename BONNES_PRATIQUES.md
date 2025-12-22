# 📚 Guide des Bonnes Pratiques - Parking Mobile

## 🎯 Introduction

Ce document présente les bonnes pratiques de développement observées dans le projet Parking Mobile et les recommandations pour maintenir la qualité du code.

---

## ✅ Bonnes Pratiques Actuelles

### 1. Architecture en Couches

**✅ Ce qui est bien fait :**

```javascript
// Séparation claire des responsabilités
src/
├── screens/      // Présentation
├── components/   // UI réutilisable
├── services/     // Logique métier
├── config/       // Configuration
└── hooks/        // Logique partagée
```

**Avantages :**
- Code maintenable
- Testabilité améliorée
- Réutilisabilité
- Évolutivité

---

### 2. Services API Centralisés

**✅ Pattern Service :**

```javascript
// ✅ BON : Centralisation de la logique
const authService = {
  login: async (username, password) => {
    const response = await api.post('/v1/auth/authenticate', {
      user_name: username,
      password
    });
    
    // Stockage automatique
    await AsyncStorage.setItem('jwt_token', response.data.token);
    
    return response.data;
  }
};

// ❌ MAUVAIS : Logique dans le composant
const LoginScreen = () => {
  const handleLogin = async () => {
    const response = await axios.post('http://...', { ... });
    await AsyncStorage.setItem('token', response.data.token);
  };
};
```

**Pourquoi c'est mieux :**
- Logique réutilisable
- Facile à tester
- Facile à modifier
- Un seul endroit pour les appels API

---

### 3. Gestion des Erreurs

**✅ Gestion exhaustive :**

```javascript
try {
  const data = await parkingService.getAllParkings();
  setParkings(data);
} catch (error) {
  // Erreur serveur (4xx, 5xx)
  if (error.response) {
    if (error.response.status === 401) {
      Alert.alert('Erreur', 'Session expirée');
      navigation.navigate('Login');
    } else {
      Alert.alert('Erreur', `Erreur ${error.response.status}`);
    }
  } 
  // Pas de réponse du serveur
  else if (error.request) {
    Alert.alert('Erreur', 'Serveur inaccessible');
  } 
  // Autre erreur
  else {
    Alert.alert('Erreur', 'Une erreur est survenue');
  }
} finally {
  setLoading(false);
}
```

**Avantages :**
- Messages d'erreur contextuels
- Meilleure UX
- Débogage facilité

---

### 4. Validation des Données

**✅ Validation côté client :**

```javascript
const handleRegister = async () => {
  // Validation des champs
  if (!name.trim() || !firstName.trim() || !email.trim()) {
    Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    return;
  }

  // Validation email
  if (!validateEmail(email)) {
    Alert.alert('Erreur', 'Email invalide');
    return;
  }

  // Validation mot de passe
  if (password.length < 6) {
    Alert.alert('Erreur', 'Mot de passe trop court');
    return;
  }

  // Validation correspondance
  if (password !== confirmPassword) {
    Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
    return;
  }

  // Appel API seulement si tout est valide
  await authService.register(userData);
};
```

**Avantages :**
- Feedback immédiat
- Moins de requêtes inutiles
- Meilleure UX

---

### 5. Loading States

**✅ Feedback visuel :**

```javascript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await service.getData();
    setData(data);
  } finally {
    setLoading(false); // Toujours dans finally
  }
};

return (
  <View>
    {loading ? (
      <ActivityIndicator size="large" color="#A4E66E" />
    ) : (
      <DataList data={data} />
    )}
  </View>
);
```

**Avantages :**
- Utilisateur informé
- Pas de clics multiples
- UX professionnelle

---

### 6. Composants Réutilisables

**✅ DRY (Don't Repeat Yourself) :**

```javascript
// ✅ BON : Composant réutilisable
<FilterButton 
  icon="calendar-outline" 
  label="Date de début" 
  onPress={() => openPicker('start')} 
  value={startDate ? startDate.toLocaleString() : "Sélectionner"} 
/>

<FilterButton 
  icon="calendar-outline" 
  label="Date de fin" 
  onPress={() => openPicker('end')} 
  value={endDate ? endDate.toLocaleString() : "Sélectionner"} 
/>

// ❌ MAUVAIS : Code dupliqué
<TouchableOpacity onPress={() => openPicker('start')}>
  <Ionicons name="calendar-outline" size={20} />
  <Text>Date de début</Text>
  <Text>{startDate ? startDate.toLocaleString() : "Sélectionner"}</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => openPicker('end')}>
  <Ionicons name="calendar-outline" size={20} />
  <Text>Date de fin</Text>
  <Text>{endDate ? endDate.toLocaleString() : "Sélectionner"}</Text>
</TouchableOpacity>
```

---

### 7. Hooks Personnalisés

**✅ Logique partagée :**

```javascript
// ✅ BON : Hook personnalisé
const useFilters = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  useEffect(() => {
    loadVehicleTypes();
  }, []);

  const toggleVehicleSelection = (vehicleId) => {
    setSelectedVehicles(prev =>
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId) 
        : [...prev, vehicleId]
    );
  };

  return {
    startDate, setStartDate,
    endDate, setEndDate,
    selectedVehicles, toggleVehicleSelection,
    vehicleOptions
  };
};

// Utilisation dans plusieurs écrans
const ParkingList = () => {
  const { startDate, endDate, selectedVehicles } = useFilters();
  // ...
};
```

**Avantages :**
- Logique centralisée
- Réutilisable
- Testable
- Maintenable

---

### 8. Intercepteurs Axios

**✅ Injection automatique du token :**

```javascript
api.interceptors.request.use(async (config) => {
  const publicEndpoints = [
    '/v1/auth/authenticate',
    '/v1/auth/register',
    '/parkings'
  ];
  
  const isPublic = publicEndpoints.some(endpoint => 
    config.url.startsWith(endpoint)
  );
  
  if (!isPublic) {
    const token = await AsyncStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return config;
});
```

**Avantages :**
- Pas besoin d'ajouter le token manuellement
- Centralisé
- Moins d'erreurs

---

## 🚀 Recommandations d'Amélioration

### 1. Tests Unitaires

**❌ Actuellement : Pas de tests**

**✅ Recommandation : Ajouter Jest**

```javascript
// authService.test.js
import { authService } from './authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');

describe('authService', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  test('login should store token', async () => {
    const mockResponse = {
      data: {
        token: 'fake-token',
        userId: 1,
        userName: 'john'
      }
    };
    
    // Mock API call
    jest.spyOn(api, 'post').mockResolvedValue(mockResponse);
    
    await authService.login('john', 'password');
    
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'jwt_token',
      'fake-token'
    );
  });

  test('isAuthenticated should return true when token exists', async () => {
    AsyncStorage.getItem.mockResolvedValue('fake-token');
    
    const result = await authService.isAuthenticated();
    
    expect(result).toBe(true);
  });
});
```

---

### 2. Mémoisation

**❌ Actuellement : Pas de mémoisation**

**✅ Recommandation : Utiliser useMemo et useCallback**

```javascript
// ❌ AVANT : Recalcul à chaque render
const ParkingList = ({ parkings }) => {
  const filteredParkings = parkings.filter(p => p.price < 10);
  
  return <FlatList data={filteredParkings} />;
};

// ✅ APRÈS : Mémoisation
const ParkingList = ({ parkings }) => {
  const filteredParkings = useMemo(() => {
    return parkings.filter(p => p.price < 10);
  }, [parkings]);
  
  return <FlatList data={filteredParkings} />;
};
```

```javascript
// ❌ AVANT : Nouvelle fonction à chaque render
const ParkingCard = ({ parking, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(parking.id)}>
      {/* ... */}
    </TouchableOpacity>
  );
};

// ✅ APRÈS : Fonction mémorisée
const ParkingList = () => {
  const handlePress = useCallback((id) => {
    navigation.navigate('Details', { parkingId: id });
  }, [navigation]);
  
  return parkings.map(p => (
    <ParkingCard key={p.id} parking={p} onPress={handlePress} />
  ));
};
```

---

### 3. State Management Global

**❌ Actuellement : Prop drilling**

**✅ Recommandation : Context API**

```javascript
// UserContext.js
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    const storedToken = await AsyncStorage.getItem('jwt_token');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  };

  const login = async (username, password) => {
    const response = await authService.login(username, password);
    setUser(response.user);
    setToken(response.token);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// Utilisation
const Header = () => {
  const { user, logout } = useUser();
  
  return (
    <View>
      <Text>Bonjour {user?.user_name}</Text>
      <Button onPress={logout}>Déconnexion</Button>
    </View>
  );
};
```

---

### 4. Accessibilité

**❌ Actuellement : Pas de labels accessibles**

**✅ Recommandation : Ajouter accessibilityLabel**

```javascript
// ❌ AVANT
<TouchableOpacity onPress={handleLogin}>
  <Text>Se connecter</Text>
</TouchableOpacity>

// ✅ APRÈS
<TouchableOpacity 
  onPress={handleLogin}
  accessibilityLabel="Bouton de connexion"
  accessibilityHint="Appuyez pour vous connecter avec vos identifiants"
  accessibilityRole="button"
>
  <Text>Se connecter</Text>
</TouchableOpacity>
```

---

### 5. Internationalisation

**❌ Actuellement : Textes en dur**

**✅ Recommandation : i18next**

```javascript
// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {
          'login.title': 'Se connecter',
          'login.username': "Nom d'utilisateur",
          'login.password': 'Mot de passe',
          'login.submit': 'Valider'
        }
      },
      en: {
        translation: {
          'login.title': 'Login',
          'login.username': 'Username',
          'login.password': 'Password',
          'login.submit': 'Submit'
        }
      }
    },
    lng: 'fr',
    fallbackLng: 'fr'
  });

// Utilisation
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('login.title')}</Text>
      <TextInput placeholder={t('login.username')} />
      <TextInput placeholder={t('login.password')} />
      <Button title={t('login.submit')} />
    </View>
  );
};
```

---

### 6. Pagination

**❌ Actuellement : Toutes les données chargées**

**✅ Recommandation : Pagination**

```javascript
const ParkingList = () => {
  const [parkings, setParkings] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const data = await parkingService.getAllParkings({ page, limit: 20 });
      setParkings(prev => [...prev, ...data.results]);
      setHasMore(data.hasMore);
      setPage(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={parkings}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
  );
};
```

---

### 7. Monitoring des Erreurs

**❌ Actuellement : Pas de monitoring**

**✅ Recommandation : Sentry**

```javascript
// sentry.js
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: __DEV__ ? 'development' : 'production',
  tracesSampleRate: 1.0,
});

// Utilisation
try {
  await reservationService.createReservation(data);
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      component: 'Reservation',
      action: 'createReservation'
    },
    extra: {
      reservationData: data
    }
  });
  
  Alert.alert('Erreur', 'Impossible de créer la réservation');
}
```

---

## 📋 Checklist de Qualité

### Avant de Commit

- [ ] Code formaté (Prettier)
- [ ] Pas d'erreurs ESLint
- [ ] Tests passent (quand implémentés)
- [ ] Pas de console.log oubliés
- [ ] Pas de code commenté
- [ ] Nommage clair et cohérent
- [ ] Gestion des erreurs
- [ ] Loading states
- [ ] Validation des données

### Avant de Merge

- [ ] Code review effectué
- [ ] Tests ajoutés pour les nouvelles fonctionnalités
- [ ] Documentation mise à jour
- [ ] Pas de régression
- [ ] Performance vérifiée
- [ ] Accessibilité vérifiée

### Avant de Release

- [ ] Tests E2E passent
- [ ] Performance optimale
- [ ] Pas de memory leaks
- [ ] Accessibilité complète
- [ ] Internationalisation
- [ ] Analytics configurés
- [ ] Monitoring configuré
- [ ] Documentation complète

---

## 🎯 Conventions de Nommage

### Fichiers

```
✅ BON
ParkingList.jsx
ReservationCard.jsx
authService.js
useFilters.jsx

❌ MAUVAIS
parkinglist.jsx
reservationcard.jsx
auth-service.js
use_filters.jsx
```

### Variables et Fonctions

```javascript
// ✅ BON : camelCase
const userName = 'John';
const totalPrice = 25.50;
const handleSubmit = () => {};
const isAuthenticated = true;

// ❌ MAUVAIS
const user_name = 'John';
const TotalPrice = 25.50;
const HandleSubmit = () => {};
const is_authenticated = true;
```

### Composants

```javascript
// ✅ BON : PascalCase
const ParkingCard = () => {};
const ReservationList = () => {};

// ❌ MAUVAIS
const parkingCard = () => {};
const reservation_list = () => {};
```

### Constantes

```javascript
// ✅ BON : UPPER_SNAKE_CASE
const BASE_URL = 'https://api.example.com';
const MAX_RETRIES = 3;

// ❌ MAUVAIS
const baseUrl = 'https://api.example.com';
const maxRetries = 3;
```

---

## 📝 Commentaires

### Quand Commenter

```javascript
// ✅ BON : Expliquer le "pourquoi"
// Utiliser 10.0.2.2 pour Android emulator (localhost de l'hôte)
const BASE_URL = 'http://10.0.2.2:8080/api';

// Ajouter une marge de 60 secondes pour éviter les expirations prématurées
return decoded.exp < (currentTime + 60);

// ❌ MAUVAIS : Expliquer le "quoi" (évident)
// Définir la base URL
const BASE_URL = 'http://10.0.2.2:8080/api';

// Retourner true si expiré
return decoded.exp < currentTime;
```

### JSDoc pour les Fonctions Complexes

```javascript
/**
 * Calcule le prix total d'une réservation
 * @param {Object} data - Données de la réservation
 * @param {number} data.parkingId - ID du parking
 * @param {string} data.startDateTime - Date/heure de début (ISO 8601)
 * @param {string} data.endDateTime - Date/heure de fin (ISO 8601)
 * @param {Array} data.selectedVehicles - Véhicules sélectionnés
 * @returns {Promise<number>} Prix total en euros
 */
const calculatePrice = async (data) => {
  // ...
};
```

---

## 🔒 Sécurité

### Ne JAMAIS

```javascript
// ❌ JAMAIS : Stocker des données sensibles en clair
const password = 'password123'; // Hardcodé
await AsyncStorage.setItem('password', password);

// ❌ JAMAIS : Logger des données sensibles
console.log('Token:', token);
console.log('Password:', password);

// ❌ JAMAIS : Exposer des clés API
const API_KEY = 'sk_live_123456789';
```

### TOUJOURS

```javascript
// ✅ TOUJOURS : Utiliser des variables d'environnement
const API_KEY = process.env.REACT_APP_API_KEY;

// ✅ TOUJOURS : Valider les entrées utilisateur
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ✅ TOUJOURS : Gérer les erreurs
try {
  await api.post('/endpoint', data);
} catch (error) {
  // Gérer l'erreur
}
```

---

## 📊 Performance

### Optimisations

```javascript
// ✅ BON : FlatList pour les longues listes
<FlatList
  data={parkings}
  renderItem={({ item }) => <ParkingCard parking={item} />}
  keyExtractor={item => item.id.toString()}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>

// ❌ MAUVAIS : ScrollView pour les longues listes
<ScrollView>
  {parkings.map(p => <ParkingCard key={p.id} parking={p} />)}
</ScrollView>
```

```javascript
// ✅ BON : Mémoisation des composants
const ParkingCard = React.memo(({ parking }) => {
  return <View>{/* ... */}</View>;
});

// ✅ BON : Mémoisation des calculs
const totalPrice = useMemo(() => {
  return reservations.reduce((sum, r) => sum + r.price, 0);
}, [reservations]);
```

---

**Date :** 20 novembre 2025  
**Version :** 1.0
