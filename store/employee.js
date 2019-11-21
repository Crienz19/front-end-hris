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
    },
    ADD_EMPLOYEE (state, employee) {
        state.employees.unshift(employee);
    },
    UPDATE_EMPLOYEE (state, employee) {
        state.employees.forEach(e => {
            if (e.id == employee.id) {
                state.employees.splice(state.employees.indexOf(e), 1, employee);
            }
        })
    },
    DELETE_EMPLOYEE (state, employee) {
        state.employees.forEach(e => {
            if (e.id == employee) {
                state.employees.splice(state.employees.indexOf(e), 1);
            }
        })
    }
};

export const actions = {
    async load ({commit}) {
        let data = await this.$axios.$get('/employees');
        commit('SET_EMPLOYEES', data);
    },
    async store ({ commit }, payload) {
        let data = await this.$axios.$post('/employees', payload);
        commit('ADD_EMPLOYEE', data);
    },
    async update ({ commit }, payload) {
        let data = await this.$axios.$patch(`/employees/${payload.user_id}`, payload);
        commit('UPDATE_EMPLOYEE', data);
    },
    async delete ({ commit }, payload) {
        let data = await this.$axios.$delete(`/employees/${payload.id}`);
        commit('DELETE_EMPLOYEE', data)
    }
};