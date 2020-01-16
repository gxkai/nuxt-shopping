<template>
  <div v-show="categoryList" class="header">
    <nuxt-link to="/admin" exact>Home</nuxt-link>
    <nuxt-link
      v-show="categoryList"
      v-for="(c, index) in categoryList"
      :key="index"
      :to="`/admin/category/${c.id}`"
      >{{ c.title }}</nuxt-link
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BlogTop',
  computed: mapState('admin', ['categoryList']),
  asyncData(context) {
    return {}
  },
  fetch(context) {
    // context.store.dispatch('getCategoryList')
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  margin-bottom: 20px;
}
a {
  margin-right: 20px;
  font-size: 14px;
  color: #999;
  text-decoration: none;
  text-transform: uppercase;
  padding-top: 2px;
  padding-bottom: 2px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  transition: color 0.25s;
  font-weight: 400;
  line-height: normal;
}
a:hover {
  color: #333;
}
a.nuxt-link-active {
  color: #333;
  border-bottom: 1px solid #333;
  font-weight: 600;
}
</style>
