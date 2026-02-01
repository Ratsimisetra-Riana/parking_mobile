import React, { useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabaseImageStyles as styles } from './SupabaseImage.styles';
import { colors } from '../../../theme';

/**
 * Composant Image optimisé pour Supabase Storage
 * Utilise expo-image pour une meilleure gestion du cache et des performances
 */
const SupabaseImage = ({ uri, style, resizeMode = 'cover', placeholder, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = () => {
    console.log('🔄 Chargement SupabaseImage:', uri);
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

  // Mapping resizeMode pour expo-image (contentFit)
  const contentFitMap = {
    cover: 'cover',
    contain: 'contain',
    stretch: 'fill',
    center: 'none',
  };

  return (
    <View style={[styles.container, style]}>
      <Image
        {...props}
        source={{ uri: uri }}
        style={[StyleSheet.absoluteFill, style]}
        contentFit={contentFitMap[resizeMode] || 'cover'}
        cachePolicy="disk"
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        onError={handleError}
        transition={200}
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
