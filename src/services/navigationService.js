/**
 * Service de navigation global
 * Permet de naviguer depuis n'importe où dans l'app (même en dehors des composants React)
 * Utilisé notamment pour la navigation depuis les notifications push
 */

import { createNavigationContainerRef } from '@react-navigation/native';

// Référence globale au NavigationContainer
export const navigationRef = createNavigationContainerRef();

/**
 * Naviguer vers un écran depuis n'importe où
 * @param {string} name - Nom de l'écran
 * @param {object} params - Paramètres de navigation
 */
export const navigate = (name, params) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    } else {
        console.warn(' Navigation non prête, impossible de naviguer vers:', name);
    }
};

/**
 * Naviguer en fonction du type de notification
 * @param {object} data - Données de la notification (remoteMessage.data)
 */
export const navigateFromNotification = (data) => {
    if (!data || !data.type) {
        console.log('️ Notification sans type, navigation vers Notifications');
        navigate('Notifications');
        return;
    }

    const { type, requestId, disputeId, reservationId, parkingId } = data;

    console.log('🔔 Navigation depuis notification:', type);

    switch (type) {
        // ============== NOTIFICATIONS POUR LE LOCATAIRE ==============

        case 'reservation_accepted':
            // Demande acceptée -> aller finaliser le paiement
            if (requestId) {
                navigate('PaymentFinalization', { requestId: parseInt(requestId) });
            } else {
                navigate('Notifications');
            }
            break;

        case 'reservation_rejected':
            // Demande refusée -> voir mes réservations/demandes
            navigate('Mes réservations');
            break;

        case 'payment_confirmed':
            // Paiement confirmé -> voir mes réservations
            navigate('Mes réservations');
            break;

        case 'reservation_reminder':
            // Rappel de réservation -> voir mes réservations
            navigate('Mes réservations');
            break;

        // ============== NOTIFICATIONS POUR LE PROPRIÉTAIRE ==============

        case 'reservation_request':
        case 'new_request':
            // Nouvelle demande de réservation -> gérer les demandes
            navigate('ReservationRequests');
            break;

        case 'payment_received':
            // Paiement reçu -> voir mes demandes
            navigate('ReservationRequests');
            break;

        case 'dispute':
        case 'new_dispute':
            // Nouveau litige -> voir mes litiges
            navigate('MyDisputes');
            break;

        // ============== NOTIFICATIONS SYSTÈME ==============

        case 'system':
        case 'announcement':
        default:
            // Par défaut, aller à l'écran des notifications
            navigate('Notifications');
            break;
    }
};

export default {
    navigationRef,
    navigate,
    navigateFromNotification,
};
