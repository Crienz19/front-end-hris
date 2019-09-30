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
                    :items="trips"
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
import ViewTrip from "@/components/modal/superadmin/timekeeping/trip/viewTrip.vue";
export default {
    middleware: ['auth'],
    components: {
        ViewTrip
    },
    head: {
        title: 'Trip Requests'
    },
    async asyncData({store}) {
        await store.dispatch('trip/loadSuperTrips');
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
    }
}
</script>