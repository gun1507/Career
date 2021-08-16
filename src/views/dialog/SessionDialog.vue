<template>
    <v-dialog v-model="isShowSessionDialog" width="60%" persistent>
      <base-material-card
        color="yellow"
        icon="mdi-information-outline"
        title=""
        class="py-1 px-10 pt-7"
      >
      <template v-slot:after-heading>
          <div class="display-1 font-weight-bold" style="float:left;">
          세션정보
          </div>
          <div class="text-right ml-auto" style="position:absolute; right:70px">
            <v-btn color="error" @click="formClose()" class="px-1 ml-1" fab x-small >
                <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
      </template>
  <!-- <v-card ref="form" class="elevation-6">
        <v-card-text> -->
        <v-container>
            <v-divider></v-divider>
            <br/>
            <v-row
            align="center"
            dense>
                <v-col class="text-center body-1"
                cols="1"> 
                </v-col>
                <v-col 
                cols="8">      
                    <vue-json-pretty
                    :data="sessionJson"
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
    <!-- </v-card-text>
        </v-card> -->
    </base-material-card>
    </v-dialog>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default {
    components: {
        VueJsonPretty
    },
    data () {
        return {
           
        }
    },
    props:{
        isShowSessionDialog: Boolean,
        sessionJson : NaN
    },
    methods : {
        formClose() {
            this.$emit("closeForm")
        },
    }
}
</script>