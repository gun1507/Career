<template>
    <v-dialog v-model="addDialog" persistent max-width="700px">
        <v-card>
            <v-card-text>
                <v-container>
                    <v-card-title>
                        <span class="headline">사용자 추가</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col sm="4" >
                            <v-subheader>LDAP ID 검색</v-subheader>
                        </v-col>
                        <v-col sm="6">
                            <v-text-field 
                                v-model="LDAP_ID" 
                                label="아이디를 입력해주세요." 
                                clearable
                                outlined 
                                dense  
                                maxlength="25"
                                @keyup.enter="search_user"
                            ></v-text-field>
                        </v-col>
                        <v-col sm="2">
                            <v-btn class="mb-1" color="success" @click="search_user">검색</v-btn>
                        </v-col>

                    </v-row>
                    <div>
                        <v-data-table
                        :headers="modal_headers"
                        :items="modalData"
                        class="elevation-0"
                        :items-per-page="5"
                        >
                            <template v-slot:item.action="{ item }">
                                <v-btn v-if="item.AUTH==1" class="ma-2"
                                       tile large color="grey"
                                       icon
                                       @click="user_update(item,2)"
                                >
                                    <v-icon color="red">mdi-account-minus-outline</v-icon>
                                </v-btn>
                                <v-btn v-if="item.AUTH==2" class="ma-2"
                                    tile large color="grey" 
                                    icon 
                                    @click="user_update(item,1)"
                                >
                                    <v-icon color="blue">mdi-account-plus-outline</v-icon>
                                </v-btn>
                            </template>
                            <template v-slot:no-data>
                                데이터가 없습니다.
                            </template>
                        </v-data-table>
                    </div>
                </v-container>
            </v-card-text>
            <div class="pa-3 text-center">
                <v-btn color="grey" dark class="mb-2 px-16" 
                default
                @click="close">닫기</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import API from '@/api'

export default {
    data() {
        return {
            LDAP_ID : '',
            modalData : [],
            modal_headers: [
                { text: 'LDAP ID',value: 'LDAP_ID',sortable: false,  align: 'center',width: "25%"},
                { text: '소속', value: 'DEPT',sortable: false, align: 'center',width: "30%" },
                { text: '등록일자', value: 'CREATE_DATE',sortable: false, align: 'center',width: "25%" },
                { text: '권한', value: 'action', sortable: false, align: 'center',width: "20%" },
            ],
        }
    },
    props : {
        addDialog : Boolean
    },
    methods: {
        search_user() {
            this.$http.get(API.USER_POP(this.LDAP_ID),{ 
            }).then(res=>{
                if (res.data.success == true){
                    this.modalData = res.data.data
                    console.log(res.data.data)
                }
            })
        },
        user_update(item, auth){
            this.$http.post(API.USER_POP(item.LDAP_ID),{ 
                userData : {
                    ID : item.LDAP_ID,
                    DEPT : item.DEPT,
                    AUTH : auth
                }
            }).then(res=>{
                if (res.data.success == true){
                    this.modalData = res.data.data
                }
            })
        },
        close() {
            this.LDAP_ID = ''
            this.modalData = []
            this.$emit('getUserList')
            this.$emit("closeForm")
        },
    },
}
</script>