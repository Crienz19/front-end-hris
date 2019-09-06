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
                            <td class="text-xs-center">
                                <v-chip color="warning" v-if="props.item.recommending_approval == 'Pending'">{{ props.item.recommending_approval }}</v-chip>
                                <v-chip color="info" v-if="props.item.recommending_approval == 'Approved'">{{ props.item.recommending_approval }}</v-chip>
                                <v-chip color="error" v-if="props.item.recommending_approval == 'Disapproved'">{{ props.item.recommending_approval }}</v-chip>
                            </td>
                            <td class="text-xs-center">
                                <v-chip color="warning" v-if="props.item.final_approval == 'Pending'">{{ props.item.final_approval }}</v-chip>
                                <v-chip color="info" v-if="props.item.final_approval == 'Approved'">{{ props.item.final_approval }}</v-chip>
                                <v-chip color="error" v-if="props.item.final_approval == 'Disapproved'">{{ props.item.final_approval }}</v-chip>
                            </td>
                            <td class="text-xs-center">
                                <edit-leave :leave="props.item" />
                                <v-btn @click="$store.dispatch('leave/deleteEmployeeLeave', props.item)" class="ma-0" small icon>
                                    <v-icon small>delete</v-icon>
                                </v-btn>
                            </td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import CreateLeave from "@/components/modal/supervisor/filing/leave/CreateLeave.vue";
    import EditLeave from "@/components/modal/supervisor/filing/leave/EditLeave.vue";
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
    }
</script>