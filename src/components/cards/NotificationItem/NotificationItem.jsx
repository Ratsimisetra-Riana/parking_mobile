import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { notificationItemStyles as styles } from './NotificationItem.styles';
import { colors } from '../../../theme';

const NotificationItem = ({ notification, onPress }) => {
    const { title, message, tempsRelatif, type, read } = notification;

    // Déterminer l'icône et la couleur selon le type
    const getIconConfig = () => {
        switch (type) {
            case 'reservation':
            case 'confirmed':
                return { name: 'check-circle', color: colors.status.successBright, bgColor: `${colors.status.successBright}20` };
            case 'payment':
                return { name: 'payments', color: colors.accent.blue, bgColor: `${colors.accent.blue}20` };
            case 'warning':
            case 'maintenance':
                return { name: 'warning', color: colors.status.warningBright, bgColor: `${colors.status.warningBright}20` };
            case 'cancelled':
                return { name: 'cancel', color: colors.status.errorBright, bgColor: `${colors.status.errorBright}20` };
            default:
                return { name: 'notifications', color: colors.primary.bright, bgColor: `${colors.primary.bright}20` };
        }
    };

    const iconConfig = getIconConfig();

    return (
        <TouchableOpacity
            style={[styles.container, !read && styles.unreadContainer]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Icon */}
            <View style={[styles.iconContainer, { backgroundColor: iconConfig.bgColor }]}>
                <MaterialIcons name={iconConfig.name} size={20} color={iconConfig.color} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={[styles.title, !read && styles.unreadTitle]} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.message} numberOfLines={1}>
                    {message}
                </Text>
            </View>

            {/* Time */}
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{tempsRelatif}</Text>
                {!read && <View style={styles.unreadDot} />}
            </View>
        </TouchableOpacity>
    );
};

export default NotificationItem;
