<template>
  <div>
    <v-dialog
      v-model="showDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Use Google's location service?
        </v-card-title>

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="discardChanges"
          >
            discard
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="saveChanges"
          >
            save
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  name: "test",
  data: () => ({
    to: null,
    showDialog: false
  }),

  beforeRouteLeave(to, from, next) {
    if (this.to) {
      next();
    } else {
      this.to = to;
      this.showDialog = true;
    }
  },

  methods: {
    closeDialog() {
      this.showDialog = false;
      this.to = null;
    },

    saveChanges() {
      // add code to save changes here
      this.showDialog = false;
      this.$router.push(this.to);
    },

    discardChanges() {
      this.showDialog = false;
      this.$router.push(this.to);
    }
  }
}
</script>

<style scoped>

</style>
