/**
 * 🔘 BUTTON STYLES
 * Styles de boutons réutilisables
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../theme';

export const buttonStyles = StyleSheet.create({
  // ===== BASE BUTTON =====
  baseButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.base,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.button,
  },

  // ===== PRIMARY BUTTON =====
  primaryButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.base,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
    ...shadows.button,
  },

  primaryButtonText: {
    color: colors.text.dark,
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.bold,
  },

  // ===== SECONDARY BUTTON =====
  secondaryButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.base,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: colors.primary.main,
  },

  secondaryButtonText: {
    color: colors.primary.dark,
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.semibold,
  },

  // ===== DANGER BUTTON =====
  dangerButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.base,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.status.error,
    ...shadows.button,
  },

  dangerButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.bold,
  },

  // ===== SUCCESS BUTTON =====
  successButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.base,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.status.success,
    ...shadows.button,
  },

  successButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.bold,
  },

  // ===== DISABLED BUTTON =====
  disabledButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.base,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.status.disabled,
    opacity: 0.6,
  },

  disabledButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.semibold,
  },

  // ===== OUTLINE BUTTON =====
  outlineButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.base,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.primary.main,
  },

  outlineButtonText: {
    color: colors.primary.dark,
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.bold,
  },

  // ===== ICON BUTTON =====
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.lightGray3,
  },

  iconButtonPrimary: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
  },

  // ===== SMALL BUTTON =====
  smallButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
  },

  smallButtonText: {
    color: colors.text.dark,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },

  // ===== LARGE BUTTON =====
  largeButton: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
    ...shadows.medium,
  },

  largeButtonText: {
    color: colors.text.dark,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
});

export default buttonStyles;
