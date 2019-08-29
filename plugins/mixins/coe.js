import Vue from 'vue';
import { mapGetters } from 'vuex';

const Coe = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    coes: 'coe/getCOEs'
                })
            }
        });
    }
};

Vue.use(Coe);