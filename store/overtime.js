import Swal from "sweetalert2";

export const state = () => ({
    overtimes: []
});

export const getters = {
    getOvertimes (state) {
        return state.overtimes;
    },
    getOvertimeByUserId: (state) => (id) => {
        return state.overtimes.filter(o => o.user_id === id);
    }
};

export const mutations = {
    SET_OVERTIMES (state, overtimes) {
        state.overtimes = overtimes;
    },
    ADD_OVERTIME (state, overtime) {
        state.overtimes.unshift(overtime);
    },
    UPDATE_OVERTIME (state, overtime) {
        state.overtimes.forEach(e => {
            if (e.id == overtime.id) {
                state.overtimes.splice(state.overtimes.indexOf(e), 1, overtime);
            }
        })
    },
    DELETE_OVERTIME (state, overtime) {
        state.overtimes.forEach(e => {
            if (e.id == overtime) {
                state.overtimes.splice(state.overtimes.indexOf(e), 1);
            }
        })
    }
};

export const actions = {
    async load ({ commit }) {
        let data = await this.$axios.$get('/overtimes');
        commit('SET_OVERTIMES', data);
    },
    async loadFiltered ({ commit }, payload) {
        let data = await this.$axios.$post('/overtimes/filter', payload);
        commit('SET_OVERTIMES', data);
    },
    async save ({ commit }, payload) {
        await this.$axios.$post('/overtimes', payload)
            .then((response) => {
                commit('ADD_OVERTIME', response);
                Swal.fire(
                    'Overtime Request',
                    'Overtime Successfully Added',
                    'success'
                )
            })
            .catch(error => {
                Swal.fire(
                    'Something wen\'t wrong.',
                    error.response.data.message,
                    'error'
                );
            })
    },
    async update ({ commit }, payload) {
        await this.$axios.$patch(`/overtimes/${payload.id}`, payload)
            .then((response) => {
                commit('UPDATE_OVERTIME', response);
                Swal.fire(
                    'Overtime Request',
                    'Overtime Successfully Updated',
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
        await this.$axios.$delete(`/overtimes/${payload}`)
            .then((response) => {
                commit('DELETE_OVERTIME', response);
                Swal.fire(
                    'Overtime Request',
                    'Overtime Successfully Deleted',
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
        commit('DELETE_OVERTIME', data);
    },
    async approveStatus ({ commit }, payload) {
        let data = await this.$axios.$post(`/overtimes/${payload.id}/approveOvertime`);
        commit('UPDATE_OVERTIME', data);
    },
    async disapproveStatus ({ commit }, payload) {
        let data = await this.$axios.$post(`/overtimes/${payload.id}/disapproveOvertime`);
        commit('UPDATE_OVERTIME', data);
    }
};