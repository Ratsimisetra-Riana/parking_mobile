#  Mapping des Icônes de Véhicules

##  Icônes Disponibles dans Ionicons

### Voitures
- `car` - Voiture simple
- `car-sport` - Voiture de sport
- `car-outline` - Voiture outline

### Motos et Vélos
- `bicycle` - Vélo/Moto
- `bicycle-outline` - Vélo outline

### Véhicules Lourds
- `bus` - Bus
- `bus-outline` - Bus outline
- `trail-sign` - Camion

### Autres
- `airplane` - Avion
- `boat` - Bateau

---

##  Mapping Backend → Ionicons

```javascript
const iconMap = {
  // Voitures
  'car-icon': 'car-sport',
  'car-sport': 'car-sport',
  'car': 'car',
  'car-outline': 'car-outline',
  'city-car-icon': 'car-outline',
  
  // Motos et vélos
  'motorcycle-icon': 'bicycle',
  'bicycle': 'bicycle',
  'bicycle-outline': 'bicycle-outline',
  'scooter-icon': 'bicycle-outline',
  
  // Véhicules lourds
  'van-icon': 'bus',
  'bus': 'bus',
  'bus-outline': 'bus-outline',
  'truck-icon': 'car',
  'trail-sign': 'trail-sign',
  
  // Autres
  'airplane': 'airplane',
  'boat': 'boat'
};
```

---

##  Fallback Intelligent

Si l'icône n'est pas trouvée dans le mapping, le système utilise un fallback basé sur le nom du type de véhicule :

```javascript
const type = (v.types || v.type || '').toLowerCase();

if (type.includes('voiture') || type.includes('car')) {
  iconName = 'car-sport';
} else if (type.includes('moto') || type.includes('scooter') || type.includes('vélo')) {
  iconName = 'bicycle';
} else if (type.includes('bus') || type.includes('van') || type.includes('utilitaire')) {
  iconName = 'bus';
} else if (type.includes('camion') || type.includes('truck')) {
  iconName = 'trail-sign';
} else {
  iconName = 'car'; // Fallback par défaut
}
```

---

##  Comment Ajouter un Nouveau Type de Véhicule

### Étape 1 : Vérifier les icônes disponibles
Consultez la liste complète des icônes Ionicons : https://ionic.io/ionicons

### Étape 2 : Ajouter dans le mapping
Ajoutez l'entrée dans `iconMap` dans `Reservation.jsx` :

```javascript
const iconMap = {
  // ... autres mappings
  'nouveau-type-icon': 'ionicon-name',
};
```

### Étape 3 : Tester
1. Redémarrer l'application
2. Vérifier que l'icône s'affiche correctement

---

## 🐛 Débogage

Si une icône ne s'affiche pas :

1. Vérifier les logs dans la console :
   ```
    Véhicule: [nom] - Icône backend: [icon] - Icône mappée: [iconName]
   ```

2. Vérifier que l'icône existe dans Ionicons

3. Ajouter le mapping si nécessaire

---

**Date :** 21 novembre 2025  
**Version :** 1.1
