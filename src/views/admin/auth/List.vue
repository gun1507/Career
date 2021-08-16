<template>
    <v-container
        fluid
    >
        <base-material-card
        color="success"
        icon="mdi-account-search"
        inline
        class="px-5 py-3"
        >
            <template v-slot:after-heading>
                <div class="display-1 font-weight-bold mb-5" style="float:left;">
                    사용자 권한
                </div>
                <div class="text-right ml-auto mt-1" style="position:absolute; right:23px ">
                <v-btn
                    color="primary"
                    default
                    rounded
                    @click="addAuthDialog()"
                    elevation="3"
                >
                    사용자추가
                </v-btn>
                </div>
            </template>
            <div>
                <v-text-field
                    v-model="searchUser"
                    placeholder="Search for ldap id"
                    outlined
                    dense
                    prepend-inner-icon=" mdi-magnify"
                    class="ml-auto pl-4 pb-1"
                    style="max-width: 230px; height: 40px;"
                    @keyup="onEnter"   
                ></v-text-field>
            </div>
            
        

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

                <template v-slot:top>
                    
                        
                    <v-dialog
                        v-model="addDialog"
                        max-width="290"
                    >
                        <v-card>
                        <v-card-title class="headline">
                            <v-icon large>mdi-account-plus</v-icon>추가</v-card-title>
                            <v-card-text>
                                <div><strong>{{ addItem.LDAP_ID }} </strong>를(을)</div>
                                <div>사용자로 추가하시겠습니까?</div>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" dark @click="user_add(addItem)">추가</v-btn>
                                <v-btn color="grey" dark @click="addDialog = false">닫기</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>


                    <v-dialog
                        v-model="edit.dialog"
                        max-width="290"
                    >
                    <v-card>
                        <v-card-title class="headline"></v-card-title>
                        <v-card-text>
                            <div><strong>{{ edit.id }} </strong>의</div>
                            <div>사용자 권한을 <strong>{{ edit.txt }}</strong> 하시겠습니까?</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" dark @click="editAction()">확인</v-btn>
                            <v-btn color="grey" dark @click="edit.dialog = false">닫기</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    

                </template>

                <template v-slot:item.action="{ item }">
                    <v-icon class="pr-2" color="red" @click="editItem(item, 'del')">mdi-account-minus-outline</v-icon>
                    <v-icon class="pl-2" v-if="item.AUTH==2" color="blue" @click="editItem(item, 'edit')">mdi-account-plus-outline</v-icon>
                </template>
            </v-data-table>
            <!-- <div class="text-center pt-3">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div> -->
        </base-material-card>
    </v-container>
</template>

<script>
import API from '../../../api'

    export default {
        props: {
            listData : Array,
        },
        data () {
            return {
                searchUser : '',
                page: 1,
                pageCount: 0,
                itemsPerPage: 10,
                addDialog : false,
                addItem : NaN,
                ldap_search : '',
                dialog : false,
    
                headers: [
                    { text: '번호',value: 'SEQ',sortable: false,  align: 'center',width: "5%"},
                    { text: 'LDAP ID',value: 'ID',sortable: false,  align: 'center',width: "20%"},
                    { text: '소속', value: 'DEPT',sortable: false, align: 'center',width: "20%" },
                    { text: '권한 갱신일자', value: 'LAST_LOGIN',sortable: false, align: 'center',width: "20%" },
                    { text: '등록일자', value: 'CREATE_DATE',sortable: false, align: 'center',width: "20%" },
                    { text: '권한', value: 'action', sortable: false, align: 'left',width: "20%" },
                ],
                ADD_ID : '',
                edit : {
                    dialog : false,
                    state : '',
                    id : '',
                    txt : '',
                    item : NaN
                },
            }
        },
        methods : {
            addAuthDialog() {
                this.$emit('addAuthDialog')
            },
            close() {
                this.editedItem.LDAP_ID = ''
                this.modalData = []
                this.$emit('getUserList')
                this.dialog = false
            },
            search_user() {
                this.$http.get(API.USER_POP(this.editedItem.LDAP_ID),{ 
                }).then(res=>{
                    if (res.data.success == true){
                        this.modalData = res.data.data
                    }
                })
            },
            user_add(item){
                this.addDialog = false
                this.$http.post(API.USER_POP(item.LDAP_ID),{ 
                    userData : {
                        ID : item.LDAP_ID,
                        DEPT : item.DEPT
                    }
                }).then(res=>{
                    if (res.data.success == true){
                        this.modalData = res.data.data
                    }
                })
            },
            onEnter (e) {
                if (e.keyCode === 13) {
                    this.$emit('search', this.searchUser)
                }
            },
            editItem (item, state) {
                this.edit.state = state
                this.edit.id = item.ID
                this.edit.item = item
                this.edit.dialog = true

                if(state == 'del'){
                    this.edit.txt = '삭제'
                }else{
                    this.edit.txt = '활성화'
                }
            },
            editAction(){
                this.edit.dialog = false
                if(this.edit.state == 'del'){
                    this.$http.delete(API.USER,{
                    params: {SEQ : this.edit.item.SEQ}
                    }).then(res=>{
                    if (res.data.success == true){
                        this.$emit('getUserList')
                    }
                    else {
                        this.$eventBus.$emit('showDialog', {
                        'result' : res.data.errmsg
                        })
                    }
                    })
                }else{
                    this.$http.put(API.USER,{
                    SEQ : this.edit.item.SEQ
                    }).then(res=>{
                    if (res.data.success == true){
                        this.$emit('getUserList')
                    }
                    else {
                        this.$eventBus.$emit('showDialog', {
                        'result' : res.data.errmsg
                        })
                    }
                    })
                }
            },
        }
  }
</script>
<style>
.v-text-field--outlined{
    height:40px;
}
.v-input--switch--inset{
    margin-top: 8px;
}
.mb-2 {
    margin-top: 6px;
}

.v-input__slot{
    margin-bottom: 0px;
}

</style>