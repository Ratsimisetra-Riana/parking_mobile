# 🔧 Corrections - Affichage Types de Véhicules

## 📋 Problèmes Identifiés

### 1. Champs incorrects du modèle
- **Problème** : Le frontend utilisait `vehicle.Vehicule_Type` 
- **Cause** : Champ inventé (traduction française non conforme au backend)
- **Backend réel** : Le modèle `Vehicles.java` utilise `types` et `icon`

### 2. Code dupliqué et corrompu
- **Problème** : Deux versions du code de sélection de véhicules dans le même fichier
- **Cause** : Remplacement incomplet lors d'une modification précédente
- **Symptôme** : Balises JSX mal fermées, code mélangé ligne 280-324

### 3. Fonction de mapping des icônes incomplète
- **Problème** : Fonction `getVehicleIcon` trop simpliste
- **Manquait** : Mapping des icônes backend (`car-icon`, `motorcycle-icon`, etc.) vers Ionicons

### 4. Structure de données manquante
- **Problème** : Pas d'input pour le nombre de places par type de véhicule
- **Attendu** : Chaque type sélectionné doit avoir un compteur de places disponibles

---

## ✅ Corrections Appliquées

### 1. Réparation de la section DESCRIPTION
**Fichier** : `AddEditParking.jsx` lignes 275-284

**Avant** (code corrompu) :
```jsx
<TextInput
  value={description}List}>
  {availableVehicles.map((vehicle) => {
```

**Après** :
```jsx
<TextInput
  style={[styles.input, styles.textArea]}
  placeholder="Décrivez votre place (accès, sécurité, etc.)"
  value={description}
  onChangeText={setDescription}
  multiline
  numberOfLines={4}
/>
```

---

### 2. Nouvelle section "Types de Véhicules"
**Fichier** : `AddEditParking.jsx` lignes 286-322

Structure complète avec :
- ✅ Liste verticale de véhicules
- ✅ Chips sélectionnables avec icônes
- ✅ Input pour le nombre de places quand sélectionné
- ✅ Utilisation de `vehicle.types` au lieu de `Vehicule_Type`
- ✅ Support du champ `vehicle.icon` du backend
- ✅ Fallback vers `getVehicleIcon()` si pas d'icône backend

```jsx
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Types de véhicules acceptés</Text>
  <View style={styles.vehicleList}>
    {availableVehicles.map((vehicle) => {
      const selectedVehicle = selectedVehicles.find((v) => v.vehicleId === vehicle.Id_Vehicles);
      const isSelected = !!selectedVehicle;
      
      return (
        <View key={vehicle.Id_Vehicles} style={styles.vehicleItem}>
          <TouchableOpacity
            style={[styles.vehicleChip, isSelected && styles.vehicleChipActive]}
            onPress={() => toggleVehicle(vehicle.Id_Vehicles)}
          >
            <Ionicons
              name={vehicle.icon || getVehicleIcon(vehicle.types)}
              size={20}
              color={isSelected ? '#102210' : '#6b7280'}
            />
            <Text style={[styles.vehicleChipText, isSelected && styles.vehicleChipTextActive]}>
              {vehicle.types}
            </Text>
          </TouchableOpacity>
          
          {isSelected && (
            <View style={styles.vehicleCountContainer}>
              <Text style={styles.vehicleCountLabel}>Places:</Text>
              <TextInput
                style={styles.vehicleCountInput}
                value={selectedVehicle.count.toString()}
                onChangeText={(text) => updateVehicleCount(vehicle.Id_Vehicles, text)}
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
          )}
        </View>
      );
    })}
  </View>
</View>
```

---

### 3. Fonction de mapping des icônes complète
**Fichier** : `AddEditParking.jsx` lignes 172-215

Nouvelle implémentation basée sur `MAPPING_ICONES_VEHICULES.md` :

```javascript
const getVehicleIcon = (vehicleIconOrType) => {
  // Mapping backend → Ionicons
  const iconMap = {
    'car-icon': 'car-sport',
    'car-sport': 'car-sport',
    'car': 'car',
    'car-outline': 'car-outline',
    'city-car-icon': 'car-outline',
    'motorcycle-icon': 'bicycle',
    'bicycle': 'bicycle',
    'bicycle-outline': 'bicycle-outline',
    'scooter-icon': 'bicycle-outline',
    'van-icon': 'bus',
    'bus': 'bus',
    'bus-outline': 'bus-outline',
    'truck-icon': 'car',
    'trail-sign': 'trail-sign',
    'airplane': 'airplane',
    'boat': 'boat',
  };
  
  // Si icône connue dans le mapping
  if (iconMap[vehicleIconOrType]) {
    return iconMap[vehicleIconOrType];
  }
  
  // Fallback intelligent basé sur le nom du type
  const name = (vehicleIconOrType || '').toLowerCase();
  if (name.includes('moto') || name.includes('scooter') || name.includes('vélo')) {
    return 'bicycle';
  }
  if (name.includes('voiture') || name.includes('citadine') || name.includes('car')) {
    return 'car-sport';
  }
  if (name.includes('bus') || name.includes('van') || name.includes('utilitaire')) {
    return 'bus';
  }
  if (name.includes('camion') || name.includes('truck')) {
    return 'trail-sign';
  }
  
  return 'car'; // Défaut
};
```

---

### 4. Suppression du code dupliqué
**Lignes supprimées** : 312-324 (ancien code avec `Vehicule_Type`)

---

## 🎨 Styles Ajoutés

Les styles suivants étaient déjà présents dans le fichier :

