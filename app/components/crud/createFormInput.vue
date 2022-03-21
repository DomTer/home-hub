<template>
  <v-input>
    <v-text-field
      v-if="item.value !== 'number'"
      v-model="editedItem.name"
      label="Dessert name"
    ></v-text-field>
  </v-input>
</template>

<script>
export default {
  name: "createFormInput"
}
</script>

<style scoped>

</style>
