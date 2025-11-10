import { View, Text, Image  } from "react-native";
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";

export default function Home({navigation}) {
 

  return (
          <ScrollView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>Bienvenue à vous</Text>
                
                <View style={styles.inputContainer}>
                  <Button 
                    mode="contained"
                    style={styles.login} 
                    contentStyle={styles.submitContent}  
                    labelStyle={{ fontSize: 17 }} 
                    textColor="grey" 
                    onPress={() => navigation.navigate("Login")}>
                      Se connecter
                  </Button>
                  <Button 
                    mode="contained" 
                    style={styles.register} 
                    contentStyle={styles.submitContent} 
                    labelStyle={{ fontSize: 17 }} 
                    textColor="grey"
                    onPress={() => navigation.navigate("Registration")}>
                      S'inscrire
                  </Button>
                </View>
                
                <Text style={styles.remember}>ou avec</Text>              
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
    fontSize : 17,
    fontFamily: 'Figtree-Regular'
  },
  description: { 
    fontSize : 17,
    marginTop : 7
  },
  inputContainer: {
    marginTop: 10
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
    marginTop:27,
    fontFamily: 'Figtree-Regular'
  },
  login:{
    marginTop: 12,
    height:75,
    borderRadius: 30,
    backgroundColor:"lightgrey"
  },
  register:{
     marginTop: 17,
    height:75,
    borderRadius: 30,
    backgroundColor:"lightgrey"
  },
  submitContent: {
    height:75,
    justifyContent: "center",
    
       
  },
  linkContainer:{
    marginTop: 50,
    display:"flex",
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: "center"
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
    marginTop:80
  }
});
