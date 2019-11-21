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
    },
    ADD_BRANCH (state, branch) {
        state.branches.unshift(branch);
    },
    UPDATE_BRANCH (state, branch) {
        state.branches.forEach(e => {
            if (e.id == branch.id) {
                state.branches.splice(state.branches.indexOf(e), 1, branch);
            }
        })
    },
    DELETE_BRANCH (state, branch) {
        state.branches.forEach(e => {
            if (e.id == branch) {
                state.branches.splice(state.branches.indexOf(e), 1);
            }
        })
    }
};

export const actions = {
    async load ({ commit }) {
        let data = await this.$axios.$get(`/branches`);
        commit('SET_BRANCHES', data);
    },
    async save ({ commit }, payload) {
        let data = await this.$axios.$post(`/branches`, payload);
        commit('ADD_BRANCH', data)
    },
    async update ({ commit }, payload) {
        let data = await this.$axios.$patch(`/branches/${payload.id}`, payload);
        commit('UPDATE_BRANCH', data);
    },
    async delete ({ commit }, payload) {
        let data = await this.$axios.$delete(`/branches/${payload}`);
        commit('DELETE_BRANCH', data);
    }
};