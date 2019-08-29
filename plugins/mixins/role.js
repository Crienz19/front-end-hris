import Vue from 'vue';
import { mapGetters } from 'vuex';

const Role = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    roles: 'role/getRoles'
                })
            }
        });
    }
};

Vue.use(Role);