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
                    <h4>Business Trip Requests</h4>
                    <v-spacer></v-spacer>
                    <download-excel
                        title="Trip Request"
                        :fields="fields"
                        :data="trips"
                        :name="`trip_request`"
                    >
                    cloud_download
                    </download-excel>
                    <filter-trip></filter-trip>
                    <v-btn @click="refreshTrip" class="ma-1" color="warning" icon>
                        <v-icon>refresh</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="trips"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs center">{{ props.item.employee.last_name }}</td>
                        <td class="text-xs-center">{{ props.item.employee.first_name }}</td>
                        <td class="text-xs-center">{{ props.item.date_from }}</td>
                        <td class="text-xs-center">{{ props.item.date_to }}</td>
                        <td class="text-xs-center">{{ props.item.time_in.standard }}</td>
                        <td class="text-xs-center">{{ props.item.time_out.standard }}</td>
                        <td class="text-xs-center">{{ props.item.destination_from }}</td>
                        <td class="text-xs-center">{{ props.item.destination_to }}</td>
                        <td class="text-xs-center">
                            <v-chip color="warning" v-if="props.item.status == 'Pending'">{{ props.item.status }}</v-chip>
                            <v-chip color="info" v-if="props.item.status == 'Acknowledged'">{{ props.item.status }}</v-chip>
                        </td>
                        <td class="text-xs-center">{{ props.item.created_at }}</td>
                        <td class="text-xs-center">
                            <view-trip :trip="props.item" />
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import DownloadExcel from '@/components/exportToExcel/downloadToExcel.vue';
import FilterTrip from "@/components/modal/hr/requests/trip/FilterTrip.vue";
import ViewTrip from "@/components/modal/hr/requests/trip/ViewTrip.vue";
export default {
    middleware: ['auth'],
    components: {
        DownloadExcel,
        FilterTrip,
        ViewTrip
    },
    async asyncData({store, $axios}) {
        let {data} = await $axios.$get('/admin/trips/getSupervisor');

        return {
            trips: data
        }
    },
    data () {
        return {
            fields: {
                'Last Name': 'employee.last_name',
                'First Name': 'employee.first_name',
                'Date From': 'date_from',
                'Date To': 'date_to',
                'Time In': 'time_in.standard',
                'Time Out': 'time_out.standard',
                'Destination From': 'destination_from',
                'Destination To': 'destination_to',
                'Status': 'status'
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
                    text: 'Date From',
                    align: 'center',
                    value: 'date_from'
                },
                {
                    text: 'Date To',
                    align: 'center',
                    value: 'date_to'
                },
                {
                    text: 'Time In',
                    align: 'center',
                    value: 'time_in'
                },
                {
                    text: 'Time Out',
                    align: 'center',
                    value: 'time_out'
                },
                {
                    text: 'Dest. From',
                    align: 'center',
                    value: 'destination_from'
                },
                {
                    text: 'Dest. To',
                    align: 'center',
                    value: 'destination_to'
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
    },
    methods: {
        async refreshTrip () {
            let {data} = await $axios.$get('/admin/trips/getEmployee');
            this.trips = data;
        }
    },
}
</script>