import Vue from 'vue';
import { mapGetters } from 'vuex';

const Department = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    departments: 'department/getDepartments'
                })
            }
        });
    }
};

Vue.use(Department);