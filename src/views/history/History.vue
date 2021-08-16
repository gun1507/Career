<template>
  <div>
    <user-history-top
      :totalCnt="totalCount"
      :availabilityCnt="availabilityCount"
      :sessionCnt="sessionCount"
      :appCnt="appCount"
    >
    </user-history-top>
    <user-history-list
        @search ="search"
        @testDialog="testDialog"
        @projectDialog="projectDialog"
        @sessionDialog="sessionDialog"
        @getList="getList"
        @learningParentDialog="learningParentDialog"
        @learningState="learningState"
        :listData="listData"
        :historyUser="historyUser"
        :uploadBnt="uploadBnt"
        :uploadBntColor="uploadBntColor"
        :modelType="modelType"
        :modelSelectData="modelSelectData"
        :sessionBool="sessionBool"
    >
    </user-history-list>
    <test-dialog
      @closeForm="closeForm"
      :apitxt="apitext"
      :isShowTestDialog="tDialog"
      :curl="curl"
      :testResult="testResult"
    >
    </test-dialog>
    <learning-parent-dialog
      @closeForm="closeForm"
      :isShowLearningParentDialog="l_parentDialog"
      :modelSelectData="modelSelectData"
      :tabSeqInfo="tabSeqInfo"
    >
    </learning-parent-dialog>
    <project-dialog
      @closeForm="closeForm"
      :isShowProjectDialog="projectPop['pDialog']"
      :datas="projectPop['data']"
      :dataSet="dataSet"
      :inItems="tabItems"
      v-if="projectPop['pDialog']"
    >
    </project-dialog>
    <session-dialog
      @closeForm="closeForm"
      :isShowSessionDialog="sDialog"
      :sessionJson="session_json"
    >
    </session-dialog>
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
</template>


<script>
import API from '../../api'
import SparkMD5 from "spark-md5";

