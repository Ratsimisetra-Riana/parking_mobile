import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

export const weeklyChartStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border.light,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: spacing.md,
    },

    subtitle: {
        fontSize: typography.fontSize.sm,
        fontFamily: 'Figtree-Medium',
        color: colors.text.gray.slate.dark,
        marginBottom: 4,
    },

    totalValue: {
        fontSize: typography.fontSize.xxl,
        fontFamily: 'Figtree-Bold',
        color: colors.text.gray.slate.darkest,
    },

    evolutionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 8,
    },

    evolutionPositive: {
        backgroundColor: `${colors.status.successBright}20`,
    },

    evolutionNegative: {
        backgroundColor: `${colors.status.errorBright}20`,
    },

    evolutionLabel: {
        fontSize: typography.fontSize.xs,
        fontFamily: 'Figtree-Medium',
    },

    evolutionLabelPositive: {
        color: colors.status.successBright,
    },

    evolutionLabelNegative: {
        color: colors.status.errorBright,
    },

    evolutionValue: {
        fontSize: typography.fontSize.xs,
        fontFamily: 'Figtree-Bold',
    },

    evolutionValuePositive: {
        color: colors.status.successBright,
    },

    evolutionValueNegative: {
        color: colors.status.errorBright,
    },

    chartContainer: {
        width: '100%',
        height: 160,
        marginTop: spacing.sm,
    },

    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xs,
        paddingTop: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: `${colors.border.light}80`,
    },

    dayLabel: {
        fontSize: typography.fontSize.xs,
        fontFamily: 'Figtree-Medium',
        color: colors.text.gray.slate.light,
    },
});
