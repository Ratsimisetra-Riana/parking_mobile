import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../../../theme';

export const myParkingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.greenLight,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.greenLight,
  },
  
  loadingText: {
    marginTop: spacing.base,
    fontSize: typography.fontSize.base,
    color: colors.text.gray.slate.medium,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.base,
    backgroundColor: colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.lightGray,
  },
  
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkest,
  },
  
  headerSpacer: {
    width: 40,
  },
  
  content: {
    flex: 1,
  },
  
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  
  addButtonContainer: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xl,
  },
  
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.bright,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.base,
    ...shadows.small,
  },
  
  addButtonText: {
    marginLeft: spacing.xs,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkGreen,
  },
  
  parkingList: {
    paddingHorizontal: spacing.base,
    gap: spacing.base,
  },
  
  card: {
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.background.lightGray,
    ...shadows.tiny,
    marginBottom: spacing.base,
  },
  
  cardBody: {
    flexDirection: 'row',
    padding: spacing.base,
    gap: spacing.base,
  },
  
  imageContainer: {
    position: 'relative',
    width: 96,
    height: 96,
    flexShrink: 0,
  },
  
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background.lightGray,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  parkingImage: {
    width: '100%',
    height: '100%',
    borderRadius: radius.sm,
    resizeMode: 'cover',
  },
  
  statusBadge: {
    position: 'absolute',
    top: spacing.xs2,
    left: spacing.xs2,
    paddingHorizontal: spacing.xs2,
    paddingVertical: spacing.xs4,
    borderRadius: spacing.xs2,
  },
  
  statusText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
  },
  
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  cardTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkest,
    marginBottom: spacing.xs2,
  },
  
  cardAddress: {
    fontSize: typography.fontSize.xs,
    color: colors.text.gray.slate.medium,
    lineHeight: 18,
  },
  
  priceContainer: {
    marginTop: spacing.xs2,
  },
  
  priceText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.bright,
  },
  
  priceUnit: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    color: colors.text.gray.slate.medium,
  },
  
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: spacing.xs2,
    marginTop: spacing.xs,
  },
  
  detailsButtonText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.bright,
  },
  
  divider: {
    height: 1,
    backgroundColor: colors.background.lightGray,
  },
  
  actionBar: {
    flexDirection: 'row',
  },
  
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.base,
    gap: spacing.xs,
  },
  
  actionDivider: {
    width: 1,
    backgroundColor: colors.background.lightGray,
  },
  
  actionText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.gray.slate.medium,
  },
  
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: spacing.xl,
  },
  
  emptyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkest,
    marginTop: spacing.base,
    marginBottom: spacing.xs,
  },
  
  emptySubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.slate.medium,
    textAlign: 'center',
    lineHeight: 20,
  },
  
  bottomSpacer: {
    height: spacing.xl,
  },
});
