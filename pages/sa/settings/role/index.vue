<template>
    <v-row dense>
        <v-col cols="12">
            <v-alert type="info" :value="true">

            </v-alert>
        </v-col>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    <h3>Role Management</h3>
                    <v-spacer></v-spacer>
                    <create-role />
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="role"
                >
                    <template v-slot:item.actions="{ item }">
                        <edit-role :role="item" />
                        <v-btn @click="$store.dispatch('role/delete', item.id)" color="error" class="ma-1" icon small>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import CreateRole from "@/components/modal/superadmin/settings/role/CreateRole.vue";
    import EditRole from "@/components/modal/superadmin/settings/role/EditRole.vue";
    export default {
        middleware: ['auth'],
        components: {
            CreateRole,
            EditRole,
        },
        head: {
            title: 'Role Settings'
        },
        computed: {
            role () {
                return this.$store.state.role.roles;
            }
        },
        data() {
            return {
                headers: [
                    {
                        text: 'ID',
                        align: 'left',
                        value: 'id'
                    },
                    {
                        text: 'Name',
                        align: 'center',
                        value: 'name'
                    },
                    {
                        text: 'Display name',
                        align: 'center',
                        value: 'display_name'
                    },
                    {
                        text: 'Created At',
                        align: 'center',
                        value: 'created_at'
                    },
                    {
                        text: 'Actions',
                        align: 'center',
                        value: 'actions',
                        sortable: false
                    }
                ]
            }
        }
    }
</script>
