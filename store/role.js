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
        let index = _.findIndex(state.roles, {id: role.id});
        state.roles.splice(index, 1, role);
    },
    DELETE_ROLE (state, role) {
        let index = _.findIndex(state.roles, {id: role.id});
        state.roles.splice(index, 1);
    }
};

export const actions = {
    async loadRoles ({commit}) {
        let {data} = await this.$axios.$get(`/roles`);
        commit('SET_ROLES', data);
    },
    async saveRole ({commit}, payload) {
        let {data} = await this.$axios.$post(`/roles`, payload);
        commit('ADD_ROLE', data);
    },
    async updateRole ({commit}, payload) {
        let {data} = await this.$axios.$patch(`/roles/${payload.id}`, {
            'name': payload.name,
            'display_name': payload.display_name
        });
        commit('UPDATE_ROLE', payload);
    },
    async deleteRole ({commit}, payload) {
        let {data} = await this.$axios.$delete(`/roles/${payload.id}`);
        commit('DELETE_ROLE', payload);
    }
};