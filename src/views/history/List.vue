<template>
  <v-container
    fluid
  >
    <base-material-card
      color="success"
      icon="mdi-history"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
          <div class="display-1 font-weight-bold mb-5" style="float:left;">
                History
          </div>
          <div class="text-right ml-auto mt-1" style="position:absolute; right:23px ">
            <v-btn
              :color="uploadBntColor"
              default
              rounded
              @click="learningParentDialog()"
              elevation="3"
              :disabled="sessionBool"
            >
            {{ uploadBnt }}
            <v-progress-circular
              v-if="uploadBntColor=='warning'"
              indeterminate
              :size="15"
              color="primary"
              class="ml-1"
            ></v-progress-circular>
          </v-btn>
          </div>
      </template>

      <v-radio-group
        row
        v-model="radios"
        class="ml-auto mt-0 mb-3 "
        style="max-width: 100%; height: 40px; float : right;"
        >
        <div class="example ex1" >
          <label class="radio radio_blue">
            <input type="radio" name="group1" v-model="radios" value="all" height="50px"/>
            <span>전체</span>
          </label>
          <label class="radio radio_green" >
            <input type="radio" name="group1" v-model="radios" value="succ"/>
            <span>성공</span>
          </label>
          <label class="radio radio_orange">
            <input type="radio" name="group1" v-model="radios" value="ing"/>
            <span>진행중</span>
          </label>
          <label class="radio radio_red">
            <input type="radio" name="group1" v-model="radios" value="fail"/>
            <span>실패</span>
          </label>
        </div>
      </v-radio-group>



      <v-divider style="clear : both;" />
      
      <v-data-table
        :headers="headers_data"
        :items="listData"
        :items-per-page="itemsPerPage"
        class="font-weight-light"
      >
        <template v-slot:no-data>
          데이터가 없습니다.
        </template>
        <template v-slot:item.STATE="{ item }">
          <v-icon class="mb-1 pr-1" v-bind:style="{color: stateColor(item.STATE)}" size=10 >mdi-checkbox-blank-circle</v-icon>
          <span v-if="item.STATE == 'succ'" >완료</span>
          <span v-if="item.STATE == 'ing'">진행중</span>
          <span v-if="item.STATE == 'fail'">실패</span>
        </template>
        <!-- <template v-slot:item.API_ADD="{ item }">
          <a @click="testDialog(item.API_ADD)">{{ item.API_ADD }}</a>
        </template>  -->
        <template v-slot:item.AVAILABILITY="{ item }">
          <a v-if="item.AVAILABILITY == '가능'" @click="testDialog(item)">{{ item.AVAILABILITY }}</a>
          <span v-else>{{ item.AVAILABILITY }}</span>
        </template> 
        <template v-slot:item.project_action="{ item }">
          <v-btn color="info" class="px-1 ml-1" fab x-small @click="projectDialog(item)">
            <v-icon>mdi-projector-screen</v-icon>
          </v-btn>
        </template> 
        <template v-slot:item.session_action="{ item }">
          <v-btn color="yellow" class="px-1 ml-1" fab x-small @click="sessionDialog(item)">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>   
        <template v-slot:item.del_action="{ item }">
          <v-btn color="error" class="px-1 ml-1" fab x-small @click="delDialog(item), delData = item">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template> 
      </v-data-table>
    </base-material-card>

    <v-dialog
      v-model="deleteDialog"
      max-width="300"
    >
    <v-card>
        <v-card-title>
          정말로 삭제하시겠습니까?
          <v-spacer />
          <v-icon
            aria-label="Close"
            @click="deleteDialog = false"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text class="pb-6 pt-6 pr-6 text-start font-weight-bold">
          Project 명 : {{ projectName }}<br/>
          모델 : {{ modelName }}
        </v-card-text>
        <v-card-text class="pb-6 pt-1 pr-1 text-center">
          <v-btn
            @click="delRun()"
            color="red"
          >
            삭제
          </v-btn>
          <v-btn
            color="grey"
            @click="deleteDialog = false"
          >
            취소
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    
  </v-container>
</template>

