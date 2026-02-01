# Installation GPS pour AddEditParking

##  Modifications Terminées

### 1. **AndroidManifest.xml** 
- Ajouté permissions `ACCESS_FINE_LOCATION` et `ACCESS_COARSE_LOCATION`

### 2. **ParkingMapPicker.jsx** 
- Nouveau composant de carte interactive
- Marqueur draggable (déplaçable)
- Clic sur la carte pour repositionner
- Callback `onLocationChange(lat, lng)`

### 3. **AddEditParking.jsx** 
- États pour `latitude`, `longitude`, `showMapModal`
- Fonction `getCurrentLocation()` avec Geolocation
- Fonction `requestLocationPermission()` pour Android
- Modal avec ParkingMapPicker
- Interface utilisateur complète
- Validation de la localisation avant sauvegarde

---

## 📦 Installation Requise

### Installer la dépendance Geolocation

```bash
cd d:\Projet\parking_mobile
npm install @react-native-community/geolocation
```

### Nettoyer le cache et rebuild (IMPORTANT)

```bash
# Nettoyer le cache Metro
npx react-native start --reset-cache

# Dans un AUTRE terminal, rebuild l'app
cd android
./gradlew clean
cd ..
npx react-native run-android
```

**Note**: Depuis React Native 0.60+, le linking est automatique. Pas besoin de `react-native link`.

---

##  Fonctionnalités Implémentées

### **Option 1 : GPS Automatique**
- Bouton " Ma position GPS"
- Demande permission automatiquement
- Récupère latitude/longitude actuelles
- Affichage avec précision 6 décimales

### **Option 2 : Sélection Manuelle sur Carte**
- Bouton " Choisir sur la carte"
- Modal plein écran avec carte Leaflet
- Marqueur déplaçable (drag & drop)
- Clic sur la carte pour repositionner
- Bouton ✓ pour confirmer

### **Option 3 : Modification**
- Si position déjà définie, bouton "✏️ Modifier"
- Rouvre la carte avec la position actuelle

---

##  Workflow Utilisateur

```
Création de Parking
├─ Saisir nom, adresse, description
├─ Définir position GPS:
│  ├─ Option A: Cliquer "Ma position GPS"
│  │  └─ Demande permission → Obtient position → Affiche coordonnées
│  ├─ Option B: Cliquer "Choisir sur la carte"
│  │  └─ Ouvre modal → Déplacer marqueur → Confirmer
│  └─ Option C: Modifier position existante
│     └─ Cliquer "Modifier" → Carte avec position actuelle
├─ Sélectionner véhicules et capacités
└─ Enregistrer
   └─ Validation: position GPS obligatoire
   └─ Envoi au backend: "SRID=4326;POINT(lng lat)"
```

---

##  Format des Données

### Frontend (État)
```javascript
latitude: -18.9137  // Double
longitude: 47.506   // Double
```

### Backend (PostgreSQL PostGIS)
```sql
SRID=4326;POINT(47.506 -18.9137)
-- Format: POINT(longitude latitude)
```

### Conversion
```javascript
const locationString = `SRID=4326;POINT(${longitude} ${latitude})`;
```

---

## 🐛 Gestion des Erreurs

- **Permission refusée** → Alert avec message
- **GPS désactivé** → Propose sélection manuelle
- **Timeout GPS** → Propose sélection manuelle
- **Position non définie** → Validation bloque la sauvegarde

---

## 🧪 Test de l'Implémentation

### 1. Lancer l'app
```bash
npx react-native run-android
```

### 2. Naviguer vers "Mes Parkings" → "+"

### 3. Tester GPS
- Cliquer "Ma position GPS"
- Accepter permission
- Vérifier affichage coordonnées

### 4. Tester Carte
- Cliquer "Choisir sur la carte"
- Déplacer le marqueur
- Cliquer ailleurs sur la carte
- Confirmer avec ✓

### 5. Tester Modification
- Une fois position définie
- Cliquer "Modifier"
- Vérifier que la carte s'ouvre avec la position actuelle

### 6. Tester Validation
- Essayer de sauvegarder sans position
- Vérifier message d'erreur

---

##  Notes Importantes

1. **Permissions Android** : L'app demande automatiquement la permission la première fois
2. **Émulateur Android** : Peut simuler une position GPS depuis les paramètres
3. **Carte Offline** : Utilise OpenStreetMap, nécessite connexion internet
4. **Précision GPS** : Utilise `enableHighAccuracy: true` pour meilleure précision

---

##  Prochaines Étapes

Après installation de `@react-native-community/geolocation`:
1. Rebuild l'app Android
2. Tester sur émulateur ou appareil physique
3. Vérifier que la permission est demandée
4. Tester création de parking avec GPS
5. Vérifier que la position est bien envoyée au backend
