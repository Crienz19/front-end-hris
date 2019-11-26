import Swal from "sweetalert2";

export const state = () => ({
    leaves: []
})

export const getters = {
    getLeaves (state) {
        return state.leaves
    },
    getLeavesByUserId: (state) => (id) => {
        return state.leaves.filter(l => l.user_id === id);
    }
};

export const mutations = {
    SET_LEAVES (state, leaves) {
        state.leaves = leaves;
    },
    ADD_LEAVE (state, leave) {
        state.leaves.unshift(leave);
    },
    UPDATE_LEAVE (state, leave) {
        state.leaves.forEach(e => {
            if (e.id == leave.id) {
                state.leaves.splice(state.leaves.indexOf(e), 1, leave);
            }
        })
    },
    DELETE_LEAVE (state, leave) {
        state.leaves.forEach(e => {
            if (e.id == leave) {
                state.leaves.splice(state.leaves.indexOf(e), 1);
            }
        })
    }
}

export const actions = {
    async load ({ commit }) {
        let data = await this.$axios.$get('/leaves');
        commit('SET_LEAVES', data);
    },
    async loadFiltered ({ commit }, payload) {
        let data = await this.$axios.$post('/leaves/filter', payload);
        commit('SET_LEAVES', data);
    },
    async save ({ commit }, payload) {
        await this.$axios.$post('/leaves', payload)
            .then((response) => {
                if (this.$auth.user.role == 'supervisor') {
                    if (response.count > 3) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Leave Request Reminder',
                            text: 'Your leave request has been sent for IMMEDIATE SUPERIOR\'S REVIEW. Please get WRITTEN APPROVAL from you immediate superior. Failure to get approval shall mean DISAPPROVED and therefore considered WITHOUR PAY.'
                        })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Leave Request Added'
                        })
                    }
                }
                commit('ADD_LEAVE', response);
            })
            .catch(error => {
                Swal.fire(
                    'Something wen\'t wrong.',
                    error.response.data.message,
                    'error'
                );
            })
    },
    async update ({ commit }, payload) {
        await this.$axios.$patch(`/leaves/${payload.id}`, payload)
            .then((response) => {
                if (this.$auth.user.role == 'supervisor') {
                    if (response.count > 3) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Leave Request Reminder',
                            text: 'Your leave request has been sent for IMMEDIATE SUPERIOR\'S REVIEW. Please get WRITTEN APPROVAL from you immediate superior. Failure to get approval shall mean DISAPPROVED and therefore considered WITHOUR PAY.'
                        })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Leave Request Added'
                        })
                    }
                    commit('UPDATE_LEAVE', response);
                }
            })
            .catch(error => {
                Swal.fire(
                    'Something wen\'t wrong.',
                    error.response.data.message,
                    'error'
                )
            })
    },
    async delete ({ commit }, payload) {
        await this.$axios.$delete(`/leaves/${payload}`)
            .then((response) => {
                Swal.fire(
                    'Leave Request',
                    'Leave successfully deleted!',
                    'success'
                );
                commit('DELETE_LEAVE', response);
            })
            .catch(error => {
                Swal.fire(
                    'Something wen\'t wrong.',
                    error.response.data.message,
                    'error'
                )
            })
    },
    async approveRecommendingApproval ({ commit }, payload) {
        let data = await this.$axios.$post(`/leaves/${payload.id}/approveRecommendingApproval`);
        commit('UPDATE_LEAVE', data);
    },
    async disapproveRecommendingApproval ({ commit }, payload) {
        let data = await this.$axios.$post(`/leaves/${payload.id}/disapproveRecommendingApproval`);
        commit('UPDATE_LEAVE', data);
    },
    async approveFinalApproval ({ commit }, payload) {
        let data = await this.$axios.$post(`/leaves/${payload.id}/approveFinalApproval`);
        commit('UPDATE_LEAVE', data);
    },
    async disapproveFinalApproval ({ commit }, payload) {
        let data = await this.$axios.$post(`/leaves/${payload.id}/disapproveFinalApproval`);
        commit('UPDATE_LEAVE', data);
    }
}