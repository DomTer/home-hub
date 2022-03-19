export const state = () => ({
  payments: [],
  search : '',
  searchDate: new Date().toISOString(),
})

export const mutations = {
  setPayments(state, transactions) {
    state.payments = transactions
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
