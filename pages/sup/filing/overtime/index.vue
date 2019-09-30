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
                    <h3>Overtime Requests</h3>
                    <v-spacer></v-spacer>
                    <create-overtime />
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="overtimes"
                >
                    <template v-slot:item.status="{ item }">
                        <v-chip color="warning" v-if="item.status == 'Pending'">{{ item.status }}</v-chip>
                        <v-chip color="success" v-if="item.status == 'Approved'">{{ item.status }}</v-chip>
                        <v-chip color="error" v-if="item.status == 'Disapproved'" text-color="white">{{ item.status }}</v-chip>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <edit-overtime v-if="item.status == 'Pending'" :overtime="item" />
                        <v-btn v-if="item.status == 'Pending'" @click="$store.dispatch('overtime/deleteEmployeeOvertime', item)" class="ma-0" color="error" icon small>
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <label v-if="item.status == 'Approved' || item.status == 'Disapproved'">Not Applicable</label>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import CreateOvertime from "@/components/modal/supervisor/filing/overtime/CreateOvertime.vue";
    import EditOvertime from "@/components/modal/supervisor/filing/overtime/EditOvertime.vue";
    export default {
        middleware: ['auth'],
        components: {
            CreateOvertime,
            EditOvertime
        },
        head: {
            title: 'Overtime Filing'
        },
        async asyncData({ store }) {
            await store.dispatch('overtime/loadEmployeeOvertimes');
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
                        text: 'Date',
                        align: 'center',
                        value: 'date'
                    },
                    {
                        text: 'From',
                        align: 'center',
                        value: 'from.standard'
                    },
                    {
                        text: 'To',
                        align: 'center',
                        value: 'to.standard'
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