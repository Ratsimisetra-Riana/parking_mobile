import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Footer = ({ navigation, activeRoute }) => {
  const navigateTo = (routeName) => {
    if (navigation) {
      navigation.navigate(routeName);
    }
  };

  const isActive = (routeName) => activeRoute === routeName;

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => navigateTo('Liste des parkings')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isActive('Liste des parkings') ? 'home' : 'home-outline'} 
          size={24} 
          color={isActive('Liste des parkings') ? '#6BBF47' : '#666'} 
        />
        <Text style={[styles.footerText, isActive('Liste des parkings') && styles.footerTextActive]}>
          Accueil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => navigateTo('Mes réservations')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isActive('Mes réservations') ? 'calendar' : 'calendar-outline'} 
          size={24} 
          color={isActive('Mes réservations') ? '#6BBF47' : '#666'} 
        />
        <Text style={[styles.footerText, isActive('Mes réservations') && styles.footerTextActive]}>
          Réservations
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => {
          // Fonctionnalité à implémenter
          console.log('Publier - à implémenter');
        }}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isActive('Publier') ? 'add-circle' : 'add-circle-outline'} 
          size={24} 
          color={isActive('Publier') ? '#6BBF47' : '#666'} 
        />
        <Text style={[styles.footerText, isActive('Publier') && styles.footerTextActive]}>
          Publier
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => {
          // Fonctionnalité à implémenter
          console.log('Chats - à implémenter');
        }}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isActive('Chats') ? 'chatbubbles' : 'chatbubbles-outline'} 
          size={24} 
          color={isActive('Chats') ? '#6BBF47' : '#666'} 
        />
        <Text style={[styles.footerText, isActive('Chats') && styles.footerTextActive]}>
          Chats
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => {
          // Naviguer vers le profil ou afficher le menu
          console.log('Mon compte - à implémenter');
        }}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isActive('Mon compte') ? 'person' : 'person-outline'} 
          size={24} 
          color={isActive('Mon compte') ? '#6BBF47' : '#666'} 
        />
        <Text style={[styles.footerText, isActive('Mon compte') && styles.footerTextActive]}>
          Mon compte
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    minWidth: 60,
  },
  footerText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  footerTextActive: {
    color: '#6BBF47',
    fontWeight: '600',
  },
});

export default Footer;
