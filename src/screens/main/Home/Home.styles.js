import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../theme';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  
  title: {
    fontSize: 17,
    fontFamily: 'Figtree-Regular',
  },
  
  description: {
    fontSize: 17,
    marginTop: spacing.xs2,
  },
  
  inputContainer: {
    marginTop: spacing.sm,
  },
  
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: colors.text.black,
    borderRadius: radius.lg2,
    paddingHorizontal: spacing.sm,
    marginVertical: spacing.sm,
  },
  
  remember: {
    marginTop: spacing.xl + spacing.xs2,
    fontFamily: 'Figtree-Regular',
  },
  
  login: {
    marginTop: spacing.base,
    height: 75,
    borderRadius: radius.xl2,
    backgroundColor: colors.background.lightGray,
  },
  
  register: {
    marginTop: spacing.lg2,
    height: 75,
    borderRadius: radius.xl2,
    backgroundColor: colors.background.lightGray,
  },
  
  submitContent: {
    height: 75,
    justifyContent: 'center',
  },
  
  linkContainer: {
    marginTop: spacing.xl3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  
  body: {
    paddingHorizontal: spacing.xl2,
    paddingBottom: spacing.xl2,
  },
});
