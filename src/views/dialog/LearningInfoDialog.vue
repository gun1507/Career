<template>
<!--    <v-dialog v-model="isShowLearningInfoDialog" width="50%" persistent>-->
<!--        <base-material-card-->
<!--            color="primary"-->
<!--            icon="mdi-archive"-->
<!--            title=""-->
<!--            class="py-1 px-10 pt-7"-->
<!--        >-->
<!--            <template v-slot:after-heading>-->
<!--                <div class="display-1 font-weight-bold" style="float:left;">-->
<!--                    프로젝트 정보-->
<!--                </div>-->
<!--                <div class="text-right ml-auto" style="position:absolute; right:70px">-->
<!--                <v-btn color="error" @click="formClose()" class="px-1 ml-1" fab x-small >-->
<!--                    <v-icon>mdi-close</v-icon>-->
<!--                </v-btn>-->
<!--                </div>-->
<!--            </template>-->

            <v-container>
<!--                <v-divider></v-divider>-->
<!--                <br/>-->
                <v-row
                align="center"
                dense
                >
                    <v-col class="pb-6 text-center body-1"
                    cols="3">
                        모델
                    </v-col>
                    <v-col cols="8">
                        <v-text-field
                            ref="MODELVALUE"
                            v-model="dataSet.modelValue"
                            dense
                            outlined
                            :disabled="true"
                        ></v-text-field>
                    </v-col>
                    <v-col class="pb-6 text-center body-1"
                    cols="3">
                        프로젝트명
                    </v-col>
                    <v-col cols="8">
                        <v-text-field
                        ref="PROJECTNAME"
                        v-model="dataSet.projectName"
                        dense
                        outlined
                        :disabled="true"
                        ></v-text-field>
                    </v-col>
                    <v-tabs v-model="subtab" class="category-tabs">
                        <v-tabs-slider
                            style="width: 55px; margin: 0 auto;"
                            color="primary">
                        </v-tabs-slider>
                        <v-tab
                            v-for="item in tabType" :key="item.name"
                            style="border-radius: 70px"
                            v-bind:class="{runningClass: item.case.verificationState.verification, notRunningClass: !item.case.verificationState.verification}"
                        >
                            {{ item.name }}
                        </v-tab>
                        <v-tabs-items v-model="subtab">
                            <v-tab-item v-for="item in tabType" :key="item.name">
                                <v-row
                                    align="center"
                                    dense>
                                    <v-col class="pb-6 text-center body-1"
                                    cols="3">
                                        File
                                    </v-col>
                                    <v-col cols="8">
                                        <v-text-field
                                        ref="PROJECTNAME"
                                        v-model="item.oriFileName"
                                        dense
                                        outlined
                                        :disabled="true"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col class="text-center body-1"
                                    cols="3">
                                    File Info
                                    </v-col>
                                    <v-col cols="8">
                                        <v-data-table
                                        :headers="headers"
                                        :items="item.case.fileInfoTable.fileInfoItem"
                                        hide-default-header
                                        hide-default-footer
                                        item-key="name"
                                        >
                                        </v-data-table>
                                    </v-col>


                                    <v-col class="text-center body-1"
                                    cols="3" v-if="dataSet.modelToken != 'gpt'">
                                    레이블별 <br/> 문서 비율
                                    </v-col>
                                    <v-col cols="8" v-if="dataSet.modelToken != 'gpt'">
                                        <div id="chart">
                                            <apexchart ref="realtimeChartInfo" type="bar" height="350" :options="item.case.linechart.chartOptions" :series="item.case.linechart.series"></apexchart>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-tabs>


                    <v-col class="pb-6 text-center body-1"
                    cols="3">
                        예상종료 시간
                    </v-col>
                    <v-col cols="8" >
                        <v-textarea
                        v-model="dataSet.estimatedTime"
                        outlined
                        rows="2"
                        disabled
                        style="resize:none"
                        no-resize
                        auto-grow
                    ></v-textarea>


                    </v-col>
                    <v-col cols="1">
                    </v-col>

                    <v-col class="text-center body-1"
                    cols="3">
                        진행률
                    </v-col>
                    <v-col cols="8" >
                        <!-- <span class="text-center body-1">{{ learning_progress }}</span> -->
                        <v-progress-linear
                        stream
                        height="25"
                        :buffer-value="dataSet.learning_progress"
                        >
                        <strong>{{ Math.ceil(dataSet.learning_progress) }}%</strong>
                        </v-progress-linear>
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

<!--        </base-material-card>-->
<!--    </v-dialog>-->
</template>


<script>
import API from '@/api'

export default {
    data () {
        return {
            // 모델 셀렉트
            // modelSelect : [
            //     {text : '분류모델 (CNN)', value : 'CNN'},
            //     {text : '순서태깅 (LSTM)', value : 'LSTM'}
            // ],
           
            
            // File Info table
            subtab: 0,
            fileName: '',
            headers: [
                { text: 'text', value: 'subject', align: 'start', sortable: false,  width: "25%"},
                { text: 'value', value: 'contents', width: "75%", align: 'start' },
            ],


        }  
    },


    props:{
      isShowLearningInfoDialog: Boolean,
      dataSet : Object,
      tabType : Array,
    },
    methods : {
        formClose() {
            this.$emit("closeForm")
        },
    },
    created() {
    },
    watch: {
    },
    computed: {
    },
}
</script>
<style>
#progressbar {
  background-color: #177EAD4D;
  border-radius: 6px;  
  padding: 3px;
}

#progressbar > div {
  background-color: #177EAD;
  width: 0%;
  height: 4.5px;
  border-radius: 6px;
}

.runningClass {
    background-color: #FFC107;
}

.notRunningClass {
    background-color: #13121212;
}

</style>