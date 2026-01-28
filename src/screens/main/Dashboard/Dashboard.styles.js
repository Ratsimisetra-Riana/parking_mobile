import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

export const dashboardStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.light,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.light,
    },

    loadingText: {
        marginTop: spacing.md,
        fontSize: typography.fontSize.md,
        color: colors.text.gray.slate.dark,
        fontFamily: 'Figtree-Regular',
    },

    errorContainer: {
        flex: 1,
        backgroundColor: colors.background.light,
    },

    errorContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },

    errorTitle: {
        fontSize: typography.fontSize.xl,
        fontFamily: 'Figtree-Bold',
        color: colors.text.gray.slate.darkest,
        marginTop: spacing.md,
    },

    errorMessage: {
        fontSize: typography.fontSize.md,
        fontFamily: 'Figtree-Regular',
        color: colors.text.gray.slate.dark,
        textAlign: 'center',
        marginTop: spacing.sm,
    },

    retryButton: {
        marginTop: spacing.lg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        backgroundColor: colors.primary.bright,
        borderRadius: 12,
    },

    retryButtonText: {
        fontSize: typography.fontSize.md,
        fontFamily: 'Figtree-SemiBold',
        color: colors.text.dark,
    },

    scrollView: {
        flex: 1,
    },

    kpiSection: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
    },

    kpiRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },

    kpiCardHalf: {
        flex: 1,
    },

    kpiCardFull: {
        width: '100%',
    },

    chartSection: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
    },

    notificationsSection: {
        paddingBottom: spacing.md,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.sm,
    },

    sectionTitle: {
        fontSize: typography.fontSize.lg,
        fontFamily: 'Figtree-Bold',
        color: colors.text.gray.slate.darkest,
    },

    seeAllButton: {
        fontSize: typography.fontSize.sm,
        fontFamily: 'Figtree-SemiBold',
        color: colors.primary.bright,
    },

    emptyNotifications: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xl * 2,
    },

    emptyText: {
        marginTop: spacing.md,
        fontSize: typography.fontSize.md,
        fontFamily: 'Figtree-Regular',
        color: colors.text.gray.slate.light,
    },

    bottomSpacer: {
        height: 100,
    },
});
