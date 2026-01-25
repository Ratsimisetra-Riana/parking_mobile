/**
 *  RATING MODAL STYLES
 * Styles pour le composant RatingModal
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

export const ratingModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background.greenLight,
    borderTopLeftRadius: radius.huge,
    borderTopRightRadius: radius.huge,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.xxxl,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },
  content: {
    paddingHorizontal: spacing.xl,
  },
  // Parking Info
  parkingInfo: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.base,
  },
  parkingImageContainer: {
    position: 'relative',
    marginBottom: spacing.base,
  },
  parkingImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: radius.base,
    backgroundColor: '#e8f5e8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    ...shadows.card,
  },
  checkBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: radius.lg,
    backgroundColor: colors.primary.bright,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.background.greenLight,
  },
  parkingName: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  reservationDateBadge: {
    backgroundColor: 'rgba(19, 236, 19, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.xxxl,
  },
  reservationDateText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: '#618961',
  },
  // Rating Section
  ratingSection: {
    alignItems: 'center',
    paddingVertical: spacing.base,
  },
  ratingTitle: {
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    textAlign: 'center',
    marginBottom: spacing.base,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  starButton: {
    padding: spacing.xs,
  },
  ratingText: {
    marginTop: spacing.sm,
    fontSize: typography.fontSize.md2,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.bright,
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.base,
  },
  // Criteria Section
  criteriaContainer: {
    marginBottom: spacing.base,
  },
  criteriaTitle: {
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.dark,
    marginBottom: spacing.md,
  },
  criteriaButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.medium,
  },
  criteriaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: spacing.medium,
    borderRadius: radius.xxxl,
    borderWidth: 1,
    borderColor: colors.border.light,
    backgroundColor: colors.white,
  },
  criteriaButtonActive: {
    borderColor: 'rgba(19, 236, 19, 0.5)',
    backgroundColor: 'rgba(19, 236, 19, 0.1)',
  },
  criteriaIcon: {
    marginRight: spacing.sm,
  },
  criteriaLabel: {
    fontSize: typography.fontSize.md2,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.gray.slate.dark,
  },
  criteriaLabelActive: {
    color: colors.text.darkGreen,
  },
  // Comment Section
  commentSection: {
    marginBottom: spacing.xl,
  },
  commentLabel: {
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.dark,
    marginBottom: spacing.sm,
  },
  textAreaContainer: {
    position: 'relative',
  },
  textArea: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: radius.lg,
    padding: 14,
    paddingRight: 40,
    fontSize: typography.fontSize.lg,
    color: colors.text.dark,
    minHeight: 100,
  },
  textAreaIcon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  charCount: {
    fontSize: typography.fontSize.base,
    color: colors.text.gray.slate.medium,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  // Footer
  footer: {
    padding: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.greenLight,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.bright,
    paddingVertical: spacing.base,
    borderRadius: radius.lg,
    gap: spacing.sm,
    shadowColor: colors.primary.bright,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkGreen,
  },
});

export default ratingModalStyles;