<script>
import API from '../../api'

  export default {
    name: 'HistoryTable',

    data () {
      return {
        radios : 'all',
        deleteDialog : false,
        projectName : '',
        modelName : '',
        seq : '',
        itemsPerPage : 10,
        headers: [
          { text: '번호',value: 'SEQ',sortable: false,  align: 'center',width: "4%"},
          { text: '사용자', value: 'USER',sortable: false, align: 'center',width: "7%" },
          { text: 'PROJECT', value: 'PROJECT_NAME',sortable: false, align: 'center',width: "10%" },
          { text: '모델', value: 'MODEL',sortable: false, align: 'center',width: "10%" },
          { text: '성능', value: 'PERFORMANCE',sortable: false, align: 'center',width: "10%" },
          { text: '학습상태', value: 'STATE',sortable: false, align: 'center', width: "7%"},
          { text: 'API 상태', value: 'AVAILABILITY',sortable: false, align: 'center', width: "5%"},
          // { text: 'API 주소', value: 'API_ADD', sortable: false, align: 'center',width: "30%" },
          { text: '프로젝트 정보', value: 'project_action', sortable: false, align: 'center',width: "5%" },
          { text: '세션 정보', value: 'session_action', sortable: false, align: 'center',width: "5%" },
          { text: '생성시간', value: 'CREATE_TIME',sortable: false, align: 'center',width: "10%" },
          { text: '삭제', value: 'del_action', sortable: false, align: 'center',width: "4%" },
        ],
        headers_data : [],
      }
    },
    props : {
      listData : Array,
      historyUser : Number,
      uploadBnt : String,
      uploadBntColor : String,
      sessionBool : Boolean
    },
    created () {
      this.headers.some(data => {
        if((data.value == 'USER')) return false;
        this.headers_data.push(data)
      });
    },
    watch:{
      historyUser : function (val){
        this.headers_data = []
        this.headers.some(data => {
          if((val == 0 && data.value == 'USER')) return false;
          this.headers_data.push(data)
        });
      },
      radios : function (val){
        this.$emit('search', val)
      },
    },
    methods : {
      stateColor (state) {
          if (state == 'succ') return 'green'
          else if (state == 'ing') return 'orange'
          else return 'red'
      },
      testDialog(item) {
        this.$emit('testDialog', item)
      },
      projectDialog(item) {
        this.$emit('projectDialog', item)
      },
      sessionDialog(item) {
        this.$emit('sessionDialog', item['SEQ'])
      },
      // learningDialog() {
      //   this.$emit('learningDialog')
      // },
      learningParentDialog() {
        this.$emit('learningParentDialog')
      },

        delDialog(item) {
        this.deleteDialog = true
        this.projectName = item['PROJECT_NAME']
        this.modelName = item['MODEL']
        this.seq = item['SEQ']
       },
       delRun(){
        this.$http.delete(API.HISTORY_DEL,{
          params: {SEQ : this.seq}
        }).then(res=>{
          if (res.data.success == true){
            this.deleteDialog = false
            this.$emit('getList')
            this.$emit('learningState')
          }
        })
       },
    },
  }
</script>

<style>
.theme--light.v-data-table{
  color : rgb(76 76 76 / 87%)
}
/* .v-input__control{
    height: 30px;
} */
.example {
  font-size: 12px;
}
.example input {
  display: none;
}
.example label {
  margin-right: 10px;
  display: inline-block;
  cursor: pointer;
}

.ex1 span {
  display: block;
  padding: 5px 10px 5px 25px;
  border: 2px solid #ddd;
  border-radius: 15px;
  position: relative;
  transition: all 0.25s linear;
}
.ex1 span:before {
  content: '';
  position: absolute;
  left: 5px;
  top: 50%;
  -webkit-transform: translatey(-50%);
          transform: translatey(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ddd;
  transition: all 0.25s linear;
}
.ex1 input:checked + span {
  background-color: #fff;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
}
.ex1 .radio_green input:checked + span {
  color: green;
  border-color: green;
}
.ex1 .radio_green input:checked + span:before {
  background-color: green;
}
.ex1 .radio_red input:checked + span {
  color: red;
  border-color: red;
}
.ex1 .radio_red input:checked + span:before {
  background-color: red;
}
.ex1 .radio_blue input:checked + span {
  color: #1976D2;
  border-color: #1976D2;
}
.ex1 .radio_blue input:checked + span:before {
  background-color: #1976D2;
}
.ex1 .radio_orange input:checked + span {
  color: orange;
  border-color: #ffa500;
}
.ex1 .radio_orange input:checked + span:before {
  background-color: orange;
}


</style>
