/**
 * 🎨 FILTER BUTTON STYLES
 * Styles pour le composant FilterButton
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../../theme';

export const filterButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.background.lightGray,
    padding: 14,
    borderRadius: radius.lg,
    marginTop: spacing.medium,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: typography.fontSize.md2,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  value: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginTop: 2,
  },
});

export default filterButtonStyles;
