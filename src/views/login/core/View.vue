<template>
  <v-main
    id="login_pages"
    :class="$vuetify.theme.dark ? undefined : 'grey lighten-3'"
  >
    <v-container
      id="login"
      fill-height
      tag="section"
    >
      <v-row justify="center">
        <v-slide-y-transition appear>
          <base-material-card
            color="success"
            light
            max-width="100%"
            width="400"
            class="px-5 py-3"
          >
            <template v-slot:heading>
              <div class="text-center">
                <h3 class="display-2 font-weight-bold mb-2">
                  Diffuser Login
                </h3>
                <div class="body-1 font-weight-bold pt-6 pt-md-0 text-center">
                  관리자 문의 : jason.ng, jun.c
                </div>
              </div>
            </template>

            <v-card-text class="text-center">
              
              <v-text-field
                color="secondary"
                label="LDAP ID"
                prepend-icon="face"
                class="mt-10"
                name="login"
                type="text"
                v-model="ldapid"
                :error="error"
                :rules="[rules.required]"
                @keyup="onEnter"
              />

              <v-text-field
                class="mb-8"
                color="secondary"
                prepend-icon="lock"
                id="password"
                label="Password"
                name="password"
                v-model="ldappw"
                :type="hidePassword ? 'password' : 'text'"
                :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
                @click:append="hidePassword = !hidePassword"
                :error="error"
                :rules="[rules.required]"
                @keyup="onEnter"
              />

              <pages-btn
                large
                color=""
                depressed
                class="v-btn--text success--text"
                @click="login()"
              >
                Login
              </pages-btn>
            </v-card-text>
          </base-material-card>
        </v-slide-y-transition>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        :top="true"
      >
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-main>
</template>


<script>
import API from '@/api'
import { getCookie, setCookie } from '@/utils'

export default {
  components: {
    PagesBtn: () => import('../core/Btn')
  },
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      timeout: 3000,


      loading: false,
      ldapid: '',
      ldappw: '',
      hidePassword: true,
      error: false,
      rules: { required: value => !!value || 'Required.'}
    }
  },
  props: {
    source: String,
  },
  created () {
  },
  methods: {
    verifyToken () {
      this.$http.get(API.VERIFY_TOKEN)
      .then(res => {
        const data = res.data
        if (data['success']) {
          this.$router.push({ name: 'main' })
        }
      })
    },
    onEnter (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    login() {
      const vm = this;

      if (!vm.ldapid || !vm.ldappw) {
        this.snackbar = true
        this.snackbarText = '아이디 패스워드를 확인해주세요.'
        return;
      }else{
        this.$http.post(API.HELLO_MIS_AUTH, {
          'id' : vm.ldapid,
          'pw' : vm.ldappw,
        }).then(res => {
          const datas = res.data.data
          if(datas.result.code === 'SUCCESS'){
            if(datas.result.auth == 2 || datas.result.userId == ''){    // DIFFUSER-98 로그인 오류 방지
              vm.error = true
              this.snackbar = true
              this.snackbarText = '권한이 없습니다. 관리자에게 문의해 주세요. :)'
            }else{
              this.$http.defaults.xsrfCookieName = 'csrftoken'
              this.$http.defaults.xsrfHeaderName = "X-CSRFTOKEN"
              setCookie('x-access-token', datas.result.token, 6)
              setCookie('csrftoken', '9wPscOd5kW8AYfIQaZza4sQv7IN6Z8jHQ6q1xTQMAUCMETBr9ig0rwedEUwmIqBA', 1)
              this.$http.defaults.headers['x-access-token'] = getCookie('x-access-token')
              this.$http.defaults.headers['csrfmiddlewaretoken'] = getCookie('csrftoken')
              
              sessionStorage.setItem('userid', vm.ldapid)
              sessionStorage.setItem('auth', datas.result.auth)
              this.$router.push({ name : 'History'})
            }
          }
          else {
            this.snackbar = true
            this.snackbarText = '아이디 또는 패스워드가 잘못되었습니다.'
          }
        }).catch(() => {
          this.snackbar = true
          this.snackbarText = '서버 에러 발생'
        })
      }
    },
  }
}
</script>

<style lang="sass">
  #login_pages
    > .v-main__wrap > .v-image
      padding-top: 64px
      padding-bottom: 88px

    .v-responsive__sizer
      display: none

    .v-image--md
      padding: 188px 0

    .v-image--sm
      padding: 96px 0 188px 0
</style>
