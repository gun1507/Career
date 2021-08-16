<template>
  <v-app-bar
    absolute
    app
    color="transparent"
    flat
    height="75"
    style="width: auto;"
  >
    <v-btn
      fab
      small
      @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <!-- <v-toolbar-title
      class="hidden-sm-and-down"
      v-text="$route.name"
    /> -->

    <v-spacer />

    <div class="mx-3" />

    <v-spacer></v-spacer>
      <v-btn
        
        large
        text
        
      >
        <v-icon>mdi-account</v-icon>{{ ldapId }}
      </v-btn>
      <v-btn
        icon
        large
        @click="logout"
        class="mr-2"
      >
        <v-icon >logout</v-icon>
      </v-btn>
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render(h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs
                  }
                }, this.$slots.default)
            }
          })
        }
      }
    },

    props: {
      value: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        ldapId : sessionStorage.getItem('userid')

      }
    },

    computed: {
      ...mapState(['drawer'])
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER'
      }),
      logout(){
        this.$router.push({ name : 'Login'})
      }
    }
  }
</script>
