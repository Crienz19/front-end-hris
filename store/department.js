export const state = () => ({
    departments: []
});

export const getters = {
    getDepartments (state) {
        return state.departments;
    }
};

export const mutations = {
    SET_DEPARTMENTS (state, departments) {
        state.departments = departments;
    }
};

export const actions = {
    async loadDepartments ({ commit }) {
        let {data} = await this.$axios.$get(`/departments`);
        commit('SET_DEPARTMENTS', data);
    },
    async storeDepartment ({ dispatch }, payload) {
        await this.$axios.$post(`/departments`, payload);
        dispatch('loadDepartments');
    },
    async updateDepartment ({ dispatch }, payload) {
        await this.$axios.$patch(`/departments/${payload.id}`, payload);
        dispatch('loadDepartments');
    },
    async deleteDepartment ({ dispatch }, payload) {
        await this.$axios.$delete(`/departments/${payload.id}`);
        dispatch('loadDepartments');
    }
};