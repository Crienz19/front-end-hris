<template>
    <v-app>
      <!-- Sidebar -->
      <v-navigation-drawer 
        app
        absolute
        dark 
        :mini-variant.sync="mini"
        permanent
      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>HRIS</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list class="pa-0">
          <v-divider></v-divider>
          <v-list-tile
            @click="testing('test')"
          >
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <!-- End of Sidebar -->

      <v-toolbar app>
        <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>
              <v-icon>logout</v-icon>  
            </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid grid-list-lg>
          <router-view></router-view>
        </v-container>
      </v-content>
      <!--<v-footer app></v-footer>-->
    </v-app>
</template>

<script>
export default {
  data () {
    return {
      mini: false
    }
  },
  methods: {
    testing (something) {
      alert(`${something}`);
    }
  }
}
</script>
