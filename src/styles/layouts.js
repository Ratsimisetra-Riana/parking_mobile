/**
 * 📐 LAYOUT STYLES
 * Layouts flex et positionnement réutilisables
 */

import { StyleSheet } from 'react-native';
import { spacing } from '../theme';

export const layoutStyles = StyleSheet.create({
  // ===== FLEX LAYOUTS =====
  flex1: {
    flex: 1,
  },

  flex2: {
    flex: 2,
  },

  flex3: {
    flex: 3,
  },

  flexRow: {
    flexDirection: 'row',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  flexWrap: {
    flexWrap: 'wrap',
  },

  // ===== JUSTIFY =====
  justifyStart: {
    justifyContent: 'flex-start',
  },

  justifyCenter: {
    justifyContent: 'center',
  },

  justifyEnd: {
    justifyContent: 'flex-end',
  },

  justifyBetween: {
    justifyContent: 'space-between',
  },

  justifyAround: {
    justifyContent: 'space-around',
  },

  justifyEvenly: {
    justifyContent: 'space-evenly',
  },

  // ===== ALIGN =====
  alignStart: {
    alignItems: 'flex-start',
  },

  alignCenter: {
    alignItems: 'center',
  },

  alignEnd: {
    alignItems: 'flex-end',
  },

  alignStretch: {
    alignItems: 'stretch',
  },

  // ===== FLEX COMBINATIONS =====
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  flexRowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  flexCenterAll: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ===== POSITION =====
  absolute: {
    position: 'absolute',
  },

  relative: {
    position: 'relative',
  },

  // ===== WIDTH/HEIGHT =====
  fullWidth: {
    width: '100%',
  },

  fullHeight: {
    height: '100%',
  },

  fullSize: {
    width: '100%',
    height: '100%',
  },

  // ===== PADDING UTILITIES =====
  p0: { padding: 0 },
  p4: { padding: spacing.xs },
  p8: { padding: spacing.sm },
  p12: { padding: spacing.md },
  p16: { padding: spacing.base },
  p20: { padding: spacing.lg },
  p24: { padding: spacing.xl },

  px4: { paddingHorizontal: spacing.xs },
  px8: { paddingHorizontal: spacing.sm },
  px12: { paddingHorizontal: spacing.md },
  px16: { paddingHorizontal: spacing.base },
  px20: { paddingHorizontal: spacing.lg },

  py4: { paddingVertical: spacing.xs },
  py8: { paddingVertical: spacing.sm },
  py12: { paddingVertical: spacing.md },
  py16: { paddingVertical: spacing.base },
  py20: { paddingVertical: spacing.lg },

  // ===== MARGIN UTILITIES =====
  m0: { margin: 0 },
  m4: { margin: spacing.xs },
  m8: { margin: spacing.sm },
  m12: { margin: spacing.md },
  m16: { margin: spacing.base },
  m20: { margin: spacing.lg },
  m24: { margin: spacing.xl },

  mx4: { marginHorizontal: spacing.xs },
  mx8: { marginHorizontal: spacing.sm },
  mx12: { marginHorizontal: spacing.md },
  mx16: { marginHorizontal: spacing.base },
  mx20: { marginHorizontal: spacing.lg },

  my4: { marginVertical: spacing.xs },
  my8: { marginVertical: spacing.sm },
  my12: { marginVertical: spacing.md },
  my16: { marginVertical: spacing.base },
  my20: { marginVertical: spacing.lg },

  // ===== GAPS =====
  gap4: { gap: spacing.xs },
  gap8: { gap: spacing.sm },
  gap12: { gap: spacing.md },
  gap16: { gap: spacing.base },
  gap20: { gap: spacing.lg },
  gap24: { gap: spacing.xl },
});

export default layoutStyles;
