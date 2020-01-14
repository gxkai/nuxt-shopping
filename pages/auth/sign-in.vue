<template>
  <div id="auth0-lock">
    <form>
      <input />
      <input />
      <input type="button" value="登陆" />
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'anonymous',
  mounted() {
    // const showLogin = require('~/utils/lock').showLogin
    // showLogin('auth0-lock')
  }
}
</script>
<style scoped lang="scss">
#auth0-lock {
  form {
    width: 50%;
    margin: 20% auto 0;
    display: flex;
    flex-direction: column;
    input {
      & + input {
        margin-top: 10px;
      }
      padding: 10px 5px;
      outline: none;
      &:not(:last-child) {
        &:focus {
          border: 1px solid rgba(blue, 0.5);
        }
      }
      font-size: 16px;
      &:last-child {
        background-color: rgba(green, 0.5);
        color: rgba(white, 0.5);
        border: none;
      }
    }
  }
}
</style>
