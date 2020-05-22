/**
 * Created by user on 2018/9/28.
 */


import store from '@/store'

export function hasPermission(value = []) {
  const roles = store.getters && store.getters.roles

  if (value && value instanceof Array && value.length > 0) {
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      // console.log(false)
      return false
    } else {
      // console.log(true)
      return true
    }
  }
}
