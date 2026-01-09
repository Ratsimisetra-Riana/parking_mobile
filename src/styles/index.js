/**
 * 🎨 STYLES - INDEX
 * Export centralisé de tous les styles réutilisables
 * 
 * Usage:
 * import { commonStyles, buttonStyles, cardStyles } from '@/styles';
 */

import commonStyles from './common.styles';
import buttonStyles from './buttons';
import cardStyles from './cards';
import layoutStyles from './layouts';

// Export nommé pour imports sélectifs
export { commonStyles, buttonStyles, cardStyles, layoutStyles };

// Export par défaut
const styles = {
  common: commonStyles,
  buttons: buttonStyles,
  cards: cardStyles,
  layouts: layoutStyles,
};

export default styles;
