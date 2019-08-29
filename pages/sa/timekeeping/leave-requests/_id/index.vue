<template>
    <v-layout row wrap>
        <v-flex xs6 offset-xs3>
            <v-alert type="info" :value="true">
                This is information alert
            </v-alert>
        </v-flex>
        <v-flex xs6 offset-xs3>
            <v-card>
                <v-card-title>
                    <h3>{{ leave.employee.first_name }} {{ leave.employee.last_name }}'s Leave Requests #{{ leave.id }}</h3>
                    <v-spacer></v-spacer>
                    <v-btn to="/sa/timekeeping/leave-requests" color="warning">Go Back</v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-container grid-list-lg>
                    <v-layout row wrap>
                        <v-flex xs12 lg6>
                            <v-select
                                placeholder="Select Leave"
                                :items="['VL', 'SL', 'PTO', 'VL - Half', 'SL - Half', 'PTO - Half']"
                                v-model="leave.type"
                                label="Type"
                                disabled
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 lg6>
                            <v-select
                                placeholder="Select Pay"
                                :items="['With Pay', 'Without Pay']"
                                v-model="leave.pay_type"
                                label="Pay"
                                disabled
                            ></v-select>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                label="Reason"
                                placeholder="Type your valid reason..."
                                v-model="leave.reason"
                                disabled
                            ></v-textarea>
                        </v-flex>
                        <v-flex xs12 lg6>
                            <DatePicker
                                label="From"
                                placeholder="Select Date From"
                                v-model="leave.from"
                                disabled
                            ></DatePicker>
                        </v-flex>
                        <v-flex xs12 lg6>
                            <DatePicker
                                label="To"
                                placeholder="Select Date To"
                                v-model="leave.to"
                                disabled
                            ></DatePicker>
                        </v-flex>
                        <v-flex xs12 lg6 v-if="leave.type == 'VL - Half' || leave.type == 'SL - Half' || leave.type == 'PTO - Half' ? true : false">
                            <TimePicker
                                label="Time From"
                                placeholder="Select Time From"
                                v-model="leave.time_from"
                                disabled
                            ></TimePicker>
                        </v-flex>
                        <v-flex xs12 lg6 v-if="leave.type == 'VL - Half' || leave.type == 'SL - Half' || leave.type == 'PTO - Half' ? true : false">
                            <TimePicker
                                label="Time To"
                                placeholder="Select Time To"
                                v-model="leave.time_to"
                                disabled
                            ></TimePicker>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="" block color="error">DELETE</v-btn>
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
            let {data} = await $axios.$get(`/sa/leaves/${params.id}`);

            return {
                leave: data
            }
        },
        methods: {
            async remove () {
                let {data} = await this.$axios.$delete(`/sa/leaves/${this.$route.params.id}`);
                this.$router.push('/sa/timekeeping/leave-requests');
                alert(`${this.leave.employee.first_name} ${this.leave.employee.last_name}'s Leave Request #${this.leave.id} is deleted!`);
            }
        }
    }
</script>
