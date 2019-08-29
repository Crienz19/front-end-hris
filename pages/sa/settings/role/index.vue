<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-alert type="info" :value="true">

            </v-alert>
        </v-flex>
        <v-flex xs12>
            <v-card>
                <v-card-title>
                    <h3>Role Management</h3>
                    <v-spacer></v-spacer>
                    <create-role />
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="roles"
                >
                <template v-slot:items="props">
                    <td>{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.display_name }}</td>
                    <td class="text-xs-center">{{ props.item.created_at }}</td>
                    <td class="text-xs-center">
                        <edit-role :role="props.item" />
                        <v-btn @click="$store.dispatch('role/deleteRole', props.item)" class="ma-0" icon small>
                            <v-icon small>delete</v-icon>
                        </v-btn>
                    </td>
                </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
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
        async asyncData({store}) {
            await store.dispatch('role/loadRoles');
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
                        sortable: false
                    }
                ]
            }
        }
    }
</script>
