<template>
    <div>
        <list
        :listData="listData"
        @getList="getList">
        </list>
    </div>
</template>

<script>
import API from '../../../api'

export default {
    components: {
                List: () => import('./List'),
    },
    data () {
        return {
            listData : [],
        }
    },
    created() {
        this.getList()
    },
    methods : {
        getList() {
            this.$http.get(API.LOG_LIST).then(res=>{
                if (res.data.success == true){
                    this.listData = res.data.data
                }
            }, err => {
                console.log(err);
            })
        },

    }
}
</script>