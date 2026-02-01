import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../../../services/authService';
import { colors } from '../../../theme';

/**
 * SplashScreen - Écran de démarrage qui vérifie l'état de la session
 * Pemet d'afficher le logo animé avant de rediriger
 */
export default function SplashScreen({ navigation }) {
    // Valeurs animées
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Lancer l'animation au démarrage
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.out(Easing.back(1.2)),
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.out(Easing.back(1.2)),
            }),
        ]).start();

        // Vérifier la session après un petit délai pour laisser l'animation se voir
        const timer = setTimeout(() => {
            checkAuthStatus();
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const checkAuthStatus = async () => {
        try {
            console.log('🔍 Vérification de la session...');

            // Vérifier si un token existe
            const token = await AsyncStorage.getItem('jwt_token');

            if (!token) {
                console.log(' Aucun token trouvé, redirection vers Login');
                navigateToLogin();
                return;
            }

            // Vérifier si le token est expiré
            const isExpired = await authService.isTokenExpired();

            if (isExpired) {
                console.log('⏰ Token expiré, nettoyage et redirection vers Login');
                await authService.logout();
                navigateToLogin();
                return;
            }

            // Vérifier si les données utilisateur existent
            const userJson = await AsyncStorage.getItem('user');

            if (!userJson) {
                console.log(' Données utilisateur manquantes, redirection vers Login');
                navigateToLogin();
                return;
            }

            // Session valide, redirection vers Home
            console.log(' Session valide, redirection vers Home');
            navigateToHome();

        } catch (error) {
            console.error(' Erreur vérification session:', error);
            navigateToLogin();
        }
    };

    const navigateToLogin = () => {
        // Pas connecté → écran de connexion
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const navigateToHome = () => {
        // Connecté → liste des parkings (vraie page d'accueil)
        navigation.reset({
            index: 0,
            routes: [{ name: 'Liste des parkings' }],
        });
    };


    return (
        <View style={styles.container}>
            <Animated.View style={[
                styles.logoContainer,
                {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                }
            ]}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.appName}>uPark</Text>
            </Animated.View>

            <View style={styles.bottomContainer}>
                <ActivityIndicator size="small" color={colors.primary.main} style={styles.loader} />
                <Text style={styles.loadingText}>Connexion sécurisée...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.primary.main,
        letterSpacing: 1,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
    loader: {
        marginBottom: 10,
    },
    loadingText: {
        fontSize: 12,
        color: '#9CA3AF', // Gris clair
        letterSpacing: 0.5,
    },
});
