/**
 * 📝 THEME - TYPOGRAPHY
 * Typographie centralisée : tailles, poids, hauteurs de ligne
 */

export const typography = {
  // ===== TAILLES DE POLICE =====
  fontSize: {
    xs: 10,
    xs2: 13,
    xs3: 11,
    sm: 11,
    base: 12,
    md: 13,
    md2: 14,
    lg: 15,
    lg2: 16,
    xl: 17,
    xl2: 18,
    xxl: 20,
    xxxl: 22,
    heading: {
      h1: 32,
      h2: 30,
      h3: 28,
      h4: 24,
      h5: 22,
      h6: 20,
    },
  },

  // ===== POIDS DE POLICE =====
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // ===== HAUTEUR DE LIGNE =====
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // ===== FAMILLES DE POLICE =====
  fontFamily: {
    regular: 'Montserrat-Regular',
    medium: 'Montserrat-Medium',
    bold: 'Montserrat-Bold',
    semiBold: 'Montserrat-SemiBold',
    light: 'Montserrat-Light',
  },
};

// Export par défaut
export default typography;
