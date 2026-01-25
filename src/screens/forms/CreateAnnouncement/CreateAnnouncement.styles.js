/**
 *  CREATE ANNOUNCEMENT STYLES
 * Styles pour l'écran de création d'annonce
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../../../theme';

export const createAnnouncementStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.lightGray3,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.white,
  },
  
  loadingText: {
    marginTop: spacing.base,
    fontSize: typography.fontSize.base,
    color: colors.text.gray.medium,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.medium,
  },
  
  backButton: {
    padding: spacing.xs2,
  },
  
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    padding: spacing.lg,
  },
  
  section: {
    marginBottom: spacing.xl,
  },
  
  sectionTitle: {
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    marginBottom: spacing.xs2,
  },
  
  sectionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.medium,
    marginBottom: spacing.base,
  },
  
  emptyParkings: {
    alignItems: 'center',
    paddingVertical: spacing.xl2,
    backgroundColor: colors.background.lightGray2,
    borderRadius: radius.base,
  },
  
  emptyText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.gray.dark,
    marginTop: spacing.base,
  },
  
  emptySubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.slate.medium,
    marginTop: spacing.xs2,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  
  parkingList: {
    gap: spacing.base,
  },
  
  parkingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    borderWidth: 2,
    borderColor: colors.border.medium,
  },
  
  parkingOptionSelected: {
    borderColor: colors.primary.dark,
    backgroundColor: colors.primary.light,
  },
  
  parkingOptionText: {
    marginLeft: spacing.base,
    fontSize: typography.fontSize.base,
    color: colors.text.gray.dark,
    fontWeight: typography.fontWeight.medium,
  },
  
  parkingOptionTextSelected: {
    color: colors.secondary.green,
    fontWeight: typography.fontWeight.semibold,
  },
  
  textArea: {
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    borderWidth: 1,
    borderColor: colors.border.medium,
    padding: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text.dark,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  
  vehiclesGrid: {
    gap: spacing.base,
  },
  
  vehicleCard: {
    gap: spacing.sm,
  },
  
  vehicleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    borderWidth: 2,
    borderColor: colors.border.medium,
  },
  
  vehicleButtonSelected: {
    backgroundColor: colors.primary.dark,
    borderColor: colors.primary.dark,
  },
  
  vehicleButtonText: {
    marginLeft: spacing.base,
    fontSize: typography.fontSize.base,
    color: colors.text.dark,
    fontWeight: typography.fontWeight.medium,
  },
  
  vehicleButtonTextSelected: {
    color: colors.text.white,
    fontWeight: typography.fontWeight.semibold,
  },
  
  vehicleCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 52,
  },
  
  vehicleCountLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.medium,
    marginRight: spacing.sm,
  },
  
  vehicleCountInput: {
    backgroundColor: colors.background.white,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border.gray,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xs2,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.dark,
    width: 60,
    textAlign: 'center',
  },
  
  vehicleCountMax: {
    fontSize: typography.fontSize.sm,
    color: colors.text.gray.slate.medium,
    marginLeft: spacing.xs2,
  },
  
  availabilityTypeToggle: {
    flexDirection: 'row',
    gap: spacing.base,
  },
  
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    borderWidth: 2,
    borderColor: colors.border.medium,
  },
  
  typeButtonActive: {
    backgroundColor: colors.primary.dark,
    borderColor: colors.primary.dark,
  },
  
  typeButtonText: {
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.primary.dark,
    fontWeight: typography.fontWeight.semibold,
  },
  
  typeButtonTextActive: {
    color: colors.text.white,
  },
  
  scheduleRow: {
    marginBottom: spacing.base,
    padding: spacing.base,
    backgroundColor: colors.background.white,
    borderRadius: radius.base,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  scheduleLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.dark,
  },
  
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.base,
  },
  
  hourInput: {
    flex: 1,
    backgroundColor: colors.background.lightGray3,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border.gray,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text.dark,
    textAlign: 'center',
  },
  
  hourSeparator: {
    marginHorizontal: spacing.base,
    fontSize: typography.fontSize.xl2,
    color: colors.text.gray.medium,
    fontWeight: typography.fontWeight.bold,
  },
  
  footer: {
    padding: spacing.base,
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.medium,
  },
  
  footerButton: {
    paddingVertical: spacing.base,
    borderRadius: radius.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  publishButton: {
    backgroundColor: colors.primary.dark,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  
  publishButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
});
