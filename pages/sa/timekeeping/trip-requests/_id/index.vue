<template>
    <v-layout row wrap>
        <v-flex xs12 md6 offset-md3>
            <v-alert type="info" :value="true">
                This is information alert!
            </v-alert>
        </v-flex>
        <v-flex xs12 md6 offset-md3>
            <v-card>
                <v-card-title>
                    {{ trip.employee.first_name }} {{ trip.employee.last_name }}'s Trip Request #{{ trip.id }}
                    <v-spacer></v-spacer>
                    <v-btn color="warning" to="/sa/timekeeping/trip-requests">Go Back</v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-container grid-list-lg>
                    <v-layout row wrap>
                        <v-flex xs12 lg6>
                            <DatePicker
                                label="Date From"
                                placeholder="Select date from ..."
                                v-model="trip.date_from"
                                disabled
                            ></DatePicker>
                        </v-flex>
                        <v-flex xs12 lg6>
                            <DatePicker
                                label="Date To"
                                placeholder="Select date to ..."
                                v-model="trip.date_to"
                                disabled
                            ></DatePicker>
                        </v-flex>
                        <v-flex xs12 lg6>
                            <TimePicker
                                label="Time In"
                                placeholder="Select Time In"
                                v-model="trip.time_in.standard"
                                disabled
                            ></TimePicker>
                        </v-flex>
                        <v-flex xs12 lg6>
                            <TimePicker
                                label="Time Out"
                                placeholder="Select Time Out"
                                v-model="trip.time_out.standard"
                                disabled
                            ></TimePicker>
                        </v-flex>
                        <v-flex xs12 lg6>
                            <v-text-field
                                label="Destination From"
                                placeholder="Enter your destination from..."
                                v-model="trip.destination_from"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 lg6>
                            <v-text-field
                                label="Destination To"
                                placeholder="Enter your destination to..."
                                v-model="trip.destination_to"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                label="Purpose"
                                placeholder="Enter your purpose..."
                                v-model="trip.purpose"
                                disabled
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="remove" color="error" block>Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import DatePicker from '@/components/datepicker/Datepicker-No-Button.vue';
    import TimePicker from '@/components/timepicker/Timepicker-Menu.vue';
    export default {
        components: {
            DatePicker,
            TimePicker
        },
        async asyncData({$axios, params}) {
            let {data} = await $axios.get(`/sa/trips/${params.id}`);

            return {
                trip: data.data
            }
        },
        methods: {
            async remove () {
                let {data} = await this.$axios.$delete(`/sa/trips/${this.$route.params.id}`);

                this.$router.push('/sa/timekeeping/trip-requests');

                alert(`${this.trip.employee.first_name} ${this.trip.employee.last_name} Trip Request #${this.trip.id} is deleted!`);
            }
        }
    }
</script>
