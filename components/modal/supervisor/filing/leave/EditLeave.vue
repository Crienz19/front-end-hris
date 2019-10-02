<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="info" class="ma-1" small icon v-on="on">
            <v-icon>edit</v-icon>
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
            <v-row dense>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-select
                        placeholder="Select Leave"
                        :items="['VL', 'SL', 'PTO', 'VL - Half', 'SL - Half', 'PTO - Half']"
                        v-model="form.type"
                        label="Type"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-select
                        placeholder="Select Pay"
                        :items="['With Pay', 'Without Pay']"
                        v-model="form.pay_type"
                        label="Pay"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        label="Reason"
                        placeholder="Type your valid reason..."
                        v-model="form.reason"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <DatePicker
                        label="From"
                        placeholder="Select Date From"
                        v-model="form.from"
                    ></DatePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <DatePicker
                        label="To"
                        placeholder="Select Date To"
                        v-model="form.to"
                    ></DatePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6" v-if="form.type == 'VL - Half' || form.type == 'SL - Half' || form.type == 'PTO - Half' ? true : false">
                    <TimePicker
                        label="Time From"
                        placeholder="Select Time From"
                        v-model="form.time_from"
                    ></TimePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6" v-if="form.type == 'VL - Half' || form.type == 'SL - Half' || form.type == 'PTO - Half' ? true : false">
                    <TimePicker
                        label="Time To"
                        placeholder="Select Time To"
                        v-model="form.time_to"
                    ></TimePicker>
                </v-col>
                <v-col cols="12">
                    <v-btn color="primary" block @click="updateLeave">Update</v-btn>
                </v-col>
            </v-row>
        </v-container>
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
                await this.$axios.$patch(`/sv/leaves/${this.leave.id}`, this.form)
                    .then((response) => {
                        alert('Updated!');
                        this.$store.dispatch('leave/loadEmployeeLeaves');
                    }).catch(error => {
                        alert('Someting went wrong!');
                    })
                this.dialog = false;
            }
        }
    }
</script>