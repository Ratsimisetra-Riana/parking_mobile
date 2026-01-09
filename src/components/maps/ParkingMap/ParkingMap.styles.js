import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../theme';

export const parkingMapStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginVertical: spacing.sm,
    backgroundColor: colors.background.offWhite,
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
    backgroundColor: colors.background.offWhite,
  },
  
  loadingText: {
    marginTop: spacing.sm,
    color: colors.text.gray.medium,
    fontSize: 14,
  },
  
  emptyContainer: {
    width: '100%',
    height: 220,
    borderRadius: radius.md,
    marginVertical: spacing.base,
    backgroundColor: colors.background.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  emptyText: {
    marginTop: spacing.sm,
    color: colors.text.gray.slate.dark,
    fontSize: 14,
  },
});
