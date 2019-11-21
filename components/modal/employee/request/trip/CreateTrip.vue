<template>
    <v-dialog v-model="dialog" persistent max-width="550px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">Create</v-btn>
      </template>
      <v-card :loading="loading">
        <v-card-title>
          <span class="headline">Create Trip</span>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
              <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container grid-list-lg>
            <v-row dense>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <DatePicker
                        label="Date From"
                        placeholder="Select date from ..."
                        v-model="form.date_from"
                    ></DatePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <DatePicker
                        label="Date To"
                        placeholder="Select date to ..."
                        v-model="form.date_to"
                    ></DatePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <TimePicker
                        label="Time In"
                        placeholder="Select Time In"
                        v-model="form.time_in"
                    ></TimePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <TimePicker
                        label="Time Out"
                        placeholder="Select Time Out"
                        v-model="form.time_out"
                    ></TimePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-text-field
                        label="Destination From"
                        placeholder="Enter your destination from..."
                        v-model="form.destination_from"
                        :rules="[
                            () => !!form.destination_from || 'This field is required.'
                        ]"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-text-field
                        label="Destination To"
                        placeholder="Enter your destination to..."
                        v-model="form.destination_to"
                        :rules="[
                            () => !!form.destination_to || 'This field is required.'
                        ]"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        label="Purpose"
                        placeholder="Enter your purpose..."
                        v-model="form.purpose"
                        :rules="[
                            () => !!form.purpose || 'This field is required.'
                        ]"
                    ></v-textarea>
                </v-col>
                <v-col cols="12">
                    <v-btn :disabled="isFilled" color="primary" block @click="addTrip">Submit Request</v-btn>
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
        data () {
            return {
                dialog: false,
                loading: false,
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
                this.loading = true;
                await this.$store.dispatch('trip/save', this.form);
                this.loading = false;
                this.dialog = false;
            }
        }
    }
</script>