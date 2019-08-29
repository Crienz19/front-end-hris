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
                    :items="overtimes"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-center">{{ props.item.employee.first_name }} {{ props.item.employee.last_name }}</td>
                        <td class="text-xs-center">{{ props.item.date }}</td>
                        <td class="text-xs-center">{{ props.item.from.standard }}</td>
                        <td class="text-xs-center">{{ props.item.to.standard }}</td>
                        <td class="text-xs-center">{{ props.item.reason }}</td>
                        <td class="text-xs-center">{{ props.item.status }}</td>
                        <td class="text-xs-center">{{ props.item.created_at }}</td>
                        <td class="text-xs-center">
                            <view-overtime :overtime="props.item"></view-overtime>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import ViewOvertime from "@/components/modal/superadmin/timekeeping/overtime/ViewOvertime.vue";
    export default {
        middleware: ['auth'],
        components: {
            ViewOvertime
        },
        async asyncData({store}) {
            store.dispatch('overtime/loadSuperOvertimes');
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
                        text: 'Date',
                        align: 'center',
                        value: 'date'
                    },
                    {
                        text: 'From',
                        align: 'center',
                        value: 'from'
                    },
                    {
                        text: 'To',
                        align: 'center',
                        value: 'to'
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
                        align: 'center'
                    }
                ]
            }
        }
    }
</script>