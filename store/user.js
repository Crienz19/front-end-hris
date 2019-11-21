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
    ADD_USER (state, user) {
        state.users.unshift(user);
    },
    UPDATE_USER (state, user) {
        state.users.forEach(e => {
            if (e.id == user.id) {
                state.users.splice(state.users.indexOf(e), 1, user);
            }
        })
    },
    DELETE_USER (state, user) {
        state.users.forEach(e => {
            if (e.id == user) {
                state.users.splice(state.users.indexOf(e), 1);
            }
        })
    }
};

export const actions = {
    async load ({ commit }) {
        let data = await this.$axios.$get(`/users`);
        commit('SET_USERS', data);
    },
    async save ({ commit }, payload) {
        let data = await this.$axios.$post(`/users`, payload);
        commit('ADD_USER', data);
    },
    async update ({ commit }, payload) {
        let data = await this.$axios.$patch(`/users/${payload.id}`, payload);
        commit('UPDATE_USER', data);
    },
    async delete ({ commit }, payload) {
        let data = await this.$axios.$delete(`/users/${payload.id}`);
        commit('DELETE_USER', data)
    },
    async setToDefault ({commit}, payload) {
        let data = await this.$axios.$post(`/users/setToDefault/${payload.id}`);
        alert(data.message)
    }
}