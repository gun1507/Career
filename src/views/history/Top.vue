<template>
    <v-container
    fluid
    style="padding-bottom: 0px;"
    >
        <v-row
            style="height: auto;"
        >
            <v-col
                cols="12"
                sm="6"
                lg="3"
            >
                <base-material-stats-card
                color="success"
                icon="widgets"
                title="전체 학습모델수"
                :value="totalCnt"
                class="mt-0 mb-0"
                style="display : flex;"
                :minHeight="true"
                >
                </base-material-stats-card>
            </v-col>

            <v-col
                cols="12"
                sm="6"
                lg="3"
            >
                <base-material-stats-card
                color="yellow"
                icon="archive"
                title="가용 학습모델수"
                :value="availabilityCnt"
                class="mt-0 mb-0"
                style="display : flex;"
                :minHeight="true"
                />
            </v-col>

            <v-col
                cols="12"
                sm="6"
                lg="3"
            >
                <base-material-stats-card
                color="info"
                icon="mdi-arrange-bring-forward"
                title="Deepflow 가용 리소스"
                :value="sessionCnt"
                class="mt-0 mb-0"
                style="display : flex;"
                :minHeight="true"
                />
            </v-col>

            <v-col
                cols="12"
                sm="6"
                lg="3"
            >
                <base-material-stats-card
                color="info"
                icon="mdi-arrange-send-backward"
                title="Dference 가용 리소스"
                :value="appCnt"
                class="mt-0 mb-0"
                style="display : flex;"
                :minHeight="true"
                />
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import API from '@/api'

export default {
    data () {
        return {
            // userSearch : '',
            radios : 'all',
            // titlewidth : '30%',
            // activeBtn : 0,
            

            // Count
            // cnnCount : '0',
            // lstmCount : '0',
            // mType : this.modelType,
        }
    },
    created () {
        // let auth_num = sessionStorage.getItem('auth')
        // if (auth_num == 1){
        //     this.titlewidth = '20%'
        // }
        // this.auth = auth_num

        // this.$http.get(API.MODEL_COUNT,{
        //     params: { userid :sessionStorage.getItem('userid') }
        // }).then(res=>{
        //     if (res.data.success == true){
        //         this.totalCount = String(res.data.data['totalCount'])
        //         this.availabilityCount = String(res.data.data['availabilityCount'])
        //         this.sessionCount = 'GPU : ' + res.data.data['sessionCount'] + ' volta'
        //         this.appCount = 'CPU : ' + res.data.data['appCpu'] + ' 개<br />MEM : ' + res.data.data['appMem'] + ' Mb<br />GPU : ' + res.data.data['appGpu'] + ' Gb'
        //
        //         // this.cnnCount = String(res.data.data['cnnCount'])
        //         // this.lstmCount = String(res.data.data['lstmCount'])
        //     }
        // })
    },
    props:{
        modelType : String,
        totalCnt : String,
        availabilityCnt : String,
        sessionCnt : String,
        appCnt : String,
        modelSelectData : Array,
    },
    watch:{
        // activeBtn : function (val){
        //     console.log(val)
        //     if (val == 0 ) this.mType = 'ALL'
        //     this.$emit('changeHistory', val)
        // },
        // radios : function (val){
        //     this.$emit('search', val, this.mType, this.userSearch)
        // },
        // mType : function (val){
        //     this.$emit('search',this.radios, String(val), this.userSearch)
        // }
    },
    methods : {
    //    onEnter (e) {
    //     if (e.keyCode === 13) {
    //         this.$emit('search',this.radios, this.mType, this.userSearch)
    //         }
    //     },
    },
    computed: {
    },
    
}
</script>