import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../../../theme';

export const reservationRequestsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
    paddingTop: spacing.sm,
  },
  
  header: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg2,
  },
  
  title: {
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkest,
    marginBottom: spacing.base,
  },
  
  filterButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  
  filterButton: {
    paddingVertical: spacing.xs2,
    paddingHorizontal: spacing.base,
    borderRadius: spacing.base,
    backgroundColor: colors.background.grayLight,
  },
  
  filterButtonActive: {
    backgroundColor: colors.primary.dark,
  },
  
  filterText: {
    fontSize: typography.fontSize.xs2,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.gray.medium,
  },
  
  filterTextActive: {
    color: colors.text.white,
  },
  
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  
  card: {
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    padding: spacing.base,
    marginBottom: spacing.base,
    ...shadows.small,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.xl,
    backgroundColor: colors.primary.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.base,
  },
  
  avatarText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
  
  userDetails: {
    flex: 1,
  },
  
  userName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.darkest,
  },
  
  parkingName: {
    fontSize: typography.fontSize.xs2,
    color: colors.text.gray.medium,
    marginTop: spacing.xs4,
  },
  
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs2,
    borderRadius: radius.base,
  },
  
  statusText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  
  detailsBox: {
    backgroundColor: colors.background.lightGray,
    borderRadius: radius.sm,
    padding: spacing.base,
    marginBottom: spacing.base,
  },
  
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs2,
  },
  
  detailLabel: {
    fontSize: typography.fontSize.xs2,
    color: colors.text.gray.medium,
    marginLeft: spacing.xs,
    flex: 1,
  },
  
  detailValue: {
    fontSize: typography.fontSize.xs2,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.darkest,
  },
  
  detailValueGreen: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.dark,
  },
  
  divider: {
    height: 1,
    backgroundColor: colors.border.gray,
    marginVertical: spacing.xs,
  },
  
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  
  button: {
    flex: 1,
    height: 44,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonReject: {
    backgroundColor: colors.background.grayLight,
  },
  
  buttonAccept: {
    backgroundColor: colors.primary.dark,
  },
  
  buttonTextReject: {
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.gray.medium,
  },
  
  buttonTextAccept: {
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
  
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl2,
  },
  
  loadingText: {
    marginTop: spacing.base,
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.medium,
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
});
