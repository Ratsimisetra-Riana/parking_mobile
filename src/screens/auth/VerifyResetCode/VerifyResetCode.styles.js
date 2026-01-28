import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../theme';

export const verifyResetCodeStyles = StyleSheet.create({
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
        backgroundColor: '#EBF5FF',
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

    emailText: {
        fontWeight: 'bold',
        color: '#333',
    },

    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.xl2,
        marginBottom: spacing.lg,
        paddingHorizontal: spacing.sm,
    },

    codeInput: {
        width: 48,
        height: 56,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderRadius: radius.lg,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Figtree-Regular',
        backgroundColor: '#F9F9F9',
    },

    codeInputFilled: {
        borderColor: '#3B82F6',
        backgroundColor: '#EBF5FF',
    },

    submit: {
        marginTop: spacing.lg,
        height: 60,
        borderRadius: radius.xl2,
    },

    submitContent: {
        height: 60,
        justifyContent: 'center',
    },

    resendContainer: {
        marginTop: spacing.xl2,
        alignItems: 'center',
    },

    resendText: {
        fontSize: 14,
        fontFamily: 'Figtree-Regular',
        color: '#666',
    },

    resendLink: {
        fontSize: 15,
        fontFamily: 'Figtree-Regular',
        color: '#3B82F6',
        fontWeight: '600',
        marginTop: spacing.xs,
    },

    resendLinkDisabled: {
        color: '#999',
    },

    backToLogin: {
        marginTop: spacing.xl3,
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
