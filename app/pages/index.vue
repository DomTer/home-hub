<template>
  <h1>{{ data.length }}</h1>
</template>

<script>
  data() {

  }
const { data } = await useFetch('/api/giro/transactions');
</script>
