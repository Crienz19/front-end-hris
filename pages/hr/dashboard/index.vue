<template>
    <v-layout row wrap>
      <v-flex xs12>
        <v-alert
          value=true
          type="info"
          transition="scale-transition"
        >
          This is information alert.
        </v-alert>
      </v-flex>
      <v-flex xs12 lg4>
        <v-card elevate="24">
          <v-card-title class="light-blue white--text">
            <h3>VL</h3>
            <v-spacer></v-spacer>
            <v-icon @click="" color="white">refresh</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <ChartBar />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 lg4>
        <v-card elevate="24">
          <v-card-title class="light-blue white--text">
            <h3>SL</h3>
            <v-spacer></v-spacer>
            <v-icon @click="" color="white">refresh</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <ChartBar />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 lg4>
        <v-card elevate="24">
          <v-card-title class="light-blue white--text">
            <h3>PTO</h3>
            <v-spacer></v-spacer>
            <v-icon @click="" color="white">refresh</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <ChartBar />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card elevate="24">
          <v-data-table
            :headers="headers"
            :items="users"
            :loading="true"
            class="elevation-1"
          >
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.email }}</td>
              <td class="text-xs-center">{{ props.item.role }}</td>
              <td class="text-xs-center">
                <v-icon v-if="props.item.isActivated" color="success">check_circle_outline</v-icon>
                <v-icon v-else color="error">error_outline</v-icon>
              </td>
              <td class="text-xs-center">
                <v-icon v-if="props.item.isFilled" color="success">check_circle_outline</v-icon>
                <v-icon v-else color="error">error_outline</v-icon>
              </td>
              <td class="text-xs-center">{{ props.item.created_at }}</td>
              <td class="text-xs-center">
                  <view-employee-details v-if="props.item.employee" :employee="props.item.employee"></view-employee-details>
                  <v-btn class="ma-0" v-if="props.item.isActivated" icon small @click="deactivateUser(props.item.id)">
                    <v-icon>lock</v-icon>
                  </v-btn>
                  <v-btn class="ma-0" v-else icon small @click="activateUser(props.item.id)">
                    <v-icon>lock_open</v-icon>                    
                  </v-btn>
                  <assign-role-modal :user="props.item.id" />
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import ChartBar from "@/components/chart/chart-bar.vue";
import Menu from "@/components/menu/MenuWithSlot.vue";
import AssignRoleModal from "@/components/modal/superadmin/dashboard/AssignRole.vue";
import ViewEmployeeDetails from "@/components/modal/superadmin/dashboard/EmployeeDetails.vue";
export default {
  middleware: ['auth'],
  components: {
    ChartBar,
    AssignRoleModal,
    ViewEmployeeDetails
  },
  head () {
    return {
      title: 'Dashboard'
    }
  },
  async asyncData({$axios, store}) {
    await store.dispatch('user/loadUsers');
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
            text: 'Username',
            align: 'center',
            value: 'name'
          },
          { 
            text: 'Email', 
            align: 'center',
            value: 'email' 
          },
          { 
            text: 'Role', 
            align: 'center',
            value: 'role' 
          },
          {
            text: 'Activated',
            align: 'center',
            value: 'isActivated'
          },
          {
            text: 'Filled',
            align: 'center',
            value: 'isFilled'
          },
          {
            text: 'Created At',
            align: 'center',
            value: 'created_at'
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
    async activateUser (id) {
      await this.$store.dispatch('user/updateUser', { 'id':id, 'isActivated': true});
    },
    async deactivateUser (id) {
      await this.$store.dispatch('user/updateUser', { 'id':id, 'isActivated': false});
    }
  }
}
</script>