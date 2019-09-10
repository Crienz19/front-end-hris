<template>
    <div>
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
                <v-card elevate="24">
                    <v-card-title>
                        <h3>Leave Requests</h3>
                        <v-spacer></v-spacer>
                        <download-excel
                            title="Leave Requests"
                            name="Leave Requests"
                            :fields="fields"
                            :data="leaves"
                        ></download-excel>
                        <filter-leave />
                        <v-btn class="ma-1" @click="refreshLeave" color="warning" icon>
                            <v-icon>refresh</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-data-table
                        :headers="headers"
                        :items="leaves"
                    >
                        <template v-slot:items="props">
                            <td>{{ props.item.employee.last_name }}</td>
                            <td class="text-xs-center">{{ props.item.employee.first_name }}</td>
                            <td class="text-xs-center">{{ props.item.employee.department.display_name }}</td>
                            <td class="text-xs-center">{{ props.item.type }}</td>
                            <td class="text-xs-center">{{ props.item.pay_type }}</td>
                            <td class="text-xs-center">{{ props.item.from }}</td>
                            <td class="text-xs-center">{{ props.item.to }}</td>
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
                            <td class="text-xs-center">{{ props.item.created_at }}</td>
                            <td class="text-xs-center">
                                <view-leave :leave="props.item" />
                            </td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import DownloadExcel from '@/components/exportToExcel/downloadToExcel.vue';
import FilterLeave from "@/components/modal/admin/requests/leave/employee/FilterLeave.vue";
import ViewLeave from "@/components/modal/admin/requests/leave/employee/ViewLeave.vue";
export default {
    middleware: ['auth'],
    components: {
        DownloadExcel,
        FilterLeave,
        ViewLeave
    },
    async asyncData({ $axios, store}) {
        let {data} = await $axios.$get('/admin/leaves/getEmployee');
        store.commit('leave/SET_LEAVES', data);
    },
    data () {
        return {
            fields: {
                'Last Name': 'employee.last_name',
                'First Name': 'employee.first_name',
                'Department': 'employee.department.display_name',
                'Type': 'type',
                'Pay': 'pay',
                'From': 'from',
                'To': 'to',
                'Time From': 'time_from.standard',
                'Time To': 'time_to.standard',
                'Reason': 'reason',
                'Recommending Approval': 'recommending_approval',
                'Final Approval': 'final_approval',
                'Date Filed': 'created_at'
            },
            headers: [
                {
                    text: 'Last Name',
                    align: 'left',
                    value: 'employee.last_name'
                },
                {
                    text: 'First Name',
                    align: 'center',
                    value: 'employee.first_name'
                },
                {
                    text: 'Department',
                    align: 'center',
                    value: 'employee.department.display_name'
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
    },
    methods: {
        async refreshLeave () {
            let {data} = await this.$axios.$get('/admin/leaves/getEmployee');
            this.leave = data;
        }
    }
}
</script>