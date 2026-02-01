import React, { useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabaseImageStyles as styles } from './SupabaseImage.styles';
import { colors } from '../../../theme';

/**
 * Composant Image optimisé pour Supabase Storage
 * Utilise FastImage pour une meilleure gestion des certificats SSL et du cache
 */
const SupabaseImage = ({ uri, style, resizeMode = 'cover', placeholder, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = () => {
    console.log(' Chargement SupabaseImage:', uri);
    setLoading(true);
    setError(false);
  };

  const handleLoad = () => {
    console.log(' SupabaseImage chargée:', uri);
    setLoading(false);
    setError(false);
  };

  const handleError = (e) => {
    console.error('Erreur: Erreur SupabaseImage:', uri, e);
    setLoading(false);
    setError(true);
  };

  if (error) {
    return (
      <View style={[styles.errorContainer, style]}>
        <Ionicons name="image-outline" size={40} color={colors.text.gray.slate.medium} />
        <Text style={styles.errorText}>Image non disponible</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <FastImage
        {...props}
        source={{
          uri: uri,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        style={[StyleSheet.absoluteFill, style]}
        resizeMode={FastImage.resizeMode[resizeMode] || FastImage.resizeMode.cover}
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        onError={handleError}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.primary.forest} />
        </View>
      )}
    </View>
  );
};

export default SupabaseImage;
