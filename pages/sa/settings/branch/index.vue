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
                    <h3>Branches</h3>
                    <v-spacer></v-spacer>
                    <create-branch />
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="branches"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-center">{{ props.item.name }}</td>
                        <td class="text-xs-center">{{ props.item.display_name }}</td>
                        <td class="text-xs-center">
                            <edit-branch :branch="props.item" />
                            <v-btn @click="$store.dispatch('branch/deleteBranch', props.item)" class="ma-0" icon small>
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
    import CreateBranch from "@/components/modal/superadmin/settings/branch/CreateBranch.vue";
    import EditBranch from "@/components/modal/superadmin/settings/branch/EditBranch.vue";
    export default {
        middleware: ['auth'],
        components: {
            CreateBranch,
            EditBranch
        },
        async asyncData ({ store }) {
            await store.dispatch('branch/loadBranches');
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
                        text: 'Actions',
                        align: 'center',
                        sortable: false
                    }
                ]
            }
        },
    }
</script>