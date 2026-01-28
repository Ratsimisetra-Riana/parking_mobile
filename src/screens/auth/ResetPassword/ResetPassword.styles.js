import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../theme';

export const resetPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.xl2,
        backgroundColor: colors.background.white,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },

    backButton: {
        padding: spacing.xs,
    },

    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: spacing.lg,
        marginTop: spacing.xl2,
    },

    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ECFDF5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 28,
        fontFamily: 'Figtree-Regular',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    description: {
        fontSize: 16,
        marginTop: spacing.sm,
        fontFamily: 'Figtree-Regular',
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },

    inputContainer: {
        marginTop: spacing.xl2,
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.text.black,
        borderRadius: radius.lg2,
        paddingHorizontal: spacing.sm,
        marginVertical: spacing.sm,
        height: 60,
    },

    inputIcon: {
        marginRight: spacing.sm,
    },

    input: {
        flex: 1,
        height: 60,
        fontFamily: 'Figtree-Regular',
        fontSize: 16,
    },

    strengthContainer: {
        marginTop: spacing.lg,
        paddingHorizontal: spacing.sm,
    },

    strengthItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },

    strengthText: {
        marginLeft: spacing.xs,
        fontSize: 14,
        fontFamily: 'Figtree-Regular',
        color: '#999',
    },

    strengthTextValid: {
        color: '#10B981',
    },

    submit: {
        marginTop: spacing.xl2,
        height: 60,
        borderRadius: radius.xl2,
        backgroundColor: '#10B981',
    },

    submitContent: {
        height: 60,
        justifyContent: 'center',
    },

    backToLogin: {
        marginTop: spacing.xl2,
        alignItems: 'center',
    },

    backToLoginText: {
        fontSize: 16,
        fontFamily: 'Figtree-Regular',
        color: '#3B82F6',
        fontWeight: '500',
    },

    body: {
        marginTop: spacing.base,
    },
});
