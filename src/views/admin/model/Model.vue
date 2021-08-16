<template>
    <div>
        <!-- <top
        @ModelDialog="ModelDialog"></top>
        <br/> -->
        <list
        :listData="listData"
        @ModelDialog="ModelDialog"
        @getList="getList"></list>
        <model-dialog
        @getList="getList"
        @closeForm="closeForm"
        :modelData="modelData"
        :isShowAddModelDialog="aDialog">
        </model-dialog>
    </div>
</template>

<script>
import API from '../../../api'

export default {
    components: {
                // Top: () => import('./Top'), 
                List: () => import('./List'),
                ModelDialog: () => import('../../dialog/ModelDialog'),
    },
    data () {
        return {
            listData : [],
            aDialog : false,    
            modelPop : {
                uDialog : false,
                dDialog : false,
                label : [],
                data: {}
            },
            modelData : {
                seq: '',
                name: '',
                train_docker: '',
                // inference_docker: '',
                cpu : '1',
                gpu : '0',
                gpuCnt : '1',
                memory : '2048',
                VALIDATION_LANG : 'cnn',
                TOKEN : 'dha'
            }
        }
    },
    created() {
        this.getList()
        if(sessionStorage.getItem('auth') == 1){
            this.$router.push({ name: 'history' })
        }
        
        
    },
    methods : {
        ModelDialog (item) {
            if(item){
                this.modelData['seq'] = item['ID']
                this.modelData['name'] = item['MODEL']
                this.modelData['train_docker'] = item['TRAINDOCKER']
                // this.modelData['inference_docker'] = item['INFERENCEDOCKER']
                this.modelData['cpu'] = item['CPU']
                this.modelData['gpu'] = item['GPU']
                this.modelData['memory'] = item['MEMORY'],
                this.modelData['VALIDATION_LANG'] = item['VALIDATION_LANG']
                this.modelData['TOKEN'] = item['TOKEN']
                this.modelData['gpuCnt'] = item['GPU_COUNT']
                this.aDialog = true  
            }
            else{
                this.aDialog = true  
            }
            
        },
        closeForm () {
            this.aDialog = false
            this.modelPop['uDialog'] = false
            this.modelPop['dDialog'] = false
          // this.projectPop['pDialog'] = false
        },

        getList() {
            this.$http.get(API.MODEL_LIST).then(res=>{
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