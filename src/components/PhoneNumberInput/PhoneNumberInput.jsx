import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

const PhoneNumberInput = ({height,marginTop}) => {
  //const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
 

  return (
    <View style={[styles.container,{marginTop}]}>
      <PhoneInput
        //ref={phoneInput}
        defaultValue={value}
        defaultCode="US" // default country
        layout="first"
        onChangeText={(text) => setValue(text)}
        onChangeFormattedText={(text) => setFormattedValue(text)}
        withShadow
         placeholder="Numéro de téléphone"
        autoFocus
        containerStyle={[styles.phoneContainer,{height}]}
        textContainerStyle={styles.textInput}     
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    
  },
  phoneContainer: {
    width: '100%',
     borderWidth: 1,       // thickness
    borderColor: "black", // color
    borderRadius: 17,   
    
  },
  textInput: {
    paddingVertical: 0,
    borderRadius: 17,
  },
});

export default PhoneNumberInput;
