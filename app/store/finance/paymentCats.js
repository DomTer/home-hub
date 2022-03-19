export const state = () => ({
  paymentCategories: []
})

export const mutations = {
  setPaymentCategories(state, transactions) {
    state.paymentCategories = transactions
  },
}

export const getters = {
  paymentCategories(state) {
    return state.paymentCategories;
  },
}

export const actions = {
  async fetchPaymentCategories(state) {
    return await fetch(
      '/api/paymentCategories'
    ).then(res => res.json())
      .then((data) => {
        state.commit("setPaymentCategories", data);
      })
  },
}
