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
                <v-data-table
                    :headers="headers"
                    :items="trips"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-center">{{ props.item.employee.first_name }} {{ props.item.employee.last_name }}</td>
                        <td class="text-xs-center">{{ props.item.date_from }}</td>
                        <td class="text-xs-center">{{ props.item.date_to }}</td>
                        <td class="text-xs-center">{{ props.item.time_in.standard }}</td>
                        <td class="text-xs-center">{{ props.item.time_out.standard }}</td>
                        <td class="text-xs-center">{{ props.item.destination_from }}</td>
                        <td class="text-xs-center">{{ props.item.destination_to }}</td>
                        <td class="text-xs-center">
                            <v-chip color="warning" v-if="props.item.status == 'Pending'">{{ props.item.status }}</v-chip>
                            <v-chip color="info" v-if="props.item.status == 'Approved'">{{ props.item.status }}</v-chip>
                            <v-chip color="error" v-if="props.item.status == 'Disapproved'">{{ props.item.status }}</v-chip>
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
import ViewTrip from "@/components/modal/superadmin/timekeeping/trip/viewTrip.vue";
export default {
    middleware: ['auth'],
    components: {
        ViewTrip
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
                    text: 'Full Name',
                    align: 'center',
                    value: 'full_name'
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
    }
}
</script>