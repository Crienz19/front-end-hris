<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 lg12 xl12>
                <v-alert
                    value="true"
                    type="info"
                    transition="scale-transition"
                >
                    This is information alert.
                </v-alert>
            </v-flex>
            <v-flex xs12 lg12>
                <v-card>
                    <v-card-title>
                        <h3>Leave Requests</h3>
                        <v-spacer></v-spacer>
                        <create-leave />
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-data-table
                        :headers="headers"
                        :items="leaves"
                    >
                        <template v-slot:items="props">
                            <td>{{ props.item.id }}</td>
                            <td class="text-xs-center">{{ props.item.type }}</td>
                            <td class="text-xs-center">{{ props.item.pay_type }}</td>
                            <td class="text-xs-center">{{ props.item.from }}</td>
                            <td class="text-xs-center">{{ props.item.to }}</td>
                            <td class="text-xs-center">{{ props.item.time_from ? props.item.time_from : 'N/A' }}</td>
                            <td class="text-xs-center">{{ props.item.time_to ? props.item.time_to : 'N/A'}}</td>
                            <td class="text-xs-center">{{ props.item.recommending_approval }}</td>
                            <td class="text-xs-center">{{ props.item.final_approval }}</td>
                            <td class="text-xs-center">
                                <edit-leave v-if="props.item.recommending_approval == 'Pending'" :leave="props.item" />
                                <v-btn v-if="props.item.recommending_approval == 'Pending'" @click="deleteLeave(props.item.actions.delete)" class="ma-0" small icon>
                                    <v-icon small>delete</v-icon>
                                </v-btn>
                                <label v-if="props.item.recommending_approval != 'Pending'">Not Applicable</label>
                            </td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import CreateLeave from "@/components/modal/employee/request/leave/CreateLeave.vue";
    import EditLeave from "@/components/modal/employee/request/leave/EditLeave.vue";
    export default {
        middleware: ['auth'],
        components: {
            CreateLeave,
            EditLeave
        },
        async asyncData({ store }) {
            await store.dispatch('leave/loadEmployeeLeaves');
        },
        data () {
            return {
                dialog: false,
                headers: [
                    {
                        text: 'Request #',
                        align: 'left',
                        value: 'id'
                    },
                    {
                        text: 'Type',
                        align: 'center',
                        value: 'type'
                    },
                    {
                        text: 'Pay',
                        align: 'center',
                        value: 'pay'
                    },
                    {
                        text: 'From',
                        align: 'center',
                        value: 'from'
                    },
                    {
                        text: 'To',
                        align: 'center',
                        value: 'to'
                    },
                    {
                        text: 'Time From',
                        align: 'center',
                        value: 'time_from'
                    },
                    {
                        text: 'Time To',
                        align: 'center',
                        value: 'time_to'
                    },
                    {
                        text: 'Recommending Approval',
                        align: 'center',
                        value: 'recommending_approval'
                    },
                    {
                        text: 'Final Approval',
                        align: 'center',
                        value: 'final_approval'
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
            async deleteLeave(action) {
                await this.$axios.$delete(action)
                .then((response) => {
                    this.$store.dispatch('leave/loadEmployeeLeaves');
                }).catch(error => {
                    alert('Something went wrong');
                })
            }
        }
    }
</script>