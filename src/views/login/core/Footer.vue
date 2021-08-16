<template>
  <v-footer
    id="login-core-footer"
    absolute
    color="transparent"
    dark
  >
    <v-container style="margin-right: 50px;">
      <v-row
        align="center"
        no-gutters
      >
      

        <v-spacer class="hidden-sm-and-down" />

        <v-col
          cols="12"
          md="auto"
        >
          <div class="body-1 font-weight-bold pt-0 pt-md-0 text-center">
            &copy; 관련 아지트 : <a href="https://dkt.agit.in/g/300016793/wall/328829716">https://dkt.agit.in/g/300016793/wall/328829716</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'LoginCoreFooter',

    data: () => ({
      
    })
  }
</script>

<style lang="sass">
  #pages-core-footer
    a
      color: #FFFFFF
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>
