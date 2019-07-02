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
          <v-card-text>
            <v-container fluid class="graph">
              <h3 class="heading">VL</h3>
              <ChartBar />
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 lg4>
        <v-card elevate="24">
          <v-card-text>
            <v-container fluid class="graph">
              <h3 class="heading">SL</h3>
              <ChartBar />
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 lg4>
        <v-card elevate="24">
          <v-card-text>
            <v-container fluid class="graph">
              <h3 class="heading">PTO</h3>
              <ChartBar />
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 lg3>
        <v-card elevate="24" class="pa-4">
          <v-card-text class="text-xs-center">
            <h3>Vacation Leave</h3>
            <h4>3</h4>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 lg3>
        <v-card elevate="24" class="pa-4">
          <v-card-text class="text-xs-center">
            <h3>Vacation Leave</h3>
            <h4>3</h4>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 lg3>
        <v-card elevate="24" class="pa-4">
          <v-card-text class="text-xs-center">
            <h3>Vacation Leave</h3>
            <h4>3</h4>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 lg3>
        <v-card elevate="24" class="pa-4">
          <v-card-text class="text-xs-center">
            <h3>Vacation Leave</h3>
            <h4>3</h4>
          </v-card-text>
        </v-card>
      </v-flex>
      

      <v-flex xs12>
        <v-card elevate="24">
          <v-data-table
            :headers="headers"
            :items="profiles"
            :loading="true"
            class="elevation-1"
          >
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td class="text-xs-center">{{ props.item.full_name }}</td>
              <td class="text-xs-center">{{ props.item.position }}</td>
              <td class="text-xs-center">{{ props.item.department }}</td>
              <td class="text-xs-center">{{ props.item.email }}</td>
              <td class="text-xs-center">{{ props.item.branch }}</td>
              <td class="text-xs-center">
                <v-icon @click="" small>lock</v-icon>
                <v-icon @click="editEmployee(props.item.id)" small>edit</v-icon>
                <v-icon @click="deleteEmployee(props.item.id)" small>delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import ChartBar from "@/components/chart/chart-bar.vue";
export default {
  components: {
    ChartBar
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
            text: 'Position', 
            align: 'center',
            value: 'position' 
          },
          { 
            text: 'Department', 
            align: 'center',
            value: 'department' 
          },
          { 
            text: 'Email', 
            align: 'center',
            value: 'email' 
          },
          { 
            text: 'Branch Assigned', 
            align: 'center',
            value: 'branch' 
          },
          {
            text: 'Actions',
            align: 'center',
            sortable: false
          }
        ]
      }
    },
    computed: {
      profiles () {
        return this.$store.getters['user/getProfiles'];
      }
    },
    methods: {
      editEmployee (id) {
        alert(id);
      },
      deleteEmployee (id) {
        alert(id);
      }
    }
}
</script>

<style scoped>
  
</style>
