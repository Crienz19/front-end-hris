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
          <nuxt-link to="/sa/dashboard" tag="v-list-tile">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </nuxt-link>

          <v-list-group prepend-icon="book">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Time Keeping</v-list-tile-title>
              </v-list-tile>
            </template>

            <nuxt-link to="/sa/timekeeping/leave-requests" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Leave Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/sa/timekeeping/overtime-requests" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Overtime Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <nuxt-link to="/sa/timekeeping/trip-requests" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Business Trip Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>
          </v-list-group>

          <v-list-group prepend-icon="settings">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Settings</v-list-tile-title>
              </v-list-tile>
            </template>

            <nuxt-link to="/sa/dashboard" tag="v-list-tile">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Leave Request</v-list-tile-title>
              </v-list-tile-content>
            </nuxt-link>

            <v-list-tile @click="testing('test')">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Overtime Request</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="testing('test')">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Business Trip Request</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
      </v-list>
      </v-navigation-drawer>
      <!-- End of Sidebar -->

      <v-toolbar app>
        <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn @click="logout" flat>
              <v-icon>logout</v-icon>  
            </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container grid-list-lg>
          <nuxt />
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
  mounted () {
    console.log(this.$store);
  },
  methods: {
    logout () {
      if (this.$store.dispatch('auth/logout')) {
        this.$router.push('/');
      }
    }
  }
}
</script>
