<template>
    <v-row dense>
        <v-col cols="12">
            <v-alert
                value="true"
                type="info"
                transition="scale-transition"
            >
                This is information alert.
            </v-alert>
        </v-col>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    <h3>COE Request</h3>
                    <v-spacer></v-spacer>
                    <create-COE />
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="coes"
                >
                    <template v-slot:item.compensation="{ item }">
                        <v-icon color="green" v-if="item.compensation">check</v-icon>
                        <v-icon color="error" v-else>remove</v-icon>
                    </template>
                    <template v-slot:item.status="{ item }">
                        <v-chip color="warning" v-if="item.status == 'Pending'">{{ item.status }}</v-chip>
                        <v-chip color="success" v-if="item.status == 'Acknowledged'">{{ item.status }}</v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <view-COE :coe="item"></view-COE>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import ViewCOE from '@/components/modal/hr/requests/coe/ViewCOE.vue';
    export default {
        components: {
            ViewCOE
        },
        head: {
            title: 'COE Requests'
        },
        async asyncData({store}) {
            await store.dispatch('coe/loadHumanResourceCOEs');
        },
        data() {
            return {
                headers: [
                    {
                        text: 'Request #',
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
                        text: 'Date Requested',
                        align: 'center',
                        value: 'created_at'
                    },
                    {
                        text: 'Date Needed',
                        align: 'center',
                        value: 'date_needed'
                    },
                    {
                        text: 'Reason',
                        align: 'center',
                        value: 'reason'
                    },
                    {
                        text: 'Compensation',
                        align: 'center',
                        value: 'compensation'
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
            async removeCOE (action) {
                await this.$axios.$delete(action)
                .then((response) => {
                    this.$store.dispatch('coe/loadEmployeeCOEs');
                    alert('COE Deleted');
                }).catch(error => {
                    alert('Something went wrong!');
                })
            }
        }
    }
</script>