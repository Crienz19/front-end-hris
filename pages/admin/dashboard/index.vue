<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-alert elevation-19 type="info" :value="true">
                Administrator Dashboard
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
                    <template v-slot:items="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-center">{{ props.item.last_name }}</td>
                        <td class="text-xs-center">{{ props.item.first_name }}</td>
                        <td class="text-xs-center">{{ props.item.department ? props.item.department.display_name : '' }}</td>
                        <td class="text-xs-center">
                            <v-progress-linear
                                color="info"
                                height="20"
                                :value="(props.item.credit.VL / props.item.credit.total_VL) * 100"
                            >{{ props.item.credit.VL }}</v-progress-linear>
                        </td>
                        <td class="text-xs-center">
                            <v-progress-linear 
                                color="warning"
                                height="20"
                                :value="(props.item.credit.SL / props.item.credit.total_SL) * 100"
                            >{{ props.item.credit.SL }}</v-progress-linear>
                        </td>
                        <td class="text-xs-center">
                            <v-progress-linear 
                                color="primary"
                                height="20"
                                :value="(props.item.credit.PTO / props.item.credit.total_PTO) * 100"
                            >{{ props.item.credit.PTO }}</v-progress-linear>
                        </td>
                        <td class="text-xs-center">
                            <employee-details :employee="props.item"></employee-details>
                        </td>
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