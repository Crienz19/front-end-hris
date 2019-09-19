<template>
    <v-dialog v-model="dialog" scrollable max-width="270px">
      <template v-slot:activator="{ on }">
        <v-btn color="warning" class="ma-1" small icon v-on="on">
            <v-icon>assignment_turned_in</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
            <h3>Select Supervisor</h3>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" icon small>
                <v-icon small>close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 200px;">
          <v-radio-group v-model="dialogm1" column>
            <v-radio v-for="role in usersByRole" :key="role.id" :label="role.name" :value="role.id"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="assignSupervisor" block>Assign</v-btn>
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
                dialogm1: ''
            }
        },
        mounted () {
            this.$store.dispatch('user/loadUsers');
        },
        methods: {
            async assignSupervisor () {
                await this.$store.dispatch('department/updateDepartment', {
                    id: this.department.id,
                    name: this.department.name,
                    display_name: this.department.display_name,
                    supervisor_id: this.dialogm1
                })

                this.dialog = false;
            }
        }
    }
</script>