import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'

export default function({ store, req }) {
  const isServer = process.server
  // If nuxt generate, pass this middleware
  if (isServer && !req) return
  const loggedUser = isServer
    ? getUserFromCookie(req)
    : getUserFromLocalStorage()
  store.commit('SET_USER', loggedUser)
}
