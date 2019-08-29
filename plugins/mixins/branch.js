import Vue from 'vue';
import { mapGetters } from 'vuex';

const Branch = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    branches: 'branch/getBranches'
                })
            }
        });
    }
};

Vue.use(Branch);