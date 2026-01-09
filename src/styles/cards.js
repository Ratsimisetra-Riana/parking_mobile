/**
 * 🃏 CARD STYLES
 * Styles de cartes réutilisables
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../theme';

export const cardStyles = StyleSheet.create({
  // ===== BASE CARD =====
  baseCard: {
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    padding: spacing.base,
    marginVertical: spacing.sm,
    ...shadows.card,
  },

  // ===== PARKING CARD =====
  parkingCard: {
    backgroundColor: colors.background.white,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.base,
    ...shadows.card,
  },

  parkingCardImage: {
    width: '100%',
    height: 200,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },

  parkingCardTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  parkingCardSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },

  // ===== RESERVATION CARD =====
  reservationCard: {
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
    ...shadows.card,
  },

  reservationCardPending: {
    borderLeftColor: colors.status.pending,
  },

  reservationCardApproved: {
    borderLeftColor: colors.status.approved,
  },

  reservationCardRejected: {
    borderLeftColor: colors.status.rejected,
  },

  reservationCardCanceled: {
    borderLeftColor: colors.status.canceled,
  },

  // ===== ANNOUNCEMENT CARD =====
  announcementCard: {
    backgroundColor: colors.background.white,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.border.light,
    ...shadows.card,
  },

  // ===== INFO CARD =====
  infoCard: {
    backgroundColor: colors.primary.pale,
    borderRadius: radius.md,
    padding: spacing.base,
    marginVertical: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.main,
  },

  warningCard: {
    backgroundColor: '#FFF3CD',
    borderRadius: radius.md,
    padding: spacing.base,
    marginVertical: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.status.warning,
  },

  errorCard: {
    backgroundColor: '#F8D7DA',
    borderRadius: radius.md,
    padding: spacing.base,
    marginVertical: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.status.error,
  },

  // ===== VEHICLE CARD =====
  vehicleCard: {
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },

  vehicleCardSelected: {
    backgroundColor: colors.primary.light,
    borderWidth: 2,
    borderColor: colors.primary.main,
  },

  // ===== STAT CARD =====
  statCard: {
    backgroundColor: colors.background.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.medium,
  },

  statCardValue: {
    fontSize: typography.fontSize.heading.h2,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.dark,
  },

  statCardLabel: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },

  // ===== CARD HEADER =====
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  cardHeaderTitle: {
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },

  // ===== CARD FOOTER =====
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});

export default cardStyles;
