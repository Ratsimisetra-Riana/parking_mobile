/**
 *  RESERVATION CARD STYLES
 * Styles internes pour le composant ReservationCard (bouton Noter et badge)
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

export const reservationCardStyles = StyleSheet.create({
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.bright,
    paddingHorizontal: 14,
    paddingVertical: spacing.sm,
    borderRadius: radius.xxxl,
    marginTop: spacing.medium,
    alignSelf: 'flex-start',
    gap: spacing.sm,
    shadowColor: colors.primary.bright,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  rateButtonText: {
    fontSize: typography.fontSize.md2,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.darkGreen,
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.lightGreen,
    paddingHorizontal: 14,
    paddingVertical: spacing.sm,
    borderRadius: radius.xxxl,
    marginTop: spacing.medium,
    alignSelf: 'flex-start',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary.green,
    shadowColor: colors.primary.green,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  qrButtonText: {
    fontSize: typography.fontSize.md2,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.green,
  },
  ratedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 236, 19, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.xl,
    marginTop: spacing.medium,
    alignSelf: 'flex-start',
    gap: spacing.xs,
  },
  ratedBadgeText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary.bright,
  },
  // Bouton Signaler un litige
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: spacing.sm,
    borderRadius: radius.xxxl,
    marginTop: spacing.medium,
    alignSelf: 'flex-start',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.error.main,
  },
  reportButtonText: {
    fontSize: typography.fontSize.md2,
    fontWeight: typography.fontWeight.semibold,
    color: colors.error.main,
  },
  // Badge litige signalé
  disputeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.xl,
    marginTop: spacing.medium,
    alignSelf: 'flex-start',
    gap: spacing.xs,
  },
  disputeBadgeText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.status.pending,
  },
});

export default reservationCardStyles;
