<template>
    <v-dialog v-model="dialog" persistent max-width="550px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">Create</v-btn>
      </template>
      <v-card :loading="loading">
        <v-card-title>
          <span class="headline">Create Overtime</span>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
              <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container grid-list-lg>
            <v-row dense>
                <v-col cols="12">
                    <DatePicker
                        label="Date"
                        placeholder="Select Overtime Date"
                        v-model="form.date"
                    ></DatePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <TimePicker
                        label="From"
                        placeholder="Select Overtime From"
                        v-model="form.from"
                    ></TimePicker>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <TimePicker
                        label="To"
                        placeholder="Select Overtime To"
                        v-model="form.to"
                    ></TimePicker>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        label="Reason"
                        placeholder="Type your overtime reason..."
                        v-model="form.reason"
                        :rules="[
                            () => !!form.reason || 'This field is required.'
                        ]"
                    ></v-textarea>
                </v-col>
                <v-col cols="12">
                    <v-btn :disabled="isFilled" color="primary" block @click="addOvertime">Submit Request</v-btn>
                </v-col>
            </v-row>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
    import DatePicker from "@/components/datepicker/Datepicker-No-Button.vue";
    import TimePicker from "@/components/timepicker/Timepicker-Menu.vue";
    export default {
        components: {
            DatePicker,
            TimePicker
        },
        data () {
            return {
                dialog: false,
                loading: false,
                form: {
                    date: '',
                    from: '',
                    to: '',
                    reason: ''
                }
            }
        },
        computed: {
            isFilled () {
                if (!this.form.date) {
                    return true;
                } else if (!this.form.from) {
                    return true;
                } else if (!this.form.to) {
                    return true;
                } else if (!this.form.reason) {
                    return true;
                }
                return false;
            }
        },
        methods: {
            async addOvertime () {
                this.loading = true;
                await this.$store.dispatch('overtime/save', this.form);
                this.loading = false;
                this.dialog = false;
                alert('Overtime Added!');
            }
        }
    }
</script>