import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { reviewCardStyles as styles } from './ReviewCard.styles';
import { colors } from '../../../theme';

/**
 * Composant d'affichage d'un avis/note
 * @param {Object} review - Données de l'avis
 * @param {string} review.userName - Nom de l'utilisateur
 * @param {number} review.note - Note de 1 à 5
 * @param {boolean} review.cleanliness - Critère propreté
 * @param {boolean} review.precision - Critère précision
 * @param {boolean} review.communication - Critère communication
 * @param {boolean} review.security - Critère sécurité
 * @param {string} review.description - Commentaire
 * @param {string} review.createdAt - Date de création
 * @param {boolean} compact - Affichage compact (moins de détails)
 */
export default function ReviewCard({ review, compact = false }) {
  // Formater la date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return 'Date inconnue';
    }
  };

  // Rendu des étoiles
  const renderStars = (note) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= note ? 'star' : 'star-outline'}
            size={compact ? 14 : 16}
            color={star <= note ? colors.primary.bright : colors.border.medium}
          />
        ))}
      </View>
    );
  };

  // Critères actifs
  const getCriteria = () => {
    const criteria = [];
    if (review.cleanliness) criteria.push({ key: 'cleanliness', label: 'Propreté', icon: 'sparkles-outline' });
    if (review.precision) criteria.push({ key: 'precision', label: 'Précision', icon: 'map-outline' });
    if (review.communication) criteria.push({ key: 'communication', label: 'Communication', icon: 'chatbubble-outline' });
    if (review.security) criteria.push({ key: 'security', label: 'Sécurité', icon: 'shield-checkmark-outline' });
    return criteria;
  };

  const activeCriteria = getCriteria();

  // Avatar placeholder (première lettre du nom)
  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      {/* Header: Avatar + Nom + Note + Date */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(review.userName)}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{review.userName || 'Utilisateur'}</Text>
            <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
          </View>
        </View>
        <View style={styles.ratingBadge}>
          {renderStars(review.note)}
        </View>
      </View>

      {/* Critères (si pas compact et s'il y en a) */}
      {!compact && activeCriteria.length > 0 && (
        <View style={styles.criteriaContainer}>
          {activeCriteria.map((criterion) => (
            <View key={criterion.key} style={styles.criteriaBadge}>
              <Ionicons name={criterion.icon} size={12} color={colors.text.darkGreen} />
              <Text style={styles.criteriaText}>{criterion.label}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Commentaire */}
      {review.description && review.description.trim() !== '' && (
        <Text 
          style={[styles.comment, compact && styles.commentCompact]}
          numberOfLines={compact ? 2 : undefined}
        >
          {review.description}
        </Text>
      )}
    </View>
  );
}

/**
 * Composant pour afficher le résumé des notes (moyenne + total)
 */
export function RatingSummary({ average, total, size = 'normal' }) {
  const isSmall = size === 'small';
  
  return (
    <View style={[styles.summaryContainer, isSmall && styles.summaryContainerSmall]}>
      <Ionicons 
        name="star" 
        size={isSmall ? 16 : 20} 
        color={colors.primary.bright} 
      />
      <Text style={[styles.summaryAverage, isSmall && styles.summaryAverageSmall]}>
        {average > 0 ? average.toFixed(1) : '-'}
      </Text>
      <Text style={[styles.summaryTotal, isSmall && styles.summaryTotalSmall]}>
        ({total} avis)
      </Text>
    </View>
  );
}

/**
 * Composant placeholder quand il n'y a pas d'avis
 */
export function NoReviewsPlaceholder() {
  return (
    <View style={styles.noReviewsContainer}>
      <Ionicons name="chatbubble-outline" size={48} color={colors.border.medium} />
      <Text style={styles.noReviewsTitle}>Aucun avis</Text>
      <Text style={styles.noReviewsText}>
        Ce parking n'a pas encore reçu d'avis.
      </Text>
    </View>
  );
}

