<template>
  <v-card
    v-if="Object.keys(selectedPayment).length"
    class="col-6 pa-0"
    elevation="12"
    outlined
    shaped
  >
    <v-card-title class="d-flex justify-space-between">
      <span>
        {{ selectedPayment.text || selectedPayment.text2 }}
      </span>
      <v-btn @click="selectedPayment = {}">
        X
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      <strong :class="Math.sign(selectedPayment.value) > 0 ? 'text-positive' : 'text-negative'">
        {{ formatCurrency(selectedPayment.value) }}
      </strong>
    </v-card-subtitle>
    <v-card-text>
      <h4>Details:</h4>
      <v-col>
        <template v-for="(val, key) in selectedPayment">
          <v-row v-if="val"  class="d-flex justify-space-between" style="border-bottom: 1px solid rgba(255, 255, 255, 0.12)">
            <span>{{ key }}</span>
            <span>{{ val }}</span>
          </v-row>
        </template >
      </v-col>
    </v-card-text>
    <v-card-actions>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SelectedPaymentView",
  computed: {
    selectedPayment: {
      get() {
        return this.$store.state.finance.payments.selectedPayment
      },
      set(value) {
        this.$store.commit('finance/payments/setSelectedPayment', value)
      }
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value)
    }
  },
}
</script>

<style scoped>

</style>
