<template>
    <v-container
    fluid
    
    style="padding-bottom: 0px;"
    >
        <v-row
            style="height: auto;"
        >
            <v-col
                cols="12"
                sm="6"
                lg="3"
            >
                <base-material-stats-card
                color="blue"
                icon="widgets"
                title="전체 수"
                :value="totalCnt"
                class="mt-0 mb-0"
                style="display : flex;"
                :minHeight="true"
                >
                </base-material-stats-card>
            </v-col>

            <v-col
                cols="12"
                sm="6"
                lg="3"
            >
                <base-material-stats-card
                color="yellow"
                icon="archive"
                title="검색 건수"
                :value="searchCnt"
                class="mt-0 mb-0"
                style="display : flex;"
                :minHeight="true"
                />
            </v-col>
            <v-col
                cols="12"
                sm="6"
                lg="3"
            >
                <base-material-stats-card
                    color="info"
                    icon="mdi-arrange-bring-forward"
                    title="Deepflow 가용 리소스"
                    :value="sessionCnt"
                    class="mt-0 mb-0"
                    style="display : flex;"
                    :minHeight="true"
                />
            </v-col>
            <v-col
                cols="12"
                sm="6"
                lg="3"
            >
                <base-material-stats-card
                    color="info"
                    icon="mdi-arrange-send-backward"
                    title="Dference 가용 리소스"
                    :value="appCnt"
                    class="mt-0 mb-0"
                    style="display : flex;"
                    :minHeight="true"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from '@/api'

export default {
    data () {
        return {

            // Count
            sessionCount : '',
            appCount : '',
          
        }
    },
    created () {
    },
    props:{
        totalCnt : String,
        searchCnt : String,
        sessionCnt : String,
        appCnt : String,
        apiCnt : String,
        usingUserCnt : String,
    },
   
    methods : {
    },
    computed: {
    },
    
}
</script>
