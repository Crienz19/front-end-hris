<template>
    <v-row>
        <v-col cols="12">
            <v-alert elevation-19 type="info" :value="true">
                Administrator Dashboard
            </v-alert>
        </v-col>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    <h3>Registered Employees</h3>
                    <v-spacer></v-spacer>
                    <v-btn @click="refreshEmployee" color="info" icon>
                        <v-icon>refresh</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="registeredUsers"
                >
                    <template v-slot:item.credit.VL="{ item }">
                        <v-progress-linear
                            color="info"
                            height="20"
                            :value="(item.credit.VL / item.credit.total_VL) * 100"
                        >
                            <template>
                                <strong>{{ item.credit.VL }} / {{ item.credit.total_VL }}</strong>
                            </template>
                        </v-progress-linear>
                    </template>

                    <template v-slot:item.credit.SL="{ item }">
                        <v-progress-linear
                            color="warning"
                            height="20"
                            :value="(item.credit.SL / item.credit.total_SL) * 100"
                        >
                            <template>
                                <strong>{{ item.credit.SL }} / {{ item.credit.total_SL }}</strong>
                            </template>
                        </v-progress-linear>
                    </template>

                    <template v-slot:item.credit.PTO="{ item }">
                        <v-progress-linear
                            color="error"
                            height="20"
                            :value="(item.credit.PTO / item.credit.total_PTO) * 100"
                        >
                            <template>
                                <strong>{{ item.credit.PTO }} / {{ item.credit.total_PTO }}</strong>
                            </template>
                        </v-progress-linear>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <employee-details :employee="item" />
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import EmployeeDetails from '@/components/modal/superadmin/dashboard/EmployeeDetails.vue';
    export default {
        components: {
            EmployeeDetails
        },
        head: {
            title: 'Dashboard'
        },
        mounted() {
            console.log(this.registeredUsers);
        },
        computed: {
            registeredUsers () {
                return this.$store.state.employee.employees.map(employee => ({
                    ...employee,
                    user: this.$store.state.user.users.find(user => user.id == employee.user_id),
                    department: this.$store.state.department.departments.find(department => department.id == employee.department_id),
                    credit: this.$store.state.credit.credits.find(credit => credit.user_id == employee.user_id),
                    branch: this.$store.state.branch.branches.find(branch => branch.id == employee.branch_id)
                }))
            }
        },
        data() {
            return {
                headers: [
                    {
                        text: 'ID',
                        align: 'left',
                        value: 'id'
                    },
                    {
                        text: 'Last Name',
                        align: 'center',
                        value: 'last_name'
                    },
                    {
                        text: 'First Name',
                        align: 'center',
                        value: 'first_name'
                    },
                    {
                        text: 'Department',
                        align: 'center',
                        value: 'department.display_name'
                    },
                    {
                        text: 'VL',
                        align: 'center',
                        value: 'credit.VL',
                        sortable: false
                    },
                    {
                        text: 'SL',
                        align: 'center',
                        value: 'credit.SL',
                        sortable: false
                    },
                    {
                        text: 'PTO',
                        align: 'center',
                        value: 'credit.PTO',
                        sortable: false
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
            async refreshEmployee () {
                let {data} = await this.$axios.$get('/employees/registered');
                this.registeredEmployees = data;
            }
        },
    }
</script>