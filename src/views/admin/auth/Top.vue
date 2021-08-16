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
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-btn class="pl-8">
                    <span class="headline">사용자 권한</span>
                    <v-icon tile size="25">mdi-account-search</v-icon>
                </v-btn>
            </v-bottom-navigation>
            <v-col class="d-flex" cols="12" sm="1" md="2" style="height : 65px">
                <v-text-field
                    v-model="searchUser"
                    placeholder="Search for ldap id"
                    filled
                    rounded
                    dense
                    prepend-inner-icon="mdi-magnify"
                    @keyup="onEnter"
                ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>

            <v-col class="d-flex mr-9" sm="2" md="1" style="height : 65px">
                <v-btn class="mb-4 pl-4 pr-4" color="primary" height="40" @click="addAuthDialog()">권한추가 <v-icon>mdi-plus</v-icon></v-btn>
            </v-col>
        </v-list-item>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            activeBtn : 1,
            searchUser : '',
        }
    },
    created () {
    },
    watch:{
        activeBtn : function (val){
            if(val == 0){
                this.$router.push({ name : 'model'}).catch(err=>{})
            }
        }
    },
    methods : {
        addAuthDialog() {
            this.$emit('addAuthDialog')
       },
        onEnter (e) {
            if (e.keyCode === 13) {
                this.$emit('search', this.searchUser)
            }
        },
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