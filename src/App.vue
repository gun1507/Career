<template>
  <v-app app>
    <router-view/>
  </v-app>
</template>

<script>
import { getCookie } from './utils'
export default {
  created () {
    if (getCookie('x-access-token') !== null) {
      this.$http.defaults.headers['x-access-token'] = getCookie('x-access-token')
    }
  },
  watch: {
    '$route' () {
      if (this.$router.currentRoute.name != 'Login') {
        const token = getCookie('x-access-token')
        if (!token) {
          this.$router.push({name : 'Login'})
        }
      }
    }
  },
}

</script>

<style lang="scss">
@import "./assets/css/app";
</style>
