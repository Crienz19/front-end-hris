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
                    <h3>Business Trip Request</h3>
                    <v-spacer></v-spacer>
                    <create-trip />
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="myTripRequest"
                >
                    <template v-slot:item.status="{ item }">
                        <v-chip color="warning" v-if="item.status == 'Pending'">{{ item.status }}</v-chip>
                        <v-chip color="info" v-if="item.status == 'Acknowledged'" text-color="white">{{ item.status }}</v-chip>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <edit-trip v-if="item.status == 'Pending'" :trip="item" />
                        <v-btn v-if="item.status == 'Pending'" class="ma-0" @click="deleteTrip(item.id)" color="error" small icon>
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <label v-if="item.status == 'Acknowledged'">Not Applicable</label>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import CreateTrip from "@/components/modal/supervisor/filing/trip/CreateTrip.vue";
    import EditTrip from "@/components/modal/supervisor/filing/trip/EditTrip.vue";
    
    export default {
        middleware: ['auth'],
        components: {
            CreateTrip,
            EditTrip
        },
        head: {
            title: 'Trip Filing'
        },
        computed: {
            myTripRequest () {
                return this.$store.state.trip.trips.filter(trip => trip.user_id == this.$auth.user.id);
            }
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
            deleteTrip (id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {
                    if (result.value) {
                        await this.$store.dispatch('trip/delete', id)
                    }
                })
            }
        }
    }
</script>