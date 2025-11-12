import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  // Charger le nom de l'utilisateur au montage
  useEffect(() => {
    const loadUserName = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          setUserName(user.user_name || user.email || 'Utilisateur');
        }
      } catch (error) {
        console.error('Erreur chargement user:', error);
      }
    };
    loadUserName();
  }, []);

  const handleMenuPress = () => {
    console.log('Menu hamburger cliqué');
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  const handleNavigate = (screenName) => {
    setMenuVisible(false);
    if (navigation) {
      navigation.navigate(screenName);
    }
  };

  const handleLogout = async () => {
    setMenuVisible(false);
    await AsyncStorage.clear();
    if (navigation) {
      navigation.navigate('Login');
    }
  };

  const handleLogoPress = () => {
    console.log('Logo L cliqué');
    if (navigation) {
      navigation.navigate('Liste des parkings');
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity 
        onPress={handleMenuPress}
        style={styles.menuButton}
        activeOpacity={0.7}
      >
        <Ionicons name="menu" size={28} color="#000" />
      </TouchableOpacity>
      
      
      
      <TouchableOpacity 
        style={styles.logoButton}
        onPress={handleLogoPress}
        activeOpacity={0.7}
      >
        <Text style={styles.logoButtonText}>L</Text>
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleMenuClose}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleMenuClose}
        >
          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Bonjour {userName} 👋</Text>
            </View>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigate('Mes réservations')}
            >
              <Ionicons name="calendar-outline" size={24} color="#333" />
              <Text style={styles.menuItemText}>Mes réservations</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            

            <View style={styles.menuDivider} />

            <TouchableOpacity 
              style={[styles.menuItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={24} color="#ff4444" />
              <Text style={[styles.menuItemText, styles.logoutText]}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  menuButton: {
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  userNameText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  logoButton: {
    backgroundColor: '#A4E66E',
    padding: 10,
    borderRadius: 8,
  },
  logoButtonText: {
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 15,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    minWidth: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  menuHeader: {
    backgroundColor: '#A4E66E',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
    color: '#333',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  logoutItem: {
    backgroundColor: '#fff',
  },
  logoutText: {
    color: '#ff4444',
    fontWeight: '600',
  },
});

export default Header;
