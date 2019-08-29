<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" small round v-on="on">Create</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create COE</span>
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
                    ></v-textarea>
                </v-flex>
                <v-flex xs12>
                    <i>Please check if we need to indicate your compensation</i>
                    <v-checkbox v-model="form.compensation" label="With Compensation"></v-checkbox>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn :disabled="isFilled" :loading="loading" color="primary" block text @click="addCOE">Submit Request</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
    import DatePicker from '@/components/datepicker/Datepicker-No-Button.vue';
    export default {
        components: {
            DatePicker
        },
        data() {
            return {
                loading: false,
                dialog: false,
                form: {
                    date_needed: '',
                    compensation: false,
                    reason: ''
                }
            }
        },
        computed: {
            isFilled () {
                if (!this.form.date_needed) {
                    return true;
                } else if (!this.form.reason) {
                    return true;
                }

                return false;
            }
        },
        methods: {
            addCOE () {
                this.loading = true;
                this.$axios.$post('/em/coes', this.form)
                .then((response) => {
                    this.$store.dispatch('coe/loadEmployeeCOEs');
                    this.loading = false;
                    this.dialog = false;
                    alert('Request Submitted');
                }).catch(error => {
                    this.loading = false;
                    alert('Something went wrong!');
                });
            }
        }
    }
</script>