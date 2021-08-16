<template>
  <v-navigation-drawer
    mini-variant-width="70"
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img>
      <v-img
        :gradient="`to bottom, ${barColor}`"
      />
    </template>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-uppercase font-weight-regular display-2">
          <span class="logo-mini">{{ '' }}</span>
          <span class="logo-normal"> {{ 'DIFFUSER' }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
          class="font-weight-bold"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
          class="font-weight-black"
        />
      </template>

      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'DiffuserCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      items: [
        {
          id : 1,
          icon: 'mdi-history',
          title: 'HISTORY',
          to: '/history'
        },
        {
          id : 2,
          icon: 'mdi-account-box-multiple',
          title: '사용자이력',
          to: '/user_history'
        },
        {
          id : 3,
          icon: 'wysiwyg',
          title: 'LOG',
          to: '/log'
        },
        {
          id : 4,
          icon: 'mdi-widgets',
          title: 'MODEL',
          to: '/model'
        },
        {
          id : 5,
          icon: 'mdi-account-search',
          title: '사용자권한',
          to: '/auth'
        },
        {
          id : 6,
          icon: 'mdi-help',
          title: '도움말',
          to: '/help'
        },
      ],
      menuItem : []
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        }
      },
      computedItems () {
        if (sessionStorage.getItem('auth') == 1){
          this.items.some(data => {
            if(data.id == 2 || data.id == 3 || data.id == 4 || data.id == 5){
              return false;
            }else{
              this.menuItem.push(data)
            }
          });
        }else{
          this.menuItem = this.items
        }
      
        return this.menuItem.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          group: '',
          title: this.$t('avatar'),
        }
      }
    },

    watch: {
      '$vuetify.breakpoint.smAndDown' (val) {
        this.$emit('update:expandOnHover', !val)
      }
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title)
        }
      }
    }
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'
  #core-navigation-drawer 
    &.v-navigation-drawer--mini-variant
      width: 100px

  #core-navigation-drawer
    &.v-navigation-drawer--mini-variant
      .v-list-item
        justify-content: flex-start !important

      .v-list-group--sub-group
        display: block !important

    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 10px

        +ltr()
          margin-right: 12px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 10px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 0px

          +rtl()
            margin-left: 0px
</style>
