export const state = () => ({
  payments: [],
  selectedPayment: {},
  search : '',
  searchDate: new Date().toISOString(),
})

export const mutations = {
  setPayments(state, transactions) {
    state.payments = transactions
  },
  setSelectedPayment(state, selectedPayment) {
    state.selectedPayment = selectedPayment
  },
  setSearch(state, search) {
    state.search = search
  },
  setSearchDate(state, searchDate) {
    state.searchDate = searchDate
  },
}

export const getters = {
  payments(state) {
    return state.payments;
  },
  selectedPayment(state) {
    return state.selectedPayment;
  },
  search(state) {
    return state.search;
  },
  searchDate(state) {
    return state.searchDate;
  },
}

export const actions = {
  async fetchPayments(state) {
    return await fetch(
      '/api/payments'
    ).then(res => res.json())
      .then((data) => {
        state.commit("setPayments", data);
      })
  },
}
