/**
 *  REVIEW CARD STYLES
 * Styles pour le composant ReviewCard
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

export const reviewCardStyles = StyleSheet.create({
  // ReviewCard
  container: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    ...shadows.small,
  },
  containerCompact: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radius.xxxl,
    backgroundColor: '#e8f5e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.bright,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.dark,
    marginBottom: 2,
  },
  date: {
    fontSize: typography.fontSize.base,
    color: colors.text.gray.slate.medium,
  },
  ratingBadge: {
    marginLeft: spacing.sm,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  // Criteria
  criteriaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  criteriaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 236, 19, 0.1)',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.xs,
    borderRadius: radius.lg,
    gap: spacing.xs,
  },
  criteriaText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.darkGreen,
  },
  // Comment
  comment: {
    fontSize: typography.fontSize.md2,
    color: colors.text.gray.dark,
    lineHeight: 20,
  },
  commentCompact: {
    fontSize: typography.fontSize.md,
    lineHeight: 18,
  },
  // RatingSummary
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  summaryContainerSmall: {
    gap: 2,
  },
  summaryAverage: {
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },
  summaryAverageSmall: {
    fontSize: typography.fontSize.md2,
  },
  summaryTotal: {
    fontSize: typography.fontSize.md2,
    color: colors.text.gray.slate.medium,
  },
  summaryTotalSmall: {
    fontSize: typography.fontSize.base,
  },
  // NoReviewsPlaceholder
  noReviewsContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  noReviewsTitle: {
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.gray.slate.dark,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  noReviewsText: {
    fontSize: typography.fontSize.md2,
    color: colors.text.gray.slate.medium,
    textAlign: 'center',
  },
});

export default reviewCardStyles;
