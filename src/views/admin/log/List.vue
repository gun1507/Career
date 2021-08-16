<template>
  <v-container
    fluid
  >
    <base-material-card
      color="success"
      icon="wysiwyg"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-1 font-weight-bold mb-5" style="float:left;">
              LOG
        </div>
        <div class="text-right ml-auto mt-1" style="position:absolute; right:23px ">
          <v-btn
              color="warning"
              default
              rounded
              v-bind:href="toolUrl"
              target="_blank"
          >
              tool
          </v-btn>
          <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="blue"
                      default
                      rounded
                      v-bind="attrs"
                      v-on="on"
                  >
                    cURL
                  </v-btn>
              </template>
              <v-list>
                  <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1">
                              cURL 정보
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <v-text-field
                                    id="getCurlItem"
                                    :value="'curl -X GET '+curlItem+'/api/learnLog/log/list/ -H \'Content-Type: application/json\''"
                                    append-outer-icon="mdi-clipboard-text-outline"
                                    @click:append-outer="curlCopy"
                                    outlined>
                                </v-text-field>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
              </v-list>
          </v-menu>
          <v-btn
              color="primary"
              default
              rounded
              @click="csvExport(csvData)"
              elevation="3"
          >
            다운로드
          </v-btn>
        </div>
      </template>

      <v-divider class="mt-3" />
      <v-data-table
        id="logTable"
        :headers="headers"
        :items="listData"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        @page-count="pageCount = $event"
        >
          <template v-slot:no-data>
            데이터가 없습니다.
          </template>
          <template v-slot:item.STAT_INFO="{ item }">
            <div style="text-align:left" v-for="(value, name) in item.STAT_INFO">{{ name }} : {{ value }}</div>
          </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
import API from '@/api'
import VueCsvDownloader from 'vue-csv-downloader'

export default {
    components : {
      VueCsvDownloader,
    },
    data() {
        return {
            modelName : '',
            seq : '',
            deleteDialog : false,
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            headers: [
                { text: 'ID', value: 'USER_ID',sortable: false, align: 'center',width: "5%" },
                { text: '프로젝트 명', value: 'PROJECT_NAME',sortable: false, align: 'center',width: "15%" },
                { text: '모델', value: 'MODEL', sortable: false, align: 'center',width: "10%" },
                { text: '학습 시작시간', value: 'TRAIN_STIME', sortable: false, align: 'center',width: "15%" },
                { text: '학습 예측 종료시간', value: 'TRAIN_PTIME', sortable: false, align: 'center', width: "15%"},
                { text: '학습 실제 종료시간', value: 'TRAIN_ETIME', sortable: false, align: 'center',width: "15%" },
                { text: 'API 가능시간', value: 'APP_STIME', sortable: false, align: 'center',width: "15%" },
                { text: '정보', value: 'STAT_INFO', sortable: false, align: 'center',width: "20%" },
                { text: 'FILE URL', value: 'DOWNLOAD_URL', sortable: false, align: 'center',width: "15%" },
            ],
            curlItem : process.env.NODE_ENV === 'production' ? 'http://diffuser.is.daumkakao.io' : 'http://diffuser.dev.daumkakao.io',
            toolUrl : process.env.NODE_ENV === 'production' ? 'http://10.60.89.91:8284/' : 'http://10.202.131.202:8284',
        }
    },
    props : {
      listData: Array
    },
    computed : {
        csvData() {
            let arrData = []
            arrData = this.listData.map(items => ({
                ...items,
                STAT_INFO: JSON.stringify(items.STAT_INFO).replace(/[{}"]/gi,'').replace(/\,/gi,','),
            }))
            return arrData
        }
    },
    methods : {
      csvExport(arrData) {
        let prefix = "data:text/csv;charset=utf-8,"
        let csvContent = ''
        csvContent += [
          Object.keys(arrData[0]).join("\t"),
          ...arrData.map(item => Object.values(item).join("\t"))
        ]
            .join("\n")
            .replace(/(^\[)|(\]$)/gm, "")

        const data = prefix + encodeURIComponent(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", data)
        link.setAttribute("download", "export.csv")
        link.click();
      },
      curlCopy(){
          let curlText = null
          curlText = document.getElementById("getCurlItem")
          curlText.select();
          document.execCommand("copy");
      }
    }
}
</script>

<style lang="sass">
.btn_group
    margin-top: 10px

//.btn_group > button
//    display: inline-block
//    width: calc(50% - 10px)
//    margin: 0 5px !important
//    padding: 0 !important
//
//.btn_group > button + button
//    margin-left: 10px

</style>