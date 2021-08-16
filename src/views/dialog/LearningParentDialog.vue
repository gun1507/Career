<template>
    <v-dialog v-model="isShowLearningParentDialog" width="50%" persistent>
        <base-material-card
            color="primary"
            icon="mdi-archive"
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
            <v-toolbar flat color="grey lighten-2" dark height="1">

            </v-toolbar>
            <v-tabs vertical v-model="tab" color="primary">
                <v-tab
                    v-for="items in tabSeqInfo" :key="items.seq"
                    v-show="!items.dialog.taskDisable"
                    style="margin-left: 0px; margin-bottom: 1px"
                    v-bind:class="{runningClass: items.dialog.l_infoDialog, notRunningClass: items.dialog.lDialog}"
                >
                    {{ items.seq }}
                </v-tab>

                <v-tabs-items v-model="tab">
                    <v-tab-item v-for="items in tabSeqInfo" :key="items.seq">
                        <learning-dialog v-if="items.dialog.lDialog && !items.dialog.taskDisable"
                             @closeForm="formClose"
                             :isShowParentDialog="isShowLearningParentDialog"
                             :isShowLearningDialog="items.dialog.lDialog"
                             :modelSelectData="modelSelectData"
                             :dataSet="items.data"
                             :tabType="items.tabType"
                             ref="learnDialog"
                        >
                        </learning-dialog>

                        <learning-info-dialog v-else-if="items.dialog.l_infoDialog && !items.dialog.taskDisable"
                              @closeForm="formClose"
                              :isShowLearningInfoDialog="items.dialog.l_infoDialog"
                              :disableTask="items.dialog.taskDisable"
                              :dataSet="items.data"
                              :tabType="items.tabType"
                        >
                        </learning-info-dialog>

                    </v-tab-item>
                </v-tabs-items>
            </v-tabs>
        </base-material-card>
    </v-dialog>
</template>


<script>
import API from '@/api'

export default {
    components : {
      LearningDialog: () => import('./LearningDialog'),
      LearningInfoDialog: () => import('./LearningInfoDialog')
    },
    data () {
        return {
            tab: 0,
            // runningClass: 'active',
            // notRunningClass: 'unActive',
            // headers: [
            //     { text: 'text', value: 'subject', align: 'start', sortable: false,  width: "25%"},
            //     { text: 'value', value: 'contents', width: "75%", align: 'start' },
            // ],
        }
    },


    props:{
      isShowLearningParentDialog: Boolean,
      // isShowLearningDialog: Boolean,
      // isShowLearningInfoDialog: Boolean,
      modelSelectData : Array,
      tabSeqInfo : Array,
    },
    methods : {
        formClose() {
          if(this.$refs.learnDialog != undefined){
              this.$refs.learnDialog.forEach(subtabs => {
                  subtabs.asyncBloon()
              })
          }
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