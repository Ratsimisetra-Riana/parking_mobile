import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../../../theme';

export const notificationsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
    paddingTop: spacing.sm,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },

  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkest,
  },

  badge: {
    backgroundColor: colors.error.main,
    borderRadius: radius.base,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },

  badgeText: {
    color: colors.text.white,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.base,
    paddingBottom: 100,
  },

  notificationCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.border.gray,
  },

  notificationUnread: {
    backgroundColor: colors.background.blueLight,
    borderColor: colors.info.main,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.base,
  },

  notificationContent: {
    flex: 1,
  },

  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs2,
  },

  notificationTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkest,
    flex: 1,
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: spacing.xs2,
    backgroundColor: colors.info.main,
    marginLeft: spacing.xs,
  },

  notificationMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.medium,
    lineHeight: 20,
    marginBottom: spacing.xs2,
  },

  notificationDate: {
    fontSize: typography.fontSize.xs,
    color: colors.text.gray.slate.dark,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },

  emptyText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.gray.slate.dark,
    marginTop: spacing.base,
  },

  emptySubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.border.light,
    marginTop: spacing.xs,
    textAlign: 'center',
  },

  // Actions du header
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.base,
    backgroundColor: colors.background.success,
  },

  markAllText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary.main,
    fontWeight: typography.fontWeight.semibold,
    marginLeft: spacing.xs,
  },
});
