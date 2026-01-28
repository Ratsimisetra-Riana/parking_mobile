import api from '../config/api';

/**
 * Service pour gérer les appels API du dashboard owner
 */
export const dashboardService = {
    /**
     * Récupère les données complètes du dashboard pour un propriétaire
     * @param {number} ownerId - ID du propriétaire
     * @returns {Promise<Object>} Données du dashboard
     */
    async getOwnerDashboard(ownerId) {
        try {
            const response = await api.get(`/owner-dashboard/${ownerId}`);

            console.log('✅ Dashboard API response:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Erreur getDashboard:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Erreur lors du chargement du dashboard');
        }
    },

    /**
     * Récupère les statistiques de commissions
     * @param {string} startDate - Date de début (format: YYYY-MM-DD)
     * @param {string} endDate - Date de fin (format: YYYY-MM-DD)
     * @returns {Promise<Object>} Statistiques des commissions
     */
    async getCommissionStatistics(startDate, endDate) {
        try {
            const params = {};
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;

            const response = await api.get('/dashboard/commissions', { params });

            return response.data;
        } catch (error) {
            console.error('❌ Erreur getCommissionStatistics:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Erreur lors du chargement des commissions');
        }
    },

    /**
     * Récupère les réservations par statut
     * @param {string} startDate - Date de début (format: YYYY-MM-DD)
     * @param {string} endDate - Date de fin (format: YYYY-MM-DD)
     * @returns {Promise<Object>} Réservations par statut
     */
    async getReservationsByStatus(startDate, endDate) {
        try {
            const params = {};
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;

            const response = await api.get('/dashboard/reservations/status', { params });

            return response.data;
        } catch (error) {
            console.error('❌ Erreur getReservationsByStatus:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Erreur lors du chargement des réservations');
        }
    },

    /**
     * Récupère le top des parkings par nombre de réservations
     * @param {number} limit - Nombre de parkings à récupérer
     * @returns {Promise<Array>} Top parkings
     */
    async getTopParkingsByReservations(limit = 10) {
        try {
            const response = await api.get('/dashboard/parkings/top-reservations', {
                params: { limit },
            });

            return response.data;
        } catch (error) {
            console.error('❌ Erreur getTopParkingsByReservations:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Erreur lors du chargement du top parkings');
        }
    },

    /**
     * Récupère les statistiques des utilisateurs actifs
     * @param {string} startDate - Date de début (format: YYYY-MM-DD)
     * @param {string} endDate - Date de fin (format: YYYY-MM-DD)
     * @returns {Promise<Object>} Statistiques utilisateurs actifs
     */
    async getActiveUsersStatistics(startDate, endDate) {
        try {
            const params = {};
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;

            const response = await api.get('/dashboard/users/active', { params });

            return response.data;
        } catch (error) {
            console.error('❌ Erreur getActiveUsersStatistics:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Erreur lors du chargement des utilisateurs actifs');
        }
    },
};
