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
            <v-card elevate="24">
                <v-card-title>
                    <h4>Overtime Requests</h4>
                    <v-spacer></v-spacer>
                    <download-excel
                        title="Overtime Requests"
                        name="Overtime Requests"
                        :fields="fields"
                        :data="overtimes"
                    ></download-excel>
                    <filter-overtime></filter-overtime>
                    <v-btn class="ma-1" @click="$store.dispatch('overtime/loadHrOvertimes')" color="warning" icon>
                            <v-icon>refresh</v-icon>
                        </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="overtimes"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-center">{{ props.item.employee.last_name }}</td>
                        <td class="text-xs-center">{{ props.item.employee.first_name }}</td>
                        <td class="text-xs-center">{{ props.item.date }}</td>
                        <td class="text-xs-center">{{ props.item.from.standard }}</td>
                        <td class="text-xs-center">{{ props.item.to.standard }}</td>
                        <td class="text-xs-center">{{ props.item.reason }}</td>
                        <td class="text-xs-center">
                            <v-chip color="warning" v-if="props.item.status == 'Pending'">{{ props.item.status }}</v-chip>
                            <v-chip color="info" v-if="props.item.status == 'Approved'">{{ props.item.status }}</v-chip>
                            <v-chip color="error" v-if="props.item.status == 'Disapproved'">{{ props.item.status }}</v-chip>
                        </td>
                        <td class="text-xs-center">{{ props.item.created_at }}</td>
                        <td class="text-xs-center">
                            <view-overtime :overtime="props.item"></view-overtime>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import DownloadExcel from '@/components/exportToExcel/downloadToExcel.vue';    
    import ViewOvertime from "@/components/modal/hr/requests/overtime/ViewOvertime.vue";
    import FilterOvertime from "@/components/modal/hr/requests/overtime/FilterOvertime.vue";
    export default {
        middleware: ['auth'],
        components: {
            DownloadExcel,
            FilterOvertime,
            ViewOvertime
        },
        async asyncData({store}) {
            store.dispatch('overtime/loadHrOvertimes');
        },
        data () {
            return {
                fields: {
                    'Last Name': 'employee.last_name',
                    'First Name': 'employee.first_name',
                    'Date': 'date',
                    'From': 'from.standard',
                    'To': 'to.standard',
                    'Reason': 'reason',
                    'Status': 'status',
                    'Date Filed': 'created_at'
                },
                headers: [
                    {
                        text: 'ID',
                        align: 'left',
                        value: 'id'
                    },
                    {
                        text: 'Last Name',
                        align: 'center',
                        value: 'employee.last_name'
                    },
                    {
                        text: 'First Name',
                        align: 'center',
                        value: 'employee.first_name'
                    },
                    {
                        text: 'Date',
                        align: 'center',
                        value: 'date'
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
                        align: 'center'
                    }
                ]
            }
        }
    }
</script>