<template>
    <v-dialog v-model="isShowProjectDialog" width="73%" persistent>
        <base-material-card
            color="info"
            icon="mdi-projector-screen"
            title=""
            class="py-1 px-10 pt-7"
        >
        <template v-slot:after-heading>
            <div class="display-1 font-weight-bold" style="float:left;">
                프로젝트 정보
            </div>
            <div class="text-right ml-auto" style="position:absolute; right:70px">
                <v-btn color="error" @click="formClose()" class="px-1 ml-1" fab x-small >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
        </template>
        <v-container>
            <v-divider></v-divider>
            <br/>
            <v-row
                align="center"
                justify="center"
            >
                <v-col class="text-center body-1 pb-5 font-weight-black"
                cols="2">
                    모델
                </v-col>
                <v-col 
                cols="10" class="body-1 pb-5 font-weight-bold">
                    {{ datas.MODEL }}
                </v-col>
                <v-col class="text-center body-1 pb-5 font-weight-black"
                cols="2">
                    프로젝트명
                </v-col>
                <v-col 
                cols="10" class="body-1 pb-5 font-weight-bold">
                    {{ datas.PROJECT_NAME }}
                </v-col>
                <v-col class="text-center body-1 pb-5 font-weight-black"
                cols="2">
                    API 주소
                </v-col>
                <v-col 
                cols="10" class="body-1 pb-5 font-weight-bold">
                    {{ datas.API_ADD }}
                </v-col>
            </v-row>
                <v-tabs v-model="tab" color="info" >
                    <v-tab v-for="(item) in tabItems" :key="item.name">
                        {{ item.name }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item eager v-for="(item) in tabItems" :key="`${item.name}-content`">
                        <v-row
                            align="center"
                            >
                            <v-col class="text-center body-1 font-weight-black" v-if="modelType != 'gpt'"
                                cols="2">
                                레이블별 <br/> 문서 비율
                            </v-col>
                            <v-col cols="10" v-show="modelType != 'gpt'">
                                <div id="chart">
                                    <apexchart :ref="'realtimeChart'" type="bar" height="350" :options="item.case.linechart.chartOptions" :series="item.case.linechart.series" :id="item.name"></apexchart>
                                </div>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs-items>
            <v-row
                align="center"
                justify="center"
            >
                <v-col class="text-center body-1 pb-5 font-weight-black" v-if="modelType != 'gpt'"
                       cols="2">
                    Confusion Matrix
                </v-col>
                <v-col
                    cols="10" class="body-1 pb-5" v-if="modelType != 'gpt'">
                    <div class="matrix">
                        <iframe
                            scrolling="auto"
                            frameborder="0"
                            align="center"
                            allowfullscreen
                            :src="matrix_result_url"></iframe>
                    </div>
                </v-col>
                <v-col class="text-center body-1 pb-5 font-weight-black"
                       cols="2">
                    Fail Case
                </v-col>
                <v-col
                    cols="10" class="body-1 pb-5">
                    <div class="matrix">
                        <iframe
                            scrolling="auto"
                            frameborder="0"
                            align="center"
                            allowfullscreen
                            :src="failCase_result_url"></iframe>
                    </div>
                </v-col>
            </v-row>
            <div class="pa-3 text-center">
                <v-btn
                    class="mr-2 px-16"
                    color="grey"
                    default
                    dark
                    @click="formClose()"
                >
                    닫기
                </v-btn>
            </div>
        </v-container>
        </base-material-card>   
    </v-dialog>
</template>

<script>
import API from '@/api'

export default {

    data () {
        return {
            matrix_result_url : '',
            failCase_result_url : '',
            series: [],
            modelType : '',
            tab: 0
        }
    },
    props:{
        isShowProjectDialog: Boolean,
        datas: Object,
        dataSet : Object,
        inItems : Array,
    },
    computed : {
        tabItems(){
            return this.inItems;
        }
    },
    created () {
        this.getProjectInfo()
        console.log(this.tabItems)
    },
    watch:{
        // isShowProjectDialog : function (val){
        //     this.$http.get(API.PROJECT_INFO,{
        //         params: {
        //             SEQ : this.datas.SEQ
        //         }
        //     }).then(res=>{
        //         if (res.data.success == true){
        //             this.matrix_result_url = res.data.matrix_result_url
        //             this.failCase_result_url = res.data.failCase_result_url
        //             this.modelType = res.data.modelType
        //             this.chartUpdate(this.tabItems[0].case.linechart.series[0].data, this.tabItems[0].case.linechart.chartOptions.xaxis.categories, 0)
        //         }
        //     })
        // }
    },
    methods : {
        formClose() {
            this.$emit("closeForm")
        },
        getProjectInfo(){
            this.$http.get(API.PROJECT_INFO,{
                params: {
                    SEQ : this.datas.SEQ
                }
            }).then(res=>{
                if (res.data.success == true){
                    this.matrix_result_url = res.data.matrix_result_url
                    this.failCase_result_url = res.data.failCase_result_url
                    this.modelType = res.data.modelType
                }
            })
        },
        // chartUpdate (x,y, idx = 0) {
        //     console.log(x);
        //     console.log(y);
        //     this.$refs.realtimeChart[idx].updateSeries([{
        //         data: x
        //     }])
        //     this.$refs.realtimeChart[idx].updateOptions({
        //         xaxis: {
        //             categories: y
        //         }
        //     });
        // },
    }
}
</script>
<style>
div.matrix{
    position: relative;
    padding-bottom : 20%;
    padding-top: 25%;
    
    height: 0;
}
div.matrix iframe{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>
