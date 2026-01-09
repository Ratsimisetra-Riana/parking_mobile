import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../../../theme';

export const myAnnouncementsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.lightGray,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.white,
  },
  
  loadingText: {
    marginTop: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.text.gray.slate.medium,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg2,
    backgroundColor: colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.medium,
  },
  
  backButton: {
    padding: spacing.xs,
  },
  
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkest,
    flex: 1,
    textAlign: 'center',
  },
  
  addButton: {
    padding: spacing.xs,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    padding: spacing.base,
  },
  
  cardsContainer: {
    gap: spacing.base,
  },
  
  card: {
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    padding: spacing.base,
    marginBottom: spacing.base,
    ...shadows.small,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.xs,
  },
  
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.darkest,
    marginLeft: spacing.xs,
    flex: 1,
  },
  
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs2,
    borderRadius: radius.base,
  },
  
  statusText: {
    fontSize: typography.fontSize.xs3,
    fontWeight: typography.fontWeight.semibold,
  },
  
  cardBody: {
    marginBottom: spacing.base,
  },
  
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  
  infoText: {
    marginLeft: spacing.xs2,
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.slate.medium,
  },
  
  descriptionContainer: {
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.background.lightGray,
  },
  
  descriptionText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.dark,
    lineHeight: 20,
  },
  
  vehiclesContainer: {
    marginTop: spacing.base,
  },
  
  vehiclesLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.gray.slate.medium,
    marginBottom: spacing.xs2,
  },
  
  vehiclesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs2,
  },
  
  vehicleChip: {
    backgroundColor: colors.background.blueLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs2,
    borderRadius: radius.base,
    borderWidth: 1,
    borderColor: colors.info.light,
  },
  
  vehicleChipText: {
    fontSize: typography.fontSize.xs,
    color: colors.info.dark,
    fontWeight: typography.fontWeight.medium,
  },
  
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.background.lightGray,
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.base,
    borderRadius: radius.sm,
    flex: 1,
    marginHorizontal: spacing.xs2,
    justifyContent: 'center',
  },
  
  toggleButton: {
    backgroundColor: colors.background.lightGray,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  
  deleteButton: {
    backgroundColor: colors.error.lightest,
    borderWidth: 1,
    borderColor: colors.error.light,
  },
  
  actionButtonText: {
    marginLeft: spacing.xs2,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  
  deleteButtonText: {
    color: colors.error.dark,
  },
  
  emptyContainer: {
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
  
  emptyText: {
    fontSize: typography.fontSize.lg2,
    color: colors.text.gray.slate.medium,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.dark,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.sm,
  },
  
  emptyButtonText: {
    color: colors.text.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    marginLeft: spacing.xs,
  },
});
