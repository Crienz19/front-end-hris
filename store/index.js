export const actions = {
    async nuxtServerInit({ dispatch, getters }) {
        if (getters['auth/user']) {
            await dispatch('user/load');
            await dispatch('employee/load');
            await dispatch('leave/load');
            await dispatch('overtime/load');
            await dispatch('trip/load');
            await dispatch('coe/load');
            await dispatch('branch/load');
            await dispatch('role/load');
            await dispatch('department/load');
            await dispatch('credit/load');
        } else {
            console.log('Unauthorized')
        }
    }
}