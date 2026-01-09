import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { footerStyles as styles } from './Footer.styles';
import { colors } from '../../../theme';

const Footer = ({ navigation, activeRoute }) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  
  const navigateTo = (routeName) => {
    if (navigation) {
      navigation.navigate(routeName);
    }
  };

  const isActive = (routeName) => activeRoute === routeName;
  
  // Calculer la largeur des boutons en fonction de l'écran
  const buttonWidth = width / 5.5;
  const showLabels = width > 360;

  return (
    <View style={[styles.footerContainer, { 
      paddingBottom: Math.max(insets.bottom, 10),
      paddingHorizontal: width < 380 ? 2 : 5 
    }]}>
      <TouchableOpacity 
        style={[styles.footerButton, { width: buttonWidth }]}
        onPress={() => navigateTo('Liste des parkings')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isActive('Liste des parkings') ? 'home' : 'home-outline'} 
          size={width < 380 ? 22 : 24} 
          color={isActive('Liste des parkings') ? colors.primary.dark : colors.text.gray.medium} 
        />
        {showLabels && (
          <Text style={[styles.footerText, isActive('Liste des parkings') && styles.footerTextActive]}>
            Accueil
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.footerButton, { width: buttonWidth }]}
        onPress={() => navigateTo('Mes réservations')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isActive('Mes réservations') ? 'calendar' : 'calendar-outline'} 
          size={width < 380 ? 22 : 24} 
          color={isActive('Mes réservations') ? colors.primary.dark : colors.text.gray.medium} 
        />
        {showLabels && (
          <Text style={[styles.footerText, isActive('Mes réservations') && styles.footerTextActive]}>
            Réservations
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.footerButton, { width: buttonWidth }]}
        onPress={() => navigateTo('MyAnnouncements')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isActive('MyAnnouncements') || isActive('Mes Annonces') ? 'megaphone' : 'megaphone-outline'} 
          size={width < 380 ? 22 : 24} 
          color={isActive('MyAnnouncements') || isActive('Mes Annonces') ? colors.primary.dark : colors.text.gray.medium} 
        />
        {showLabels && (
          <Text style={[styles.footerText, (isActive('MyAnnouncements') || isActive('Mes Annonces')) && styles.footerTextActive]}>
            Publier
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.footerButton, { width: buttonWidth }]}
        onPress={() => navigateTo('Notifications')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isActive('Notifications') ? 'notifications' : 'notifications-outline'} 
          size={width < 380 ? 22 : 24} 
          color={isActive('Notifications') ? colors.primary.dark : colors.text.gray.medium} 
        />
        {showLabels && (
          <Text style={[styles.footerText, isActive('Notifications') && styles.footerTextActive]}>
            Notifications
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.footerButton, { width: buttonWidth }]}
        onPress={() => {
          // Naviguer vers le profil ou afficher le menu
          console.log('Mon compte - à implémenter');
        }}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isActive('Mon compte') ? 'person' : 'person-outline'} 
          size={width < 380 ? 22 : 24} 
          color={isActive('Mon compte') ? colors.primary.dark : colors.text.gray.medium} 
        />
        {showLabels && (
          <Text style={[styles.footerText, isActive('Mon compte') && styles.footerTextActive]}>
            Mon compte
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
