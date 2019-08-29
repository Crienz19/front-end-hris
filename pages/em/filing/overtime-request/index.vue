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
                    <h3>Overtime Requests</h3>
                    <v-spacer></v-spacer>
                    <create-overtime />
                </v-card-title>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers"
                    :items="overtimes"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.id }}</td> 
                        <td class="text-xs-center">{{ props.item.date }}</td>
                        <td class="text-xs-center">{{ props.item.from.standard }}</td>
                        <td class="text-xs-center">{{ props.item.to.standard }}</td>
                        <td class="text-xs-center">{{ props.item.reason }}</td>
                        <td class="text-xs-center">{{ props.item.status }}</td>
                        <td class="text-xs-center">
                            <edit-overtime v-if="props.item.status == 'Pending'" :overtime="props.item" />
                            <v-btn v-if="props.item.status == 'Pending'" @click="deleteOvertime(props.item.actions.delete)" class="ma-0" icon small>
                                <v-icon small>delete</v-icon>
                            </v-btn>
                            <label v-if="props.item.status != 'Pending'">Not Applicable</label>
                        </td>    
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import CreateOvertime from "@/components/modal/employee/request/overtime/CreateOvertime.vue";
    import EditOvertime from "@/components/modal/employee/request/overtime/EditOvertime.vue";
    export default {
        middleware: ['auth'],
        components: {
            CreateOvertime,
            EditOvertime
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
                        value: 'statue'
                    },
                    {
                        text: 'Actions',
                        align: 'center',
                        sortable: false
                    }
                ]
            }
        },
        methods: {
            async deleteOvertime (action) {
                await this.$axios.$delete(action)
                .then((response) => {
                    this.$store.dispatch('overtime/loadEmployeeOvertimes');
                    alert('Deleted!');
                }).catch(error => {
                    alert('Something went wrong!');
                })
            }
        }
    }
</script>