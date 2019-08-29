import Vue from 'vue';
import { mapGetters } from 'vuex';

const User = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    users: 'user/users',
                    usersByRole: 'user/getUserByRole'
                })
            }
        });
    }
};

Vue.use(User);