export default {
  components: {
                UserHistoryTop: () => import('./Top'), 
                UserHistoryList: () => import('./List'),
                TestDialog: () => import('../dialog/TestDialog'),
                // LearningDialog: () => import('../dialog/LearningDialog'),
                ProjectDialog: () => import('../dialog/ProjectDialog'),
                SessionDialog: () => import('../dialog/SessionDialog'),
                // LearningInfoDialog: () => import('../dialog/LearningInfoDialog'),
                LearningParentDialog: () => import('../dialog/LearningParentDialog'),
              },
  created() {
      this.tabCopy()
      this.getList()
      this.modelSelect()
      this.learningState()
  },
  mounted() {

  },
  data () {
    return {
      modelSelectData: [],
      listData : [],
      tDialog : false,
      l_parentDialog : false,
      projectPop : {
        pDialog : false,
        label : [],
        data : {}
      },
      sDialog : false,
      apitext : '',
      session_json : 'no session',
      historyUser : 0,
      
      filter : 'all',
      modelType : 'ALL',
      userid : sessionStorage.getItem('userid'),
      userSearch : '',
      case: {
          // 파일 업로드
          fileUpload: { md5 : '', formData : new FormData() , current_chunk : 0, chunks : null, spark : new SparkMD5.ArrayBuffer(), chunk_size : 1000000000,
          start : 0, end : 0, slice : null, fileData : null, fileDataName : null, upload_id : '', chunk_file : null, fileuploding : false,
          validationBtn :true, fileMsg : '' },
          // 실패내역
          failCase: { format_err_txt : '', max_len_err_txt : '', invalid_class_number_txt : '' },
          // progress
          knowledge: 0,
          // fileInfo
          fileInfoTable: { corpus_subject : null, corpus_contents : null, fileInfoItem : [],
          headers: [
          { text: 'text', value: 'subject', align: 'start', sortable: false,  width: "25%" },
          { text: 'value', value: 'contents', width: "75%", align: 'start' },
          ],},
          // 검증 상태 (94 이상)
          verificationState: { verification : false },
          linechart: { series: [{
              data : []
          }],
              chartOptions: {
              chart: {
                  type: 'bar',
                      height: 100,
                      toolbar: {
                      show : false
                  }
              },
              plotOptions: {
                  bar: {horizontal: true,}
              },
              dataLabels: {
                  enabled: false
              },
              xaxis: {
                  categories: [],
              }
          }, },
          gptState : true,
          fileTargetSize : 0,
          timeid : false,
          // 검증버튼
          formHasErrors : false,
      },
      tabItems: [
          { name: 'train', case: {}, oriFileName: '',
          },
          { name: 'valid', case: {}, oriFileName: '',
          },
          { name: 'test', case: {}, oriFileName: '',
          },
      ],
      dataSet : {
          learningSeq : '',
          seq : { train : '', valid : '', test : '' },
          modelValue : '',
          projectName : '',
          downloadUrl : { train : '', valid : '', test : '' },
          userId : sessionStorage.getItem('userid'),
          estimatedTime : '',
          stat : null,
          learnMinTime : '',
          learnMaxTime : '',
          learning_progress : 0,
          modelToken : '',
      },
      tabSeqInfo : [
          { seq: 'task1', dialog: { taskDisable: false, lDialog: false, l_infoDialog: false }, tabType: Array, data: {} },
          { seq: 'task2', dialog: { taskDisable: false, lDialog: false, l_infoDialog: false }, tabType: Array, data: {} },
          { seq: 'task3', dialog: { taskDisable: false, lDialog: false, l_infoDialog: false }, tabType: Array, data: {} },
          { seq: 'task4', dialog: { taskDisable: false, lDialog: false, l_infoDialog: false }, tabType: Array, data: {} },
      ],
      totalCount : '0',
      availabilityCount : '0',
      sessionCount : '0',
      appCount : '0',
      uploadBnt : '학습데이터 업로드',
      uploadBntColor : 'primary',
      sessionBool : false,
      zeroCount : 0,
      snackbarText : '',
      snackbar : false,
      timeout: 3000,
      curl : '',
      testResult : [],
    }
  },
  methods: {
    tabCopy(){
      const cloneDeep = require('clone-deep')
      this.tabItems.forEach(item => {
          let _newCase = cloneDeep(this.case)
          item.case = _newCase
      })
      this.tabSeqInfo.forEach(item => {
          let _newTabType = cloneDeep(this.tabItems)
          let _newData = cloneDeep(this.dataSet)
          item.tabType = _newTabType
          item.data = _newData
      })
    },
    sessionDialog(seq) {
      this.sDialog = true
      this.$http.get(API.SESSION_INFO,{
        params: {learning_seq : seq} 
      }).then(res=>{
          if (res.data.success == true){
            this.session_json = res.data.result 
          }
          else{
            this.session_json = 'no session'
          }
      })
    },
    testDialog (item) {
      this.$http.post(API.TEST_CHECK,{
        api_url : item['API_ADD'],
        seq : item['SEQ'],
        testQuery : item['LARGE_CHUNK']
      }).then(res=>{
        try{
          if(res.data.status == 'success'){
            if(res.data.result.length == 0){
              this.testResult = NaN
            } else {
              this.testResult = res.data.result
            }
            console.log(console.log(res.data.result))
            this.tDialog = true
            this.apitext = item['API_ADD']
            this.curl = res.data.curl
          }else{
            this.snackbar = true
            this.snackbarText = '사용할 준비가 되지 않았습니다.'
          }
        }catch(e) {
          console.log(e)
          this.snackbar = true
          this.snackbarText = '사용할 준비가 되지 않았습니다.'
        }
      }, err => {
        console.log(err)
        this.snackbar = true
        this.snackbarText = '사용할 준비가 되지 않았습니다.'
      })
    },
    closeForm () {
      this.tDialog = false
      this.l_parentDialog = false
      this.sessionBool = false
      this.sDialog = false
      this.projectPop['pDialog'] = false

      this.tabSeqInfo.forEach(seqType => {
          seqType.dialog.lDialog = false
          seqType.dialog.l_infoDialog = false
          seqType.dialog.taskDisable = false
          seqType.data.projectName = ''
          seqType.data.modelValue = ''
          seqType.tabType.forEach(subtab => {
              clearInterval(subtab.case.timeid)
              subtab.case.timeid = false
          })
      })
      this.getList()
      this.learningState()
    },
    projectDialog (item) {
      this.$http.get(API.LEARNING_USER_INFO,{
          params: {userid : this.userid, seq : item.SEQ}
      }).then(res=>{
          res.data.data.forEach(tabSeq => {
              this.tabItems.forEach(type => {
                  if((type.name == 'train') && (tabSeq['TRAIN_ORI_FILE'])){
                      this.chartSetting(type.name, tabSeq['TRAIN_STAT'].corpus, tabSeq['TRAIN_STAT'].label, tabSeq['TRAIN_STAT'].time)
                  }else if((type.name == 'valid') && (tabSeq['VALID_ORI_FILE'])){
                      this.chartSetting(type.name, tabSeq['VALID_STAT'].corpus, tabSeq['VALID_STAT'].label, tabSeq['VALID_STAT'].time)
                  }else if((type.name == 'test') && (tabSeq['TEST_ORI_FILE'])){
                      this.chartSetting(type.name, tabSeq['TEST_STAT'].corpus, tabSeq['TEST_STAT'].label, tabSeq['TEST_STAT'].time)
                  }
              })
              this.projectPop['pDialog'] = true
              this.projectPop['data'] = item
          })
      })
    },
    getList() {
      this.$http.get(API.HISTORY_LIST,{ 
        params: { 
            filter : this.filter, 
            userid : this.userid, 
            modelType : this.modelType,
            historyUser : this.historyUser,
            userSearch : this.userSearch,
          },
      }).then(res=>{
        if (res.data.success == true){
          this.listData = res.data.data
          this.totalCount = String(res.data.topCount.userTotalCnt)
          this.availabilityCount = String(res.data.topCount.availabilityCnt)
          this.sessionCount = 'GPU : ' + res.data.topCount.sessionCnt + ' volta'
          this.appCount = 'CPU : ' + res.data.topCount.appCpu + ' 개<br />MEM : ' + res.data.topCount.appMem + ' Mb<br />GPU : ' + res.data.topCount.appGpu + ' Gb'

        }
      }, err => {
          console.log(err);
      })
    },
    modelSelect(){
      this.$http.get(API.MODEL_LIST).then(res=>{
        if (res.data.success == true){
            this.modelSelectData = res.data.data
        }
      }, err => {
        console.log(err);
      })
    },
    learningState(){
      this.$http.get(API.LEARNING_USER_INFO,{
          params: {userid : this.userid}
      }).then(res=>{
        // if (res.data.data['ID'] != '' & res.data.data['LEARNING_STATUS'] == 'ing'){
        this.zeroCount = res.data.zeroSession
        // this.zeroCount = 0
        if (res.data.state){
          let count = res.data.data
          this.uploadBnt = '학습중 running : ' + count.length + ", wait : " + (this.tabSeqInfo.length - count.length)
          this.uploadBntColor = 'warning'
        }
        // if (res.data.data['ID'] != '' & res.data.data['LEARNING_STATUS'] == 'succ'){
        else{
          this.uploadBnt = '학습데이터 업로드'
          this.uploadBntColor = 'primary'
          if (this.zeroCount == 0) {
            this.sessionBool = true
          }
        }
      })
    },
    chartSetting(name, corpus,label,time, idx){
      for(var i=0; i< Object.keys(corpus).length; i++){
          let fileInfoItem_list = {}
          fileInfoItem_list['subject'] = Object.keys(corpus)[i]
          fileInfoItem_list['contents'] = Object.values(corpus)[i]
          if(idx != undefined){
              this.tabSeqInfo[idx].tabType.forEach(type => {
                  if(type.name == name){
                      type.case.fileInfoTable.fileInfoItem.push(fileInfoItem_list)
                  }
              })
          }else{
              this.tabItems.forEach(type => {
                  if(type.name == name){
                      type.case.fileInfoTable.fileInfoItem.push(fileInfoItem_list)
                  }
              })
          }
      }

      let chart_x = []
      for(var j=0; j< Object.keys(label).length; j++){
          if(label[j] == undefined ){
              chart_x.push((label[Object.keys(label)[j]]['ratio'] * 100).toFixed(1))
          }
          else if(label[j] != undefined){
              chart_x.push((label[j]['ratio'] * 100).toFixed(1))
          }else{
              break
          }
      }
      if(idx != undefined){
          this.tabSeqInfo[idx].tabType.forEach(type => {
              if(type.name == name){
                  type.case.linechart.series[0].data = chart_x
                  type.case.linechart.chartOptions.xaxis.categories = Object.keys(label)
              }
          })
      }else{
          this.tabItems.forEach(type => {
              if(type.name == name){
                  type.case.linechart.series[0].data = chart_x
                  type.case.linechart.chartOptions.xaxis.categories = Object.keys(label)
              }
          })
      }
    },
    changeHistory (val) {
      this.historyUser = val
      this.modelType = 'ALL'
      this.getList()
    },
    search (radio) {
      this.filter = radio
      this.getList()
    },
    

    learningParentDialog () {
      this.$http.get(API.LEARNING_USER_INFO,{
          params: {userid : this.userid}
      }).then(res=>{
          // if (res.data.data['ID'] != '' & res.data.data['LEARNING_STATUS'] == 'ing'){
          let len = res.data.data.length
          console.log('data length = ' + len)
          if (res.data.state){
              this.l_parentDialog = true
              this.sessionBool = false
              res.data.data.forEach((tab, tabIdx) => {
                  this.tabSeqInfo[tabIdx].dialog.l_infoDialog = true
                  this.tabSeqInfo[tabIdx].data.learningSeq = tab['ID']
                  this.modelSelectData.forEach((type, index) => {
                      if(tab['MODEL_TYPE'] == type['ID']){
                          this.tabSeqInfo[tabIdx].data.modelValue = type['MODEL']
                      }
                  })
                  this.tabSeqInfo[tabIdx].data.modelToken = tab['MODEL_TOKEN']
                  this.tabSeqInfo[tabIdx].data.projectName = tab['PROJECT_NAME']
                  this.tabSeqInfo[tabIdx].data.learnMinTime = tab['MIN_TIME']
                  this.tabSeqInfo[tabIdx].data.learnMaxTime = tab['MAX_TIME']
                  this.tabSeqInfo[tabIdx].data.estimatedTime = "최소 : "+tab['MIN_TIME']+"초"+"\n"+"최대 : "+tab['MAX_TIME']+"초"
                  this.tabSeqInfo[tabIdx].data.learning_progress = tab['PROGRESS']

                  if(tab['TRAIN_ORI_FILE']){
                      this.tabSeqInfo[tabIdx].tabType[0].case.verificationState.verification = true
                      this.tabSeqInfo[tabIdx].tabType[0].oriFileName = tab['TRAIN_ORI_FILE']
                      this.chartSetting(this.tabSeqInfo[tabIdx].tabType[0].name, tab['TRAIN_STAT'].corpus, tab['TRAIN_STAT'].label, tab['TRAIN_STAT'].time, tabIdx)
                  }
                  if(tab['VALID_ORI_FILE']){
                      this.tabSeqInfo[tabIdx].tabType[1].case.verificationState.verification = true
                      this.tabSeqInfo[tabIdx].tabType[1].oriFileName = tab['VALID_ORI_FILE']
                      this.chartSetting(this.tabSeqInfo[tabIdx].tabType[1].name, tab['VALID_STAT'].corpus, tab['VALID_STAT'].label, tab['VALID_STAT'].time, tabIdx)
                  }
                  if(tab['TEST_ORI_FILE']){
                      this.tabSeqInfo[tabIdx].tabType[2].case.verificationState.verification = true
                      this.tabSeqInfo[tabIdx].tabType[2].oriFileName = tab['TEST_ORI_FILE']
                      this.chartSetting(this.tabSeqInfo[tabIdx].tabType[2].name, tab['TEST_STAT'].corpus, tab['TEST_STAT'].label, tab['TEST_STAT'].time, tabIdx)
                  }

                  this.tabSeqInfo.forEach((tabType, tpIdx) => {
                      if(tpIdx >= len){
                          if(this.zeroCount == 0) {
                              tabType.dialog.taskDisable = true
                          }
                          tabType.dialog.lDialog = true
                      }
                  })
              })
          }
          else {
              this.tabSeqInfo.forEach(type => {
                  type.dialog.lDialog = true
              })
              this.l_parentDialog = true
          }
      })
    }
  }, // methods end
}

</script>
