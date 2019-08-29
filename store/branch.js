export const state = () => ({
    branches: []
});

export const getters = {
    getBranches (state) {
        return state.branches;
    }
};

export const mutations = {
    SET_BRANCHES (state, branches) {
        state.branches = branches;
    }
};

export const actions = {
    async loadBranches ({ commit }) {
        let {data} = await this.$axios.$get(`/branches`);
        commit('SET_BRANCHES', data);
    },
    async storeBranch ({ dispatch }, payload) {
        await this.$axios.$post(`/branches`, payload);
        dispatch('loadBranches');
    },
    async updateBranch ({dispatch}, payload) {
        await this.$axios.$patch(`/branches/${payload.id}`, payload);
        dispatch('loadBranches');
    },
    async deleteBranch ({dispatch}, payload) {
        await this.$axios.$delete(`/branches/${payload.id}`);
        dispatch('loadBranches');
    }
};