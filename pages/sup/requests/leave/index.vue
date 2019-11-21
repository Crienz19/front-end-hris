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
                <v-data-table
                    :headers="headers"
                    :items="yourSubsLeaveRequest"
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
import DatePickerNoButton from '@/components/datepicker/Datepicker-No-Button.vue';
import ViewLeave from "@/components/modal/supervisor/requests/leave/ViewLeave.vue";
export default {
    middleware: ['auth'],
    components: {
        DatePickerNoButton,
        ViewLeave
    },
    head: {
        title: 'Leave Requests'
    },
    mounted () {
        console.log(this.yourSubsLeaveRequest);
    },
    computed: {
        yourSubsLeaveRequest () {
            return this.$store.state.leave.leaves.map(leave => ({
                ...leave,
                employee: this.$store.state.employee.employees.map(employee => ({
                    ...employee,
                    department: this.$store.state.department.departments.find(department => department.id == employee.department_id)
                })).find(employee => employee.user_id == leave.user_id)
            })).filter(leave => leave.employee.department.supervisor_id == this.$auth.user.id);
        }
    },
    data () {
        return {
            dialog: false,
            headers: [
                {
                    text: 'ID',
                    align: 'left',
                    value: 'id'
                },
                {
                    text: 'First Name',
                    align: 'center',
                    value: 'employee.first_name'
                },
                {
                    text: 'Last Name',
                    align: 'center',
                    value: 'employee.last_name'
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
}
</script>