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
            <v-card>
                <v-card-title>
                    <h3>Business Trip Request</h3>
                    <v-spacer></v-spacer>
                    <create-trip />
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="trips"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-center">{{ props.item.date_from }}</td>
                        <td class="text-xs-center">{{ props.item.date_to }}</td>
                        <td class="text-xs-center">{{ props.item.time_in.standard }}</td>
                        <td class="text-xs-center">{{ props.item.time_out.standard }}</td>
                        <td class="text-xs-center">{{ props.item.destination_from }}</td>
                        <td class="text-xs-center">{{ props.item.destination_to }}</td>
                        <td class="text-xs-center">{{ props.item.purpose }}</td>
                        <td class="text-xs-center">
                            <v-chip color="warning" v-if="props.item.status == 'Pending'">{{ props.item.status }}</v-chip>
                            <v-chip color="info" v-if="props.item.status == 'Acknowledged'">{{ props.item.status }}</v-chip>
                        </td>  
                        <td class="text-xs-center">
                            <edit-trip v-if="props.item.status != 'Acknowledged'" :trip="props.item" />
                            <v-btn v-if="props.item.status != 'Acknowledged'" class="ma-0" @click="$store.dispatch('trip/deleteEmployeeTrip', props.item)" small icon>
                                <v-icon small>delete</v-icon>
                            </v-btn>
                            <p class="heading" v-if="props.item.status == 'Acknowledged'">Not Applicable</p>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import CreateTrip from "@/components/modal/employee/request/trip/CreateTrip.vue";
    import EditTrip from "@/components/modal/employee/request/trip/EditTrip.vue";
    
    export default {
        middleware: ['auth'],
        components: {
            CreateTrip,
            EditTrip
        },
        async asyncData({store}) {
            await store.dispatch('trip/loadEmployeeTrips');
        },
        data () {
            return {
                headers: [
                    {
                        text: 'Request #',
                        align: 'left',
                        value: 'id'
                    },
                    {
                        text: 'Date From',
                        align: 'center',
                        value: 'date_to'
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
                        text: 'Purpose',
                        align: 'center',
                        value: 'purpose'
                    },
                    {
                        text: 'Status',
                        align: 'center',
                        value: 'status'
                    },
                    {
                        text: 'Actions',
                        align: 'center',
                        sortable: false
                    }
                ]
            }
        }
    }
</script>