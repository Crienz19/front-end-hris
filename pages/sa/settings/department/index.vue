<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-alert type="info" :value="true">
                This is information
            </v-alert>
        </v-flex>
        <v-flex xs12 lg12>
            <v-card>
                <v-card-title>
                    <h3>Department</h3>
                    <v-spacer></v-spacer>
                    <create-department />
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="departments"
                >
                    <template v-slot:item.actions="{ item }">
                        <assign-supervisor :department="item" />
                        <edit-department :department="item" />
                        <v-btn class="ma-0" @click="$store.dispatch('department/deleteDepartment', item)" color="error" icon small>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import CreateDepartment from "@/components/modal/superadmin/settings/department/CreateDepartment.vue";
    import EditDepartment from "@/components/modal/superadmin/settings/department/EditDepartment.vue";
    import AssignSupervisor from "@/components/modal/superadmin/settings/department/AssignSupervisor.vue";
    export default {
        middleware: ['auth'],
        components: {
            CreateDepartment,
            EditDepartment,
            AssignSupervisor
        },
        async asyncData ({ store }) {
            await store.dispatch('department/loadDepartments');
        },
        data () {
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
                        text: 'Display Name',
                        align: 'center',
                        value: 'display_name'
                    },
                    {
                        text: 'Supervisor',
                        align: 'center',
                        value: 'supervisor.email'
                    },
                    {
                        text: 'Actions',
                        align: 'center',
                        value: 'actions',
                        sortable: false
                    }
                ]
            }
        },
    }
</script>