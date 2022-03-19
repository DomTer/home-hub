<template>
  <v-navigation-drawer
    app
    class=""
    mini-variant
    dark
  >
    <NuxtLink to="/">
      <v-btn
        icon
        tile
        class="d-block text-center mx-auto mb-2 sidebar-icon-btn"
      >
        <v-icon>
          mdi-home
        </v-icon>
      </v-btn>
    </NuxtLink>
    <NuxtLink to="/finance">
    <v-btn
      icon
      tile
      class="d-block text-center mx-auto mb-2 sidebar-icon-btn"
    >
      <v-icon>
        mdi-currency-eur
      </v-icon>
    </v-btn>
    </NuxtLink>
    <NuxtLink to="/prisma">
    <v-btn
      icon
      tile
      class="d-block text-center mx-auto mb-2 sidebar-icon-btn"
    >
      <v-icon>
        mdi-database
      </v-icon>
    </v-btn>
    </NuxtLink>
    <v-btn
      icon
      tile
      class="d-block text-center fixedBottom sidebar-icon-btn"
      @click="overlay = !overlay"
      height="56px"
    >
      <v-icon>
        mdi-camera-metering-matrix
      </v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "TheSidebarNav",
  props: ['overlay'],
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.sidebar-icon-btn {
  width: 100%;
  height: 56px;
}
</style>
