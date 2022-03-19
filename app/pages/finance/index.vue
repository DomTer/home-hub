<template>
  <div>
    <TopNavigation/>
    <monthly-view />
    <TransactionsTable
        class="col-6 mr-4"
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
import MonthlyView from "~/components/finance/MonthlyView";
import TopNavigation from "~/components/finance/TopNavigation";

export default {
  name: 'IndexPage',
  components: {TopNavigation, MonthlyView},
  data: () => ({
    date: '2022-03'
  }),

  computed: {
    ...mapGetters({
      giroTransactions: 'finance/giro/giroTransactions',
      creditcardTransactions: 'finance/creditcard/creditcardTransactions',
    }),
    search: {
      get () {
        return this.$store.state.finance.payments.search
      },
      set (value) {
        this.$store.commit('finance/payments/setSearch', value)
      }
    },

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
      fetchCreditcardTransactions: 'finance/creditcard/fetchCreditcardTransactions',
      fetchPayments: 'finance/payments/fetchPayments'
    }),
  },
  created() {
    this.fetchGiroTransactions();
    this.fetchCreditcardTransactions();
    this.fetchPayments();
  },
}
</script>
