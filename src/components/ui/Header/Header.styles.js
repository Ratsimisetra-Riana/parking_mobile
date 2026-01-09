/**
 * 🎨 HEADER STYLES
 * Styles pour le composant Header (navigation drawer menu)
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, shadows, radius } from '../../../theme';

export const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: spacing.lg,
  },
  menuButton: {
    padding: spacing.medium,
  },
  logoButton: {
    backgroundColor: colors.primary.main,
    padding: spacing.sm,
    borderRadius: radius.md,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 35,
    height: 35,
  },
  // Modal & Drawer Styles
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    flex: 1,
  },
  drawerContainer: {
    width: '85%',
    maxWidth: 320,
    height: '100%',
    backgroundColor: colors.background.white,
    borderTopRightRadius: radius.huge,
    borderBottomRightRadius: radius.huge,
    shadowColor: colors.black,
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  // Header/Profile Section
  drawerHeader: {
    paddingTop: 56,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.background.greenLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary.bright,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary.bright,
  },
  avatarText: {
    fontSize: typography.fontSize.heading.h4,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.darkGreen,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary.bright,
    borderWidth: 2,
    borderColor: colors.background.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    marginBottom: spacing.xs,
  },
  userSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.gray.slate.dark,
    marginBottom: spacing.sm,
  },
  verifiedBadge: {
    backgroundColor: colors.primary.light,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.xs,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary.green,
    letterSpacing: 0.5,
  },
  // Menu Content
  menuContent: {
    flex: 1,
    paddingTop: spacing.sm,
  },
  menuSection: {
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.gray.slate.medium,
    letterSpacing: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  activeMenuItem: {
    backgroundColor: colors.primary.light,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.bright,
  },
  highlightedItem: {
    backgroundColor: colors.primary.light,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.bright,
  },
  menuIconContainer: {
    width: 24,
    alignItems: 'center',
  },
  parkingIcon: {
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.gray.slate.dark,
  },
  menuItemText: {
    fontSize: typography.fontSize.lg,
    color: colors.text.gray.darkest,
    fontWeight: typography.fontWeight.medium,
    flex: 1,
  },
  activeMenuText: {
    color: colors.secondary.green,
    fontWeight: typography.fontWeight.semibold,
  },
  highlightedText: {
    color: colors.secondary.green,
    fontWeight: typography.fontWeight.semibold,
  },
  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.xl,
    marginTop: spacing.base,
    marginBottom: spacing.sm,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#fee2e2',
    backgroundColor: '#fef2f2',
  },
  logoutText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.status.errorBright,
  },
  // Version
  versionText: {
    fontSize: typography.fontSize.base,
    color: colors.text.gray.slate.medium,
    textAlign: 'center',
    paddingVertical: spacing.base,
  },
});

export default headerStyles;
