import { View, Text, TextInput, Image  } from "react-native";
import { StyleSheet } from 'react-native';
import {  Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import PhoneNumberInput from "../../components/PhoneNumberInput/PhoneNumberInput";

export default function Login({navigation}) {

  function handleSubmit(){
    navigation.navigate("Liste des parkings");
  }
 

  return (
          <ScrollView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>Se connecter</Text>
                <Text style={styles.description}>Veuillez entrer vos données de connexion</Text>
                <View style={styles.inputContainer}>
                    <PhoneNumberInput 
                      height={60}
                      marginTop={0}
                    />
                    <TextInput
                        placeholder="Entrez votre mot de passe"
                        style={styles.input}
                    />
                </View>
                <Text style={styles.remember}>Se souvenir de moi</Text>
                <Button mode="contained" style={styles.submit} contentStyle={styles.submitContent}  labelStyle={{ fontSize: 17,fontFamily: 'Figtree-Regular',fontWeight:"500" }}  onPress={handleSubmit}>Valider</Button>
                <View style={styles.linkContainer}>
                  <Text style={styles.forgot}>Mot de passe oublié?</Text> 
                  <Text 
                    style={styles.register}
                    onPress={() =>  navigation.navigate("Registration")}
                  >
                    Créer un compte
                  </Text>
                </View>
            </View>
            </ScrollView>
          
         
  );
}

const styles = StyleSheet.create({
  container: { 
    padding : 40,
    backgroundColor:"white"
  },
  logo: { 
    width : '100%',
    height:'50%' 
  },
  title: { 
    fontSize : 30 ,
    fontFamily: 'Figtree-Regular'
  },
  description: { 
    fontSize : 17,
    marginTop : 8,
    fontFamily: 'Figtree-Regular'
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 60,
    borderWidth: 1,       // thickness
    borderColor: "black", // color
    borderRadius: 17,      // optional rounded corners
    paddingHorizontal: 10,
    marginVertical: 10,
    marginTop: 20,
    fontFamily: 'Figtree-Regular'
  },
  remember:{
    marginTop: 7,
    fontFamily: 'Figtree-Regular'
  },
  submit:{
    marginTop: 12,
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
    alignItems: "center",
    
  },
  register:{
    marginLeft:5,
    fontWeight:"bold",
    fontFamily: 'Figtree-Regular'
    
  },
  forgot:{   
    fontFamily: 'Figtree-Regular'    
  },
  logoContainer: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width : '100%',
    height:'50%'
  },
  logo: { 
    width: 200,
    height: 200,
    resizeMode: "contain" 
  },
  body: {
    marginTop:25,
    
  }
});
