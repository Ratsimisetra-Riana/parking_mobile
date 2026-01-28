import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { kpiCardStyles as styles } from './KPICard.styles';
import { colors } from '../../../theme';

const KPICard = ({
    icon,
    iconColor,
    iconBgColor,
    title,
    value,
    evolution,
    subtitle,
    occupationRate,
    style
}) => {
    const isPositive = evolution >= 0;
    const showOccupation = occupationRate !== undefined;

    return (
        <View style={[styles.card, style]}>
            {/* Background Icon */}
            <View style={styles.backgroundIcon}>
                <MaterialIcons name={icon} size={48} color={iconColor} style={styles.backgroundIconOpacity} />
            </View>

            {/* Header Row */}
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
                    <MaterialIcons name={icon} size={20} color={iconColor} />
                </View>

                {evolution !== undefined && (
                    <View style={[styles.evolutionBadge, isPositive ? styles.evolutionPositive : styles.evolutionNegative]}>
                        <Ionicons
                            name={isPositive ? 'trending-up' : 'trending-down'}
                            size={14}
                            color={isPositive ? colors.status.successBright : colors.status.errorBright}
                        />
                        <Text style={[styles.evolutionText, isPositive ? styles.evolutionTextPositive : styles.evolutionTextNegative]}>
                            {isPositive ? '+' : ''}{evolution}%
                        </Text>
                    </View>
                )}
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.valueRow}>
                    <Text style={styles.value}>{value}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
            </View>

            {/* Occupation Circle (if applicable) */}
            {showOccupation && (
                <View style={styles.occupationContainer}>
                    <View style={styles.circleContainer}>
                        {/* Background Circle */}
                        <View style={styles.circleBackground} />
                        {/* Progress Circle */}
                        <View
                            style={[
                                styles.circleProgress,
                                {
                                    transform: [{ rotate: `${(occupationRate / 100) * 360}deg` }]
                                }
                            ]}
                        />
                        {/* Icon */}
                        <MaterialIcons name="local-parking" size={20} color={colors.primary.bright} style={styles.circleIcon} />
                    </View>
                </View>
            )}
        </View>
    );
};

export default KPICard;
