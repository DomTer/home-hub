<template>
  <Html>
    <Head>
      <Title>
        HomeHub
      </Title>
    </Head>
    <Body>
      <Header />
      <slot/>
      <Footer />
    </Body>
  </Html>
</template>

<script>
export default {
  name: "default.vue"
}
</script>

<style scoped>

</style>
