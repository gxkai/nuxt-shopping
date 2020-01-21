<template>
  <div class="header">
    <nuxt-link to="/dota2" exact>Home</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'BlogTop'
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
