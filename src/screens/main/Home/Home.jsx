import { View, Text, Image } from "react-native";
import { Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import { homeStyles as styles } from './Home.styles';

export default function Home({navigation}) {
 

  return (
          <ScrollView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require("../../../assets/logo.png")} style={styles.logo} />
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
