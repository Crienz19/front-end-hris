<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on" icon>
            <v-icon>filter_list</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Filter Overtime</h2>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" color="default" icon>
              <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs6>
                    <date-picker
                        label="Date From"
                        v-model="form.date_from"
                        placeholder="1999-01-01"
                    ></date-picker>
                </v-flex>
                <v-flex xs6>
                    <date-picker
                        label="Date To"
                        v-model="form.date_to"
                        placeholder="1999-01-01"
                    ></date-picker>
                </v-flex>
                <v-flex xs12>
                    <v-select
                        :items="['Pending', 'Approved', 'Disapproved']"
                        v-model="form.status"
                        label="Select Final Apporval Status"
                    ></v-select>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info" block @click="filterNow">Filter Now!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
    import DatePicker from "@/components/datepicker/Datepicker-No-Button.vue";
    export default {
        components: {
            DatePicker
        },
        data () {
            return {
                dialog: false,
                form: {
                    date_from: '',
                    date_to: '',
                    status: ''
                }
            }
        },
        methods: {
            async filterNow () {
                await this.$axios.$post('/admin/overtimes/employee/filter', this.form)
                .then((response) => {
                    this.$store.commit('overtime/SET_OVERTIMES', response.data);
                    this.dialog = false;
                }).catch(error => {
                    this.$swal.fire({
                        type: 'error',
                        title: 'Something went wrong!'
                    })
                })
            }
        }
    }
</script>