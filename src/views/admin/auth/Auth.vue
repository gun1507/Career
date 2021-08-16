<template>
    <div>
        <!-- <top
        @addAuthDialog="addAuthDialog"
        @search="search"
        >
        </top>
        <br/> -->
        <list
        :listData="listData"
        @getUserList="getUserList"
        @addAuthDialog="addAuthDialog"
        @search="search"
        >
        </list>
        <add-user-dialog
        @closeForm="closeForm"
        @getUserList="getUserList"
        :addDialog="addDialog"
        >
        </add-user-dialog>
    </div>  
</template>

<script>
import API from '../../../api'

export default {
    components: {
                // Top: () => import('./Top'),
                List: () => import('./List'),
                AddUserDialog: () => import('../../dialog/AddUserDialog'),
    },
    data () {
        return {
            addDialog : false,
            listData : [],
            searchUser : '',    
        }
    },
    created() {
        this.getUserList()
        if(sessionStorage.getItem('auth') == 1){
            this.$router.push({ name: 'history' })
        }
    },
    methods : {
        addAuthDialog () {
            this.addDialog = true
        },
        getUserList(){
            this.$http.get(API.USER,{ 
                params: { USER : this.searchUser},
            }).then(res=>{
                if (res.data.success == true){
                    this.listData = res.data.data
                }
            })
        },
        search (id) {
            this.searchUser = id
            this.getUserList()
        },
        closeForm () {
            this.addDialog = false
        },

    }
}
</script>