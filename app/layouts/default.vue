<template>
    <v-app dark>
      <v-main>
        <TheSidebarNav />
        <!--<TheHeader />-->
        <Nuxt />
        <!--<TheFooter />-->
        <v-overlay
          :z-index="zIndex"
          :value="overlay"
          :class="overlay ? 'overlay' : ''"
        >
          <v-btn
            class="white--text red"
            @click="overlay = false"
          >
            Hide Overlay
          </v-btn>
        </v-overlay>
      </v-main>
    </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data: () => ({
    overlay: false,
    zIndex: 0,
  }),
}
</script>

<style scoped>
.overlay {
  backdrop-filter: blur(10px);
}
</style>
