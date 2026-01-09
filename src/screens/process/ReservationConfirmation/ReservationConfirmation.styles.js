import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../../../theme';

export const reservationConfirmationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  
  headerContainer: {
    paddingHorizontal: spacing.lg3,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  
  confirmationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  confirmationText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginRight: spacing.sm,
    color: colors.text.charcoal,
  },
  
  checkmark: {
    fontSize: typography.fontSize.xl,
  },
  
  detailsCard: {
    width: '100%',
    padding: spacing.lg2,
    borderRadius: radius.md,
    backgroundColor: 'rgba(164, 230, 110, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(164, 230, 110, 0.3)',
    ...shadows.small,
  },
  
  parkingName: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.base,
    marginBottom: spacing.xs,
    color: colors.text.charcoal,
  },
  
  detailItem: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.dark,
    lineHeight: 20,
  },
  
  qrCodeContainer: {
    marginTop: spacing.xl2,
    marginBottom: spacing.xl2,
    padding: spacing.lg2,
    backgroundColor: colors.background.white,
    borderRadius: radius.md,
    ...shadows.small,
  },
  
  button: {
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.lg2,
    paddingHorizontal: spacing.xl2,
    borderRadius: radius.xl2,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  
  buttonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.charcoal,
  },
});
