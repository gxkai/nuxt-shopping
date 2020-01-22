<template>
  <b-container>
    <b-button-group>
      <b-button @click="getNba">nba</b-button>
      <b-button class="ml-2" @click="getDota2">dota2</b-button>
    </b-button-group>
  </b-container>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    getNba() {
      this.$axios.get('/script/nba-champion-history').then(() => {
        this.$toast.success('抓取成功', { duration: 3000 })
      })
    },
    getDota2() {
      this.$axios.get('/script/dota2-champion-history').then(() => {
        this.$toast.success('抓取成功', { duration: 3000 })
      })
    }
  }
}
</script>

<style scoped></style>
