export const state = () => ({
  giroTransactions: [],
})

export const mutations = {
  setGiroTransactions(state, transactions) {
    state.giroTransactions = transactions
  },
}

export const getters = {
  giroTransactions(state) {
    return state.giroTransactions;
  },
}

export const actions = {
  async fetchGiroTransactions(state) {
    return await fetch(
      '/api/giro'
    ).then(res => res.json())
      .then((data) => {
        state.commit('setGiroTransactions', data);
      })
  },
}
