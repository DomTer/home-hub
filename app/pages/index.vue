<template>
  <div class="d-flex">
    <TransactionsTable
      class="col-6"
      headline="Ausgaben"
      :transactions="payments" />
    <TransactionsTable
      class="col-6"
      headline="Einnahmen"
      :transactions="income" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dayjs from "dayjs";

export default {
  name: 'IndexPage',
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      giroTransactions: 'finance/giro/giroTransactions',
      creditcardTransactions: 'finance/creditcard/creditcardTransactions'
    }),

    giroIncome() {
      return this.giroTransactions.filter(t => t.income).map((t) => {
        return {
          Datum: t.date,
          Sender: t.oppositeName,
          Betrag: t.value,
          Text: t.text,
          Konto: 'Giro'
        }
      });
    },
    creditcardIncome() {
      return this.creditcardTransactions.filter(t => t.income && !(t.text === 'Lastschrift' && !t.text2)).map((t) => {
        return {
          Datum: t.date,
          Sender: t.text,
          Betrag: t.value,
          Text: t.text2,
          Konto: 'Kreditkarte'
        }
      });
    },
    giroPayments() {
      return this.giroTransactions.filter(t => !t.income).map((t) => {
        return {
          Datum: t.date,
          Empfänger: t.oppositeName,
          Betrag: t.value,
          Text: t.text,
          Konto: 'Giro'
        }
      });
    },
    creditcardPayments() {
      return this.creditcardTransactions.filter(t => !t.income).map((t) => {
        return {
          Datum: t.date,
          Empfänger: t.text,
          Betrag: t.value,
          Text: t.text2,
          Konto: 'Kreditkarte'
        }
      });
    },
    payments() {
      let giro = this.giroPayments.filter(x => {
        return !x.Text.includes('KREDITKARTENABRECHNUNG') && !x.Empfänger.includes('KREDITKARTENABRECHNUNG');
      })
      return [
        ...giro,
        ...this.creditcardPayments
      ]
    },
    income() {
      return [
        ...this.giroIncome,
        ...this.creditcardIncome
      ]
    }
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
