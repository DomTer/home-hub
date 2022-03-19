<template>
  <v-card>
    <v-card-title>
      {{ headline }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers2"
      :items="transactions"
      :search="search"
    >
      <template v-slot:item.Betrag="{ item }">
        <div
          :class="Math.sign(item.Betrag) > 0 ? 'text-positive' : 'text-negative'"
        >
          {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.Betrag) }}
        </div>
      </template>
      <template v-slot:item.Datum="{ item }">
        {{toDate(item.Datum) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "TransactionsTable",
  data () {
    return {
      headers2: [
        {
          text: 'Datum',
          align: 'end',
          sortable: true,
          value: 'Datum',
        },
        { text: 'Empfänger', value: 'Empfänger' },
        { text: 'Betrag', value: 'Betrag', align: 'right'},
        { text: 'Text', value: 'Text' },
        ///{ text: 'Konto', value: 'Konto' },
      ],
      search: '',
    }
  },
  methods: {
    toDate(dateString) {
      return new Date(dateString).toISOString().slice(0, 10)
    }
  },

  computed: {
    headers() {
      if (this.transactions.length) {
        return Object.keys(this.transactions[0]).map(x => {
          return {
            text: x, value: x
          }})
      }
    return [];
    }
  },
  props: {
    transactions: Array,
    headline: String,
  }
}
</script>

<style scoped>
  .text-end {
    text-align: end !important;
  }
</style>
