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
            <v-card>
                <v-card-title>
                    <h5>Business Trip Request</h5>
                    <v-spacer></v-spacer>
                    <create-trip />
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="trips"
                >
                    <template v-slot:item.status="{ item }">
                        <v-chip color="warning" v-if="item.status == 'Pending'">{{ item.status }}</v-chip>
                        <v-chip color="success" v-if="item.status == 'Acknowledged'">{{ item.status }}</v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                    <edit-trip v-if="item.status == 'Pending'" :trip="item" />
                        <v-btn v-if="item.status == 'Pending'" class="ma-0" @click="$store.dispatch('trip/deleteEmployeeTrip', item)" color="error" small icon>
                            <v-icon small>delete</v-icon>
                        </v-btn>
                        <label v-if="item.status != 'Pending'">Not Applicable</label>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
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
        head: {
            title: 'Trip Requests'
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
                        value: 'actions',
                        sortable: false
                    }
                ]
            }
        },
        methods: {
            async deleteTrip (action) {
                await this.$axios.$patch(action)
                .then((response) => {
                    this.$store.dispatch('trip/loadEmployeeTrips');
                    alert('Deleted!')
                }).catch(error => {
                    alert('Something went wrong!');
                })
            }
        }
    }
</script>