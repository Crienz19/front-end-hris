<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="ma-0" color="info" small icon v-on="on">
            <v-icon small>search</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">COE Request</span>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
              <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12>
                    <date-picker
                        label="Date Needed"
                        placeholder="Select Date Needed"
                        v-model="form.date_needed"
                        disabled
                    ></date-picker>
                </v-flex>
                <v-flex xs12>
                    <v-textarea
                        label="Reason"
                        placeholder="Please enter your valid reason..."
                        v-model="form.reason"
                        :rules="[
                            () => !!form.reason || 'This field is required.'
                        ]"
                        disabled
                    ></v-textarea>
                </v-flex>
                <v-flex xs12>
                    <i>Please check if we need to indicate your compensation</i>
                    <v-checkbox v-model="form.compensation" label="With Compensation" disabled></v-checkbox>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn :disabled="coe.status == 'Acknowledged'" :loading="loading" color="primary" block text @click="acknowledgeRequest">Acknowledge Request</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
    import DatePicker from '@/components/datepicker/DatePicker-No-Button.vue';
    export default {
        props: [
            'coe'
        ],
        components: {
            DatePicker
        },
        data() {
            return {
                loading: false,
                dialog: false,
                form: {
                    date_needed: this.coe.date_needed,
                    compensation: this.coe.compensation,
                    reason: this.coe.reason
                }
            }
        },
        methods: {
            async acknowledgeRequest() {
                this.loading = true;
                await this.$axios.$patch(this.coe.actions.acknowledge)
                    .then((response) => {
                        this.$store.dispatch('coe/loadHumanResourceCOEs');
                        this.loading = false;
                        this.dialog = false;
                        alert('Request Acknowledged!');
                    })
            } 
        }
    }
</script>