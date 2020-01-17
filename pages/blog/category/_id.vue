<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        <header>
          <h5>{{ item.title }}</h5>
          <h5>{{ item.created_at }}</h5>
        </header>
        <footer>
          <tag v-for="(tag, index) in item.tags" :key="index">{{ tag }}</tag>
        </footer>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Id',
  asyncData() {
    return {
      items: [
        {
          id: 1,
          title: 'aaaa',
          created_at: '2020-01-01 10:01:01',
          tags: ['aaa', 'dsaf']
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  color: lighten(#333, 50%);
}
ul {
  li {
    cursor: pointer;
    header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      h5 {
        &:first-child {
          color: lighten(#333, 30%);
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: break-word;
        }
      }
    }
    footer {
      display: flex;
      tag {
        margin-top: 5px;
        & + tag {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
