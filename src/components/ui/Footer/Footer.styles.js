/**
 *  FOOTER STYLES
 * Styles pour le composant Footer (navigation bottom)
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, shadows, typography } from '../../../theme';

export const footerStyles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.tiny,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    ...shadows.huge,
  },

  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.tiny,
    paddingHorizontal: spacing.xs,
  },

  footerText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.gray.medium,
    marginTop: spacing.xs,
    textAlign: 'center',
  },

  footerTextActive: {
    color: colors.primary.dark,
    fontWeight: typography.fontWeight.semibold,
  },

  // Badge de notification
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.background.white,
  },

  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default footerStyles;
