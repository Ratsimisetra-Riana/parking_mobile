import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

export const supabaseImageStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.lightGray,
  },
  
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 244, 246, 0.8)',
  },
  
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.lightGray,
  },
  
  errorText: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.text.gray.slate.medium,
  },
});
