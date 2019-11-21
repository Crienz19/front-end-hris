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
        let data = await this.$axios.$post('/overtimes', payload);
        commit('ADD_OVERTIME', data);
    },
    async update ({ commit }, payload) {
        let data = await this.$axios.$patch(`/overtimes/${payload.id}`, payload);
        commit('UPDATE_OVERTIME', data);
    },
    async delete ({ commit }, payload) {
        let data = await this.$axios.$delete(`/overtimes/${payload}`);
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