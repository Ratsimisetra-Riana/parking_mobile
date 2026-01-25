/**
 *  MY DISPUTES STYLES
 * Styles pour l'écran de liste des litiges
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../../../theme';

export const myDisputesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.greenLight,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },

  loadingText: {
    marginTop: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.text.gray.medium,
  },

  // Title Section
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.base,
    marginTop: spacing.lg,
    marginBottom: spacing.base,
  },

  title: {
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    letterSpacing: -0.5,
  },

  countBadge: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs2,
    borderRadius: radius.base,
    marginLeft: spacing.base,
    minWidth: 28,
    alignItems: 'center',
  },

  countText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },

  // List
  listContent: {
    paddingHorizontal: spacing.base,
    paddingBottom: 100,
  },

  // Dispute Card
  disputeCard: {
    backgroundColor: colors.background.white,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.base,
    ...shadows.small,
  },

  disputeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },

  disputeMotif: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    marginRight: spacing.sm,
  },

  disputeDate: {
    fontSize: typography.fontSize.xs,
    color: colors.text.gray.medium,
    backgroundColor: colors.background.lightGray,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs2,
    borderRadius: radius.full,
  },

  disputeReservation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.lightGray2,
  },

  disputeReservationText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.dark,
  },

  disputeDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.medium,
    lineHeight: 20,
  },

  disputeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.background.lightGray2,
  },

  proofsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.background.greenLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.base,
  },

  proofsText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary.bright,
  },

  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },

  viewDetailsText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary.bright,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },

  emptyIcon: {
    marginBottom: spacing.lg,
  },

  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },

  emptySubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.gray.medium,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Error
  errorText: {
    fontSize: typography.fontSize.base,
    color: colors.secondary.red,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },

  retryButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    borderRadius: radius.lg,
  },

  retryButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },
});
