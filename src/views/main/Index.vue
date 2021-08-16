<template>
  <v-app>
    <main-core-app-bar v-model="expandOnHover" />
    <main-core-drawer :expand-on-hover.sync="expandOnHover" />
    <v-main>
        <router-view />
        
    </v-main>
    <main-core-footer />
    
    
    
  </v-app>
</template>

<script>
  export default {
    name: 'MainIndex',

    components: {
      MainCoreAppBar: () => import('./core/AppBar'),
      MainCoreDrawer: () => import('./core/Drawer'),
      MainCoreFooter: () => import('./core/Footer')
    },

    data: () => ({
      expandOnHover: true // 사이드바 접기 / 펼치기
    }),
    created() {
      this.$vuetify.theme.themes[this.isDark ? 'dark' : 'light'].primary = '#4CAF50'
    },
  }
</script>
<style>
/* .v-application .primary{
  background-color : #1976D2 !important;
  border-color : #1976D2 !important;
} */
</style>