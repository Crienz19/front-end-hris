<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">Create</v-btn>
      </template>
      <v-card 
        :loading="loading"
      >
        <v-card-title>
          <span class="headline">Create COE</span>
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
                    <v-btn :disabled="isFilled" color="primary" block @click="addCOE">Submit Request</v-btn>
                </v-col>
            </v-row>
        </v-container>
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
            async addCOE () {
                this.loading = true;
                await this.$store.dispatch('coe/save', this.form);
                this.loading = false;
                this.dialog = false;
                alert('COE Added!');
            }
        }
    }
</script>