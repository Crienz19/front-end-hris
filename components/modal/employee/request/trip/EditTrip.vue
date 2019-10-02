<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="info" class="ma-1" small icon v-on="on">
            <v-icon small>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Trip</span>
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
                        :placeholder="trip.date_from"
                        v-model="form.date_from"
                    ></DatePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <DatePicker
                        label="Date To"
                        :placeholder="trip.date_to"
                        v-model="form.date_to"
                    ></DatePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <TimePicker
                        label="Time In"
                        :placeholder="trip.time_in.standard"
                        v-model="form.time_in"
                    ></TimePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <TimePicker
                        label="Time Out"
                        :placeholder="trip.time_out.standard"
                        v-model="form.time_out"
                    ></TimePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-text-field
                        label="Destination From"
                        :placeholder="trip.destination_from"
                        v-model="form.destination_from"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-text-field
                        label="Destination To"
                        :placeholder="trip.destination_to"
                        v-model="form.destination_to"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        label="Purpose"
                        :placeholder="trip.purpose"
                        v-model="form.purpose"
                    ></v-textarea>
                </v-col>
                <v-col cols="12">
                    <v-btn :disabled="isFilled" color="primary" block @click="updateTrip">Update</v-btn>
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
            'trip'
        ],
        data () {
            return {
                dialog: false,
                form: {
                    id: this.trip.id,
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
            async updateTrip () {
                await this.$axios.$patch(this.trip.actions.update, this.form)
                .then((response) => {
                    this.$store.dispatch('trip/loadEmployeeTrips');
                    this.dialog = false;
                    this.form.date_from = '';
                    this.form.date_to = '';
                    this.form.time_in = '';
                    this.form.time_out = '';
                    this.form.destination_from = '';
                    this.form.destination_to = '';
                    this.purpose = '';
                })
                
            }
        }
    }
</script>