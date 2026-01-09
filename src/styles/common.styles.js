/**
 * 🎯 COMMON STYLES
 * Styles réutilisables communs à travers l'application
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, shadows, typography } from '../theme';

export const commonStyles = StyleSheet.create({
  // ===== CONTAINERS =====
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },

  containerGray: {
    flex: 1,
    backgroundColor: colors.background.lightGray3,
  },

  containerPadded: {
    flex: 1,
    padding: spacing.base,
    backgroundColor: colors.background.white,
  },

  // ===== LOADING =====
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.white,
  },

  loadingContainerGray: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.lightGray3,
  },

  // ===== CENTER =====
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ===== HEADERS =====
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.base,
    backgroundColor: colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    ...shadows.header,
  },

  headerTitle: {
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },

  // ===== SEPARATEURS =====
  separator: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.md,
  },

  separatorThick: {
    height: 2,
    backgroundColor: colors.border.medium,
    marginVertical: spacing.base,
  },

  // ===== TEXTES =====
  textPrimary: {
    fontSize: typography.fontSize.md2,
    color: colors.text.primary,
  },

  textSecondary: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },

  textBold: {
    fontWeight: typography.fontWeight.bold,
  },

  textCenter: {
    textAlign: 'center',
  },

  // ===== ERROR/SUCCESS MESSAGES =====
  errorText: {
    color: colors.status.error,
    fontSize: typography.fontSize.base,
    marginTop: spacing.xs,
  },

  successText: {
    color: colors.status.success,
    fontSize: typography.fontSize.base,
    marginTop: spacing.xs,
  },

  // ===== EMPTY STATES =====
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxxl,
  },

  emptyText: {
    fontSize: typography.fontSize.lg2,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },

  // ===== ROWS =====
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ===== SCROLLVIEW =====
  scrollViewContent: {
    padding: spacing.base,
  },

  scrollViewGray: {
    backgroundColor: colors.background.lightGray3,
  },
});

export default commonStyles;
