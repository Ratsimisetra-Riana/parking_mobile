/**
 *  PARKING CARD STYLES
 * Styles pour le composant ParkingCard
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius, shadows } from '../../../theme';

export const parkingCardStyles = StyleSheet.create({
  card: {
    width: 220,
    marginRight: spacing.lg,
    backgroundColor: colors.background.white,
    borderRadius: radius.lg,
    ...shadows.card,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.lg2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  address: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
    marginLeft: spacing.xs,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  price: {
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.dark,
    fontSize: typography.fontSize.lg,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: spacing.xs,
    fontSize: typography.fontSize.md2,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default parkingCardStyles;
