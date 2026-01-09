import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing, radius, shadows } from '../../../theme';

const { width } = Dimensions.get('window');

export const myParkingDetailsStyles = StyleSheet.create({
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
  errorText: {
    fontSize: typography.fontSize.md,
    color: colors.status.error,
    marginBottom: spacing.lg,
  },
  backBtn: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md2,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
  },
  backBtnText: {
    color: colors.text.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  imageHeader: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  carouselImage: {
    width: width,
    height: 250,
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: spacing.md,
    alignSelf: 'center',
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
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.md,
  },
  ownerBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.greenLight,
    padding: spacing.md2,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.status.successLight,
  },
  ownerBadgeText: {
    marginLeft: spacing.xs,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.status.success,
  },
  priceSection: {
    marginVertical: spacing.sm,
  },
  priceLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  priceValue: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
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
    color: colors.text.primary,
  },
  emptySection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: spacing.md2,
    fontSize: typography.fontSize.md,
    color: colors.text.tertiary,
  },
  infoSection: {
    marginTop: spacing.lg,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.blueLight,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.info.light,
  },
  infoCardText: {
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.sm,
    color: colors.info.dark,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  announceButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.lg2,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  announceButtonText: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.md,
    color: colors.text.white,
  },
});
