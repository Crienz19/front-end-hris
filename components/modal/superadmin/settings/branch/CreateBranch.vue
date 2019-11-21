<template>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" small round v-on="on">Create</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create Branch</span>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon small>
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
                    placeholder="Branch Name"
                    dense
                    outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Display Name"
                    v-model="form.display_name"
                    placeholder="Branch Display Name"
                    dense
                    outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn color="primary" block text @click="addBranch">Add</v-btn>
              </v-col>
            </v-row>
          </v-container>
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
        async addBranch () {
            await this.$store.dispatch('branch/save', this.form);
            this.form.name = '';
            this.form.display_name = '';
            this.dialog = false;
        }
    }
  }
</script>