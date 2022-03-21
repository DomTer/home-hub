<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="payments"
      :search="search"
      item-key="hash"
      @click:row="selectPayment"
      :item-class="selectedRowClass"
      :items-per-page="itemsPerPage || 15"
      dense
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
  </div>
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
    selectPayment(row) {
      this.selectedPayment = this.selectedPayment === row ? {} : row;
    },
    selectedRowClass(row) {
      return this.selectedPayment.hash && this.selectedPayment.hash === row.hash ? 'v-data-table__selected' : '';
    },
    toDate(dateString) {
      return new Date(dateString).toISOString().slice(0, 10)
    },
    arrSum: function (arr) {
      return parseFloat(arr.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2);
    }
  },

  computed: {
    ...mapGetters({
      search: 'finance/payments/search',
    }),

    selectedPayment: {
      get() {
        return this.$store.state.finance.payments.selectedPayment
      },
      set(value) {
        this.$store.commit('finance/payments/setSelectedPayment', value)
      }
    },

    originalHeaders() {
        return Object.keys(this.payments[0]).map(x => function () { return { text: x, value: x } })
    },
    sumLoss() {
      return this.arrSum(this.payments.map(p => p.value))
    }
  },
  props: {
    payments: Array,
    headline: String,
    itemsPerPage: Number,
  }
}
</script>

<style scoped>
  .text-end {
    text-align: end !important;
  }
</style>
