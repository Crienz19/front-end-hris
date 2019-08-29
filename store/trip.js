export const state = () => ({
    trips: []
});

export const getters = {
    getTrips (state) {
        return state.trips;
    }
};

export const mutations = {
    SET_TRIPS (state, trips) {
        state.trips = trips;
    }
};

export const actions = {
    async loadSuperTrips ({ commit }) {
        let {data} = await this.$axios.$get('/sa/trips');
        commit('SET_TRIPS', data);
    },
    async loadHrTrips ({ commit }) {
        let {data} = await this.$axios.$get('/hr/trips');
        commit('SET_TRIPS', data);
    },
    async storeSuperTrip ({ dispatch }, payload) {
        await this.$axios.$post('/sa/trips', payload);
        dispatch('loadSuperTrips');
    },
    async updateSuperTrp ({ dispatch }, payload) {
        await this.$axios.$patch(`/sa/trips/${payload.id}`, payload);
        dispatch('loadSuperTrips');
    },
    async deleteSuperTrip ({ dispatch }, payload) {
        await this.$axios.$delete(`/sa/trips/${payload.id}`);
        dispatch('loadSuperTrips');
    },
    async loadEmployeeTrips ({ commit }) {
        let {data} = await this.$axios.$get('/em/trips');
        commit('SET_TRIPS', data);
    },
    async storeEmployeeTrip ({ dispatch }, payload) {
        await this.$axios.$post('/em/trips', payload);
        dispatch('loadEmployeeTrips');
    },
    async updateEmployeeTrip ({ dispatch }, payload) {
        await this.$axios.$patch(`/em/trips/${payload.id}`, payload);
        dispatch('loadEmployeeTrips');
    },
    async deleteEmployeeTrip ({ dispatch }, payload) {
        await this.$axios.$delete(`/em/trips/${payload.id}`);
        dispatch('loadEmployeeTrips');
    }
}