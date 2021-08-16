export function setCookie (name, value, exp) {
  let date = new Date();
  date.setTime(date.getTime() + exp * 60 * 60 * 24 * 10000000);
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/'
}

export function getCookie (name) {
  let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return value ? value[2] : null
}

export function deleteCookie (name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export function decodeToken (token) {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}
