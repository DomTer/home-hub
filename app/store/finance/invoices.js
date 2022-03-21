export const state = () => ({
  invoices: [],
  recurringInvoices: []
})

export const mutations = {
  setInvoices(state, invoices) {
    state.invoices = invoices
  },
  setRecurringInvoices(state, recurringInvoices) {
    state.recurringInvoices = recurringInvoices
  },
}

export const getters = {
  invoices(state) {
    return state.invoices;
  },
  recurringInvoices(state) {
    return state.recurringInvoices;
  },
}

export const actions = {
  async fetchInvoices(state) {
    return await fetch(
      '/api/invoices'
    ).then(res => res.json())
      .then((data) => {
        state.commit("setInvoices", data);
      })
  },
  async fetchRecurringInvoices(state) {
    return await fetch(
      '/api/recurring-invoices'
    ).then(res => res.json())
      .then((data) => {
        state.commit("setRecurringInvoices", data);
      })
  },

}
