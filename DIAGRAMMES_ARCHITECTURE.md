# 🏗️ Diagrammes d'Architecture - Parking Mobile

## 📊 Architecture Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                        MOBILE APP (React Native)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              PRESENTATION LAYER                        │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │  Screens │  │Components│  │  Hooks   │            │   │
│  │  │ (8 écrans)  │(9 comps) │  │(useFilters)          │   │
│  │  └──────────┘  └──────────┘  └──────────┘            │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓                                    │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              BUSINESS LOGIC LAYER                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │   Auth   │  │ Parking  │  │Reservation│           │   │
│  │  │ Service  │  │ Service  │  │  Service  │           │   │
│  │  └──────────┘  └──────────┘  └──────────┘            │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓                                    │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              DATA ACCESS LAYER                         │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │   Axios  │  │AsyncStorage│ │   JWT    │           │   │
│  │  │Interceptor│ │  (Local)  │  │  Token   │           │   │
│  │  └──────────┘  └──────────┘  └──────────┘            │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓                                    │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                    ┌───────────────┐
                    │   REST API    │
                    │   (Backend)   │
                    └───────────────┘
```

---

## 🔄 Flux de Données

### 1. Authentification

```
┌─────────┐
│  User   │
└────┬────┘
     │ 1. Saisie credentials
     ↓
┌─────────────┐
│Login Screen │
└──────┬──────┘
       │ 2. handleSubmit()
       ↓
┌──────────────┐
│ authService  │
│   .login()   │
└──────┬───────┘
       │ 3. POST /v1/auth/authenticate
       ↓
┌──────────────┐
│  Axios API   │
└──────┬───────┘
       │ 4. HTTP Request
       ↓
┌──────────────┐
│   Backend    │
└──────┬───────┘
       │ 5. { token, userId, userName }
       ↓
┌──────────────┐
│ authService  │
└──────┬───────┘
       │ 6. AsyncStorage.setItem('jwt_token', token)
       │    AsyncStorage.setItem('user', userData)
       ↓
┌──────────────┐
│AsyncStorage  │
└──────┬───────┘
       │ 7. Token stored
       ↓
┌──────────────┐
│Login Screen  │
└──────┬───────┘
       │ 8. navigation.navigate('Liste des parkings')
       ↓
┌──────────────┐
│ParkingList   │
└──────────────┘
```

---

### 2. Recherche de Parkings

```
┌─────────────┐
│ParkingList  │
│   Screen    │
└──────┬──────┘
       │ 1. useEffect(() => loadParkings())
       ↓
┌──────────────┐
│parkingService│
│.getAllParkings()
└──────┬───────┘
       │ 2. GET /parkings
       ↓
┌──────────────┐
│  Axios API   │
│ (Interceptor)│
└──────┬───────┘
       │ 3. Injection JWT Token
       │    config.headers.Authorization = `Bearer ${token}`
       ↓
┌──────────────┐
│   Backend    │
└──────┬───────┘
       │ 4. [{ id, label, description, hourlyRate, ... }]
       ↓
┌──────────────┐
│ParkingList   │
│   Screen     │
└──────┬───────┘
       │ 5. setParkings(data)
       ↓
┌──────────────┐
│ ParkingCard  │
│ (Component)  │
└──────────────┘
       │ 6. Affichage des cartes
```

---

### 3. Création de Réservation

```
┌─────────────┐
│Reservation  │
│   Screen    │
└──────┬──────┘
       │ 1. Sélection dates + véhicules
       ↓
┌──────────────┐
│reservationSvc│
│.calculatePrice()
└──────┬───────┘
       │ 2. POST /reservations/calculate-price
       │    { parkingId, startDateTime, endDateTime, selectedVehicles }
       ↓
┌──────────────┐
│   Backend    │
└──────┬───────┘
       │ 3. { totalPrice: 25.50 }
       ↓
┌──────────────┐
│Reservation   │
│   Screen     │
└──────┬───────┘
       │ 4. setCalculatedPrice(25.50)
       │ 5. User clicks "Confirmer"
       ↓
┌──────────────┐
│reservationSvc│
│.createReservation()
└──────┬───────┘
       │ 6. Vérification authentification
       │    const user = await AsyncStorage.getItem('user')
       │    const token = await AsyncStorage.getItem('jwt_token')
       ↓
┌──────────────┐
│AsyncStorage  │
└──────┬───────┘
       │ 7. { Id_Users: 2, user_name: 'john' }
       ↓
