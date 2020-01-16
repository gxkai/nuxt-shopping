<template>
  <div v-show="item">
    <h1>{{ item.title }}</h1>
    <h3>{{ item.created_at }}</h3>
    <section v-html="item.html"></section>
  </div>
</template>

<script>
export default {
  name: 'Id',
  asyncData() {
    return {
      item: {
        title: 'aaaa',
        created_at: '2020-01-01 10:01:01',
        html: '<div>22131dafafaff</div>'
      }
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  color: lighten(#333, 50%);
}
section {
  color: lighten(#333, 30%);
}
</style>
