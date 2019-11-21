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
    },
    ADD_DEPARTMENT (state, department) {
        state.departments.unshift(department);
    },
    UPDATE_DEPARTMENT (state, department) {
        state.departments.forEach(e => {
            if (e.id == department.id) {
                state.departments.splice(state.departments.indexOf(e), 1, department);
            }
        })
    },
    DELETE_DEPARTMENT (state, department) {
        state.departments.forEach(e => {
            if (e.id == department) {
                state.departments.splice(state.departments.indexOf(e), 1);
            }
        })
    }
};

export const actions = {
    async load ({ commit }) {
        let data = await this.$axios.$get(`/departments`);
        commit('SET_DEPARTMENTS', data);
    },
    async save ({ commit }, payload) {
        let data = await this.$axios.$post(`/departments`, payload);
        commit('ADD_DEPARTMENT', data);
    },
    async update ({ commit }, payload) {
        let data = await this.$axios.$patch(`/departments/${payload.id}`, payload);
        commit('UPDATE_DEPARTMENT', data);
    },
    async delete ({ commit }, payload) {
        let data = await this.$axios.$delete(`/departments/${payload}`);
        commit('DELETE_DEPARTMENT', data);
    }
};