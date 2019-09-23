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
                    <h5>COE Request</h5>
                    <v-spacer></v-spacer>
                    <create-COE />
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="coes"
                >
                    <template v-slot:item.compensation="{ item }">
                        <v-icon color="success" v-if="item.compensation == true">check</v-icon>
                        <v-icon color="error" v-if="item.compensation == false">remove</v-icon>
                    </template>

                    <template v-slot:item.status="{ item }">
                        <v-chip color="warning" v-if="item.status == 'Pending'">{{ item.status }}</v-chip>
                        <v-chip color="success" v-if="item.status == 'Acknowledged'">{{ item.status }}</v-chip>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <edit-COE v-if="item.status == 'Pending'" :coe="item"></edit-COE>
                        <v-btn v-if="item.status == 'Pending'" @click="removeCOE(item.actions.delete)" class="ma-1" color="error" icon small>
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
    import CreateCOE from '@/components/modal/employee/request/coe/CreateCOE.vue';
    import EditCOE from '@/components/modal/employee/request/coe/EditCOE.vue';
    export default {
        components: {
            CreateCOE,
            EditCOE
        },
        async asyncData({store}) {
            await store.dispatch('coe/loadEmployeeCOEs');
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