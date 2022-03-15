<template>
  <div>
    <TransactionsTable :transactions="giroTransactions" />
    <TransactionsTable :transactions="creditcardTransactions" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      giroTransactions: 'finance/giro/giroTransactions',
      creditcardTransactions: 'finance/creditcard/creditcardTransactions'
    }),

  },
  methods: {
    ...mapActions({
      fetchGiroTransactions: 'finance/giro/fetchGiroTransactions',
      fetchCreditcardTransactions: 'finance/creditcard/fetchCreditcardTransactions'
    }),

  },
  created() {
    this.fetchGiroTransactions();
    this.fetchCreditcardTransactions();
  },
}
</script>
