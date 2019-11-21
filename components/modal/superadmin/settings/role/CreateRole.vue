<template>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" small round v-on="on">Create</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create Role</span>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
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
          <v-btn color="primary" block text @click="addRole">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    data () {
        return {
            dialog: false,
            form: {
                name: '',
                display_name: ''
            }
        }
    },
    methods: {
        async addRole () {
            await this.$store.dispatch('role/save', this.form);
            this.form.name = '';
            this.form.display_name = '';
            this.dialog = false;
        }
    }
  }
</script>