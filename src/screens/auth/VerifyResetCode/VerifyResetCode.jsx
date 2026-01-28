import React, { useState, useRef } from "react";
import { View, Text, TextInput, Image, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import { authService } from "../../../services";
import { verifyResetCodeStyles as styles } from './VerifyResetCode.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function VerifyResetCode({ navigation, route }) {
    const { email } = route.params || {};
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    // Refs pour les inputs
    const inputRefs = useRef([]);

    const handleCodeChange = (text, index) => {
        // Autoriser seulement les chiffres
        const cleanText = text.replace(/[^0-9]/g, '');

        const newCode = [...code];
        newCode[index] = cleanText;
        setCode(newCode);

        // Passer au champ suivant automatiquement
        if (cleanText && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e, index) => {
        // Revenir au champ précédent si on supprime
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const fullCode = code.join('');

        if (fullCode.length !== 6) {
            Alert.alert('Erreur', 'Veuillez entrer le code à 6 chiffres');
            return;
        }

        setLoading(true);

        try {
            const response = await authService.verifyResetCode(email, fullCode);

            console.log('Réponse verify-code:', response);

            if (response.success) {
                // Naviguer vers l'écran de changement de mot de passe
                navigation.navigate('ResetPassword', { email, code: fullCode });
            } else {
                Alert.alert('Erreur', response.message || 'Code invalide ou expiré');
            }
        } catch (error) {
            console.error('Erreur:', error);
            Alert.alert('Erreur', 'Code invalide ou expiré. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setResending(true);

        try {
            await authService.forgotPassword(email);
            Alert.alert('Succès', 'Un nouveau code a été envoyé à votre adresse email.');
            // Réinitialiser le code
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (error) {
            console.error('Erreur:', error);
            Alert.alert('Erreur', 'Impossible de renvoyer le code. Veuillez réessayer.');
        } finally {
            setResending(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header avec bouton retour */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.logoContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="email-check-outline" size={60} color="#3B82F6" />
                </View>
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>Vérification du code</Text>
                <Text style={styles.description}>
                    Entrez le code à 6 chiffres envoyé à{'\n'}
                    <Text style={styles.emailText}>{email}</Text>
                </Text>

                {/* Inputs pour le code */}
                <View style={styles.codeContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={[styles.codeInput, digit && styles.codeInputFilled]}
                            value={digit}
                            onChangeText={(text) => handleCodeChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            editable={!loading}
                            selectTextOnFocus
                        />
                    ))}
                </View>

                <Button
                    mode="contained"
                    style={styles.submit}
                    contentStyle={styles.submitContent}
                    labelStyle={{ fontSize: 17, fontFamily: 'Figtree-Regular', fontWeight: "500" }}
                    onPress={handleSubmit}
                    disabled={loading || code.join('').length !== 6}
                >
                    {loading ? <ActivityIndicator color="#fff" /> : 'Vérifier le code'}
                </Button>

                {/* Renvoyer le code */}
                <View style={styles.resendContainer}>
                    <Text style={styles.resendText}>Vous n'avez pas reçu le code ?</Text>
                    <TouchableOpacity onPress={handleResendCode} disabled={resending}>
                        <Text style={[styles.resendLink, resending && styles.resendLinkDisabled]}>
                            {resending ? 'Envoi en cours...' : 'Renvoyer le code'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.backToLogin}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.backToLoginText}>Retour à la connexion</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
