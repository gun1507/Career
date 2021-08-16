<template>
<!--    <v-dialog v-model="isShowLearningDialog" width="50%" persistent>-->
<!--        <base-material-card-->
<!--            color="primary"-->
<!--            icon="mdi-archive"-->
<!--            title=""-->
<!--            class="py-1 px-10 pt-7"-->
<!--        >-->
<!--        <template v-slot:after-heading>-->
<!--            <div class="display-1 font-weight-bold" style="float:left;">-->
<!--                프로젝트 정보-->
<!--            </div>-->
<!--            <div class="text-right ml-auto" style="position:absolute; right:70px">-->
<!--            <v-btn color="error" @click="formClose()" class="px-1 ml-1" fab x-small >-->
<!--                <v-icon>mdi-close</v-icon>-->
<!--            </v-btn>-->
<!--            </div>-->
<!--        </template>-->
        <v-container>
<!--            <br/>-->
            <v-row
                align="center"
                dense>
                    <v-col class="text-center pb-6 pl-15"
                    cols="3">
                        모델
                    </v-col>
                    <v-col cols="8" class="pl-3">
                        <v-select
                            ref="MODELVALUE"
                            v-model="dataSet.modelValue"
                            :items="modelSelect"
                            items-text="text"
                            items-value="value"
                            outlined
                            dense
                            :disabled="modelValueDisable"
                            :rules="[()=> !!dataSet.modelValue || '모델을 선택해주세요.']"
                        ></v-select>
                    </v-col>
                    <v-col class="text-center body-1 pb-6 pl-15"
                    cols="3">
                        프로젝트명
                    </v-col>
                    <v-col cols="8" class="pl-3">
                        <v-text-field
                        ref="PROJECTNAME"
                        v-model="dataSet.projectName"
                        dense
                        outlined
                        :disabled="projectNameDisable"
                        :rules="[()=> !!dataSet.projectName || '프로젝트 이름을 설정해주세요.', typing]"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="11" class="text-center pb-6 pl-10">
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
                                        <v-col class="text-center body-1 pb-6"
                                               cols="3">
                                            File
                                        </v-col>
                                        <v-col cols="7" class="mr-1">
                                            <v-file-input
                                                ref= "FILEDATA"
                                                v-model="item.case.fileUpload.fileDataName"
                                                prepend-icon=""
                                                show-size
                                                outlined
                                                dense
                                                @change="selectFile"
                                                :id="item.name"
                                                :disabled="item.case.fileUpload.fileuploding"
                                                :rules="[()=> !!item.case.fileUpload.fileData || '파일 검증이 필요합니다.', fileSize ]"
                                                :error-messages="item.case.fileUpload.fileMsg"
                                            >
                                            </v-file-input>
                                        </v-col>
                                        <v-col cols="1" class=" pb-7">
                                            <v-btn
                                                color="primary"
                                                @click="validationFile()"
                                                :disabled="item.case.fileUpload.validationBtn"
                                            >{{ validationBtnName }}</v-btn>
                                        </v-col>

                                        <v-col class="text-center body-1 pb-6"
                                               cols="3">
                                            Fail Cases
                                        </v-col>
                                        <v-col cols="9" class="pb-8">
                                            <v-expansion-panels
                                            >
                                                <v-expansion-panel dense>
                                                    <v-expansion-panel-header
                                                        disable-icon-rotate
                                                        style="padding-top: 5px; padding-left: 10px;"
                                                    >
                                                        -- 내역 --
                                                        <template v-slot:actions>
                                                            <v-icon color="error" v-if="item.case.failCase.format_err_txt !='' ">mdi-alert-circle</v-icon>
                                                        </template>
                                                    </v-expansion-panel-header>
                                                    <v-expansion-panel-content>
                                                        <!-- {{ fail_cases }} -->
                                                        {{ item.case.failCase.format_err_txt }}<br/>
                                                        {{ item.case.failCase.max_len_err_txt }}<br/>
                                                        {{ item.case.failCase.invalid_class_number_txt }}<br/>
                                                        {{ item.case.fileUpload.fileMsg }}
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </v-col>

                                        <template>
                                            <v-dialog
                                                v-model="validationPop"
                                                width="500"
                                            >
                                                <v-card>
                                                    <v-card-title class="headline text-left error--text font-weight-bold white">
                                                        Error Cases
                                                    </v-card-title>
                                                    <v-divider></v-divider>
                                                    <v-card-text class="font-weight-bold">
                                                        <br/>
                                                        <li v-if="errorMessage">{{ errorMessage }}</li>
                                                        <li v-if="item.case.failCase.format_err_txt">{{ item.case.failCase.format_err_txt }}</li>
                                                        <li v-if="item.case.failCase.max_len_err_txt">{{ item.case.failCase.max_len_err_txt }}</li>
                                                        <li v-if="item.case.failCase.invalid_class_number_txt">{{ item.case.failCase.invalid_class_number_txt }}</li>
                                                        <li v-if="item.case.fileUpload.fileMsg">{{ item.case.fileUpload.fileMsg }}</li>
                                                    </v-card-text>
                                                    <v-divider></v-divider>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            color="blue"
                                                            text
                                                            @click="validationPop = false"
                                                        >
                                                            확인
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </template>

                                        <v-col
                                            class="pb-6 text-center body-1"
                                            cols="3"
                                        >
                                            File Upload
                                        </v-col>
                                        <v-col cols="9" class="pb-8">
                                            <v-progress-linear
                                                :buffer-value="item.case.knowledge == 0 && item.case.knowledge != 'fail' ? item.case.knowledge : item.case.knowledge+10"
                                                color="success"
                                                stream
                                                :value="item.case.knowledge"
                                                height="25"
                                            >
                                                <template v-slot="{ value }">
                                                    <strong v-if="value < 90 || value == 100">{{ Math.ceil(value) }}%</strong>
                                                    <strong v-else>validation 처리중..</strong>
                                                </template>
                                            </v-progress-linear>
                                        </v-col>

                                        <v-col class="text-center body-1"
                                               cols="3">
                                            File Info
                                        </v-col>
                                        <v-col cols="9">
                                            <v-data-table
                                                :headers="item.case.fileInfoTable.headers"
                                                :items="item.case.fileInfoTable.fileInfoItem"
                                                hide-default-header
                                                hide-default-footer
                                                item-key="name"
                                            >
                                                <template v-slot:no-data>
                                                    파일을 업로드 해주세요.
                                                </template>
                                            </v-data-table>
                                        </v-col>


                                        <v-col class="text-center body-1"
                                               cols="3" v-if="item.case.gptState">
                                            레이블별 <br/> 문서 비율
                                        </v-col>
                                        <v-col cols="8" v-if="item.case.gptState">
                                            <div id="chart">
                                                <apexchart ref="realtimeChart" type="bar" height="350" :options="item.case.linechart.chartOptions" :series="item.case.linechart.series" :id="item.name"></apexchart>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-tabs>
                    </v-col>


                    <v-col class="pb-6 pl-15 text-center body-1"
                    cols="3">
                        예상종료 시간
                    </v-col>
                    <v-col cols="8" class="pl-3">
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

                </v-row>
                <div class="pa-0 text-center">
                    <v-btn
                        class="mr-2 px-16"
                        color="grey"
                        default
                        dark
                        @click="formClose()"
                    >
                        닫기
                    </v-btn>
                    <v-btn
                        class="mr-1 px-16"
                        color="primary"
                        @click="running()"
                        :disabled="learningBtn"
                    >
                        {{ learningBtnName }}
                    </v-btn>
                </div>
            </v-container>
