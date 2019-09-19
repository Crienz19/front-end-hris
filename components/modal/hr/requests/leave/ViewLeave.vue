<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="550px">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" small>
          <v-icon>search</v-icon>
        </v-btn>
      </template>
      <v-card :loading="loading">
        <v-card-title>
          <h3>{{ this.leave.employee.first_name }} {{ this.leave.employee.last_name }}'s Leave Request</h3>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
            <v-icon small>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container grid-list-lg>
          <v-row dense>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-text-field label="Type" :value="leave.type" disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-text-field label="Pay" :value="leave.pay_type" disabled></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea label="Reason" :value="leave.reason" disabled></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-text-field label="From" :value="leave.from" disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-text-field label="To" :value="leave.to" disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6" v-if="leave.time_from">
              <v-text-field label="Time From" :value="leave.time_from" disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6" v-if="leave.time_to">
              <v-text-field label="Time To" :value="leave.time_to" disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-btn :disabled="leave.final_approval == 'Approved'" color="success" block @click="approveLeave">Approve</v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-btn :disabled="leave.final_approval == 'Disapproved'" color="error" block @click="disapproveLeave" >Disapprove</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ["leave"],
  data () {
    return {
      dialog: false,
      loading: false
    }
  },
  methods: {
    async approveLeave() {
      this.loading = true;
      await this.$axios
        .$patch(this.leave.actions.approve)
        .then(response => {
          this.$store.dispatch("leave/loadHrLeaves");
          this.$swal.fire({
            type: "success",
            title: response.message
          });
          this.loading = false
        })
        .catch(error => {
          this.$swal.fire({
            type: "error",
            title: "Something went wrong!"
          });
          this.loading = false;
        });
    },
    async disapproveLeave() {
      this.loading = true;
      await this.$axios
        .$patch(this.leave.actions.disapprove)
        .then(response => {
          this.$store.dispatch("leave/loadHrLeaves");
          this.$swal.fire({
            type: "success",
            title: response.message
          });
          this.loading = false;
        })
        .catch(error => {
          this.$swal.fire({
            type: "error",
            title: "Something went wrong!"
          });
          this.loading = false;
        });
    }
  }
};
</script>