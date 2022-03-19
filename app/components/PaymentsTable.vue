<template>
    <v-data-table
      :headers="headers"
      :items="transactions"
      :search="search"
    >
      <template v-slot:item.value="{ item }">
        <div
          :class="Math.sign(item.value) > 0 ? 'text-positive' : 'text-negative'"
        >
          {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.value) }}
        </div>
      </template>
      <template v-slot:item.date="{ item }">
        {{toDate(item.date) }}
      </template>
      <template v-slot:item.categories="{ item }">
        {{ item.categories.length ? item.categories[0].name : 'keine' }}
      </template>
    </v-data-table>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "PaymentsTable",
  data () {
    return {
      headers: [
        { text: 'date', value: 'date' },
        { text: 'Text', value: 'text' },
        { text: 'Zus. Text', value: 'text2' },
        { text: 'Betrag', value: 'value', align: 'right'},
        { text: 'Typ', value: 'type' },
        { text: 'Kategorie', value: 'categories' }
      ],
    }
  },
  methods: {
    toDate(dateString) {
      return new Date(dateString).toISOString().slice(0, 10)
    },
    arrSum: function (arr) {
      return parseFloat(arr.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2);
    }
  },

  computed: {
    ...mapGetters({
      search: 'finance/payments/search'
    }),
    originalHeaders() {
        return Object.keys(this.transactions[0]).map(x => function () { return { text: x, value: x } })
    },
    sumLoss() {
      return this.arrSum(this.transactions.map(p => p.value))
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
