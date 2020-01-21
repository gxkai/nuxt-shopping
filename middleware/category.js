export default async function({ store, redirect }) {
  await store.dispatch('admin/getCategoryList')
}
