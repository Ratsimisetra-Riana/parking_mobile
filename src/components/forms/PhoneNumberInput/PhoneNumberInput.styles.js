/**
 *  PHONE NUMBER INPUT STYLES
 * Styles pour le composant PhoneNumberInput
 */

import { StyleSheet } from 'react-native';
import { colors, radius } from '../../../theme';

export const phoneNumberInputStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  phoneContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: radius.xxl,
  },
  textInput: {
    paddingVertical: 0,
    borderRadius: radius.xxl,
  },
});

export default phoneNumberInputStyles;
