export const state = () => ({
  creditcardTransactions: []
})

export const mutations = {
  setCreditcardTransactions(state, transactions) {
    state.creditcardTransactions = transactions
  },
}

export const getters = {
  creditcardTransactions(state) {
    return state.creditcardTransactions;
  },
}

export const actions = {
  async fetchCreditcardTransactions(state) {
    return await fetch(
      '/api/creditcard'
    ).then(res => res.json())
      .then((data) => {
        state.commit("setCreditcardTransactions", data);
      })
  },
}
