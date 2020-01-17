<template>
  <div>
    <NuxtChild name="top" />
    <NuxtChild />
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  name: 'Admin'
}
</script>

<style scoped></style>
