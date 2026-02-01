import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../../../theme';

export const reservationListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
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

  errorText: {
    fontSize: typography.fontSize.base,
    color: colors.error.main,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },

  emptyText: {
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkGray,
    marginBottom: spacing.sm,
  },

  emptySubText: {
    fontSize: typography.fontSize.base,
    color: colors.text.gray.medium,
    marginBottom: spacing.lg,
  },

  retryButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.xl2,
    paddingVertical: spacing.base,
    borderRadius: radius.xl,
  },

  retryButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkGray,
  },

  // Tabs (onglets)
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginTop: spacing.base,
    borderRadius: radius.base,
    backgroundColor: colors.background.lightGray,
    padding: spacing.xs2,
  },

  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderRadius: radius.sm,
    gap: spacing.xs2,
  },

  tabButtonActive: {
    backgroundColor: colors.background.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  tabText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.medium,
    fontWeight: typography.fontWeight.medium,
  },

  tabTextActive: {
    color: colors.primary.main,
    fontWeight: typography.fontWeight.semibold,
  },

  // Title and Badge
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
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
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xs2,
    borderRadius: radius.base,
    marginLeft: spacing.base,
    minWidth: 32,
    alignItems: 'center',
  },

  countBadgeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },

  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 80,
  },

  // Filters
  filtersContainer: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.base,
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.xs2,
  },

  filterButton: {
    flex: 1,
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.base,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },

  filterButtonSecondary: {
    backgroundColor: colors.background.lightGray,
    borderWidth: 1,
    borderColor: colors.border.gray,
  },

  filterButtonText: {
    fontSize: typography.fontSize.xs3,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.dark,
    numberOfLines: 1,
  },

  historyButton: {
    backgroundColor: colors.text.gray.slate.dark,
    flex: 0.5,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs2,
  },

  historyButtonText: {
    fontSize: typography.fontSize.xs3,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.white,
    textAlign: 'center',
    numberOfLines: 1,
  },

  // Dropdown
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownContainer: {
    backgroundColor: colors.background.white,
    borderRadius: radius.lg2,
    padding: spacing.lg,
    width: '80%',
    maxHeight: '60%',
    ...shadows.medium,
  },

  dropdownLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    marginBottom: spacing.lg2,
    textAlign: 'center',
  },

  dropdownItem: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },

  dropdownItemSelected: {
    backgroundColor: colors.background.blueLight,
  },

  dropdownItemText: {
    fontSize: typography.fontSize.base,
    color: colors.text.darkGray,
  },

  dropdownItemTextSelected: {
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
  },

  dropdownItemWithIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dropdownItemIndicator: {
    width: 10,
    height: 10,
    borderRadius: spacing.xs,
    marginRight: spacing.sm,
  },

  // Card Styles
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.lg2,
    borderRadius: radius.lg2,
    marginBottom: spacing.lg2,
    ...shadows.small,
  },

  // Card background colors per status (CDC)
  cardGreen: {
    backgroundColor: '#e6ffe6', // À venir
  },

  cardYellow: {
    backgroundColor: '#fffbe6', // Not used
  },

  cardBlue: {
    backgroundColor: '#e6f7ff', // En cours
  },

  cardGray: {
    backgroundColor: colors.background.offWhite, // Terminé
  },

  cardRed: {
    backgroundColor: '#ffe6e6', // Annulé
  },

  parkingName: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.base,
    marginBottom: spacing.xs4,
  },

  detailItem: {
    fontSize: typography.fontSize.xs2,
    color: colors.text.darkGray,
    lineHeight: 18,
  },

  // Status Badge
  statusBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs2,
    borderRadius: radius.sm,
    marginLeft: spacing.sm,
  },

  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkGray,
  },

  // Badge colors per status (CDC)
  badgeGreen: {
    backgroundColor: 'rgba(108, 255, 108, 0.3)', // À venir
    borderColor: '#6cff6c',
    borderWidth: 1,
  },

  badgeYellow: {
    backgroundColor: 'rgba(255, 230, 108, 0.3)', // Not used
    borderColor: '#ffe66c',
    borderWidth: 1,
  },

  badgeBlue: {
    backgroundColor: 'rgba(108, 180, 255, 0.3)', // En cours
    borderColor: '#6cb4ff',
    borderWidth: 1,
  },

  badgeGray: {
    backgroundColor: 'rgba(150, 150, 150, 0.2)', // Terminé
    borderColor: '#999',
    borderWidth: 1,
  },

  badgeRed: {
    backgroundColor: 'rgba(255, 108, 108, 0.3)', // Annulé
    borderColor: '#ff6c6c',
    borderWidth: 1,
  },

  // Bottom Navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.white,
  },

  navItem: {
    fontSize: typography.fontSize.xs,
    color: colors.text.gray.slate.dark,
    textAlign: 'center',
  },

  navItemActive: {
    fontSize: typography.fontSize.xs,
    color: colors.text.black,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
  },

  // Bouton Scanner QR (propriétaire)
  scannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.base,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg2,
    borderRadius: radius.lg,
    gap: spacing.sm,
    ...shadows.medium,
  },

  scannerButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
});
