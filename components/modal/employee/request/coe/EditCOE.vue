<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="ma-0" color="info" small icon v-on="on">
            <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <v-card
        :loading="loading"
      >
        <v-card-title>
          <span class="headline">Edit COE</span>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
              <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-lg>
            <v-row dense>
                <v-col cols="12">
                    <date-picker
                        label="Date Needed"
                        placeholder="Select Date Needed"
                        v-model="form.date_needed"
                    ></date-picker>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        label="Reason"
                        placeholder="Please enter your valid reason..."
                        v-model="form.reason"
                        :rules="[
                            () => !!form.reason || 'This field is required.'
                        ]"
                    ></v-textarea>
                </v-col>
                <v-col cols="12">
                    <i>Please check if we need to indicate your compensation</i>
                    <v-checkbox v-model="form.compensation" label="With Compensation"></v-checkbox>
                </v-col>
                <v-col cols="12">
                    <v-btn :disabled="isFilled" color="primary" block @click="updateCOE">Update Request</v-btn>
                </v-col>
            </v-row>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
    import DatePicker from '@/components/datepicker/Datepicker-No-Button.vue';
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
            async updateCOE () {
                this.loading = true;
                await this.$axios.$patch(this.coe.actions.update, this.form)
                .then((response) => {
                    this.$store.dispatch('coe/loadEmployeeCOEs');
                    this.loading = false;
                    this.dialog = false;
                    alert('Request Submitted');
                }).catch(error => {
                    this.loading = false;
                    alert('Something went wrong');
                })
            }
        }
    }
</script>