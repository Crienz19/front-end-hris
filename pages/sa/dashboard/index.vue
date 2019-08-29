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
      <v-flex xs12 lg6>
        <v-card elevate="24">
          <v-card-title class="light-blue white--text">
            <h3>Leave Summary</h3>
            <v-spacer></v-spacer>
            <v-icon @click="" color="white">refresh</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <apex-chart width="100%" type="line" :data="chart_data"></apex-chart>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 lg6>
        <v-card elevate="24">
          <v-card-title class="light-blue white--text">
            <h3>Overtime Summary</h3>
            <v-spacer></v-spacer>
            <v-icon @click="" color="white">refresh</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <apex-chart width="100%" type="bar" :data="chart_data"></apex-chart>
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
                  <view-employee-details :employee="props.item.employee"></view-employee-details>
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
import ApexChart from "@/components/apex-chart/ApexChart.vue";
import Menu from "@/components/menu/MenuWithSlot.vue";
import AssignRoleModal from "@/components/modal/superadmin/dashboard/AssignRole.vue";
import ViewEmployeeDetails from "@/components/modal/superadmin/dashboard/EmployeeDetails.vue";
export default {
  middleware: ['auth'],
  components: {
    ApexChart,
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
  created() {
    var date = new Date();
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for(var i=0; i<date.getMonth() + 1; i++) {
      console.log(month[i])
    }
  },
  data () {
      return {
        chart_data: {
          options: {
            chart: {
              id: 'vuechart-example'
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
          },
          series: [
            {
              name: 'VL',
              data: [30, 40, 45, 50, 49, 60, 70, 91, 50, 70, 33, 76]
            },
            {
              name: 'SL',
              data: [25, 35, 40, 45, 44, 55, 65, 86, 50, 49, 60, 70],
            },
            {
              name: 'PTO',
              data: [70, 91, 50, 70, 33, 76, 30, 40, 45, 50, 49, 60]
            },
            {
              name: 'VL - Half',
              data: [90, 88, 53, 13, 67, 89, 55, 33, 11, 66, 45, 21]
            },
            {
              name: 'SL - Half',
              data: [11, 37, 75, 64, 90, 14, 35, 45, 11, 24, 34, 55]
            },
            {
              name: 'PTO - Half',
              data: [37, 56, 23, 15, 64, 10, 33, 65, 32, 57, 46, 64]
            }
          ]
        },
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