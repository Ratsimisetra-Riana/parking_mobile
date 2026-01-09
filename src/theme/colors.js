/**
 * 🎨 THEME - COLORS
 * Palette de couleurs centralisée pour l'application
 * Toutes les valeurs proviennent de l'analyse exhaustive du code existant
 */

export const colors = {
  // ===== COULEURS PRIMAIRES =====
  primary: {
    main: '#A4E66E',        // Vert principal (boutons, accents)
    dark: '#6BBF47',        // Vert secondaire (hover, foncé)
    light: '#dcfce7',       // Vert très clair (fond)
    bright: '#13ec13',      // Vert vif (actions, succès)
    pale: '#f0fdf4',        // Vert très pâle (fond léger)
    border: '#bbf7d0',      // Vert clair bordure
    darkest: '#166534',     // Vert très foncé
  },

  // ===== COULEURS DE TEXTE =====
  text: {
    primary: '#2D3436',     // Texte principal
    secondary: '#636E72',   // Texte secondaire
    dark: '#111827',        // Noir presque pur
    darkest: '#333',        // Gris très foncé (alias)
    darkGreen: '#102210',   // Vert très foncé (texte)
    black: '#000000',       // Noir pur
    white: '#FFFFFF',       // Blanc pur
    gray: {
      darkest: '#333',      // Gris très foncé
      dark: '#555',         // Gris foncé
      medium: '#666',       // Gris moyen
      mediumLight: '#888',  // Gris moyen-clair
      light: '#999',        // Gris clair
      slate: {
        dark: '#6b7280',    // Gris bleu foncé
        medium: '#9ca3af',  // Gris bleuté
        light: '#d1d5db',   // Gris très clair
      },
    },
  },

  // ===== COULEURS DE FOND =====
  background: {
    white: '#FFFFFF',       // Blanc pur
    offWhite: '#F9F9F9',    // Blanc cassé
    lightGray: '#F8F8F8',   // Gris très clair 1
    lightGray2: '#F4F4F4',  // Gris très clair 2
    lightGray3: '#f3f4f6',  // Gris très clair 3
    greenLight: '#f6f8f6',  // Gris-vert très clair
    blueLight: '#e6f2ff',   // Bleu très clair
  },

  // ===== COULEURS D'ÉTAT/STATUT =====
  status: {
    success: '#4CAF50',     // Succès (vert)
    error: '#F44336',       // Erreur (rouge)
    errorBright: '#ef4444', // Erreur vif
    warning: '#FFA500',     // Avertissement (orange)
    info: '#2196F3',        // Info (bleu)
    disabled: '#9E9E9E',    // Désactivé (gris)
    pending: '#FFA500',     // En attente (orange)
    approved: '#4CAF50',    // Approuvé (vert)
    rejected: '#F44336',    // Rejeté (rouge)
    canceled: '#9E9E9E',    // Annulé (gris)
  },

  // ===== COULEURS SECONDAIRES =====
  secondary: {
    green: '#16a34a',       // Vert moyen
    gold: '#FFD700',        // Or (étoiles, rating)
  },

  // ===== COULEURS D'ERREUR =====
  error: {
    main: '#F44336',        // Erreur principal (rouge)
    light: '#ef4444',       // Erreur clair
    dark: '#dc2626',        // Erreur foncé
  },

  // ===== COULEURS D'INFO =====
  info: {
    main: '#2196F3',        // Info principal (bleu)
    light: '#64b5f6',       // Info clair
    dark: '#1976d2',        // Info foncé
  },

  // ===== COULEURS DE BORDURE ====
  border: {
    light: '#E0E0E0',       // Gris clair bordure
    medium: '#d1d5db',      // Gris moyen bordure
    gray: '#9ca3af',        // Gris bleuté bordure
  },

  // ===== COULEURS SPÉCIFIQUES PLATEFORME =====
  platform: {
    ios: '#007AFF',         // Bleu iOS
  },

  // ===== COULEURS TRANSPARENTES =====
  transparent: 'transparent',
  
  // ===== NOIR & BLANC =====
  black: '#000000',
  white: '#FFFFFF',
};

// Export par défaut pour import simplifié
export default colors;
