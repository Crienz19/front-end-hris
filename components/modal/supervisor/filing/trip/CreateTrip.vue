<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" small round v-on="on">Create</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create Trip</span>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
              <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 lg6>
                    <DatePicker
                        label="Date From"
                        placeholder="Select date from ..."
                        v-model="form.date_from"
                    ></DatePicker>
                </v-flex>
                <v-flex xs12 lg6>
                    <DatePicker
                        label="Date To"
                        placeholder="Select date to ..."
                        v-model="form.date_to"
                    ></DatePicker>
                </v-flex>
                <v-flex xs12 lg6>
                    <TimePicker
                        label="Time In"
                        placeholder="Select Time In"
                        v-model="form.time_in"
                    ></TimePicker>
                </v-flex>
                <v-flex xs12 lg6>
                    <TimePicker
                        label="Time Out"
                        placeholder="Select Time Out"
                        v-model="form.time_out"
                    ></TimePicker>
                </v-flex>
                <v-flex xs12 lg6>
                    <v-text-field
                        label="Destination From"
                        placeholder="Enter your destination from..."
                        v-model="form.destination_from"
                    ></v-text-field>
                </v-flex>
                <v-flex xs1 lg6>
                    <v-text-field
                        label="Destination To"
                        placeholder="Enter your destination to..."
                        v-model="form.destination_to"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-textarea
                        label="Purpose"
                        placeholder="Enter your purpose..."
                        v-model="form.purpose"
                    ></v-textarea>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn :disabled="isFilled" color="primary" block text @click="addTrip">Add</v-btn>
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
                    date_from: '',
                    date_to: '',
                    time_in: '',
                    time_out: '',
                    destination_from: '',
                    destination_to: '',
                    purpose: ''
                }
            }
        },
        computed: {
            isFilled () {
                if (!this.form.date_from) {
                    return true;
                } else if (!this.form.date_to) {
                    return true;
                } else if (!this.form.time_in) {
                    return true;
                } else if (!this.form.time_out) {
                    return true;
                } else if (!this.form.destination_from) {
                    return true;
                } else if (!this.form.destination_to) {
                    return true;
                } else if (!this.form.purpose) {
                    return true;
                }
                return false;
            }
        },
        methods: {
            async addTrip () {
                await this.$store.dispatch('trip/storeEmployeeTrip', this.form);
                this.form.date_from = '';
                this.form.date_to = '';
                this.form.time_in = '';
                this.form.time_out = '';
                this.form.destination_from = '';
                this.form.destination_to = '';
                this.form.purpose = '';
                this.dialog = false;
            }
        }
    }
</script>