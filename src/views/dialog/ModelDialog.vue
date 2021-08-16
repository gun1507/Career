<template>
    <v-dialog v-model="isShowAddModelDialog" width="50%" persistent>
        <base-material-card
            color="primary"
            icon="mdi-archive"
            title=""
            class="py-1 px-10 pt-7"
        >
            <template v-slot:after-heading>
                <div class="display-1 font-weight-bold" style="float:left;">
                    모델 추가
                </div>
                <div class="text-right ml-auto" style="position:absolute; right:70px">
                <v-btn color="error" @click="formClose()" class="px-1 ml-1" fab x-small >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </div>
            </template>
            <v-container>
                <v-divider></v-divider>
<!--                <br/>-->
                <v-subheader class="subtitle-1 font-weight-bold">
                  모델
                </v-subheader>
                <v-row
                    align="center"
                    dense>
                    <v-col class="text-center body-1 pb-6" cols="3">
                        모델명
                    </v-col>
                    <v-col cols="8">
                        <v-text-field
                        ref="MODEL"
                        v-model="modelData.name"
                        dense
                        outlined
                        :rules="[()=> !!modelData.name || '모델 이름을 설정해주세요.']"
                        ></v-text-field>
                    </v-col>
                    <v-col class="text-center body-1 pb-6" cols="3">
                        Docker URL
                    </v-col>
                    <v-col cols="8">
                        <v-text-field
                        ref="TRAINDOCKER"
                        v-model="modelData.train_docker"
                        dense
                        outlined
                        :rules="[()=> !!modelData.train_docker || 'train docker url 을 설정해주세요.']"
                        ></v-text-field>
                    </v-col>
                    <v-col class="text-center body-1" cols="3">
                        모델타입
                    </v-col>
                    <v-col cols="8">
                        <v-radio-group v-model="modelData.VALIDATION_LANG" row>
                            <v-radio label="분류모델" value="cnn"></v-radio>
                            <v-radio label="순서태깅" value="rnn"></v-radio>
                            <v-radio label="생성모델" value="gpt"></v-radio>
                            <v-radio label="seq2seq" value="seq2seq"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col class="text-center body-1" cols="3">
                        모델 Token
                    </v-col>
                    <v-col cols="8">
                        <v-radio-group v-model="modelData.TOKEN" row :disabled="tokenDisabled"> 
                            <v-radio label="dha(형태소)" value="dha"></v-radio>
                            <v-radio label="bpe" value="bpe"></v-radio>
                            <!-- <v-radio label="gpt" value="gpt"></v-radio> -->
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-subheader class="subtitle-1 font-weight-bold">
                  학습
                </v-subheader>
                <v-row
                    align="center"
                    dense>
                  <v-col class="text-center body-1" cols="3">
                    GPU
                  </v-col>
                      <v-col cols="8">
                          <v-radio-group v-model="modelData.gpuCnt" row>
                            <v-radio label="1장" value="1"></v-radio>
                            <v-radio label="2장" value="2"></v-radio>
                            <v-radio label="4장" value="4"></v-radio>
                          </v-radio-group>
                      </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-subheader class="subtitle-1 font-weight-bold">
                  서비스
                </v-subheader>
                <v-row
                    align="center"
                    dense>
                    <v-col class="text-center body-1" cols="3">
                        CPU
                    </v-col>
                    <v-col cols="8">
                        <v-radio-group v-model="modelData.cpu" row>
                            <v-radio label="1개" value="1"></v-radio>
                            <v-radio label="2개" value="2"></v-radio>
                            <v-radio label="4개" value="4"></v-radio>
                            <v-radio label="8개" value="8"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col class="text-center body-1" cols="3">
                        GPU
                    </v-col>
                    <v-col cols="8">
                        <v-radio-group v-model="modelData.gpu" row>
                            <v-radio label="0 GiB" value="0"></v-radio>
                            <v-radio label="1 GiB" value="1"></v-radio>
                            <v-radio label="2 GiB" value="2"></v-radio>
                            <v-radio label="3 GiB" value="3"></v-radio>
                            <v-radio label="4 GiB" value="4"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col class="text-center body-1" cols="3">
                        MEMORY
                    </v-col>
                    <v-col cols="8">
                        <v-radio-group v-model="modelData.memory" row>
                            <v-radio label="2G" value="2048"></v-radio>
                            <v-radio label="4G" value=4096></v-radio>
                            <v-radio label="8G" value="8192"></v-radio>
                            <v-radio label="16G" value="16384"></v-radio>
                        </v-radio-group>
                    </v-col>    
                </v-row>
                <div class="pa-3 text-center">
                    <v-btn
                        class="mr-2 px-16"
                        color="primary"
                        default 
                        @click="addModel()"
                    >
                        등록
                    </v-btn>
                    <v-btn
                        class="ml-2 px-16"
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
            formHasErrors : false,
            tokenDisabled : false,
        }
    },
    props:{
      isShowAddModelDialog: Boolean,
      result: String,
      modelData : Object
    },
    methods : {
        formClose() {
            this.modelData.seq = ''
            this.modelData.name = ''
            this.modelData.train_docker = ''
            // this.modelData.inference_docker = ''
            this.modelData.cpu = '1'
            this.modelData.gpu = '0'
            this.modelData.gpuCnt = '1'
            this.modelData.memory = '2048'
            this.modelData.VALIDATION_LANG = 'cnn'
            this.modelData.TOKEN = 'dha'
            this.formHasErrors = false
            Object.keys(this.form).forEach(f => {
                this.$refs[f].reset()
            })
            this.$emit("closeForm")
        },
        addModel() {
            this.formHasErrors = false
            Object.keys(this.form).forEach(f => {
            if (!this.form[f]) this.formHasErrors = true
                this.$refs[f].validate(true)
            })
            if(!this.formHasErrors){
                if (this.modelData.seq){
                    this.$http.put(API.MODEL_MOD,
                        {   
                            ID : this.modelData.seq,
                            MODEL : this.modelData.name,
                            TRAINDOCKER : this.modelData.train_docker,
                            // INFERENCEDOCKER : this.modelData.inference_docker,
                            CPU : this.modelData.cpu,
                            GPU : this.modelData.gpu,
                            GPU_COUNT : this.modelData.gpuCnt,
                            MEMORY : this.modelData.memory,
                            VALIDATION_LANG : this.modelData.VALIDATION_LANG,
                            TOKEN : this.modelData.TOKEN,
                        }
                    ).then(res=>{
                        this.formClose()
                        this.$emit('getList')
                    },err => {
                        console.log(err);
                    })
                }else{
                    this.$http.post(API.MODEL_ADD,
                        {
                            MODEL : this.modelData.name,
                            TRAINDOCKER : this.modelData.train_docker,
                            // INFERENCEDOCKER : this.modelData.inference_docker,
                            CPU : this.modelData.cpu,
                            GPU : this.modelData.gpu,
                            GPU_COUNT : this.modelData.gpuCnt,
                            MEMORY : this.modelData.memory,
                            VALIDATION_LANG : this.modelData.VALIDATION_LANG,
                            TOKEN : this.modelData.TOKEN,
                        }
                    ).then(res=>{
                        this.formClose()
                        this.$emit('getList')
                    },err => {
                        console.log(err);
                    })
                }
            }
        },
    },
    computed: {
        form () {
            return {
                MODEL: this.modelData.name,
                TRAINDOCKER: this.modelData.train_docker,
                // INFERENCEDOCKER : this.modelData.inference_docker,
            }
        },
    },
    watch: {
        modelData : {
            deep : true,
            handler(newData, oldData, idx) {
                if(newData.VALIDATION_LANG == 'seq2seq' || newData.VALIDATION_LANG == 'gpt'){
                    this.modelData.TOKEN = String('bpe')
                    this.tokenDisabled = true
                }else{
                    this.tokenDisabled = false
                }
                this.modelData.cpu = String(newData.cpu)
                this.modelData.gpu = String(newData.gpu)
                this.modelData.gpuCnt = String(newData.gpuCnt)
                this.modelData.memory = String(newData.memory)
                this.modelData.VALIDATION_LANG = String(newData.VALIDATION_LANG)
                this.modelData.TOKEN = String(newData.TOKEN)
            }
        }
    }
}
</script>
<style>
</style>