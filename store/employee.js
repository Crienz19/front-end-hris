export const state = () => ({
    employees: []
});

export const getters = {
    getEmployees (state) {
        return state.employees;
    }
};

export const mutations = {
    SET_EMPLOYEES (state, employees) {
        state.employees = employees;
    }
};

export const actions = {
    async loadSuperEmployees ({commit}) {
        let {data} = await this.$axios.$get('/employees');
        commit('SET_EMPLOYEES', data);
    },
    async storeSuperEmployee ({ dispatch }, payload) {
        await this.$axios.$post('/employees', payload);
        dispatch('loadEmployees');
    },
    async updateSuperEmployee ({ dispatch }, payload) {
        await this.$axios.$patch(`/employees/${payload.id}`, payload);
        dispatch('loadEmployees');
    },
    async deleteSuperEmployee ({ dispatch }, payload) {
        await this.$axios.$delete(`/employees/${payload.id}`);
        dispatch('loadEmployees');
    }
};