┌──────────────┐
│reservationSvc│
└──────┬───────┘
       │ 8. POST /reservations
       │    { userId, parkingId, startDateTime, endDateTime, ... }
       ↓
┌──────────────┐
│  Axios API   │
│ (Interceptor)│
└──────┬───────┘
       │ 9. Injection JWT Token
       ↓
┌──────────────┐
│   Backend    │
└──────┬───────┘
       │ 10. { Id_Reservation: 123, status: 'à venir', ... }
       ↓
┌──────────────┐
│Reservation   │
│   Screen     │
└──────┬───────┘
       │ 11. navigation.navigate('Confirmation', { reservation })
       ↓
┌──────────────┐
│Confirmation  │
│   Screen     │
└──────────────┘
```

---

## 🔐 Sécurité - Flux JWT

```
┌─────────────────────────────────────────────────────────┐
│                    JWT TOKEN FLOW                       │
└─────────────────────────────────────────────────────────┘

1. LOGIN/REGISTER
   ┌──────────┐
   │  User    │
   └────┬─────┘
        │ credentials
        ↓
   ┌──────────┐
   │ Backend  │
   └────┬─────┘
        │ JWT Token
        ↓
   ┌──────────────┐
   │AsyncStorage  │
   │jwt_token: xxx│
   └──────────────┘

2. SUBSEQUENT REQUESTS
   ┌──────────────┐
   │   Screen     │
   └────┬─────────┘
        │ API call
        ↓
   ┌──────────────┐
   │   Service    │
   └────┬─────────┘
        │ api.get('/endpoint')
        ↓
   ┌──────────────────────────────────┐
   │   Axios Interceptor              │
   │   (api.interceptors.request)     │
   └────┬─────────────────────────────┘
        │ 1. Check if public endpoint
        │ 2. If private:
        │    - Get token from AsyncStorage
        │    - Add header: Authorization: Bearer <token>
        ↓
   ┌──────────────┐
   │   Backend    │
   └────┬─────────┘
        │ Validate token
        │ Return data or 401
        ↓
   ┌──────────────────────────────────┐
   │   Axios Interceptor              │
   │   (api.interceptors.response)    │
   └────┬─────────────────────────────┘
        │ If 401:
        │   - Remove token from AsyncStorage
        │   - Redirect to Login
        ↓
   ┌──────────────┐
   │Login Screen  │
   └──────────────┘
```

---

## 📱 Navigation Flow

```
                    ┌─────────┐
                    │  Home   │
                    └────┬────┘
                         │
          ┌──────────────┴──────────────┐
          │                             │
          ↓                             ↓
    ┌──────────┐                 ┌──────────────┐
    │  Login   │                 │Registration  │
    └────┬─────┘                 └──────┬───────┘
         │                              │
         └──────────────┬───────────────┘
                        ↓
                ┌───────────────┐
                │ ParkingList   │ ← Footer: Accueil
                └───────┬───────┘
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ↓                           ↓
    ┌──────────────┐          ┌──────────────┐
    │ParkingDetails│          │ReservationList│ ← Footer: Réservations
    └──────┬───────┘          └──────────────┘
           │
           ↓
    ┌──────────────┐
    │ Reservation  │
    └──────┬───────┘
           │
           ↓
    ┌──────────────────────┐
    │ReservationConfirmation│
    └──────────────────────┘
