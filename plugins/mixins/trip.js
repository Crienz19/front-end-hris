import Vue from 'vue';
import { mapGetters } from 'vuex';

const Trip = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    trips: 'trip/getTrips'
                })
            }
        });
    }
};

Vue.use(Trip);