export const state = () => ({
    leaves: []
})

export const getters = {
    getLeaves (state) {
        return state.leaves
    }
};

export const mutations = {
    SET_LEAVES (state, leaves) {
        state.leaves = leaves;
    }
}

export const actions = {
    async loadSuperLeaves ({ commit }) {
        let {data} = await this.$axios.$get(`/sa/leaves`);
        commit('SET_LEAVES', data);
    },
    async loadHrLeaves ({ commit }) {
        let {data} = await this.$axios.$get('/hr/leaves');
        commit('SET_LEAVES', data);
    },
    async loadAdminLeaveSup ({ commit }) {
        let {data} = await this.$axios.$get('/admin/leaves/getSupervisor');
        commit('SET_LEAVES', data);
    },
    async loadAdminLeaveEmp ({ commit }) {
        let {data} = await this.$axios.$get('/admin/leaves/getEmployee');
        commit('SET_LEAVES', data);
    },
    async loadSupervisorLeaves ({ commit }) {
        let {data} = await this.$axios.$get('/sv/leaves');
        commit('SET_LEAVES', data);
    },
    async loadEmployeeLeaves ({ commit }) {
        let {data} = await this.$axios.$get(`/em/leaves`);
        commit('SET_LEAVES', data);
    },
    async storeSuperLeave ({ dispatch }, payload) {
        await this.$axios.$post(`/sa/leaves`, payload);
        dispatch('loadLeaves');
    },
    async updateSuperLeave ({ dispatch }, payload) {
        await this.$axios.$patch(`/sa/leaves/${payload.id}`, payload);
        dispatch('loadLeaves');
    },
    async deleteSuperLeave ({ dispatch }, payload) {
        await this.$axios.$delete(`/sa/leaves/${payload.id}`);
        dispatch('loadLeaves');
    },
    async storeEmployeeLeave ({ dispatch }, payload) {
        await this.$axios.$post('/em/leaves', payload);
        dispatch('loadEmployeeLeaves');
    },
    async updateEmployeeLeave ({ dispatch }, payload) {
        await this.$axios.$patch(`/em/leaves/${payload.id}`, payload);
        dispatch('loadEmployeeLeaves');
    },
    async deleteEmployeeLeave ({ dispatch }, payload) {
        await this.$axios.$delete(`/em/leaves/${payload.id}`);
        dispatch('loadEmployeeLeaves');
    }
}