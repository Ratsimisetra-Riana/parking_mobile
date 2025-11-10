import { View, Text, TextInput, Image  } from "react-native";
import { StyleSheet } from 'react-native';
import {  Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import PhoneNumberInput from "../../components/PhoneNumberInput/PhoneNumberInput";

export default function Registration() {
 

  return (
        <ScrollView 
          
         contentContainerStyle={{
          flexGrow: 1,
          padding: 40,
          backgroundColor: "white"
          }}
          keyboardShouldPersistTaps="handled"
        >
            <View style={styles.logoContainer}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>Inscrivez {'\n'}vous ici</Text>
                <Text style={styles.description}>Pour avoir plus d'opportunité de réserver, louer et contribuer à évacuer la circulation</Text>
                <View style={styles.inputContainer}>
                    <TextInput  
                        placeholder="Nom"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Prénom"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="E-mail"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Nom d'utilisateur"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Mot de passe"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Confirmation du mot de passe"
                        style={styles.input}
                    />
                    <PhoneNumberInput 
                      height={60}
                      marginTop={10}
                    />
                </View> 
                
                <Button mode="contained" style={styles.submit} contentStyle={styles.submitContent}  labelStyle={{ fontSize: 17 }}>Créer le compte</Button>
               
            </View>
            </ScrollView>
          
         
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1,
    padding : 40,
    backgroundColor:"white",
    
  },
  title: { 
    fontSize : 30,
    fontWeight : "bold",
    fontFamily:"SourceCodePro-Regular"

  },
  description: { 
    fontSize : 17,
    marginTop : 7
  },
  inputContainer: {
    marginTop: 7
  },
  input: {
    height: 60,
    borderWidth: 1,       // thickness
    borderColor: "black", // color
    borderRadius: 17,      // optional rounded corners
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  remember:{
    marginTop: 7
  },
  submit:{
    marginTop: 22,
    height:70,
    borderRadius: 30,
  },
  submitContent: {
    height:70,
    justifyContent: "center",       
  },
  linkContainer:{
    marginTop: 50,
    display:"flex",
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: "center"
  },
  register:{
    marginLeft:5,
    fontWeight:"bold"
  },
  logoContainer: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width : "100%",
    height:"50%",
    //backgroundColor:"red",
  },
  logo: { 
    width: 50,
    height: 50,
    resizeMode: "contain" ,
    marginLeft:"auto"
  },
  body: {
    marginTop:25
  }
});
