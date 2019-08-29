<template>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on }">
        <v-btn class="ma-0" small icon v-on="on">
            <v-icon>assignment_turned_in</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
            <h3>Select Role</h3>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" icon small>
                <v-icon small>close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 200px;">
          <v-radio-group v-model="dialogm1" column>
            <v-radio v-for="role in roles" :key="role.id" :label="role.display_name" :value="role.name"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="updateRole" block>Assign</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: [
        'user'
    ],
    async mounted () {
        await this.$store.dispatch('role/loadRoles');
    },
    data() {
        return {
            dialog: false,
            dialogm1: '',
        }
    },
    methods: {
        async updateRole () {
            await this.$store.dispatch('user/updateUser', {
                'id': this.user,
                'role': this.dialogm1
            });

            this.dialog = false
        }
    }
}
</script>