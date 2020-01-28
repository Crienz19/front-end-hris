<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="info" class="ma-1" small icon v-on="on">
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
          <v-container grid-list-lg>
            <v-row dense>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-select
                        :placeholder="leave.type"
                        :items="['VL', 'SL', 'PTO', 'VL - Half', 'SL - Half', 'PTO - Half', 'Special', 'Special - Half']"
                        v-model="form.type"
                        label="Type"
                        :rules="[
                            () => !!form.type || 'This field is required.'
                        ]"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-select
                        :placeholder="leave.pay_type"
                        :items="['With Pay', 'Without Pay']"
                        v-model="form.pay_type"
                        label="Pay"
                        :rules="[
                            () => !!form.pay_type || 'This field is required.'
                        ]"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        label="Reason"
                        :placeholder="leave.reason"
                        v-model="form.reason"
                        :rules="[
                            () => !!form.reason || 'This field is required.'
                        ]"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <DatePicker
                        label="From"
                        :placeholder="leave.from"
                        v-model="form.from"
                        :rules="[
                            () => !!form.from || 'This field is required. '
                        ]"
                    ></DatePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <DatePicker
                        label="To"
                        :placeholder="leave.to"
                        v-model="form.to"
                        :rules="[
                            () => !!form.to || 'This field is required.'
                        ]"
                    ></DatePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6" v-if="form.type == 'VL - Half' || form.type == 'SL - Half' || form.type == 'PTO - Half' || form.type == 'Special - Half' ? true : false">
                    <TimePicker
                        label="Time From"
                        :placeholder="leave.time_from ? leave.time_from.standard : ''"
                        v-model="form.time_from"
                        :rules="[
                            () => !!form.time_from || 'This field is required.'
                        ]"
                    ></TimePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6" xs12 lg6 v-if="form.type == 'VL - Half' || form.type == 'SL - Half' || form.type == 'PTO - Half' || form.type == 'Special - Half' ? true : false">
                    <TimePicker
                        label="Time To"
                        :placeholder="leave.time_to ? leave.time_to.standard : ''"
                        v-model="form.time_to"
                        :rules="[
                            () => !!form.time_to || 'This field is required.'
                        ]"
                    ></TimePicker>
                </v-col>
                <v-col cols="12">
                    <v-btn :disabled="isFilled" color="primary" block @click="updateLeave">Update</v-btn>
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
            async updateLeave () {
                await this.$store.dispatch('leave/update', this.form);
                this.dialog = false;
                alert('Leave Updated!');
            }
        }
    }
</script>