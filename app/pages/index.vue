<template>
  <div>
    <h1>{{ transactions }}</h1>
    <TransactionsTable :transactions="giroTransactions" />
    <TransactionsTable :transactions="creditcardTransactions" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    giroTransactions: [],
    creditcardTransactions: [],
  }),
  async fetch() {
    this.giroTransactions = await fetch(
      '/api/giro'
    ).then(res => res.json())
    this.creditcardTransactions = await fetch(
      '/api/creditcard'
    ).then(res => res.json())
  },

}
</script>
