<template>
  <div>
    <TopNavigation/>
    <MonthlyView :income="income" :expenses="expenses"/>
    <div className="d-flex">
      <PaymentsTable class="col-6" :payments="income" :items-per-page="10"/>
      <PaymentsTable class="col-6" :payments="expenses" :items-per-page="10"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import MonthlyView from "~/components/finance/MonthlyView";
import TopNavigation from "~/components/finance/TopNavigation";
import TransactionsTable from "~/components/finance/TransactionsTable";
import PaymentsTable from "~/components/finance/PaymentsTable";

export default {
  name: 'IndexPage',
  components: {PaymentsTable, TransactionsTable, TopNavigation, MonthlyView},
  data: () => ({
    date: '2022-03'
  }),

  computed: {
    ...mapGetters({
      payments: 'finance/payments/payments'
    }),
    search: {
      get() {
        return this.$store.state.finance.payments.search
      },
      set(value) {
        this.$store.commit('finance/payments/setSearch', value)
      }
    },

    income() {
      return this.payments.filter(p => {
        return p.value > 0
      })
    },

    expenses() {
      return this.payments.filter(p => {
        return p.value < 0
      })
    },
  },
  methods: {
    ...mapActions({
      fetchPayments: 'finance/payments/fetchPayments',
      fetchInvoices: 'finance/invoices/fetchInvoices',
      fetchRecurringInvoices: 'finance/invoices/fetchRecurringInvoices'
    }),
    isCreditCardBill(payment) {
      return payment.text === 'Lastschrift' && payment.type === 'Kreditkartenzahlung' && payment.text2 === ''
    }
  },
  created() {
    this.fetchPayments();
    this.fetchInvoices();
    this.fetchRecurringInvoices();
    },
}
</script>
