import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

export const notificationItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.white,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.border.light,
        marginTop: -1, // Pour éviter les doubles bordures
    },

    unreadContainer: {
        backgroundColor: `${colors.primary.bright}05`,
    },

    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },

    content: {
        flex: 1,
        gap: 2,
    },

    title: {
        fontSize: typography.fontSize.sm,
        fontFamily: 'Figtree-SemiBold',
        color: colors.text.gray.slate.darkest,
    },

    unreadTitle: {
        fontFamily: 'Figtree-Bold',
    },

    message: {
        fontSize: typography.fontSize.xs,
        fontFamily: 'Figtree-Regular',
        color: colors.text.gray.slate.dark,
    },

    timeContainer: {
        alignItems: 'flex-end',
        gap: spacing.xs,
        flexShrink: 0,
    },

    time: {
        fontSize: typography.fontSize.xs,
        fontFamily: 'Figtree-Medium',
        color: colors.text.gray.slate.light,
    },

    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary.bright,
    },
});
