<template>
  <b-container>
    <b-table :items="items" striped hover></b-table>
  </b-container>
</template>

<script>
export default {
  name: 'ChampionHistory',
  async asyncData(context) {
    let items = await context.store.dispatch('admin/getNbaChampionHistoryList')
    items = items.sort((n1, n2) => Number(n2.year) - Number(n1.year))
    return {
      items
    }
  }
}
</script>

<style scoped></style>