<!--        </base-material-card>-->
<!--    </v-dialog>-->
</template>


<script>
import API from '@/api'
import { getCookie } from '@/utils'
import SparkMD5 from 'spark-md5'
import _ from 'lodash'

export default {
    data () {
        return {
            //tab 분류
            subtab: 0,
            learningBtn : true,
            fileDataSet : null,
            errorMessage : '',
            runError : false,

            //검증 상태 (94 이상)
            validationBtnName : '검증',
            learningBtnName : '학습',
            modelValueDisable : false,
            projectNameDisable : false,

            validationPop : false,
            timeidchk : false,
            loadAsync : true,
        }
    },


    props:{
      isShowParentDialog : Boolean,
      isShowLearningDialog: Boolean,
      tabType: Array,
      modelSelectData : Array,
      dataSet : Object,
    },
    methods : {
        asyncBloon(){
            this.loadAsync = false
        },
        runningErr(msg){
            this.validationPop = true
            this.errorMessage = msg
            // this.knowledge = 0
            this.modelValueDisable = false
            this.projectNameDisable = false
            // this.fileuploding = false
            // this.fileMsg = msg
            this.tabType[this.subtab].case.knowledge = 0
            // this.tabItems[this.tab].verificationState.modelValueDisable = false
            // this.tabItems[this.tab].verificationState.projectNameDisable = false
            this.tabType[this.subtab].case.fileUpload.fileuploding = false
            this.tabType[this.subtab].case.fileUpload.fileMsg = msg
        },
        fileuploadInit () {
            let currentTab = this.tabType[this.subtab].case
            currentTab.fileUpload.md5 = ''
            currentTab.fileUpload.formData = new FormData()
            currentTab.fileUpload.current_chunk = 0
            currentTab.fileUpload.spark = new SparkMD5.ArrayBuffer()
            currentTab.fileUpload.start = 0
            currentTab.fileUpload.end = 0
            currentTab.fileUpload.slice = null
            currentTab.fileUpload.fileData = null
            currentTab.fileUpload.upload_id = ''
            currentTab.fileUpload.fileuploding = false
            currentTab.knowledge = 0
            currentTab.fileUpload.fileDataName = null
            currentTab.fileInfoTable.fileInfoItem = []
            currentTab.fileUpload.validationBtn = true
            currentTab.fileUpload.fileMsg = ''
            currentTab.fileUpload.chunk_file = null
            currentTab.failCase.format_err_txt = ''
            currentTab.failCase.max_len_err_txt = ''
            currentTab.verificationState.verification = false
            currentTab.fileTargetSize = 0
            currentTab.gptState = true
            this.validationBtnName = '검증'
            this.modelValueDisable = false
            this.projectNameDisable = false
            this.dataSet.estimatedTime = ''

        },
        formClose() {
            this.fileuploadInit()
            this.formInit()
            this.$emit("closeForm")
        },
        fileSize(event){
            // return this.fileTargetSize < 1000000000 || '업로드 용량 제한 : 1GB'
            if(this.subtab == 0){
                return this.tabType[this.subtab].case.fileTargetSize < 1000000000 || '업로드 용량 제한 : 1GB'
            } else {
                return this.tabType[this.subtab].case.fileTargetSize < 100000000 || '업로드 용량 제한 : 100MB'
            }
            // return this.tabItems[this.tab].fileTargetSize < 1000000000 || '업로드 용량 제한 : 1GB'
        },
        selectFile(e){
            this.fileDataSet = null
            this.fileuploadInit()
            if(this.dataSet.modelValue == ''){
                this.$refs['MODELVALUE'].validate(true)
            }
            let fileboolean = event.target.files
            let currentTab = this.tabType[this.subtab]
            if(fileboolean){
                console.log(fileboolean)
                currentTab.case.fileUpload.fileData = event.target.files.item(0);
                currentTab.case.fileTargetSize = currentTab.case.fileUpload.fileData.size
                currentTab.oriFileName = currentTab.case.fileUpload.fileData.name
                this.fileDataSet = currentTab.case.fileUpload.fileData
            }
        },
        calculate_md5() {
            let currentTab = this.tabType[this.subtab].case.fileUpload
            // this.slice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
            currentTab.slice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
            // this.chunks = Math.ceil(this.fileData.size / this.chunk_size)
            currentTab.chunks = Math.ceil(currentTab.fileData.size / currentTab.chunk_size)
            this.read_next_chunk()
        },
        read_next_chunk(){
            if (!this.loadAsync) {
                console.log('async 종료')
                return
            }
            console.log('read_next_chunk')
            let currentTab = this.tabType[this.subtab].case.fileUpload
            const reader = new FileReader()
            reader.onload = e => {
                // console.log("onload result : " + e.target.result)
                this.onload(e.target.result) //reader가 onload될 때 함수발생
            }
            // this.start = this.current_chunk * this.chunk_size
            currentTab.start = currentTab.current_chunk * currentTab.chunk_file
            // this.end = Math.min(this.start + this.chunk_size, this.fileData.size);
            currentTab.end = Math.min(currentTab.start + currentTab.chunk_size, currentTab.fileData.size);
            // let progress = parseInt(this.end / this.fileData.size * 100.0, 10);
            let progress = parseInt(currentTab.end / currentTab.fileData.size * 100.0, 10)
            if(progress > 90){
                progress = 99
            }
            // this.knowledge = progress
            this.tabType[this.subtab].case.knowledge = progress
            // this.chunk_file = this.slice.call(this.fileData, this.start, this.end)
            currentTab.chunk_file = currentTab.slice.call(currentTab.fileData, currentTab.start, currentTab.end)
            // reader.readAsArrayBuffer(this.chunk_file);
            reader.readAsArrayBuffer(currentTab.chunk_file);
        },
        async onload (target) {
            console.log('onload 실행')
            let currentTab = this.tabType[this.subtab].case
            let tabSeq = this.subtab
            // this.spark.append(target)
            currentTab.fileUpload.spark.append(target)
            // this.current_chunk++
            currentTab.fileUpload.current_chunk++
            // if (this.current_chunk <= this.chunks) {
            if (currentTab.fileUpload.current_chunk <= currentTab.fileUpload.chunks) {

                // this.formData.set('the_file', this.chunk_file)
                currentTab.fileUpload.formData.set('the_file', currentTab.fileUpload.chunk_file)
                // this.formData.set('csrfmiddlewaretoken', getCookie('csrftoken'))
                currentTab.fileUpload.formData.set('csrfmiddlewaretoken', getCookie('csrftoken'))
                // if(this.upload_id != ''){
                if(currentTab.fileUpload.upload_id != ''){
                    // this.formData.set('upload_id', this.upload_id)
                    currentTab.fileUpload.formData.set('upload_id', currentTab.fileUpload.upload_id)
                }
                // this.chunk_last = this.chunk_start+this.chunk_size-1
                // await this.$http.post(API.CHUNK_UPLOAD,this.formData,{
                if (!this.loadAsync) {
                    console.log('onload 종료')
                    return
                }
                await this.$http.post(API.CHUNK_UPLOAD,currentTab.fileUpload.formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // 'Content-Disposition': 'attachment; filename="'+currentTab.fileUpload.fileData.name+'"',
                        // 기존에 filename도 parameter 값으로 넘겼지만 한글 파일은 업로드가 안되는 현상 때문에 필수 값이 아닌 filename은 넘기지 않도록 수정
                        'Content-Disposition': 'attachment;',
                        'Content-Range': 'bytes '+String(currentTab.fileUpload.start)+'-'+String(currentTab.fileUpload.end-1)+'/'+String(currentTab.fileUpload.fileData.size),
                    }  
                }).then(res=>{
                    // this.upload_id = res.data.upload_id
                    console.log(res)
                    currentTab.fileUpload.upload_id = res.data.upload_id
                    this.read_next_chunk()
                }, err => {
                    // this.knowledge = 'fail'
                    currentTab.knowledge = 'fail'
                    // this.fileuploding = false
                    currentTab.fileUpload.fileuploding = false
                    console.log(err);
                })
    
            } else {
                // this.md5 = this.spark.end()
                currentTab.fileUpload.md5 = currentTab.fileUpload.spark.end()
                if(!this.loadAsync){
                    console.log('CHUNK_UPLOAD_COMPLETE 종료')
                    return
                }
                let complete_data = new FormData()
                complete_data.set('csrfmiddlewaretoken', getCookie('csrftoken'))
                complete_data.set('md5', currentTab.fileUpload.md5)
                complete_data.set('upload_id', currentTab.fileUpload.upload_id)
                complete_data.set('filename', currentTab.fileUpload.fileData.name)
                console.log("CHUNK_UPLOAD_COMPLETE_PARAM: " + complete_data.get('md5') + ", " + complete_data.get('upload_id') + ", " + complete_data.get('filename'))
                this.$http.post(API.CHUNK_UPLOAD_COMPLETE, complete_data).then(res=>{
                    // this.validationBtn = true
                    this.modelValueDisable = true
                    this.projectNameDisable = true
                    // this.fileuploding = true
                    // this.upload_id = ''
                    currentTab.fileUpload.validationBtn = true
                    // currentTab.verificationState.modelValueDisable = true
                    // currentTab.verificationState.projectNameDisable = true
                    currentTab.fileUpload.fileuploding = true
                    console.log("파일 올리고 여기서부터 결과")
                    console.log("filePath : " + res.data.filePath)
                    this.$http.get(API.FILE_INFO,
                        {
                            params: {
                                FILE_PATH : res.data.filePath, 
                                // ORI_FILE_NAME : this.fileData.name,
                                ORI_FILE_NAME : currentTab.fileUpload.fileData.name,
                                MODEL : this.dataSet.modelValue,
                                USER_ID : this.dataSet.userId,
                        }
                    }).then(res=>{
                        try{
                            if(res.data.success){
                                console.log("파일 업로드 성공 : [" + tabSeq + "]")
                                if(tabSeq == 0) {
                                    this.dataSet.seq.train = res.data.dataSet['File_SEQ']
                                    this.dataSet.downloadUrl.train = res.data.dataSet['DOWN_URL']
                                }else if(tabSeq == 1) {
                                    this.dataSet.seq.valid = res.data.dataSet['File_SEQ']
                                    this.dataSet.downloadUrl.valid = res.data.dataSet['DOWN_URL']
                                }else if(tabSeq == 2) {
                                    this.dataSet.seq.test = res.data.dataSet['File_SEQ']
                                    this.dataSet.downloadUrl.test = res.data.dataSet['DOWN_URL']
                                }
                                // this.dataSet.seq = res.data.dataSet['File_SEQ']
                                // this.dataSet.downloadUrl = res.data.dataSet['DOWN_URL']
                                // this.timeid = false
                                this.timeidchk = true
                                currentTab.timeid = false
                                // currentTab.timeidchk = true
                            }else{
                                this.runningErr('업로드가 실패하였습니다.')
                            }

                        }catch(e){
                            console.log(e)
                            this.runningErr('잘못된 파일 형식입니다.')
                        }
                        
                    }, err => {
                        console.log(err);
                    })

                }, err => {
                    console.log(err)
                    // this.knowledge = '0'
                    currentTab.knowledge = '0'
                    // this.fileuploding = false
                    currentTab.fileUpload.fileuploding = false
                })
            }    
        },

        validationChk(){
            let tabSeq = this.subtab
            let fileSeq = null
            let currentTab = this.tabType[tabSeq].case
            if(tabSeq == 0) {
                fileSeq = this.dataSet.seq.train
            }else if(tabSeq == 1) {
                fileSeq = this.dataSet.seq.valid
            }else if(tabSeq == 2) {
                fileSeq = this.dataSet.seq.test
            }
            // this.timeid = setInterval(()=>{
            currentTab.timeid = setInterval(()=>{
                this.$http.post(API.VALIDATION_CHK,{
                    fileSeq : fileSeq
                }).then(res=>{
                    if(res.data.success){
                        if(res.data.data.corpus){
                            this.chartSetting(res.data)
                        }
                        // this.format_err_txt = res.data.result.format_err_txt
                        currentTab.failCase.format_err_txt = res.data.result.format_err_txt
                        // this.max_len_err_txt = res.data.result.max_len_err_txt
                        currentTab.failCase.max_len_err_txt = res.data.result.max_len_err_txt
                        // this.invalid_class_number_txt = res.data.result.invalid_class_number_txt
                        currentTab.failCase.invalid_class_number_txt = res.data.result.invalid_class_number_txt
                        // this.verification = res.data.result.verification
                        currentTab.verificationState.verification = res.data.result.verification
                        // this.fileMsg = res.data.result.msg
                        currentTab.fileUpload.fileMsg = res.data.result.msg
                        this.timeidchk = false
                        if(res.data.result.verification == 'False'){
                            this.validationPop = true
                        }
                        // currentTab.timeidchk = false
                    }
                    else{
                        console.log('validationChk : '+res.data.success)
                        console.log("check")
                    }
                })
            }, 5000) // 5초
            
        },

        chartSetting(data){
            // this.knowledge = 100
            this.tabType[this.subtab].case.knowledge = 100
            for(var i=0; i< Object.keys(data.data.corpus).length; i++){
                let fileInfoItem_list = {}
                fileInfoItem_list['subject'] = Object.keys(data.data.corpus)[i]
                fileInfoItem_list['contents'] = Object.values(data.data.corpus)[i]
                // this.fileInfoItem.push(fileInfoItem_list)
                this.tabType[this.subtab].case.fileInfoTable.fileInfoItem.push(fileInfoItem_list)
            }
    
            let chart_x = []
            for(var j=0; j< Object.keys(data.data.label).length; j++){
                if(data.data.label[j] == undefined ){
                    chart_x.push((data.data.label[Object.keys(data.data.label)[j]]['ratio'] * 100).toFixed(1))
                }
                else if(data.data.label[j] != undefined){
                    chart_x.push((data.data.label[j]['ratio'] * 100).toFixed(1))
                }else{
                    // this.fileMsg = '잘못된 파일 형식입니다.'
                    this.tabType[this.subtab].case.fileUpload.fileMsg = '잘못된 파일 형식입니다.'
                    break
                }
            }
            // if(chart_x != [] || this.gptState){
            if(chart_x != [] || this.tabType[this.subtab].case.gptState){
                this.chartUpdate(chart_x, Object.keys(data.data.label))
                this.dataSet.estimatedTime = "최소 : "+data.data.time['min']+"초"+"\n"+"최대 : "+data.data.time['max']+"초"
                this.dataSet.learnMinTime = data.data.time['min']
                this.dataSet.learnMaxTime = data.data.time['max']
                // this.runBtn = false
                // this.dataSet.seq = data.dataSet['File_SEQ']
                // this.dataSet.downloadUrl = data.dataSet['DOWN_URL']
            }
        },
        chartUpdate (x,y) {
            let currentTab = this.tabType[this.subtab]
            let y_arr = []
            let x_arr = []
            if(y.length > 10){
                y.length=10
            }
            for (let index = 0; index < y.length; index++) {
                y_arr.push(y[index])
                x_arr.push(x[index])
            }
            this.$refs.realtimeChart.forEach(type => {
                if(type.$attrs.id == currentTab.name){
                    type.updateSeries([{
                        data: x_arr
                    }])
                    type.updateOptions({
                        xaxis: {
                            categories: y_arr
                        }
                    });
                }
            })

            // this.$refs.realtimeChart.updateSeries([{
            //     data: x_arr
            // }])
            // this.$refs.realtimeChart.updateOptions({
            //     xaxis: {
            //     categories: y_arr
            //     }
            // });
        },
        
        formInit(){
            this.dataSet.projectName = ''
            this.dataSet.modelValue = ''
            // this.format_err_txt = ''
            this.tabType[this.subtab].case.failCase.format_err_txt = ''
            // this.max_len_err_txt = ''
            this.tabType[this.subtab].case.failCase.max_len_err_txt = ''
        },
        // 검증 버튼
        validationFile (){
            let tabSeq = this.subtab
            let currentTab = this.tabType[tabSeq]
            currentTab.case.formHasErrors = false
            this.learningBtn = true
            Object.keys(this.form).forEach(f => {
                if(f == "FILEDATA"){
                    this.$refs["FILEDATA"].forEach(type => {
                        if((type.id == currentTab.name) && !type.validate(true)){
                            currentTab.case.formHasErrors = true
                        }
                    })
                } else {
                    if(!this.$refs[f].validate(true)){
                        currentTab.case.formHasErrors = true
                    }
                }
            })
            if(!currentTab.case.formHasErrors){
                currentTab.case.fileUpload.fileuploding = true
                currentTab.case.fileUpload.validationBtn = true
                this.calculate_md5()
            }
        },
        typing(e){
            const re_txt = /^[A-Za-z0-9+_-]*$/
            return re_txt.test(e) || '영문, 숫자, -(하이픈), _(언더바) 입력만 가능합니다.'
        },
        running(){
            let currentTab = this.tabType[this.subtab].case
            this.learningBtn = true
            // currentTab.fileUpload.learningBtn = true
            this.learningBtnName = '자원할당 체크'
            this.$http.get(API.RESOURCE_CHK,{
                params: { 
                            MODEL : this.dataSet.modelValue
                        }
            }).then(res=>{
                if (res.data.success){
                    // this.validationBtn = true
                    currentTab.fileUpload.validationBtn = true
                    this.modelValueDisable = true
                    // currentTab.verificationState.modelValueDisable = true
                    this.projectNameDisable = true
                    // currentTab.verificationState.projectNameDisable = true
                    // this.fileuploding = true
                    currentTab.fileUpload.fileuploding = true
                    this.$http.post(API.LEARNING_PROJECT_CREATE, this.dataSet).then(res=>{
                        this.learningBtnName = '학습중'
                    },err => {
                        console.log(err);
                    })
                }else{
                    //this.learningBtn = false
                    //this.learningBtnName = '학습'
                    this.runningErr('학습머신 자원이 부족합니다.('+res.data.msg+')')
                    this.runError = true
                }
            },err => {
                console.log(err);
            }) 
        },
    },
    computed: {
        form () {
            return {
                MODELVALUE: this.dataSet.modelValue,
                PROJECTNAME: this.dataSet.projectName,
                // FILEDATA : this.fileData
                FILEDATA : this.tabType[this.subtab].case.fileUpload.fileData
            }
        },
        modelSelect () {
            let data = []
            let list = {}
            this.modelSelectData.forEach((type,index) => {
                list = {text : type['MODEL'], value : String(type['ID'])}
                data.push(list)
            })
            data = _.orderBy(data, 'text', 'desc')
            return data
        },
    },
    mounted() {
        this.fileuploadInit()
    },
    watch: {
        fileDataSet : function(val){
            if(val){
                if(this.dataSet.modelValue != ''){
                    // this.validationBtn = false
                    this.tabType[this.subtab].case.fileUpload.validationBtn = false
                }
            }
        },
        dataSet : {
            deep : true,
            handler(newData, oldData, idx) {
                if(newData.modelValue != ''){
                    // if(this.fileData != null && this.knowledge == 0){
                    if(this.tabType[this.subtab].case.fileUpload.fileData != null && this.tabType[this.subtab].case.knowledge == 0){
                        // this.validationBtn = false
                        this.tabType[this.subtab].case.fileUpload.validationBtn = false
                    }
                }
            }
        },
        // 검증 실시간 체크
        timeidchk : function(val){
            let currentTab = this.tabType[this.subtab].case
            // if(val && !this.timeid){
            if(val && !currentTab.timeid){
                this.validationChk()
            }else{
                // clearInterval(this.timeid)
                clearInterval(currentTab.timeid)
                // if(this.verification == 'True'){
                if(currentTab.verificationState.verification == 'True'){
                    console.log("running 직전")
                    // this.fileData = null
                    currentTab.fileUpload.fileData = null
                    if((this.tabType[0].case.verificationState.verification && !this.tabType[1].case.verificationState.verification && !this.tabType[2].case.verificationState.verification)
                        // train만 입력 시
                        || (this.tabType[0].case.verificationState.verification && !this.tabType[1].case.verificationState.verification && this.tabType[2].case.verificationState.verification)
                        // train, test 입력 시
                        || (this.tabType[0].case.verificationState.verification && this.tabType[1].case.verificationState.verification && this.tabType[2].case.verificationState.verification)){
                        // train, valid, test 입력 시
                        this.learningBtn = false
                    }
                    // currentTab.fileUpload.learningBtn = false
                }else{
                    this.modelValueDisable = false
                    // currentTab.verificationState.modelValueDisable = false
                    this.projectNameDisable = false
                    // currentTab.verificationState.projectNameDisable = false
                    // this.fileuploding = false
                    currentTab.fileUpload.fileuploding = false
                }
            }

        }
    },
 
}
</script>
<style scoped>
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