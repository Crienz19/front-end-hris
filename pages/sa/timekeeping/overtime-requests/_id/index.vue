<template>
    <v-layout row wrap>
        <v-flex xs12 md6 offset-md3>
            <v-alert type="info" :value="true">
                This is an info alert
            </v-alert>
        </v-flex>
        <v-flex xs12 md6 offset-md3>
            <v-card>
                <v-card-title>
                    {{ overtime.employee.first_name }} {{ overtime.employee.last_name }}'s Overtime Request #{{ overtime.id }}
                    <v-spacer></v-spacer>
                    <v-btn color="warning" to="/sa/timekeeping/overtime-requests">Go Back</v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-container grid-list-lg>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <DatePicker
                                label="Date"
                                placeholder="Select Overtime Date"
                                v-model="overtime.date"
                                disabled
                            ></DatePicker>
                        </v-flex>
                        <v-flex xs12 lg6>
                            <TimePicker
                                label="From"
                                placeholder="Select Overtime From"
                                v-model="overtime.from.standard"
                                disabled
                            ></TimePicker>
                        </v-flex>
                        <v-flex xs12 lg6>
                            <TimePicker
                                label="To"
                                placeholder="Select Overtime To"
                                v-model="overtime.to.standard"
                                disabled
                            ></TimePicker>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                label="Reason"
                                placeholder="Type your overtime reason..."
                                v-model="overtime.reason"
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
            let {data} = await $axios.$get(`/sa/overtimes/${params.id}`);

            return {
                overtime: data
            }
        },
        methods: {
            async remove () {
                let {data} = await this.$axios.$delete(`/sa/overtimes/${this.$route.params.id}`);
                this.$router.push('/sa/timekeeping/overtime-requests');
                alert(`${this.overtime.employee.first_name} ${this.overtime.employee.last_name}'s Overtime Request #${this.overtime.id} is deleted!`);
            }
        }
    }
</script>
