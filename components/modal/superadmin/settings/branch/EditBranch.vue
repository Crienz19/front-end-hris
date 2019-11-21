<template>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on }">
        <v-btn color="info" small icon v-on="on">
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Role</span>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" @click="dialog = false" icon small>
              <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
          <v-container grid-list-md>
            <v-row dense>
              <v-col cols="12">
                  <v-text-field
                      label="Name"
                      v-model="form.name"
                  ></v-text-field>
              </v-col>
              <v-col cols="12">
                  <v-text-field
                      label="Display Name"
                      v-model="form.display_name"
                  ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" block text @click="updateBranch">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: [
      'branch'
    ],
    data () {
       return {
         dialog: false,
         form: {
           id: this.branch.id,
           name: this.branch.name,
           display_name: this.branch.display_name,
         }
       }
    },
    methods: {
      async updateBranch () {
        await this.$store.dispatch('branch/update', this.form);
        this.dialog = false;
      }
    }
  }
</script>