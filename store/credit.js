export const state = () => ({
    credits: []
});

export const getters = {

}

export const mutations = {
    SET_CREDITS (state, credits) {
        state.credits = credits;
    },
    UPDATE_CREDIT (state, credit) {
        state.credits.forEach(e => {
            if (e.id == credit.id) {
                state.credits.splice(state.credits.indexOf(e), 1, credit);
            }
        })
    }
}

export const actions = {
    async load ({ commit }) {
        let data = await this.$axios.$get('/credits');
        commit('SET_CREDITS', data);
    },
    async update ({ commit }, payload) {
        let data = await this.$axios.$patch(`/credits/${payload.id}`, payload);
        commit('UPDATE_CREDIT', data);
    }
}