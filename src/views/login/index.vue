<template>
  <v-app>
    <pages-core-app-bar />
    <login-core-view />
    <login-core-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'LoginIndex',

    components: {
      PagesCoreAppBar: () => import('./core/AppBar'),
      LoginCoreView: () => import('./core/View'),
      LoginCoreFooter: () => import('./core/Footer'),
    },

    created() {
      this.$vuetify.theme.dark = true
    },

    beforeDestroy() {
      this.$vuetify.theme.dark = false
    }
  }
</script>
<style>


</style>