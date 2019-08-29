<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-alert
                value="true"
                type="info"
                transition="scale-transition"
            >
                This is information alert.
            </v-alert>
        </v-flex>
        <v-flex xs12>
            <v-card>
                <v-card-title>
                    <h3>COE Request</h3>
                    <v-spacer></v-spacer>
                    <create-COE />
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="coes"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-center">{{ props.item.created_at }}</td>
                        <td class="text-xs-center">{{ props.item.date_needed }}</td>
                        <td class="text-xs-center">{{ props.item.reason }}</td>
                        <td class="text-xs-center">
                            <v-icon color="green" v-if="props.item.compensation">check</v-icon>
                            <v-icon color="error" v-else>block</v-icon>
                        </td>
                        <td class="text-xs-center">{{ props.item.status }}</td>
                        <td class="text-xs-center">
                            <edit-COE v-if="props.item.status == 'Pending'" :coe="props.item"></edit-COE>
                            <v-btn v-if="props.item.status == 'Pending'" @click="removeCOE(props.item.actions.delete)" class="ma-1" color="error" icon small>
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
    import CreateCOE from '@/components/modal/employee/request/coe/CreateCOE.vue';
    import EditCOE from '@/components/modal/employee/request/coe/EditCOE.vue';
    export default {
        components: {
            CreateCOE,
            EditCOE
        },
        async asyncData({store}) {
            await store.dispatch('coe/loadEmployeeCOEs');
        },
        data() {
            return {
                headers: [
                    {
                        text: 'Request #',
                        align: 'left',
                        value: 'id'
                    },
                    {
                        text: 'Date Requested',
                        align: 'center',
                        value: 'created_at'
                    },
                    {
                        text: 'Date Needed',
                        align: 'center',
                        value: 'date_needed'
                    },
                    {
                        text: 'Reason',
                        align: 'center',
                        value: 'reason'
                    },
                    {
                        text: 'Compensation',
                        align: 'center',
                        value: 'compensation'
                    },
                    {
                        text: 'Status',
                        align: 'center',
                        value: 'status'
                    },
                    {
                        text: 'Actions',
                        align: 'center',
                        sortable: false
                    }
                ]
            }
        },
        methods: {
            async removeCOE (action) {
                await this.$axios.$delete(action)
                .then((response) => {
                    this.$store.dispatch('coe/loadEmployeeCOEs');
                    alert('COE Deleted');
                }).catch(error => {
                    alert('Something went wrong!');
                })
            }
        }
    }
</script>