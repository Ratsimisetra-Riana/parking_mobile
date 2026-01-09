import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../theme';

export const loginStyles = StyleSheet.create({
  container: { 
    padding: spacing.xl2,
    backgroundColor: colors.background.white,
  },
  
  logoContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    marginBottom: spacing.lg,
  },
  
  logo: { 
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  
  title: { 
    fontSize: 30,
    fontFamily: 'Figtree-Regular',
  },
  
  description: { 
    fontSize: 17,
    marginTop: spacing.xs,
    fontFamily: 'Figtree-Regular',
  },
  
  inputContainer: {
    marginTop: spacing.lg,
  },
  
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: colors.text.black,
    borderRadius: radius.lg2,
    paddingHorizontal: spacing.sm,
    marginVertical: spacing.sm,
    fontFamily: 'Figtree-Regular',
  },
  
  remember: {
    marginTop: spacing.xs2,
    fontFamily: 'Figtree-Regular',
  },
  
  submit: {
    marginTop: spacing.base,
    height: 70,
    borderRadius: radius.xl2,
  },
  
  submitContent: {
    height: 70,
    justifyContent: 'center',
  },
  
  linkContainer: {
    marginTop: spacing.xl3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  register: {
    marginLeft: spacing.xs,
    fontWeight: 'bold',
    fontFamily: 'Figtree-Regular',
  },
  
  forgot: {
    fontFamily: 'Figtree-Regular',
  },
  
  body: {
    marginTop: spacing.base,
  },
});
