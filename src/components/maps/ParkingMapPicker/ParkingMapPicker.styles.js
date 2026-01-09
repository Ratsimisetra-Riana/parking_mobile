import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows } from '../../../theme';

export const parkingMapPickerStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  
  webview: {
    flex: 1,
  },
  
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    zIndex: 999,
  },
  
  loadingText: {
    marginTop: spacing.base,
    fontSize: 14,
    color: colors.text.gray.medium,
  },
  
  helpBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: spacing.base,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.medium,
  },
  
  helpText: {
    marginLeft: spacing.xs,
    fontSize: 13,
    color: colors.text.darkGray,
    flex: 1,
  },
});