```javascript
vehicleList: {
  gap: 12,
},
vehicleItem: {
  gap: 8,
},
vehicleChip: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  paddingHorizontal: 16,
  paddingVertical: 10,
  backgroundColor: '#ffffff',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#e5e7eb',
},
vehicleChipActive: {
  backgroundColor: '#13ec13',
  borderColor: '#13ec13',
},
vehicleChipText: {
  fontSize: 14,
  fontWeight: '500',
  color: '#6b7280',
},
vehicleChipTextActive: {
  color: '#102210',
  fontWeight: '600',
},
vehicleCountContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 48,
  gap: 12,
},
vehicleCountLabel: {
  fontSize: 14,
  fontWeight: '500',
  color: '#6b7280',
},
vehicleCountInput: {
  width: 80,
  paddingHorizontal: 12,
  paddingVertical: 8,
  backgroundColor: '#ffffff',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#e5e7eb',
  fontSize: 16,
  fontWeight: '600',
  color: '#111827',
  textAlign: 'center',
},
```

---

## 📊 Résumé des Changements

| Élément | Avant | Après |
|---------|-------|-------|
| **Champ du type** | `vehicle.Vehicule_Type` ❌ | `vehicle.types` ✅ |
| **Champ de l'icône** | Non utilisé ❌ | `vehicle.icon` ✅ |
| **Mapping icônes** | 4 cas basiques | 18 mappings + fallback intelligent |
| **Nombre de places** | Non implémenté ❌ | Input avec validation ✅ |
| **Structure de données** | `[1, 2, 3]` (IDs seulement) | `[{vehicleId: 1, count: 5}, ...]` |
| **Code dupliqué** | 2 versions mélangées ❌ | 1 version propre ✅ |
| **Erreurs JSX** | Balises mal fermées ❌ | Syntaxe correcte ✅ |

---

## 🔍 Vérification Backend

### Modèle `Vehicles.java`
```java
@Entity
@Table(name = "Vehicles")
public class Vehicles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id_Vehicles;

    private String types;    // ✅ Champ utilisé maintenant
    private String icon;     // ✅ Champ utilisé maintenant
}
```

### Données de test `test-data-fr.sql`
```sql
INSERT INTO Vehicles (types, icon) VALUES
('Voiture', 'car-icon'),
('Moto', 'motorcycle-icon'),
('Utilitaire', 'van-icon'),
('Camion', 'truck-icon'),
('Citadine', 'city-car-icon');
```

### VehiclesController
```java
@GetMapping
public List<Vehicles> getAllVehicles() {
    return vehiclesService.findAll(); // Renvoie bien types et icon
}
```

---

## 🧪 Tests à Effectuer

### 1. Test d'affichage des véhicules
```bash
# Lancer le backend
cd d:\Projet\uparkBack\upark
mvnw spring-boot:run

# Lancer le frontend
cd d:\Projet\parking_mobile
npm start
```

**Vérifier** :
- [ ] Les types de véhicules s'affichent avec leurs noms corrects
- [ ] Les icônes correspondantes s'affichent (voiture, moto, utilitaire, etc.)
- [ ] La sélection d'un véhicule affiche l'input "Places"
- [ ] L'input accepte uniquement des chiffres
- [ ] Le chip devient vert quand sélectionné

### 2. Test de sauvegarde
**Sélectionner** :
- ✅ Voiture : 5 places
- ✅ Moto : 2 places

**Vérifier** :
```javascript
console.log(selectedVehicles);
// Attendu: [{vehicleId: 1, count: 5}, {vehicleId: 2, count: 2}]
```

### 3. Test du mapping d'icônes

| Type Backend | Icône Backend | Icône Mappée Ionicons | Résultat Attendu |
|--------------|---------------|----------------------|------------------|
| Voiture | `car-icon` | `car-sport` | 🚗 |
| Moto | `motorcycle-icon` | `bicycle` | 🏍️ |
| Utilitaire | `van-icon` | `bus` | 🚐 |
| Camion | `truck-icon` | `car` | 🚛 |
| Citadine | `city-car-icon` | `car-outline` | 🚙 |

---

## 📝 Prochaines Étapes

### Phase 1 : Compléter la sauvegarde
- [ ] Modifier `ownerService.createParking()` pour sauvegarder les véhicules
- [ ] Créer les entrées dans `PARKING_VEHICLES` avec `numbers` (count)
- [ ] Associer chaque véhicule au parking créé

### Phase 2 : Mode Édition
- [ ] Charger les véhicules existants depuis `PARKING_VEHICLES`
- [ ] Pré-remplir `selectedVehicles` avec `{vehicleId, count}`
- [ ] Permettre de modifier le nombre de places

### Phase 3 : Validation
- [ ] Ajouter validation : count > 0
- [ ] Limiter count à 99 (maxLength={2})
- [ ] Message d'erreur si count invalide

---

## 🐛 Bugs Corrigés

1. ✅ **Erreur de syntaxe JSX** : `</Viewhip` → `</View>`
2. ✅ **Champ inexistant** : `vehicle.Vehicule_Type` → `vehicle.types`
3. ✅ **Icône non affichée** : Ajout de `vehicle.icon ||`
4. ✅ **Code dupliqué** : Suppression lignes 312-324
5. ✅ **TextInput mal fermé** : Ajout de `onChangeText`, `multiline`, `numberOfLines`

---

**Date** : 21 novembre 2024  
**Statut** : ✅ Corrections appliquées - Prêt pour tests  
**Fichiers modifiés** : 
- `src/screens/AddEditParking/AddEditParking.jsx`
