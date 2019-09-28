<template>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on }">
        <v-btn color="info" small icon v-on="on">
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Department</span>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" @click="dialog = false" icon small>
              <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                  <v-text-field
                      label="Name"
                      v-model="form.name"
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-text-field
                      label="Display Name"
                      v-model="form.display_name"
                  ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" block text @click="updateDepartment">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: [
      'department'
    ],
    data () {
       return {
         dialog: false,
         form: {
           id: this.department.id,
           name: this.department.name,
           display_name: this.department.display_name,
           supervisor_id: this.department.supervisor.id
         }
       }
    },
    methods: {
      async updateDepartment () {
        await this.$store.dispatch('department/updateDepartment', this.form);
        this.dialog = false;
      }
    }
  }
</script>

