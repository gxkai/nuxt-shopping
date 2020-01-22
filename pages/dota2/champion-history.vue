<template>
  <b-container>
    <b-table :items="items" striped hover></b-table>
  </b-container>
</template>

<script>
export default {
  name: 'ChampionHistory',
  async asyncData(context) {
    const items = await context.store.dispatch(
      'admin/getDota2ChampionHistoryList'
    )
    return {
      items
    }
  }
}
</script>

<style scoped></style>
