<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="ma-0" small icon v-on="on">
            <v-icon small>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Leave</span>
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
                        :rules="[
                            () => !!form.from || 'This field is required. '
                        ]"
                    ></DatePicker>
                </v-flex>
                <v-flex xs12 lg6>
                    <DatePicker
                        label="To"
                        placeholder="Select Date To"
                        v-model="form.to"
                        :rules="[
                            () => !!form.to || 'This field is required.'
                        ]"
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
          <v-btn :disabled="isFilled" color="primary" block text @click="updateLeave">Update</v-btn>
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
        props: [
            'leave'
        ],
        data () {
            return {
                dialog: false,
                form: {
                    id: this.leave.id,
                    type: this.leave.type,
                    pay_type: this.leave.pay_type,
                    from: this.leave.from,
                    to: this.leave.to,
                    time_from: this.leave.time_from,
                    time_to: this.leave.time_to,
                    reason: this.leave.reason
                }
            }
        },
        methods: {
            async updateLeave () {
                await this.$axios.$patch(this.leave.actions.update, this.form)
                this.$store.dispatch('leave/loadEmployeeLeaves');
                this.dialog = false;
            }
        }
    }
</script>