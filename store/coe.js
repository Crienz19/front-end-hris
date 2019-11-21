export const state = () => ({
    coes: []
});

export const getters = {
    getCOEs (state) {
        return state.coes;
    },
    getCOEsByUserId: (state) => (id) => {
        return state.coes.filter(c => c.user_id == id);
    }
};

export const mutations = {
    SET_COES (state, coes) {
        state.coes = coes;
    },
    ADD_COE (state, coe) {
        state.coes.unshift(coe);
    },
    UPDATE_COE (state, coe) {
        state.coes.forEach(e => {
            if (e.id == coe.id) {
                state.coes.splice(state.coes.indexOf(e), 1, coe);
            }
        })
    },
    DELETE_COE (state, coe) {
        state.coes.forEach(e => {
            if (e.id == coe) {
                state.coes.splice(state.coes.indexOf(e), 1);
            }
        })
    }
};

export const actions = {
    async load ({ commit }) {
        let data = await this.$axios.$get('/coes');
        commit('SET_COES', data);
    },
    async save ({ commit }, payload) {
        let data = await this.$axios.$post('/coes', payload);
        commit('ADD_COE', data);
    },
    async update ({ commit }, payload) {
        let data = await this.$axios.$patch(`/coes/${payload.id}`, payload);
        commit('UPDATE_COE', data);
    },
    async delete ({ commit }, payload) {
        let data = await this.$axios.$delete(`/coes/${payload}`);
        commit('DELETE_COE', data);
    },
    async acknowledge ({ commit }, payload) {
        let data = await this.$axios.$post(`/coes/${payload.id}/acknowledgeCoe`);
        commit('UPDATE_COE', data);
    }
}