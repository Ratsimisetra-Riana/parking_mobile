import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

export const qrcodeScannerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.text.charcoal,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.text.charcoal,
  },

  loadingText: {
    fontSize: 16,
    color: colors.text.white,
    fontFamily: 'Poppins-Regular',
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    backgroundColor: colors.text.charcoal,
  },

  errorText: {
    fontSize: 64,
  },

  errorMessage: {
    fontSize: 16,
    color: colors.text.white,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },

  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 100,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    color: colors.text.white,
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },

  titleContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 50,
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: colors.text.white,
  },

  cameraContainer: {
    flex: 1,
    position: 'relative',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  overlayMiddle: {
    flexDirection: 'row',
  },

  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  scanFrame: {
    width: 300,
    height: 300,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: colors.primary.green,
  },

  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },

  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },

  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },

  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },

  scanLine: {
    width: '100%',
    height: 2,
    backgroundColor: colors.primary.green,
    shadowColor: colors.primary.green,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },

  validatingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },

  validatingText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.white,
  },

  instructionsContainer: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50,
  },

  instructionsText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.text.white,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },

  flashButton: {
    position: 'absolute',
    bottom: 200,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },

  flashButtonText: {
    fontSize: 28,
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50,
  },

  manualEntryButton: {
    backgroundColor: colors.background.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  manualEntryIcon: {
    fontSize: 20,
  },

  manualEntryText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.charcoal,
  },

  footerNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },

  footerNavButton: {
    alignItems: 'center',
    gap: 4,
  },

  footerNavIcon: {
    fontSize: 24,
  },

  footerNavText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: colors.text.gray,
  },

  backButton: {
    backgroundColor: colors.primary.green,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
    marginTop: spacing.md,
  },

  backButtonText: {
    color: colors.text.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
