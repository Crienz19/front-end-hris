<template>
    <v-row dense>
        <v-col cols="12">
            <v-alert type="info" :value="true">
                This is information
            </v-alert>
        </v-col>
        <v-col cols="12">
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
                    <template v-slot:item.actions="{ item }">
                        <edit-branch :branch="item" />
                        <v-btn @click="$store.dispatch('branch/deleteBranch', item)" color="error" class="ma-1" icon small>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
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
        head: {
            title: 'Branch Settings'
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
                        value: 'actions',
                        sortable: false
                    }
                ]
            }
        },
    }
</script>