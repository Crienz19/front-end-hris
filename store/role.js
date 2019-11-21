import _ from 'lodash';
export const state = () => ({
    roles: []
});

export const getters = {
    getRoles (state) {
        return state.roles;
    }
};

export const mutations = {
    SET_ROLES (state, roles) {
        state.roles = roles;
    },
    ADD_ROLE (state, role) {
        state.roles.unshift(role);
    },
    UPDATE_ROLE (state, role) {
        state.roles.forEach(e => {
            if (e.id == role.id) {
                state.roles.slice(state.roles.indexOf(e), 1, role);
            }
        })
    },
    DELETE_ROLE (state, role) {
        state.roles.forEach(e => {
            if (e.id == role) {
                state.roles.splice(state.roles.indexOf(e), 1);
            }
        })
    }
};

export const actions = {
    async load ({commit}) {
        let data = await this.$axios.$get(`/roles`);
        commit('SET_ROLES', data);
    },
    async save ({commit}, payload) {
        let data = await this.$axios.$post(`/roles`, payload);
        commit('ADD_ROLE', data);
    },
    async update ({commit}, payload) {
        let data = await this.$axios.$patch(`/roles/${payload.id}`, payload);
        commit('UPDATE_ROLE', data);
    },
    async delete ({commit}, payload) {
        let data = await this.$axios.$delete(`/roles/${payload}`);
        commit('DELETE_ROLE', data);
    }
};