```

---

## 🧩 Composants - Relations

```
┌─────────────────────────────────────────────────────────┐
│                    ParkingList Screen                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────────┐                                            │
│  │ Header │ ← Menu hamburger + Logo                    │
│  └────────┘                                            │
│                                                         │
│  ┌──────────────┐                                      │
│  │FilterButton  │ ← Date début, Date fin, Véhicules    │
│  └──────────────┘                                      │
│                                                         │
│  ┌──────────────┐                                      │
│  │ParkingCard   │ ← Affichage horizontal (ScrollView)  │
│  │ParkingCard   │                                      │
│  │ParkingCard   │                                      │
│  └──────────────┘                                      │
│                                                         │
│  ┌──────────────┐                                      │
│  │ ParkingMap   │ ← Carte interactive avec markers     │
│  └──────────────┘                                      │
│                                                         │
│  ┌────────┐                                            │
│  │ Footer │ ← Navigation bottom (5 boutons)            │
│  └────────┘                                            │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  ReservationList Screen                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────────┐                                            │
│  │ Header │                                            │
│  └────────┘                                            │
│                                                         │
│  ┌──────────────┐                                      │
│  │FilterDropdown│ ← Statut (modal)                     │
│  │FilterDropdown│ ← Période (modal)                    │
│  └──────────────┘                                      │
│                                                         │
│  ┌──────────────────┐                                  │
│  │ ReservationCard  │ ← FlatList avec pull-to-refresh  │
│  │ ReservationCard  │                                  │
│  │ ReservationCard  │                                  │
│  └──────────────────┘                                  │
│                                                         │
│  ┌────────┐                                            │
│  │ Footer │                                            │
│  └────────┘                                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 État et Props Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Reservation Screen                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  STATE:                                                 │
│  ┌──────────────────────────────────────────────┐     │
│  │ const [startDate, setStartDate] = useState() │     │
│  │ const [endDate, setEndDate] = useState()     │     │
│  │ const [selectedTypes, setSelectedTypes] = [] │     │
│  │ const [calculatedPrice, setCalculatedPrice]  │     │
│  │ const [availabilities, setAvailabilities]    │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  EFFECTS:                                               │
│  ┌──────────────────────────────────────────────┐     │
│  │ useEffect(() => {                            │     │
│  │   loadVehicleTypes();                        │     │
│  │ }, []);                                      │     │
│  │                                              │     │
│  │ useEffect(() => {                            │     │
│  │   loadParkingAvailability();                 │     │
│  │ }, [startDate, endDate]);                    │     │
│  │                                              │     │
│  │ useEffect(() => {                            │     │
│  │   calculatePrice();                          │     │
│  │ }, [startDate, endDate, selectedTypes]);     │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  RENDER:                                                │
│  ┌──────────────────────────────────────────────┐     │
│  │ DatePicker (startDate, setStartDate)         │     │
│  │ DatePicker (endDate, setEndDate)             │     │
│  │ VehicleSelector (selectedTypes, toggle)      │     │
│  │ PriceDisplay (calculatedPrice)               │     │
│  │ PaymentForm (cardNumber, cvv, ...)           │     │
│  │ ConfirmButton (handleConfirmReservation)     │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Data Models

### User
```typescript
{
  Id_Users: number,
  user_name: string,
  email: string,
  name: string,
  first_name: string,
  phone_number: string,
  role: 'USER' | 'ADMIN'
}
```

### Parking
```typescript
{
  Id_Parking: number,
  label: string,
  description: string,
  hourlyRate: number,
  latitude: number,
  longitude: number,
  user: {
    name: string,
    first_name: string
  }
}
```

### Reservation
```typescript
{
  Id_Reservation: number,
  userId: number,
  parkingId: number,
  startDateTime: string, // ISO 8601
  endDateTime: string,   // ISO 8601
  totalPrice: number,
  paymentMethod: 'CARTE_BANCAIRE' | 'MOBILE_MONEY',
  status: 'à venir' | 'En cours' | 'Terminée' | 'Annulée',
  selectedVehicles: [
    { vehicleTypeId: number, quantity: number }
  ]
}
```

### Vehicle
```typescript
{
  Id_Vehicles: number,
  types: string,
  icon: string
}
```

### Availability
```typescript
{
  availabilitySchedule: string, // "Du lundi au vendredi à 08:00-18:00"
  vehicleAvailabilities: [
    {
      vehicleType: string,
      vehicleTypeId: number,
      vehicleIcon: string,
      totalCapacity: number,
      availableCapacity: number,
      isAvailable: boolean
    }
  ]
}
```

---

## 🎯 Design Patterns Visuels

### Service Pattern
```
┌─────────────┐
│   Screen    │
└──────┬──────┘
       │ calls
       ↓
┌─────────────┐
│   Service   │ ← Encapsulation de la logique métier
└──────┬──────┘
       │ uses
       ↓
┌─────────────┐
│  Axios API  │
└─────────────┘
```

### Repository Pattern
```
┌─────────────┐
│   Service   │
└──────┬──────┘
       │ abstracts
       ↓
┌─────────────┐
│ Repository  │ ← Abstraction de la source de données
└──────┬──────┘
       │
       ├─→ API
       └─→ AsyncStorage
```

### Interceptor Pattern
```
Request Flow:
┌─────────┐     ┌─────────────┐     ┌─────────┐
│ Service │ ──→ │ Interceptor │ ──→ │ Backend │
└─────────┘     │ (add token) │     └─────────┘
                └─────────────┘

Response Flow:
┌─────────┐     ┌─────────────┐     ┌─────────┐
│ Service │ ←── │ Interceptor │ ←── │ Backend │
└─────────┘     │(handle 401) │     └─────────┘
                └─────────────┘
```

---

**Date :** 20 novembre 2025  
**Version :** 1.0
