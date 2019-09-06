<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="info" icon v-on="on" small>
          <v-icon small>search</v-icon>
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
        <v-divider></v-divider>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                label="Type"
                :value="overtime.date"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                label="From"
                :value="overtime.from.standard"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                label="To"
                :value="overtime.to.standard"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                label="Reason"
                :value="overtime.reason"
                disabled
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn :loading="loading1" :disabled="overtime.status == 'Approved'" color="success" block @click="approveOvertime">Approve</v-btn>
            <v-btn :loading="loading2" :disabled="overtime.status == 'Disapproved'" color="error" block @click="disapproveOvertime">Disapprove</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: [
      'overtime'
    ],
    data: () => ({
      dialog: false,
      loading1: false,
      loading2: false
    }),
    methods: {
      async approveOvertime () {
          this.loading1 = true;
          await this.$axios.$patch(this.overtime.actions.approve)
          .then((response) => {
              this.$store.dispatch('overtime/loadSupervisorOvertimes');
              alert('Overtime Approved');
              this.loading1 = false;
          }).catch(error => {
              alert('Something went wrong');
              this.loading1 = false;
          })
      },
      async disapproveOvertime () {
          this.loading2 = true;
          await this.$axios.$patch(this.overtime.actions.disapprove)
          .then((response) => {
              this.$store.dispatch('overtime/loadSupervisorOvertimes');
              alert('Overtime Disapproved!');
              this.loading2 = false;
          }).catch(error => {
              alert('Something went wrong');
              this.loading2 = false;
          });
      }
    }
  }
</script>