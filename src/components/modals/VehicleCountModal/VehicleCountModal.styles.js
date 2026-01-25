/**
 *  VEHICLE COUNT MODAL STYLES
 * Styles pour le composant VehicleCountModal
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../../theme';

export const vehicleCountModalStyles = StyleSheet.create({
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
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.medium,
    marginVertical: spacing.medium,
  },
  closeBtn: {
    backgroundColor: colors.primary.main,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.medium,
  },
  closeBtnText: {
    fontWeight: typography.fontWeight.semibold,
  },
});

export default vehicleCountModalStyles;
