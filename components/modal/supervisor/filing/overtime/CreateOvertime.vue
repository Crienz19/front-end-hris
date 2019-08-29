<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" small round v-on="on">Create</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create Overtime</span>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
              <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12>
                    <DatePicker
                        label="Date"
                        placeholder="Select Overtime Date"
                        v-model="form.date"
                    ></DatePicker>
                </v-flex>
                <v-flex xs12 lg6>
                    <TimePicker
                        label="From"
                        placeholder="Select Overtime From"
                        v-model="form.from"
                    ></TimePicker>
                </v-flex>
                <v-flex xs12 lg6>
                    <TimePicker
                        label="To"
                        placeholder="Select Overtime To"
                        v-model="form.to"
                    ></TimePicker>
                </v-flex>
                <v-flex xs12>
                    <v-textarea
                        label="Reason"
                        placeholder="Type your overtime reason..."
                        v-model="form.reason"
                        :rules="[
                            () => !!form.reason || 'This field is required.'
                        ]"
                    ></v-textarea>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn :disabled="isFilled" color="primary" block text @click="addOvertime">Add</v-btn>
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
                form: {
                    date: '',
                    from: '',
                    to: '',
                    reason: ''
                }
            }
        },
        computed: {
            isFilled () {
                if (!this.form.date) {
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
            async addOvertime () {
                await this.$axios.$post('/sv/overtimes', this.form)
                this.$store.dispatch('overtime/loadEmployeeOvertimes');
                this.form.date = '';
                this.form.from = '';
                this.form.to = '';
                this.form.reason = '';
                this.dialog = false;
            }
        }
    }
</script>