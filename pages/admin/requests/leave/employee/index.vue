<template>
    <v-row dense>
        <v-col cols="12">
            <v-alert
                type="info"
                transition="scale-transition"
            >
                This is information alert.
            </v-alert>
        </v-col>
        <v-col cols="12">
            <v-card elevate="24">
                <v-card-title>
                    <h3>Leave Requests</h3>
                    <v-spacer></v-spacer>
                    <v-text-field
                        label="Search"
                        placeholder="Search by (id, last name, first name, type, pay, from, to)"
                        v-model="search"
                    ></v-text-field>
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
                    :items="employeeLeave"
                    :search="search"
                >
                    <template v-slot:item.recommending_approval="{ item }">
                        <v-chip color="warning" v-if="item.recommending_approval == 'Pending'">{{ item.recommending_approval }}</v-chip>
                        <v-chip color="success" v-if="item.recommending_approval == 'Approved'">{{ item.recommending_approval }}</v-chip>
                        <v-chip color="error" v-if="item.recommending_approval == 'Disapproved'">{{ item.recommending_approval }}</v-chip>
                    </template>

                    <template v-slot:item.final_approval="{ item }">
                        <v-chip color="warning" v-if="item.final_approval == 'Pending'">{{ item.final_approval }}</v-chip>
                        <v-chip color="success" v-if="item.final_approval == 'Approved'">{{ item.final_approval }}</v-chip>
                        <v-chip color="error" v-if="item.final_approval == 'Disapproved'">{{ item.final_approval }}</v-chip>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <view-leave :leave="item" />
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
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
    head: {
        title: 'Employee Leave Requests'
    },
    computed: {
        employeeLeave () {
            return this.$store.state.leave.leaves.map(leave => ({
                ...leave,
                employee: this.$store.state.employee.employees.find(employee => employee.user_id == leave.user_id),
                user: this.$store.state.user.users.find(user => user.id == leave.user_id)
            }))
            .filter(e => e.user.role == 'employee');
        }
    },
    data () {
        return {
            search: '',
            fields: {
                'Last Name': 'employee.last_name',
                'First Name': 'employee.first_name',
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
                    text: 'Type',
                    align: 'center',
                    value: 'type'
                },
                {
                    text: 'Pay',
                    align: 'center',
                    value: 'pay_type'
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
                    value: 'actions',
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