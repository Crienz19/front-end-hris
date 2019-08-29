import Vue from 'vue';
import { mapGetters } from 'vuex';

const Overtime = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    overtimes: 'overtime/getOvertimes'
                })
            }
        });
    }
};

Vue.use(Overtime);