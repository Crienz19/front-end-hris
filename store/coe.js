export const state = () => ({
    coes: []
});

export const getters = {
    getCOEs (state) {
        return state.coes;
    }
};

export const mutations = {
    SET_COES (state, coes) {
        state.coes = coes;
    }
};

export const actions = {
    async loadEmployeeCOEs ({ commit }) {
        let {data} = await this.$axios.$get(`/em/coes`);
        commit('SET_COES', data);
    },
    async loadHumanResourceCOEs ({ commit }) {
        let {data} = await this.$axios.$get(`/hr/coes`);
        commit('SET_COES', data);
    }
}