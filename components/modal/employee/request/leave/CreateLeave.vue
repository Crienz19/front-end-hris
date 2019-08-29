<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" small round v-on="on">Create</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create Leave</span>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
              <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
          <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 lg6>
                    <v-select
                        placeholder="Select Leave"
                        :items="['VL', 'SL', 'PTO', 'VL - Half', 'SL - Half', 'PTO - Half']"
                        v-model="form.type"
                        label="Type"
                        :rules="[
                            () => !!form.type || 'This field is required.'
                        ]"
                    ></v-select>
                </v-flex>
                <v-flex xs12 lg6>
                    <v-select
                        placeholder="Select Pay"
                        :items="['With Pay', 'Without Pay']"
                        v-model="form.pay_type"
                        label="Pay"
                        :rules="[
                            () => !!form.pay_type || 'This field is required.'
                        ]"
                    ></v-select>
                </v-flex>
                <v-flex xs12>
                    <v-textarea
                        label="Reason"
                        placeholder="Type your valid reason..."
                        v-model="form.reason"
                        :rules="[
                            () => !!form.reason || 'This field is required.'
                        ]"
                    ></v-textarea>
                </v-flex>
                <v-flex xs12 lg6>
                    <DatePicker
                        label="From"
                        placeholder="Select Date From"
                        v-model="form.from"
                    ></DatePicker>
                </v-flex>
                <v-flex xs12 lg6>
                    <DatePicker
                        label="To"
                        placeholder="Select Date To"
                        v-model="form.to"
                    ></DatePicker>
                </v-flex>
                <v-flex xs12 lg6 v-if="form.type == 'VL - Half' || form.type == 'SL - Half' || form.type == 'PTO - Half' ? true : false">
                    <TimePicker
                        label="Time From"
                        placeholder="Select Time From"
                        v-model="form.time_from"
                        :rules="[
                            () => !!form.time_from || 'This field is required.'
                        ]"
                    ></TimePicker>
                </v-flex>
                <v-flex xs12 lg6 v-if="form.type == 'VL - Half' || form.type == 'SL - Half' || form.type == 'PTO - Half' ? true : false">
                    <TimePicker
                        label="Time To"
                        placeholder="Select Time To"
                        v-model="form.time_to"
                        :rules="[
                            () => !!form.time_to || 'This field is required.'
                        ]"
                    ></TimePicker>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn :disabled="isFilled" :loading="loading" color="primary" block text @click="addLeave">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
    import DatePicker from "@/components/datepicker/Datepicker-No-Button.vue";
    import TimePicker from "@/components/timepicker/Timepicker-Menu.vue";
    export default {
        components: {
            DatePicker,
            TimePicker
        },
        data () {
            return {
                dialog: false,
                loading: false,
                form: {
                    type: '',
                    pay_type: '',
                    from: '',
                    to: '',
                    time_from: '',
                    time_to: '',
                    reason: ''
                }
            }
        },
        computed: {
            isFilled () {
                if (!this.form.type) {
                    return true;
                } else if (!this.form.pay_type) {
                    return true;
                } else if (!this.form.from) {
                    return true;
                } else if (!this.form.to) {
                    return true;
                } else if (!this.form.reason) {
                    return true;
                }
                return false;
            }
        },
        methods: {
            async addLeave () {
                this.loading = true;
                await this.$axios.$post('/em/leaves', this.form)
                    .then((response) => {
                        alert('Leave Added!');
                        this.loading = false;
                        this.$store.dispatch('leave/loadEmployeeLeaves');
                        this.form.type = '';
                        this.form.pay_type = '';
                        this.form.from = '';
                        this.form.to = '';
                        this.form.time_from = '';
                        this.form.time_to = '';
                        this.form.reason = '';
                        this.dialog = false;
                    }).catch(error => {
                        alert('Something went wrong');
                        this.loading = false;
                    });
            }
        }
    }
</script>