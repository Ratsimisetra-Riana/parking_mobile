import React, { useState } from "react";
import { View, Text, TextInput, Image, Alert, ActivityIndicator } from "react-native";
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import { authService } from "../../services";

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation des champs
    if (!username.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);

    try {
      // Appel au service d'authentification
      const response = await authService.login(username.trim(), password);
      
      console.log('Connexion réussie:', response);
      
      // Navigation directe vers la liste des parkings
      navigation.navigate("Liste des parkings");
    } catch (error) {
      console.error('Erreur de connexion:', error);
      
      // Gestion des différents types d'erreurs
      if (error.response) {
        // Le serveur a répondu avec une erreur
        if (error.response.status === 401 || error.response.status === 403) {
          Alert.alert('Erreur', 'Nom d\'utilisateur ou mot de passe incorrect');
        } else {
          Alert.alert('Erreur', `Erreur serveur: ${error.response.status}`);
        }
      } else if (error.request) {
        // Pas de réponse du serveur
        Alert.alert(
          'Erreur de connexion',
          'Impossible de contacter le serveur.\nVérifiez que le backend est démarré.'
        );
      } else {
        // Autre erreur
        Alert.alert('Erreur', 'Une erreur inattendue s\'est produite');
      }
    } finally {
      setLoading(false);
    }
  };
 

  return (
          <ScrollView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>Se connecter</Text>
                <Text style={styles.description}>Veuillez entrer vos données de connexion</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Nom d'utilisateur"
                        style={styles.input}
                        autoCapitalize="none"
                        value={username}
                        onChangeText={setUsername}
                        editable={!loading}
                    />
                    <TextInput
                        placeholder="Entrez votre mot de passe"
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        editable={!loading}
                    />
                </View>
                <Text style={styles.remember}>Se souvenir de moi</Text>
                <Button 
                  mode="contained" 
                  style={styles.submit} 
                  contentStyle={styles.submitContent}  
                  labelStyle={{ fontSize: 17, fontFamily: 'Figtree-Regular', fontWeight:"500" }}  
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <ActivityIndicator color="#fff" /> : 'Valider'}
                </Button>
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
