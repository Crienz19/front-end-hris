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
                    <h4>Overtime Requests</h4>
                    <v-spacer></v-spacer>
                    <download-excel
                        title="Overtime Requests"
                        name="Overtime Requests"
                        :fields="fields"
                        :data="overtimes"
                    ></download-excel>
                    <filter-overtime></filter-overtime>
                    <v-btn class="ma-1" @click="$store.dispatch('overtime/loadHrOvertimes')" color="warning" icon>
                            <v-icon>refresh</v-icon>
                        </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="overtimes"
                >
                    <template v-slot:item.status="{ item }">
                        <v-chip color="warning" v-if="item.status == 'Pending'">{{ item.status }}</v-chip>
                        <v-chip color="success" v-if="item.status == 'Approved'">{{ item.status }}</v-chip>
                        <v-chip color="error" v-if="item.status == 'Disapproved'">{{ item.status }}</v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <view-overtime :overtime="item"></view-overtime>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import DownloadExcel from '@/components/exportToExcel/downloadToExcel.vue';    
    import ViewOvertime from "@/components/modal/hr/requests/overtime/ViewOvertime.vue";
    import FilterOvertime from "@/components/modal/hr/requests/overtime/FilterOvertime.vue";
    export default {
        middleware: ['auth'],
        components: {
            DownloadExcel,
            FilterOvertime,
            ViewOvertime
        },
        async asyncData({store}) {
            store.dispatch('overtime/loadHrOvertimes');
        },
        data () {
            return {
                fields: {
                    'Last Name': 'employee.last_name',
                    'First Name': 'employee.first_name',
                    'Date': 'date',
                    'From': 'from.standard',
                    'To': 'to.standard',
                    'Reason': 'reason',
                    'Status': 'status',
                    'Date Filed': 'created_at'
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