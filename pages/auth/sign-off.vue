<template>
  <p>Signing off...</p>
</template>

<script>
export default {
  mounted() {
    this.$auth.logout()
  }
}
</script>
