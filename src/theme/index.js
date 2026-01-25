/**
 *  THEME - INDEX
 * Export centralisé de tous les tokens de design
 * 
 * Usage:
 * import { colors, spacing, typography } from '@/theme';
 * ou
 * import theme from '@/theme';
 * // theme.colors.primary.main, theme.spacing.md, etc.
 */

import colors from './colors';
import typography from './typography';
import spacing from './spacing';
import shadows from './shadows';
import radius from './radius';

// Export nommé pour imports sélectifs
export { colors, typography, spacing, shadows, radius };

// Export par défaut pour import complet
const theme = {
  colors,
  typography,
  spacing,
  shadows,
  radius,
};

export default theme;
