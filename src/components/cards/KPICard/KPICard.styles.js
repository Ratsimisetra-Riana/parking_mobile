import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

export const kpiCardStyles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border.light,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        position: 'relative',
        overflow: 'hidden',
    },

    backgroundIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: spacing.sm,
    },

    backgroundIconOpacity: {
        opacity: 0.1,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
        zIndex: 10,
    },

    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    evolutionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
    },

    evolutionPositive: {
        backgroundColor: `${colors.status.successBright}20`,
    },

    evolutionNegative: {
        backgroundColor: `${colors.status.errorBright}20`,
    },

    evolutionText: {
        fontSize: typography.fontSize.xs,
        fontFamily: 'Figtree-Bold',
    },

    evolutionTextPositive: {
        color: colors.status.successBright,
    },

    evolutionTextNegative: {
        color: colors.status.errorBright,
    },

    content: {
        zIndex: 10,
    },

    title: {
        fontSize: typography.fontSize.xs,
        fontFamily: 'Figtree-Medium',
        color: colors.text.gray.slate.dark,
        marginBottom: 4,
    },

    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: spacing.xs,
    },

    value: {
        fontSize: typography.fontSize.xl,
        fontFamily: 'Figtree-Bold',
        color: colors.text.gray.slate.darkest,
    },

    subtitle: {
        fontSize: typography.fontSize.xs,
        fontFamily: 'Figtree-Regular',
        color: colors.text.gray.slate.light,
    },

    occupationContainer: {
        position: 'absolute',
        right: spacing.md,
        top: '50%',
        transform: [{ translateY: -24 }],
    },

    circleContainer: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    circleBackground: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 4,
        borderColor: colors.border.light,
    },

    circleProgress: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 4,
        borderColor: colors.primary.bright,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
    },

    circleIcon: {
        zIndex: 10,
    },
});
