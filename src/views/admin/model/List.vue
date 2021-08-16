<template>
  <v-container
    fluid
  >
    <base-material-card
      color="success"
      icon="mdi-archive"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-1 font-weight-bold mb-5" style="float:left;">
              MODEL
        </div>
        <div class="text-right ml-auto mt-1" style="position:absolute; right:23px ">
          <v-btn
            color="primary"
            default
            rounded
            @click="addModelDialog()"
            elevation="3"
          >
          모델추가
        </v-btn>
        </div>
      </template>

      <v-divider class="mt-3" />
      <v-data-table
        :headers="headers"
        :items="listData"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        @page-count="pageCount = $event"
        >
          <template v-slot:no-data>
            데이터가 없습니다.
          </template>
          <template v-slot:item.MEMORY="{ item }">
            <span v-if="item.MEMORY == 2048">2G</span>
            <span v-if="item.MEMORY == 4096">4G</span>
            <span v-if="item.MEMORY == 8192">8G</span>
            <span v-if="item.MEMORY == 16384">16G</span>
          </template>
          <template v-slot:item.CPU="{ item }">
            <span v-if="item.CPU == 1">1개</span>
            <span v-if="item.CPU == 2">2개</span>
            <span v-if="item.CPU == 4">4개</span>
            <span v-if="item.CPU == 8">8개</span>
          </template> 
          <template v-slot:item.GPU="{ item }">
            <span v-if="item.GPU == 0">0 GiB</span>
            <span v-if="item.GPU == 1">1 GiB</span>
            <span v-if="item.GPU == 2">2 GiB</span>
            <span v-if="item.GPU == 3">3 GiB</span>
            <span v-if="item.GPU == 4">4 GiB</span>
          </template>
          <template v-slot:item.GPU_COUNT="{ item }">
            <span v-if="item.GPU_COUNT == 1">1장</span>
            <span v-if="item.GPU_COUNT == 2">2장</span>
            <span v-if="item.GPU_COUNT == 4">4장</span>
          </template>
        <template v-slot:item.update_action="{ item }">
            <v-btn color="info" class="px-1 ml-1" fab x-small @click="updateModelDialog(item)">
              <v-icon>mdi-pencil-box-multiple-outline</v-icon>
            </v-btn>
          </template> 
          <template v-slot:item.del_action="{ item }">
            <v-btn color="error" class="px-1 ml-1" fab x-small @click="delDialog(item), delData = item">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template> 
      </v-data-table>
      <!-- <div class="text-center pt-5">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div> -->
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
          모델명 : {{ modelName }}<br/>
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
import API from '@/api'

export default {
    data() {
        return {
            modelName : '',
            seq : '',
            deleteDialog : false,
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            headers: [
                // { text: '번호',value: 'ID',sortable: false,  align: 'd-none', width: "5%"},
                { text: '모델', value: 'MODEL',sortable: false, align: 'center',width: "20%" },
                { text: 'Docker url', value: 'TRAINDOCKER', sortable: false, align: 'left',width: "40%" },
                // { text: 'inference docker url', value: 'INFERENCEDOCKER', sortable: false, align: 'center',width: "20%" },
                { text: 'GPU 개수', value: 'GPU_COUNT', sortable: false, align: 'center',width: "10%" },
                { text: 'CPU', value: 'CPU', sortable: false, align: 'center',width: "10%" },
                { text: 'GPU', value: 'GPU', sortable: false, align: 'center',width: "10%" },
                { text: 'MEMORY', value: 'MEMORY', sortable: false, align: 'center',width: "10%" },
                { text: '수정', value: 'update_action', sortable: false, align: 'center',width: "10%" },
                { text: '삭제', value: 'del_action', sortable: false, align: 'center',width: "10%" },
            ],
        }
    },
    props : {
      listData: Array
    },
    methods : {
      updateModelDialog(item) {
        this.$emit('ModelDialog', item)
      },

      addModelDialog() {
        this.$emit('ModelDialog')
      },

      delDialog(item) {
        console.log(item)
        this.deleteDialog = true
        this.modelName = item['MODEL']
        this.seq = item['ID']
      },

      delRun(){
        this.$http.delete(API.MODEL_DEL,{
          params: {ID : this.seq}
        }).then(res=>{
          if (res.data.success == true){
            this.deleteDialog = false
            this.$emit('getList')
          }
        })
       },
      //  deleteDialog: async function (val) {
      //   const r = await this.$dialog.confirm({ 
      //     title: '삭제', 
      //     text: val.ID+'번 모델을 삭제하시겠습니까?',
      //     actions: {
      //       false: '취소',
      //       true: {
      //         color: 'red',
      //         text: '삭제',
      //         handle: () => {
      //           return new Promise(resolve => {
      //             setTimeout(resolve, 1000)
      //             this.$http.delete(API.MODEL_DEL,{
      //               params: {ID : val['ID']}
      //             }).then(res=>{
      //               if (res.data.success == true){
      //                 this.$emit('getList')
      //               }
      //               else {
      //                 this.$eventBus.$emit('showDialog', {
      //                   'result' : res.data.errmsg
      //                 })
      //               }
      //             }) 
      //           })
      //         }
      //       }
      //     } 
      //   })
      // },
    }
}
</script>
