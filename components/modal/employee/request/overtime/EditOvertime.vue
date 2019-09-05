<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="info" class="ma-1" small icon v-on="on">
            <v-icon small>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Overtime</span>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
              <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12>
                    <DatePicker
                        label="Date"
                        placeholder="Select Overtime Date"
                        v-model="form.date"
                    ></DatePicker>
                </v-flex>
                <v-flex xs12 lg6>
                    <TimePicker
                        label="From"
                        placeholder="Select Overtime From"
                        v-model="form.from"
                    ></TimePicker>
                </v-flex>
                <v-flex xs12 lg6>
                    <TimePicker
                        label="To"
                        placeholder="Select Overtime To"
                        v-model="form.to"
                    ></TimePicker>
                </v-flex>
                <v-flex xs12>
                    <v-textarea
                        label="Reason"
                        placeholder="Type your overtime reason..."
                        v-model="form.reason"
                        :rules="[
                            () => !!form.reason || 'This field is required.'
                        ]"
                    ></v-textarea>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn  color="primary" block text @click="updateOvertime">Update</v-btn>
        </v-card-actions>
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
        props: [
            'overtime'
        ],
        data () {
            return {
                dialog: false,
                form: {
                    id: this.overtime.id,
                    date: this.overtime.date,
                    from: this.overtime.from.other,
                    to: this.overtime.to.other,
                    reason: this.overtime.reason
                }
            }
        },
        methods: {
            async updateOvertime () {
                await this.$axios.$patch(this.overtime.actions.update, this.form)
                .then((response) => {
                    this.$store.dispatch('overtime/loadEmployeeOvertimes');
                    alert('Overtime Updated!');
                }).catch(error => {
                    alert('Something went wrong');
                })
                this.dialog = false;
            }
        }
    }
</script>