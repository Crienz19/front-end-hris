export const state = () => ({
    overtimes: []
});

export const getters = {
    getOvertimes (state) {
        return state.overtimes;
    }
};

export const mutations = {
    SET_OVERTIMES (state, overtimes) {
        state.overtimes = overtimes;
    }
};

export const actions = {
    async loadSuperOvertimes ({ commit }) {
        let {data} = await this.$axios.$get('/sa/overtimes');
        commit('SET_OVERTIMES', data);
    },
    async loadHrOvertimes ({commit}) {
        let {data} = await this.$axios.$get('/hr/overtimes');
        commit('SET_OVERTIMES', data);
    },
    async loadSupervisorOvertimes ({commit}) {
        let {data} = await this.$axios.$get('/sv/overtimes');
        commit('SET_OVERTIMES', data);
    },
    async storeSuperOvertime ({ dispatch }, payload) {
        await this.$axios.$post('/sa/overtimes', payload);
        dispatch('loadSuperOvertimes');
    },
    async updateSuperOvertime ({ dispatch }, payload) {
        await this.$axios.$patch(`/sa/overtimes/${payload.id}`, payload);
        dispatch('loadSuperOvertimes');
    },
    async deleteSuperOvertime ({ dispatch }, payload) {
        await this.$axios.$delete(`/sa/overtimes/${payload.id}`);
        dispatch('loadSuperOvertimes');
    },
    async loadEmployeeOvertimes ({ commit }) {
        let {data} = await this.$axios.$get('/em/overtimes');
        commit('SET_OVERTIMES', data);
    },
    async storeEmployeeOvertime ({ dispatch }, payload) {
        await this.$axios.$post('/em/overtimes', payload);
        dispatch('loadEmployeeOvertimes');
    },
    async updateEmployeeOvertime ({ dispatch }, payload) {
        await this.$axios.$patch(`/em/overtimes/${payload.id}`, payload);
        dispatch('loadEmployeeOvertimes');
    },
    async deleteEmployeeOvertime({ dispatch }, payload) {
        await this.$axios.$delete(`/em/overtimes/${payload.id}`);
        dispatch('loadEmployeeOvertimes');
    }
};