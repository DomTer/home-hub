<template>
  <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="transactions"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "TransactionsTable",
  data () {
    return {
      search: '',
    }
  },

  computed: {
    headers() {
      if (this.transactions.length) {
        return Object.keys(this.transactions[0]).map(x => {
          return {
            text: x, value:x
          }})
      }
    return [];
    }
  },
  props: {
    transactions: Array,
  }
}
</script>

<style scoped>

</style>
