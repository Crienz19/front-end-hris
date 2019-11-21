export const state = () => ({
    trips: []
});

export const getters = {
    getTrips (state) {
        return state.trips;
    },
    getTripsByUserId: (state) => (id) => {
        return state.trips.filter(t => t.user_id === id);
    }
};

export const mutations = {
    SET_TRIPS (state, trips) {
        state.trips = trips;
    },
    ADD_TRIP (state, trip) {
        state.trips.unshift(trip);
    },
    UPDATE_TRIP (state, trip) {
        state.trips.forEach(e => {
            if (e.id == trip.id) {
                state.trips.splice(state.trips.indexOf(e), 1, trip);
            }
        })
    },
    DELETE_TRIP (state, trip) {
        state.trips.forEach(e => {
            if (e.id == trip) {
                state.trips.splice(state.trips.indexOf(e), 1);
            }
        })
    }
};

export const actions = {
    async load ({ commit }) {
        let data = await this.$axios.$get('/trips');
        commit('SET_TRIPS', data);
    },
    async save ({ commit }, payload) {
        let data = await this.$axios.$post('/trips', payload);
        commit('ADD_TRIP', data);
    },
    async update ({ commit }, payload) {
        let data = await this.$axios.$patch(`/trips/${payload.id}`, payload);
        commit('UPDATE_TRIP', data);
    },
    async delete ({ commit }, payload) {
        let data = await this.$axios.$delete(`/trips/${payload}`);
        commit('DELETE_TRIP', data);
    },
    async acknowledge ({ commit }, payload) {
        let data = await this.$axios.$post(`/trips/${payload.id}/acknowledgeTrip`);
        commit('UPDATE_TRIP', data);
    }
}