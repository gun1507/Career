<template>
    <v-layout class="elevation-3">
        <v-list-item three-line>
            <v-bottom-navigation
                v-model="activeBtn"
                color="primary"
                horizontal
                width="30%"
                justify-content="left"
            >
                <v-btn>
                <span class="headline">모델</span>
                <v-icon tile size="25">mdi-archive</v-icon>
                </v-btn>
                <v-divider class="mx-4" inset vertical v-if="this.auth != 1"></v-divider>
                <v-btn v-if="this.auth != 1" class="pl-8">
                    <span class="headline">사용자 권한</span>
                    <v-icon tile size="25">mdi-account-search</v-icon>
                </v-btn>
            </v-bottom-navigation>
            
            <v-spacer></v-spacer>

            <v-col class="d-flex mr-9" sm="2" md="1" style="height : 65px">
                <v-btn class="mb-4  pl-4 pr-4" color="primary" height="40" @click="addModelDialog()">모델추가 <v-icon>mdi-plus</v-icon></v-btn>
            </v-col>
        </v-list-item>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            activeBtn : 0,
        }
    },
    created () {
        // let auth_num = sessionStorage.getItem('auth')
        // if (auth_num == 1){
        //     this.titlewidth = '20%'
        // }
        // this.auth = auth_num
    },
    methods : {
       addModelDialog() {
           this.$emit('ModelDialog')

       }
    },
    watch:{
        activeBtn : function (val){
            if(val == 1){
                this.$router.push({ name : 'auth'}).catch(err=>{})
            }
            
        }
    },
}
</script>

<style>
.d-flex.col-sm-1.col{
  height : 65px
}
.d-flex.col-sm-2.col{
  height : 65px
}
.d-flex.col-sm-1.col-md-2.col-12{
    height: 65px;
}
.headline {
    padding-right : 20px;
}

</style>