# 🎨 PLAN DE REFACTORING - ARCHITECTURE STYLES

## 📊 ANALYSE EXHAUSTIVE DU CODE EXISTANT

### Couleurs identifiées (par fréquence d'utilisation)

#### COULEURS PRIMAIRES
- `#6BBF47` - Vert secondaire (87 occurrences)
- `#A4E66E` - Vert primaire (23 occurrences)
- `#13ec13` - Vert vif/actions (45 occurrences)

#### COULEURS DE TEXTE
- `#2D3436` - Texte principal/foncé (15 occurrences)
- `#636E72` - Texte secondaire/gris moyen (8 occurrences)
- `#111827` - Noir presque pur (12 occurrences)
- `#102210` - Vert très foncé (8 occurrences)
- `#333` - Gris foncé (20 occurrences)
- `#666` - Gris moyen (18 occurrences)
- `#999` - Gris clair (5 occurrences)
- `#555` - Gris moyen-foncé (7 occurrences)
- `#888` - Gris (2 occurrences)

#### COULEURS DE FOND
- `#fff` / `#ffffff` / `#FFFFFF` - Blanc (89 occurrences)
- `#F4F4F4` - Gris très clair fond (3 occurrences)
- `#f6f8f6` - Gris-vert très clair (6 occurrences)
- `#f3f4f6` - Gris clair (15 occurrences)
- `#F8F8F8` - Gris très clair (1 occurrence)
- `#F9F9F9` - Gris très clair (1 occurrence)

#### COULEURS D'ÉTAT/STATUT
- `#4CAF50` - Succès/Vert (5 occurrences)
- `#F44336` - Erreur/Rouge (4 occurrences)
- `#2196F3` - Info/Bleu (3 occurrences)
- `#9E9E9E` - Désactivé/Gris (4 occurrences)
- `#FFA500` - Avertissement/Orange (2 occurrences)

#### COULEURS SECONDAIRES
- `#16a34a` - Vert moyen (15 occurrences)
- `#ef4444` - Rouge vif (5 occurrences)
- `#9ca3af` - Gris bleuté (10 occurrences)
- `#6b7280` - Gris bleu foncé (25 occurrences)
- `#d1d5db` - Gris très clair (2 occurrences)
- `#FFD700` - Or (étoiles) (2 occurrences)
- `#E0E0E0` - Gris clair bordures (8 occurrences)

#### COULEURS SPÉCIFIQUES
- `#007AFF` - Bleu iOS (8 occurrences)
- `#dcfce7` - Vert très clair fond (4 occurrences)
- `#f0fdf4` - Vert très pâle (2 occurrences)
- `#bbf7d0` - Vert clair bordure (1 occurrence)
- `#166534` - Vert foncé (1 occurrence)

### Espacements identifiés
- padding: 4, 5, 8, 10, 12, 15, 16, 20, 24, 25, 30, 32, 40, 50
- margin: 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 30

### Border Radius identifiés
- 4, 6, 8, 10, 12, 15, 17, 20, 24, 30, 50

### Tailles de police (fontSize)
- 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 28, 30, 32

### Ombres (shadows)
- elevation: 2, 3, 4, 5, 8
- shadowColor: '#000' (toujours)
- shadowOpacity: 0.05, 0.08, 0.1, 0.15, 0.2
- shadowRadius: 2, 3, 4, 5, 8

---

## 🎯 STRUCTURE PROPOSÉE

```
src/
  theme/
    colors.js      ← Palette complète
    typography.js  ← Fonts et tailles
    spacing.js     ← Marges et paddings
    shadows.js     ← Ombres
    radius.js      ← Border radius
    index.js       ← Export centralisé
    
  styles/
    common.styles.js  ← Styles réutilisables
    layouts.js        ← Flex, positioning
    buttons.js        ← Boutons
    cards.js          ← Cards
```

---

## ✅ PHASE 1 : CRÉATION STRUCTURE

### 1.1 Créer theme/colors.js
- Mapper toutes les couleurs vers des noms sémantiques
- Grouper par catégorie (primary, text, background, status)

### 1.2 Créer theme/typography.js
- Définir font sizes
- Définir line heights
- Définir font weights

### 1.3 Créer theme/spacing.js
- xs, sm, md, lg, xl, xxl

### 1.4 Créer theme/shadows.js
- shadow1, shadow2, shadow3, etc.

### 1.5 Créer theme/radius.js
- small, medium, large, full

---

## ✅ PHASE 2 : STYLES COMMUNS

### 2.1 Créer styles/common.styles.js
Extraire les patterns répétés:
- `loadingContainer` (répété 10+ fois)
- `header` (répété 8+ fois)
- `container` base
- Séparateurs

### 2.2 Créer styles/buttons.js
- primaryButton
- secondaryButton
- dangerButton
- iconButton

### 2.3 Créer styles/cards.js
- baseCard
- parkingCard
- reservationCard

---

## ⚠️ GARANTIES

1. ✅ **Aucun changement visuel** - Valeurs exactement identiques
2. ✅ **Migration progressive** - Fichier par fichier
3. ✅ **Tests après chaque migration** - Vérifier l'affichage
4. ✅ **Backward compatible** - Anciens styles fonctionnent pendant migration

---

## 📋 ORDRE DE MIGRATION

1. Créer structure theme/
2. Créer styles/common.styles.js
3. Migrer Footer (petit composant)
4. Migrer Header
5. Migrer écrans un par un

---

Temps estimé : 4-6 heures de travail méthodique
