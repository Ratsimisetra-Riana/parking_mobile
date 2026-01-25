import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

export const qrcodeDisplayStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },

  headerContainer: {
    zIndex: 10,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    paddingBottom: spacing.xxl * 2,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },

  loadingText: {
    fontSize: 16,
    color: colors.text.gray,
    fontFamily: 'Poppins-Regular',
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },

  errorText: {
    fontSize: 64,
  },

  errorMessage: {
    fontSize: 16,
    color: colors.text.gray,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },

  retryButton: {
    backgroundColor: colors.primary.green,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
    marginTop: spacing.md,
  },

  retryButtonText: {
    color: colors.text.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  confirmationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },

  confirmationText: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: colors.text.charcoal,
  },

  checkmark: {
    fontSize: 28,
  },

  detailsCard: {
    backgroundColor: colors.background.lightGray,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },

  parkingName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: colors.text.charcoal,
    marginBottom: spacing.xs,
  },

  detailItem: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.text.gray,
    lineHeight: 22,
    flex: 1,
  },

  qrCodeContainer: {
    backgroundColor: colors.background.white,
    padding: spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.text.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  validatedBadge: {
    backgroundColor: colors.status.success,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },

  validatedText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.white,
  },

  instructionsContainer: {
    backgroundColor: colors.background.lightGreen,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },

  instructionsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },

  instructionsTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.charcoal,
  },

  instructionsText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.text.gray,
    lineHeight: 20,
  },

  buttonsContainer: {
    gap: spacing.md,
  },

  refreshButton: {
    backgroundColor: colors.primary.blue,
    paddingVertical: spacing.md,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },

  refreshButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.white,
  },

  backButton: {
    backgroundColor: colors.background.lightGray,
    paddingVertical: spacing.md,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },

  backButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.charcoal,
  },
});
