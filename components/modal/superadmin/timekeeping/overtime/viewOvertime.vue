<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" small>
          <v-icon>search</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h3>{{ this.overtime.employee.first_name }} {{ this.overtime.employee.last_name }}'s Overtime Request</h3>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
            <v-icon small>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                label="Type"
                :value="overtime.date"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                label="From"
                :value="overtime.from.standard"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                label="To"
                :value="overtime.to.standard"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                label="Reason"
                :value="overtime.reason"
                disabled
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" block @click="deleteOvertime">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: [
      'overtime'
    ],
    data: () => ({
      dialog: false,
    }),
    methods: {
      deleteOvertime () {
        this.$store.dispatch('overtime/delete', this.overtime.id);
        this.dialog = false;
      }
    }
  }
</script>