import React, { useState } from "react";
import { View, Text, TextInput, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import { authService } from "../../../services";
import { resetPasswordStyles as styles } from './ResetPassword.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ResetPassword({ navigation, route }) {
    const { email, code } = route.params || {};
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async () => {
        // Validations
        if (!newPassword.trim()) {
            Alert.alert('Erreur', 'Veuillez entrer un nouveau mot de passe');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
            return;
        }

        setLoading(true);

        try {
            const response = await authService.resetPassword(email, code, newPassword);

            console.log('Réponse reset-password:', response);

            if (response.success) {
                Alert.alert(
                    'Succès',
                    'Votre mot de passe a été réinitialisé avec succès.',
                    [
                        {
                            text: 'Se connecter',
                            onPress: () => navigation.navigate('Login')
                        }
                    ]
                );
            } else {
                Alert.alert('Erreur', response.message || 'Erreur lors de la réinitialisation');
            }
        } catch (error) {
            console.error('Erreur:', error);

            if (error.response?.data?.message) {
                Alert.alert('Erreur', error.response.data.message);
            } else {
                Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
            }
        } finally {
            setLoading(false);
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
                    <Icon name="lock-reset" size={60} color="#10B981" />
                </View>
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>Nouveau mot de passe</Text>
                <Text style={styles.description}>
                    Créez un nouveau mot de passe sécurisé pour votre compte
                </Text>

                <View style={styles.inputContainer}>
                    {/* Nouveau mot de passe */}
                    <View style={styles.inputWrapper}>
                        <Icon name="lock-outline" size={22} color="#666" style={styles.inputIcon} />
                        <TextInput
                            placeholder="Nouveau mot de passe"
                            style={styles.input}
                            secureTextEntry={!showPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            editable={!loading}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Icon
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={22}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Confirmation */}
                    <View style={styles.inputWrapper}>
                        <Icon name="lock-check-outline" size={22} color="#666" style={styles.inputIcon} />
                        <TextInput
                            placeholder="Confirmer le mot de passe"
                            style={styles.input}
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            editable={!loading}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Icon
                                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                size={22}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Indicateurs de force du mot de passe */}
                <View style={styles.strengthContainer}>
                    <View style={styles.strengthItem}>
                        <Icon
                            name={newPassword.length >= 6 ? "check-circle" : "circle-outline"}
                            size={16}
                            color={newPassword.length >= 6 ? "#10B981" : "#999"}
                        />
                        <Text style={[styles.strengthText, newPassword.length >= 6 && styles.strengthTextValid]}>
                            Au moins 6 caractères
                        </Text>
                    </View>
                    <View style={styles.strengthItem}>
                        <Icon
                            name={newPassword === confirmPassword && confirmPassword ? "check-circle" : "circle-outline"}
                            size={16}
                            color={newPassword === confirmPassword && confirmPassword ? "#10B981" : "#999"}
                        />
                        <Text style={[styles.strengthText, (newPassword === confirmPassword && confirmPassword) && styles.strengthTextValid]}>
                            Les mots de passe correspondent
                        </Text>
                    </View>
                </View>

                <Button
                    mode="contained"
                    style={styles.submit}
                    contentStyle={styles.submitContent}
                    labelStyle={{ fontSize: 17, fontFamily: 'Figtree-Regular', fontWeight: "500" }}
                    onPress={handleSubmit}
                    disabled={loading || newPassword.length < 6 || newPassword !== confirmPassword}
                >
                    {loading ? <ActivityIndicator color="#fff" /> : 'Réinitialiser le mot de passe'}
                </Button>

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
