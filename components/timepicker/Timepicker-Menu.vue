<template>
    <div>
      <v-dialog
        ref="dialog"
        v-model="menu"
        :return-value.sync="time"
        persistent
        width="300px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="time"
            :label="label"
            :placeholder="placeholder"
            :disabled="disabled"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker v-if="menu" v-model="time" full-width ampm-in-title>
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="submit">OK</v-btn>
        </v-time-picker>
      </v-dialog>
      <!-- <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="time"
            :label="label"
            :prepend-icon="icon"
            :placeholder="placeholder"
            :disabled="disabled"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          @change="$emit('input', time)"
          v-if="menu"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu> -->
    </div>
</template>

<script>
    export default {
        props: [
          'label',
          'icon',
          'placeholder',
          'value',
          'disabled'
        ],
        data () {
            return {
                time: this.value,
                menu: false
            }
        },
        methods: {
          submit () {
            this.$refs.dialog.save(this.time)
            this.$emit('input', this.time);
          }
        }
    }
</script>

