import Vuex from 'vuex';

export default () => new Vuex.Store({
    state: () => {
        auth: ''
    },
    modules: {
        auth: {
            namespaced: true,
            state: () => ({
                username: '',
                isLoggedIn: false
            }),
            getters: {
                username: (state) => {
                    return state.username;
                }
            },
            mutations: {
                SET_AUTH: (state, payload) => {
                    state.username = 'Renz Mergenio';
                    state.isLoggedIn = true;
                },
                REMOVE_AUTH: (state, payload) => {
                    state.username = null;
                    state.isLoggedIn = false;
                }
            },
            actions: {
                login: (context) => {
                    context.commit('SET_AUTH');
                    return true;
                },
                logout: (context) => {
                    context.commit('REMOVE_AUTH');
                    return true;
                }
            }
        },
        user: {
            namespaced: true,
            state: () => ({
                profiles: [
                    {
                        id: 1,
                        full_name: 'Renz Mergenio',
                        position: 'IT Specialist',
                        department: 'IT Department',
                        email: 'rmergenio@ziptravel.com.ph',
                        branch: 'MANILA'
                    },
                    {
                        id: 2,
                        full_name: 'Renz Mergenio',
                        position: 'IT Specialist',
                        department: 'IT Department',
                        email: 'rmergenio@ziptravel.com.ph',
                        branch: 'MANILA'
                    }
                ]
            }),
            getters: {
                getProfiles: (state) => {
                    return state.profiles;
                }
            },
            mutations: {
                
            },
            actions: {
                
            }
        },
        leave: {
            namespaced: true,
            state: () => ({
                list: [
                    {
                        id: 1,
                        full_name: 'Renz Mergenio',
                        type: 'VL',
                        pay: 'With Pay',
                        from: '07-02-2019',
                        to: '07-02-2019',
                        recommending_approval: 'Pending',
                        final_approval: 'Pending',
                        created_at: 'null'
                    },
                    {
                        id: 2,
                        full_name: 'Renz Mergenio',
                        type: 'VL',
                        pay: 'With Pay',
                        from: '07-02-2019',
                        to: '07-02-2019',
                        recommending_approval: 'Pending',
                        final_approval: 'Pending',
                        created_at: 'null'
                    },
                    {
                        id: 3,
                        full_name: 'Renz Mergenio',
                        type: 'VL',
                        pay: 'With Pay',
                        from: '07-02-2019',
                        to: '07-02-2019',
                        recommending_approval: 'Pending',
                        final_approval: 'Pending',
                        created_at: 'null'
                    }
                ]
            }),
            getters: {
                getLeaves: (state) => {
                    return state.list;
                }
            },
            mutations: {

            },
            actions: {

            }
        },
        overtime: {
            namespaced: true,
            state: () => ({
                list: [
                    {
                        id: 1,
                        full_name: 'Renz Mergenio',
                        date: '07-02-2019',
                        from: '6:00 PM',
                        to: '07:00 PM',
                        reason: 'Overtime Sample',
                        status: 'Pending',
                        created_at: 'null'
                    },
                    {
                        id: 2,
                        full_name: 'sldkfjklsdjfkl',
                        date: '07-02-2019',
                        from: '6:00 PM',
                        to: '07:00 PM',
                        reason: 'Overtime Sample',
                        status: 'Pending',
                        created_at: 'null'
                    },
                    {
                        id: 3,
                        full_name: 'Renz Mergenio',
                        date: '07-02-2019',
                        from: '6:00 PM',
                        to: '07:00 PM',
                        reason: 'Overtime Sample',
                        status: 'Pending',
                        created_at: 'null'
                    },
                    {
                        id: 4,
                        full_name: 'Renz Mergenio',
                        date: '07-02-2019',
                        from: '6:00 PM',
                        to: '07:00 PM',
                        reason: 'Overtime Sample',
                        status: 'Pending',
                        created_at: 'null'
                    }
                ]
            }),
            getters: {
                getOvertimes: (state) => {
                    return state.list;
                }
            },
            mutations: {

            },
            actions: {

            }
        },
        trip: {
            namespaced: true,
            state: () => ({
                list: [
                    {
                        id: 1,
                        full_name: 'Renz Mergenio',
                        date_from: '07-02-2019',
                        date_to: '07-02-2019',
                        time_in: '09:00 AM',
                        time_out: '6:00 PM',
                        destination_from: 'Home',
                        destination_to: 'Office',
                        status: 'Pending',
                        created_at: 'null'
                    },
                    {
                        id: 1,
                        full_name: 'Renz Mergenio',
                        date_from: '07-02-2019',
                        date_to: '07-02-2019',
                        time_in: '09:00 AM',
                        time_out: '6:00 PM',
                        destination_from: 'Home',
                        destination_to: 'Office',
                        status: 'Pending',
                        created_at: 'null'
                    },
                    {
                        id: 1,
                        full_name: 'Renz Mergenio',
                        date_from: '07-02-2019',
                        date_to: '07-02-2019',
                        time_in: '09:00 AM',
                        time_out: '6:00 PM',
                        destination_from: 'Home',
                        destination_to: 'Office',
                        status: 'Pending',
                        created_at: 'null'
                    }
                ]
            }),
            getters: {
                getTrips: (state) => {
                    return state.list;
                }
            },
            mutations: {

            },
            actions: {

            }
        }
    }
});