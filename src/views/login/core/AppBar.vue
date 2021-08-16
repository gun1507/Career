<template>
  <v-app-bar
    absolute
    color="transparent"
    flat
    height="85"
  >
    <v-container>
      <v-row align="center">
        <v-toolbar-title
          class="font-weight-bold"
          v-text="title"
        />

        <v-spacer />

        
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'LoginCoreAppBar',

    data: () => ({
    }),

    computed: {
      title() {
        return ''
      }
    }
  }
</script>
