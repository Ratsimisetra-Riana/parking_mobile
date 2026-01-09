/**
 * 🎨 PAYMENT FINALIZATION STYLES
 * Styles pour l'écran de finalisation de paiement
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../../../theme';

export const paymentFinalizationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.offWhite,
  },
  
  backButton: {
    padding: spacing.xs2,
  },
  
  headerTitle: {
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: spacing.base,
    borderRadius: radius.sm,
    marginTop: spacing.base,
    gap: spacing.sm,
  },
  
  warningText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: '#F57C00',
  },
  
  section: {
    marginTop: spacing.xl,
  },
  
  sectionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    marginBottom: spacing.base,
  },
  
  summaryBox: {
    backgroundColor: colors.background.lightGray3,
    borderRadius: radius.base,
    padding: spacing.base,
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.medium,
  },
  
  summaryValue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.dark,
    fontWeight: typography.fontWeight.medium,
  },
  
  summaryLabelBold: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },
  
  summaryValueBold: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.dark,
  },
  
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.sm,
  },
  
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background.offWhite,
    borderRadius: radius.base,
    padding: spacing.xs2,
    gap: spacing.xs2,
  },
  
  tab: {
    flex: 1,
    paddingVertical: spacing.base,
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  
  tabActive: {
    backgroundColor: colors.background.white,
    ...shadows.small,
  },
  
  tabText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.gray.medium,
  },
  
  tabTextActive: {
    color: colors.text.dark,
    fontWeight: typography.fontWeight.semibold,
  },
  
  acceptedCardsLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.gray.slate.medium,
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  
  cardLogos: {
    flexDirection: 'row',
    gap: spacing.base,
    marginBottom: spacing.lg,
  },
  
  cardLogo: {
    width: 56,
    height: 40,
    borderRadius: radius.xs2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  cardLogoText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
  
  inputLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.dark,
    marginBottom: spacing.sm,
    marginTop: spacing.base,
  },
  
  input: {
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: radius.sm,
    padding: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text.dark,
    backgroundColor: colors.background.white,
  },
  
  row: {
    flexDirection: 'row',
    gap: spacing.base,
  },
  
  halfWidth: {
    flex: 1,
  },
  
  paypalButton: {
    backgroundColor: '#0070BA',
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    alignItems: 'center',
    marginTop: spacing.base,
  },
  
  paypalButtonText: {
    color: colors.text.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  
  submitButton: {
    backgroundColor: colors.primary.dark,
    paddingVertical: spacing.base,
    borderRadius: radius.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xxl,
    flexDirection: 'row',
    ...shadows.medium,
  },
  
  submitButtonDisabled: {
    opacity: 0.6,
  },
  
  submitButtonText: {
    color: colors.text.white,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.base,
    marginBottom: spacing.xl2,
    gap: spacing.xs2,
  },
  
  securityText: {
    fontSize: typography.fontSize.xs3,
    color: colors.text.gray.medium,
  },
});
