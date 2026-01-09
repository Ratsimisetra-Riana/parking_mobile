import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { phoneNumberInputStyles as styles } from './PhoneNumberInput.styles';

const PhoneNumberInput = ({ height, marginTop, value, onChangeText, editable = true }) => {
  const phoneInput = useRef(null);
  const [internalValue, setInternalValue] = useState(value || '');
  const [formattedValue, setFormattedValue] = useState('');

  // Synchroniser la valeur interne avec la prop value
  useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChangeText = (text) => {
    setInternalValue(text);
    // On ne communique rien ici, on attend le formattedValue
  };

  const handleChangeFormattedText = (text) => {
    setFormattedValue(text);
    // Communiquer le numéro COMPLET avec indicatif pays au parent
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View style={[styles.container, { marginTop }]}>
      <PhoneInput
        ref={phoneInput}
        value={internalValue}
        defaultCode="MG" // Madagascar par défaut, mais modifiable
        layout="first"
        onChangeText={handleChangeText}
        onChangeFormattedText={handleChangeFormattedText}
        withShadow
        placeholder="Numéro de téléphone"
        disabled={!editable}
        containerStyle={[styles.phoneContainer, { height }]}
        textContainerStyle={styles.textInput}     
      />
    </View>
  );
};

export default PhoneNumberInput;
