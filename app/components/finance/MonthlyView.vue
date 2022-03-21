<template>
  <div class="d-flex">
    <PaymentsTable class="col-6" :payments="paymentsSelectedMonth"/>
    <v-container class="col 6">
      <CreateForm :data="recurringInvoices"/>
      <SelectedPaymentView/>
      <h3>Monat</h3>
      Einnahmen: {{ sumArray(incomeSelectedMonth) }} <br>
      Ausgaben: {{ sumArray(expensesSelectedMonth) }} <br>
      Billanz: {{ sumArray(paymentsSelectedMonth) }} <br>
      <br>
      <h3>Seit 2019</h3>
      Einnahmen: {{ sumArray(income) }} <br>
      Ausgaben: {{ sumArray(expenses) }} <br>
      All: {{ sumArray(payments) }}<br>
      <br>
      <h3>Invoices</h3>
        {{ invoices }}
      <h3>RecurringInvoices</h3>
        {{ recurringInvoices }}
    </v-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import PaymentsTable from "~/components/finance/PaymentsTable";
import SelectedPaymentView from "~/components/finance/SelectedPaymentView";
import CreateForm from "~/components/crud/createForm";

export default {
  name: "MonthlyView",
  components: {CreateForm, SelectedPaymentView, PaymentsTable},
  props: {
    income: Array,
    expenses: Array,
  },
  computed: {
    ...mapGetters({
      filterDate: 'finance/payments/searchDate',
      recurringInvoices: 'finance/invoices/recurringInvoices',
      invoices: 'finance/invoices/invoices',
    }),



    payments() {
      return [...this.income, ...this.expenses]
    },
    paymentsSelectedMonth() {
      return this.filterBySelectedMonth(this.payments)
    },
    incomeSelectedMonth() {
      return this.filterBySelectedMonth(this.income)
    },
    expensesSelectedMonth() {
      return this.filterBySelectedMonth(this.expenses)

    },
    filterYear() {
      return new Date(this.filterDate).getFullYear()
    },
    filterMonth() {
      return new Date(this.filterDate).getMonth() + 1
    },
  },
  methods: {
    sumArray(payments) {
      return Number(
        payments.map(p => p.value)
          .reduce((previousVal, currentVal) => previousVal + currentVal, 0))
        .toFixed(2);
    },
    filterBySelectedMonth(payments) {
    return payments.filter(p => {
        let date = new Date(p.date)
        return date.getFullYear() === this.filterYear
          && date.getMonth() + 1 === this.filterMonth
      });
    }
  }
}
</script>

<style scoped>

</style>
