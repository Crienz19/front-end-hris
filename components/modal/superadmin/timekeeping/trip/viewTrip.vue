<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" small>
          <v-icon>search</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h3>{{ this.trip.employee.first_name }} {{ this.trip.employee.last_name }}'s Trip Request</h3>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
            <v-icon small>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md6>
                <v-text-field
                    label="Date From"
                    :value="trip.date_from"
                    disabled
                ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
                <v-text-field
                    label="Date To"
                    :value="trip.date_to"
                    disabled
                ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
                <v-text-field
                    label="Time From"
                    :value="trip.time_in.standard"
                    disabled
                ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
                <v-text-field
                    label="Time To"
                    :value="trip.time_out.standard"
                    disabled
                ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
                <v-text-field
                    label="Destination From"
                    :value="trip.destination_from"
                    disabled
                ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
                <v-text-field
                    label="Destination To"
                    :value="trip.destination_to"
                    disabled
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-textarea
                    label="Purpose of Trip"
                    :value="trip.purpose"
                    disabled
                ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" block @click="deleteTrip">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: [
      'trip'
    ],
    data: () => ({
      dialog: false,
    }),
    methods: {
      async deleteTrip () {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
          if (result.value) {
            await this.$store.dispatch(`trip/delete`, this.trip.id);
            this.dialog = false;
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      }
    }
  }
</script>