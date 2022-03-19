<template>
  <div class="d-flex">
    <PaymentsTable dense class="col-12" :transactions="payments"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MonthlyView",
  data() {
    return {
      nase: null,
    }
  },
  watch: {
    filterMonth() {
      this.test();
    }
  },
  computed: {
    ...mapGetters({
      allPayments: 'finance/payments/payments',
      filterDate: 'finance/payments/searchDate'
    }),

    filterYear() {
      return new Date(this.filterDate).getFullYear()
    },

    filterMonth() {
      return new Date(this.filterDate).getMonth() + 1
    },

    payments() {
      return this.allPayments.filter(p => {
        let date = new Date(p.date)
        return date.getFullYear() === this.filterYear
          && date.getMonth() + 1 === this.filterMonth
      });
    },
  },
  mounted() {
    this.test();
  },
  methods: {
    test: function () {
      this.nase = this.payments;
    },
  }
}
</script>

<style scoped>

</style>
