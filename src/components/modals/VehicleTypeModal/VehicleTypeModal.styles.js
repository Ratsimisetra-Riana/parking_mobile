/**
 * 🎨 VEHICLE TYPE MODAL STYLES
 * Styles pour le composant VehicleTypeModal
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../../theme';

export const vehicleTypeModalStyles = StyleSheet.create({
  modal: {
    backgroundColor: colors.background.white,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  title: {
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.lg,
  },
  loadingContainer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.medium,
    color: colors.text.gray.medium,
  },
  emptyContainer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.text.gray.medium,
  },
  item: {
    padding: spacing.md,
    borderRadius: radius.sm,
    marginVertical: spacing.tiny,
  },
  itemSelected: {
    backgroundColor: colors.primary.main,
  },
  itemUnselected: {
    backgroundColor: '#eee',
  },
  closeBtn: {
    backgroundColor: colors.primary.main,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.medium,
  },
});

export default vehicleTypeModalStyles;
