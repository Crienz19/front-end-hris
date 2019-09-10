<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon color="info" v-on="on" small>
          <v-icon small>search</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h3>{{ this.leave.employee.first_name }} {{ this.leave.employee.last_name }}'s Leave Request</h3>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
            <v-icon small>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs6>
              <v-text-field
                label="Type"
                :value="leave.type"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field
                  label="Pay"
                  :value="leave.pay_type"
                  disabled
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                label="Reason"
                :value="leave.reason"
                disabled
              ></v-textarea>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                label="From"
                :value="leave.from"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                label="To"
                :value="leave.to"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6 v-if="leave.time_from">
              <v-text-field
                label="Time From"
                :value="leave.time_from"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6 v-if="leave.time_to">
              <v-text-field
                label="Time To"
                :value="leave.time_to"
                disabled
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <!--<v-card-actions>
            <v-btn :disabled="leave.final_approval == 'Approved'" color="success" block @click="approveLeave">Approve</v-btn>
            <v-btn :disabled="leave.final_approval == 'Disapproved'" color="error" block @click="disapproveLeave">Disapprove</v-btn>
        </v-card-actions>-->
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: [
      'leave'
    ],
    data: () => ({
      dialog: false,
    }),
    methods: {
      async approveLeave () {
        await this.$axios.$patch(this.leave.actions.approve)
        .then((response) => {
          this.$store.dispatch('leave/loadAdminLeaveEmp');
          this.$swal.fire({
            type: 'success',
            title: response.message
          });
        }).catch(error => {
          this.$swal.fire({
            type: 'error',
            title: 'Something went wrong!'
          })
        })
      },
      async disapproveLeave () {
        await this.$axios.$patch(this.leave.actions.disapprove)
        .then((response) => {
          this.$store.dispatch('leave/loadAdminLeaveEmp');
          this.$swal.fire({
            type: 'success',
            title: response.message
          })
        }).catch(error => {
          this.$swal.fire({
            type: 'error',
            title: 'Something went wrong!'
          })
        });
      }
    }
  }
</script>