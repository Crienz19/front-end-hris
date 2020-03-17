<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="info" class="ma-1" small icon v-on="on">
            <v-icon>edit</v-icon>
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
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-text-field
                        label="Destination To"
                        placeholder="Enter your destination to..."
                        v-model="form.destination_to"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        label="Purpose"
                        placeholder="Enter your purpose..."
                        v-model="form.purpose"
                    ></v-textarea>
                </v-col>
                <v-col cols="12">
                    <v-btn color="primary" block @click="updateTrip">Update</v-btn>
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
                    date_from: this.trip.date_from,
                    date_to: this.trip.date_to,
                    time_in: this.trip.time_in.other,
                    time_out: this.trip.time_out.other,
                    destination_from: this.trip.destination_from,
                    destination_to: this.trip.destination_to,
                    purpose: this.trip.purpose
                }
            }
        },
        methods: {
            async updateTrip () {
                await this.$store.dispatch('trip/update', this.form);
                this.dialog = false;
            }
        }
    }
</script>