import Vue from 'vue';
import { mapGetters } from 'vuex';

const Leave = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    leaves: 'leave/getLeaves'
                })
            }
        });
    }
};

Vue.use(Leave);