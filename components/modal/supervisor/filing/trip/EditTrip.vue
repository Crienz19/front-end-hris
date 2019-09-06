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
          <v-btn color="primary" block text @click="addTrip">Add</v-btn>
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
            'trip'
        ],
        data () {
            return {
                dialog: false,
                form: {
                    id: this.trip.id,
                    date_from: this.trip.date_from,
                    date_to: this.trip.date_to,
                    time_in: this.trip.time_in,
                    time_out: this.trip.time_out,
                    destination_from: this.trip.destination_from,
                    destination_to: this.trip.destination_to,
                    purpose: this.trip.purpose
                }
            }
        },
        methods: {
            async addTrip () {
                await this.$store.dispatch('trip/updateEmployeeTrip', this.form);
                this.dialog = false;
            }
        }
    }
</script>