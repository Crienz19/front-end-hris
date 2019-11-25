<template>
    <v-row dense>
        <v-col cols="12">
            <v-alert
                value="true"
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
                    :items="yourSubsOvertimeRequest"
                >
                    <template v-slot:item.status="{ item }">
                        <v-chip color="warning" v-if="item.status == 'Pending'">{{ item.status }}</v-chip>
                        <v-chip color="success" v-if="item.status == 'Approved'">{{ item.status }}</v-chip>
                        <v-chip color="error" v-if="item.status == 'Disapproved'">{{ item.status }}</v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <view-overtime :overtime="item"></view-overtime>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import ViewOvertime from "@/components/modal/supervisor/requests/overtime/ViewOvertime.vue";
    export default {
        middleware: ['auth'],
        components: {
            ViewOvertime
        },
        head: {
            title: 'Overtime Requests'
        },
        computed: {
            yourSubsOvertimeRequest () {
                return this.$store.state.overtime.overtimes.map(overtime => ({
                    ...overtime,
                    employee: this.$store.state.employee.employees.map(employee => ({
                        ...employee,
                        department: this.$store.state.department.departments.find(department => department.id == employee.department_id)
                    })).find(employee => employee.user_id == overtime.user_id)
                })).filter(overtime => overtime.employee.department.supervisor_id == this.$auth.user.id && overtime.user_id != this.$auth.user.id);
            }
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
                        text: 'Date',
                        align: 'center',
                        value: 'date'
                    },
                    {
                        text: 'From',
                        align: 'center',
                        value: 'from.standard'
                    },
                    {
                        text: 'To',
                        align: 'center',
                        value: 'to.standard'
                    },
                    {
                        text: 'Reason',
                        align: 'center',
                        value: 'reason'
                    },
                    {
                        text: 'Status',
                        align: 'center',
                        value: 'status'
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
        }
    }
</script>