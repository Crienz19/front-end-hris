<template>
  <v-dialog v-model="dialog" persistent max-width="550px">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" small>
        <v-icon>search</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h3>{{ this.overtime.employee.first_name }} {{ this.overtime.employee.last_name }}'s Overtime Request</h3>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" icon small>
          <v-icon small>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-container grid-list-lg>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              label="Type"
              :value="overtime.date"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              label="From"
              :value="overtime.from.standard"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              label="To"
              :value="overtime.to.standard"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Reason"
              :value="overtime.reason"
              disabled
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-btn :disabled="overtime.status == 'Approved'" color="success" block @click="approveOvertime">Approve</v-btn>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-btn :disabled="overtime.status == 'Disapproved'" color="error" block @click="disapproveOvertime">Disapprove</v-btn>        
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: [
      'overtime'
    ],
    data: () => ({
      dialog: false,
    }),
    methods: {
      async approveOvertime () {
          await this.$axios.$patch(this.overtime.actions.approve)
          .then((response) => {
              this.$store.dispatch('overtime/loadHrOvertimes');
              alert('Overtime Approved');
          }).catch(error => {
              alert('Something went wrong');
          })
      },
      async disapproveOvertime () {
          await this.$axios.$patch(this.overtime.actions.disapprove)
          .then((response) => {
              this.$store.dispatch('overtime/loadHrOvertimes');
              alert('Overtime Disapproved!');
          }).catch(error => {
              alert('Something went wrong');
          });
      }
    }
  }
</script>