/**
 * 🎨 SOCIAL LOGIN BUTTONS STYLES
 * Styles pour le composant SocialLoginButtons
 */

import { StyleSheet } from 'react-native';
import { spacing, typography, radius, shadows } from '../../../theme';

export const socialLoginButtonsStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: spacing.lg,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  separatorText: {
    marginHorizontal: spacing.lg,
    color: '#757575',
    fontSize: typography.fontSize.md2,
    fontWeight: typography.fontWeight.medium,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  icon: {
    marginRight: spacing.md,
  },
  buttonText: {
    color: '#fff',
    fontSize: typography.fontSize.lg2,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default socialLoginButtonsStyles;
