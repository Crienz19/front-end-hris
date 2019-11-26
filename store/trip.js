import Swal from "sweetalert2";

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
    async loadFiltered ({ commit }, payload) {
        let data = await this.$axios.$post('/trips/filter', payload);
        commit('SET_TRIPS', data);
    },
    async save ({ commit }, payload) {
        await this.$axios.$post('/trips', payload)
            .then((response) => {
                commit('ADD_TRIP', response);
                Swal.fire(
                    'Trip Request',
                    'Trip Successfully Added!',
                    'successs'
                )
            })
            .catch(error => {
                Swal.fire(
                    'Something wen\'t wrong.',
                    error.response.data.message,
                    'error'
                )
            })
    },
    async update ({ commit }, payload) {
        await this.$axios.$patch(`/trips/${payload.id}`, payload)
            .then((response) => {
                commit('UPDATE_TRIP', response);
                Swal.fire(
                    'Trip Request',
                    'Trip Successfully Updated!',
                    'success'
                )
            })
            .catch(error => {
                Swal.fire(
                    'Something wen\'t wrong.',
                    error.response.data.message,
                    'error'
                )
            })
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