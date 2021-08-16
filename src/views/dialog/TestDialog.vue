<template>
    <v-dialog  width="50%" v-model="isShowTestDialog" persistent>
        <base-material-card
            color="primary"
            icon="mdi-archive"
            title=""
            class="py-1 px-10 pt-7"
        >
        <template v-slot:after-heading>
            <div class="display-1 font-weight-bold" style="float:left;">
                TEST PAGE
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
                >
                    <!-- <v-col cols="1" class="pb-0 pt-0 mt-0"></v-col> -->
                    <v-col class="text-center pb-0 pt-0 mt-0"
                    cols="12">
                        <base-material-alert
                            color="error"
                            dense
                            outlined
                            icon="mdi-bell"
                            class="pr-0 pl-0"
                            >
                            <span>주의 — 프로토타이핑이 목적이므로, Endpoint에 과도한 요청은 지양해주시면 감사하겠습니다. (최대 QPS: 100)</span>
                        </base-material-alert>
                    </v-col>
                    <!-- <v-col cols="1" class="pb-0 pt-0 mt-0"></v-col> -->
                    <v-col class="text-center pb-6"
                    cols="3">
                        cURL <br/>호출 명렁어
                    </v-col>
                    <v-col 
                    cols="7">
                        <v-textarea
                            rows="6"
                            name="input-7-4"
                            :value="apitxts"
                            id="curlTextField"
                            readonly
                        />
                    </v-col>
                    <v-col cols="1">
                        <v-btn
                            id="curl"
                            color="blue" 
                            @click="copyText()" 
                        >복사</v-btn>
                    </v-col>
                    <v-col class="text-center pb-6"
                           cols="3">
                      GET <br/>호출 명렁어
                    </v-col>
                    <v-col
                        cols="7">
                      <v-textarea
                          rows="3"
                          name="input-7-4"
                          :value="getapitxt"
                          id="getTextField"
                          readonly
                      />
                    </v-col>
                    <v-col cols="1">
                      <v-btn
                          id="get"
                          color="blue"
                          @click="copyText()"
                      >복사</v-btn>
                    </v-col>
                    <v-col class="text-center  pb-6"
                    cols="3">
                        TEST API
                    </v-col>
                    <v-col
                    cols="7">
                          <v-text-field
                          tabindex="1"
                          v-model="query"
                          label="아래 예시를 참고해주세요"
                          dense
                          outlined
                          clearable
                          append-outer-icon="mdi-upload file"
                          @click:clear="init"
                          @click:append-outer="fileupload"
                          @keyup="onEnter"
                          v-bind:rules="[()=> fileData, fileSize]"
                          ></v-text-field>
                    </v-col>
                    <input
                        ref="uploader"
                        type="file"
                        class="d-none"
                        @change="selectFile"
                    >
                    <v-col cols="2" class="pb-9">
                        <v-btn
                            tabindex="2"
                            color="primary"
                            @click="testRun()"
                            :disabled="queryStatus"
                        >전송</v-btn>
                    </v-col>
                    <v-col class="text-center body-1"
                    cols="3">
                        결과
                    </v-col>
                    <v-col 
                    cols="7">
                        <div align="center">
                            <v-progress-circular
                                v-show="loading"
                                indeterminate
                                color="primary"
                                :size="50"
                            >
                            </v-progress-circular>
                        </div>
                            <vue-json-pretty
                                v-show="!loading"
                                :data="result"
                                :showSelectController="true"
                                :highlightMouseoverNode="true"
                                :showLength="true"
                                :highlight-selected-node="true"
                                :collapsedOnClickBrackets="true"
                                :select-on-click-node="true"
                            >
                            </vue-json-pretty>
                    </v-col>
                </v-row>
                <div class="pa-3 text-center">
                    <v-btn
                        class="mr-2"
                        color="green"
                        default
                        dark
                        @click="init()"
                    >
                        초기화
                    </v-btn>
                    <v-btn
                        class="mr-2"
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
import VueJsonPretty from 'vue-json-pretty'

export default {
    components: {
        VueJsonPretty
    },
    data () {
        return {
            query : '',
            queryStatus : true,
            result : [],
            fileData : null,
            oriFileName : '',
            fileDataSet : null,
            fileTargetSize : 0,
            onFile : false,
            loading : false,
        }
    },
    props:{
      isShowTestDialog: Boolean,
      apitxt: String,
      curl : String,
      testResult: Array,
    },
    watch: {
        testResult() {
            this.result = this.testResult
        },
        query: function (){
            if(this.query != '') {
                this.queryStatus = false
            }else{
                this.queryStatus = true
            }
        }
    },
    methods : {
        init() {
            this.query = ''
            this.queryStatus = true
            this.result = this.testResult
            this.fileData = null
            this.oriFileName = ''
            this.fileDataSet = null
            this.fileTargetSize = 0
            this.onFile = false
        },
        formClose(e) {
            this.init()
            this.$emit("closeForm")
        },
        onEnter (e) {
            if (e.keyCode === 13) {
                this.testRun()
            }
        },
        fileSize(event){
            return this.fileTargetSize < 50000 || '업로드 용량 제한 : 50KB'
        },
        testRun(){
            this.loading = true
            this.$http.post(API.TEST_SEND, {
                url : this.apitxt,
                query : this.query,
                filedata : this.fileDataSet,
                filename : this.oriFileName,
            }).then(res=>{
                if (res.data.success == true){
                    this.loading = false
                    this.result = res.data.result
                }
            },err => {
                this.loading = false
                console.log(err);
            })
        },
        copyText(){
            let textField = null
            if(event.currentTarget.id == 'curl'){
              textField = document.getElementById("curlTextField")
            }else{
              textField = document.getElementById("getTextField")
            }
            textField.select();
            document.execCommand("copy");
        },
        fileupload(){
            this.$refs.uploader.click()
        },
        selectFile(){
            let fileStatus = event.target.files
            if(fileStatus){
                this.onFile = true
                this.fileData = event.target.files.item(0)
                this.fileTargetSize = this.fileData.size
                this.oriFileName = this.fileData.name
                const reader = new FileReader()
                reader.readAsDataURL(this.fileData)
                reader.onload = e => {
                  // console.log(e.target.result)
                  this.fileDataSet = e.target.result
                  this.queryStatus = false
                }
            }
            this.query = this.oriFileName
        },
        callBack(){
            this.fileData = null
            this.oriFileName = ''
            this.fileDataSet = null
            this.fileTargetSize = 0
        }
    },
    computed: {
        apitxts (){
            if(this.query == null) this.query = ''
            let test = "'"+'{"q" : "'+this.query+'"}'+"'"
            return this.curl+test
        },
        getapitxt (){
            if(this.query == null) this.query = ''
            let test = location.host+"/api/history/test/run/?url="+this.apitxt+"&query="
            return test+this.query
        },
    },
}
</script>
