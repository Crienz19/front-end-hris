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
                  <v-btn  color="primary" block @click="updateOvertime">Update</v-btn>
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