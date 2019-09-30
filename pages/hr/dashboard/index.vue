<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-alert elevation-19 type="info" :value="true">
                Human Resource Dashboard
            </v-alert>
        </v-flex>
        <v-flex xs12>
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
                    :items="registeredEmployees"
                >
                    <template v-slot:item.credits.VL="{ item }">
                        <v-progress-linear
                            color="primary"
                            height="20"
                            :value="(item.credit.VL / item.credit.total_VL) * 100"
                        >
                            <template>
                                <strong>{{ item.credit.VL }} / {{ item.credit.total_VL}}</strong>
                            </template>
                        </v-progress-linear>
                    </template>

                    <template v-slot:item.credits.SL="{ item }">
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

                    <template v-slot:item.credits.PTO="{ item }">
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
                        <employee-details :employee="item"></employee-details>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
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
        async asyncData({$axios}) {
            let {data} = await $axios.$get('/employees/registered');
            return {
                registeredEmployees: data
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
                        value: 'credits.VL',
                        sortable: false
                    },
                    {
                        text: 'SL',
                        align: 'center',
                        value: 'credits.SL',
                        sortable: false
                    },
                    {
                        text: 'PTO',
                        align: 'center',
                        value: 'credits.PTO',
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