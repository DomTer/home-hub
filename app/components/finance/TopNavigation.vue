<template>
  <v-app-bar
    elevation="4"
    prominent
    class=""
  >
    <v-container>
      <v-row>
        <v-col
          cols="11"
          sm="5"
        >
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-container @click="menu = !menu">
                <strong>{{ new Date(searchDate).getFullYear() }}</strong>
                <h2>{{ new Date(searchDate).toLocaleString('default', { month: 'long' }) }}</h2>
              </v-container>
            </template>
            <v-date-picker
              v-model="searchDate"
              :picker-date.sync="pickerDate"
              type="month"
              locale="de"
              no-title
              scrollable
            >
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
    </v-container>
    <v-container>
      <v-text-field
        v-model="search"
        class="span-2"
        append-icon="mdi-magnify"
        label="Volltext Payment Filter"
      ></v-text-field>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "TopNavigation",
  data: () => ({
    date: new Date().toISOString(),
    pickerDate: '2022',
    menu: false,
  }),
  computed: {
    pickedMonthYearSynced() {
      return Number(this.pickerDate) === new Date(this.date).getFullYear()
        ? new Date(this.date).toISOString()
        : new Date(new Date(this.date).setFullYear(Number(this.pickerDate) )).toISOString()
    },
    search: {
      get () {
        return this.$store.state.finance.payments.search
      },
      set (value) {
        this.$store.commit('finance/payments/setSearch', value)
      }
    },
    searchDate: {
      get () {
        return this.$store.state.finance.payments.searchDate
      },
      set (value) {
        console.log(value);
        let date = Number(this.pickerDate) === new Date(value).getFullYear()
          ? new Date(value).toISOString()
          : new Date(new Date(value).setFullYear(Number(this.pickerDate) )).toISOString()
        this.$store.commit('finance/payments/setSearchDate', date)
      }
    },
  },
}
</script>

<style scoped>

</style>
