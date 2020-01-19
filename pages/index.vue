<template lang="html">
  <div class="main">
    <h1>Hello there</h1>
    <section>
      {{ $auth.$state }}
    </section>
  </div>
</template>

<script>
export default {
  name: 'Stage'
}
</script>

<style scoped lang="scss">
.main {
  margin: auto;
  max-width: 100%;
  padding: 10px;
}
section {
  background-image: linear-gradient(
    141deg,
    #9fb8ad 0%,
    #1fc8db 51%,
    #2cb5e8 75%
  );
  width: 100%;
  height: 500px;
}
</style>
