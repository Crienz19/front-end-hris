export const state = () => ({
    leaves: []
})

export const getters = {
    getLeaves (state) {
        return state.leaves
    },
    getLeavesByUserId: (state) => (id) => {
        return state.leaves.filter(l => l.user_id === id);
    }
};

export const mutations = {
    SET_LEAVES (state, leaves) {
        state.leaves = leaves;
    },
    ADD_LEAVE (state, leave) {
        state.leaves.unshift(leave);
    },
    UPDATE_LEAVE (state, leave) {
        state.leaves.forEach(e => {
            if (e.id == leave.id) {
                state.leaves.splice(state.leaves.indexOf(e), 1, leave);
            }
        })
    },
    DELETE_LEAVE (state, leave) {
        state.leaves.forEach(e => {
            if (e.id == leave) {
                state.leaves.splice(state.leaves.indexOf(e), 1);
            }
        })
    }
}

export const actions = {
    async load ({ commit }) {
        let data = await this.$axios.$get('/leaves');
        commit('SET_LEAVES', data);
    },
    async loadFiltered ({ commit }, payload) {
        let data = await this.$axios.$post('/leaves/filter', payload);
        commit('SET_LEAVES', data);
    },
    async save ({ commit }, payload) {
        let data = await this.$axios.$post('/leaves', payload);
        commit('ADD_LEAVE', data);
    },
    async update ({ commit }, payload) {
        let data = await this.$axios.$patch(`/leaves/${payload.id}`, payload);
        commit('UPDATE_LEAVE', data);
    },
    async delete ({ commit }, payload) {
        let data = await this.$axios.$delete(`/leaves/${payload}`)
        commit('DELETE_LEAVE', data);
    },
    async approveRecommendingApproval ({ commit }, payload) {
        let data = await this.$axios.$post(`/leaves/${payload.id}/approveRecommendingApproval`);
        commit('UPDATE_LEAVE', data);
    },
    async disapproveRecommendingApproval ({ commit }, payload) {
        let data = await this.$axios.$post(`/leaves/${payload.id}/disapproveRecommendingApproval`);
        commit('UPDATE_LEAVE', data);
    },
    async approveFinalApproval ({ commit }, payload) {
        let data = await this.$axios.$post(`/leaves/${payload.id}/approveFinalApproval`);
        commit('UPDATE_LEAVE', data);
    },
    async disapproveFinalApproval ({ commit }, payload) {
        let data = await this.$axios.$post(`/leaves/${payload.id}/disapproveFinalApproval`);
        commit('UPDATE_LEAVE', data);
    }
}