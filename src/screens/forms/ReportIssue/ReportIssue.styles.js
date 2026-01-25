/**
 *  REPORT ISSUE STYLES
 * Styles pour l'écran de signalement de litige
 */

import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../../../theme';

const { width } = Dimensions.get('window');

export const reportIssueStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.greenLight,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.greenLight,
  },

  loadingText: {
    marginTop: spacing.base,
    fontSize: typography.fontSize.base,
    color: colors.text.gray.medium,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    backgroundColor: colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.lightGray2,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    textAlign: 'center',
    marginRight: 40, // Compenser le bouton retour
  },

  // Content
  content: {
    flex: 1,
    padding: spacing.base,
    paddingBottom: 100, // Espace pour le bouton sticky
  },

  // Reservation Card
  sectionLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.gray.medium,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },

  reservationCard: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.background.white,
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginBottom: spacing.lg,
    ...shadows.small,
  },

  reservationInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xs,
  },

  reservationTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },

  reservationDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },

  reservationDate: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.gray.dark,
  },

  reservationLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },

  reservationLocation: {
    fontSize: typography.fontSize.xs,
    color: colors.text.gray.medium,
  },

  reservationImage: {
    width: 80,
    height: 80,
    borderRadius: radius.base,
    backgroundColor: colors.background.lightGray,
  },

  // Form Fields
  fieldContainer: {
    marginBottom: spacing.lg,
  },

  fieldLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.dark,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },

  // Dropdown
  dropdownContainer: {
    position: 'relative',
  },

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.background.lightGray2,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    minHeight: 56,
  },

  dropdownFocused: {
    borderColor: colors.primary.bright,
    borderWidth: 2,
  },

  dropdownText: {
    fontSize: typography.fontSize.base,
    color: colors.text.dark,
    flex: 1,
  },

  dropdownPlaceholder: {
    fontSize: typography.fontSize.base,
    color: colors.text.gray.medium,
    flex: 1,
  },

  // Dropdown Modal
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: spacing.lg,
  },

  dropdownModal: {
    backgroundColor: colors.background.white,
    borderRadius: radius.lg,
    padding: spacing.base,
    maxHeight: '60%',
  },

  dropdownModalTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    marginBottom: spacing.base,
    textAlign: 'center',
  },

  dropdownOption: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.lightGray2,
  },

  dropdownOptionSelected: {
    backgroundColor: colors.background.greenLight,
    borderRadius: radius.base,
  },

  dropdownOptionText: {
    fontSize: typography.fontSize.base,
    color: colors.text.dark,
  },

  dropdownOptionTextSelected: {
    color: colors.primary.bright,
    fontWeight: typography.fontWeight.semibold,
  },

  // Textarea
  textarea: {
    backgroundColor: colors.background.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.background.lightGray2,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    fontSize: typography.fontSize.base,
    color: colors.text.dark,
    minHeight: 140,
    textAlignVertical: 'top',
  },

  textareaFocused: {
    borderColor: colors.primary.bright,
    borderWidth: 2,
  },

  // Photos Section
  photosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },

  optionalBadge: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.gray.medium,
    backgroundColor: colors.background.lightGray,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },

  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  photoItem: {
    width: (width - spacing.base * 2 - spacing.sm * 2) / 3,
    aspectRatio: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.background.lightGray2,
  },

  photoImage: {
    width: '100%',
    height: '100%',
  },

  photoDeleteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addPhotoButton: {
    width: (width - spacing.base * 2 - spacing.sm * 2) / 3,
    aspectRatio: 1,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.text.gray.light,
    backgroundColor: colors.background.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
  },

  addPhotoIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.background.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },

  addPhotoText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.gray.medium,
  },

  // Sticky Footer
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.white,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.background.lightGray2,
    ...shadows.medium,
  },

  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary.bright,
    borderRadius: radius.lg,
    paddingVertical: spacing.base,
    ...shadows.small,
  },

  submitButtonDisabled: {
    backgroundColor: colors.text.gray.light,
  },

  submitButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },

  // Error state
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.error.main,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
