<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" small>
          <v-icon>search</v-icon>
        </v-btn>
      </template>
      <v-card :loading="loading">
        <v-card-title>
          <h3>{{ this.trip.employee.first_name }} {{ this.trip.employee.last_name }}'s Trip Request</h3>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
            <v-icon small>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container grid-list-lg>
          <v-row dense>
            <v-col cols="12" sm="12" md="6" lg="6">
                <v-text-field
                    label="Date From"
                    :value="trip.date_from"
                    disabled
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
                <v-text-field
                    label="Date To"
                    :value="trip.date_to"
                    disabled
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
                <v-text-field
                    label="Time From"
                    :value="trip.time_in.standard"
                    disabled
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
                <v-text-field
                    label="Time To"
                    :value="trip.time_out.standard"
                    disabled
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
                <v-text-field
                    label="Destination From"
                    :value="trip.destination_from"
                    disabled
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
                <v-text-field
                    label="Destination To"
                    :value="trip.destination_to"
                    disabled
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-textarea
                    label="Purpose of Trip"
                    :value="trip.purpose"
                    disabled
                ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-btn :disabled="trip.status == 'Acknowledged'" color="success" block @click="acknowledgedTrip">Acknowledge Trip</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: [
      'trip'
    ],
    data() {
      return {
        dialog: false,
        loading: false
      }
    },
    methods: {
      async acknowledgedTrip () {
        this.loading = true;
        await this.$axios.$patch(this.trip.actions.acknowledge)
        .then((response) => {
            this.$store.dispatch('trip/loadHrTrips');
            this.loading = false;
            this.$swal.fire({
              type: 'success',
              title: response.message
            });
        }).catch(error => {
            this.loading = false;            
            this.$swal.fire({
              type: 'error',
              title: 'Something went wrong'
            })
        });
      }
    }
  }
</script>