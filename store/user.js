export const state = () => ({
    users: []
});

export const getters = {
    users (state) {
        return state.users;
    },
    getUserByRole (state) {
        var newRoles = state.users.filter(i => i.role == 'supervisor');
        return newRoles;
    }
};

export const mutations = {
    SET_USERS (state, users) {
        state.users = users;
    },
};

export const actions = {
    async loadUsers ({ commit }) {
        let {data} = await this.$axios.$get(`/users`);
        commit('SET_USERS', data);
    },
    async storeUser ({ dispatch }, payload) {
        let {data} = await this.$axios.$post(`/users`, payload);
        dispatch('loadUsers');
    },
    async updateUser ({ dispatch }, payload) {
        let {data} = await this.$axios.$patch(`/users/${payload.id}`, payload);
        dispatch('loadUsers');
    },
    async deleteUser ({ dispatch }, payload) {
        let {data} = await this.$axios.$delete(`/users/${payload.id}`);
        dispatch('loadUsers');
    }
}