import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing, radius, shadows } from '../../../theme';

const { width } = Dimensions.get('window');

export const parkingDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.offWhite,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.white,
  },
  loadingText: {
    marginTop: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  imageHeader: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageCarousel: {
    width: width,
    height: 250,
  },
  carouselImage: {
    width: width,
    height: 250,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: spacing.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: radius.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: spacing.xs,
  },
  paginationDotActive: {
    backgroundColor: colors.background.white,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: spacing.sm,
    borderRadius: radius.full,
  },
  contentContainer: {
    backgroundColor: colors.background.white,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    marginTop: -30,
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
    color: colors.text.primary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoText: {
    marginLeft: spacing.xs,
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.md,
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ownerLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
  ownerName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  ratingContainer: {
    marginBottom: spacing.md,
  },
  ratingLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: spacing.xs,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  description: {
    marginTop: spacing.sm,
    lineHeight: 22,
    color: colors.text.secondary,
    fontSize: typography.fontSize.base,
  },
  scheduleSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  scheduleTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md2,
    color: colors.text.primary,
  },
  scheduleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.offWhite,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  scheduleIcon: {
    marginRight: spacing.sm,
  },
  scheduleText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  price: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
  },
  reserveButton: {
    backgroundColor: colors.primary.bright,
    paddingVertical: spacing.sm2,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.lg2,
  },
  reserveButtonText: {
    textAlign: 'center',
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  availabilitySection: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  availabilityTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  vehicleAvailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md2,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.grayLight,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleIconStyle: {
    marginRight: spacing.md2,
  },
  vehicleType: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  capacityInfo: {
    alignItems: 'flex-end',
  },
  capacityText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.main,
  },
  capacityTextUnavailable: {
    color: colors.text.tertiary,
  },
  unavailableLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.status.error,
    marginTop: 2,
  },
});
