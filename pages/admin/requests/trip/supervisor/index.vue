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
                    <h4>Business Trip Requests</h4>
                    <v-spacer></v-spacer>
                    <v-text-field
                        label="Search"
                        placeholder="Search by (id, last name, first name, type, pay, from, to)"
                        v-model="search"
                    ></v-text-field>
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
                    :items="supervisorTrip"
                    :search="search"
                >
                    <template v-slot:item.status="{ item }">
                        <v-chip color="warning" v-if="item.status == 'Pending'">{{ item.status }}</v-chip>
                        <v-chip color="success" v-if="item.status == 'Acknowledged'">{{ item.status }}</v-chip>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <view-trip :trip="item" />
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import DownloadExcel from '@/components/exportToExcel/downloadToExcel.vue';
import FilterTrip from "@/components/modal/admin/requests/trip/supervisor/FilterTrip.vue";
import ViewTrip from "@/components/modal/admin/requests/trip/supervisor/ViewTrip.vue";
export default {
    middleware: ['auth'],
    components: {
        DownloadExcel,
        FilterTrip,
        ViewTrip
    },
    head: {
        title: 'Supervisor Trip Requests'
    },
    computed: {
        supervisorTrip () {
            return this.$store.state.trip.trips.map(trip => ({
                ...trip,
                user: this.$store.state.user.users.find(user => user.id == trip.user_id),
                employee: this.$store.state.employee.employees.find(employee => employee.user_id == trip.user_id)
            }))
            .filter(trip => trip.user.role == 'supervisor');
        }
    },
    data () {
        return {
            search: '',
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
                    value: 'time_in.standard'
                },
                {
                    text: 'Time Out',
                    align: 'center',
                    value: 'time_out.standard'
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
                    align: 'center',
                    value: 'actions',
                    sortable: false
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