import sessionManagerKey from "@/constant/keyManager";

export default {
    // SERVICE_URL : process.env.NODE_ENV === 'production' ? 'https://facility.ashlab.synology.me/api/' : 'http://0.0.0.0:8000/api/',

    adminLogin(){
        return this.SERVICE_URL + 'login_admin'
    },

    userLogin(){
        return this.SERVICE_URL + 'login_user'
    },
    getPlaceList(searchText, filter){
        if (searchText == null){
            searchText = ''
        }
        if (filter == null){
            filter = ''
        }
        return this.SERVICE_URL + 'place_list/' + sessionStorage.getItem(sessionManagerKey.userSeq) + '?name=' + searchText + '&filter=' + filter
    },
    editSpaceInfo(space_seq){
        return this.SERVICE_URL + 'place_info/' + space_seq
    },
    regSpaceInfo(){
        return this.SERVICE_URL + 'reg_space/' + sessionStorage.getItem(sessionManagerKey.userSeq)
    },

    getFacilityList(space_seq, searchText, filter){

        if (space_seq == null){
            space_seq = ''
        }
        if (searchText == null){
            searchText = ''
        }
        if (filter == null){
            filter = ''
        }
        return this.SERVICE_URL + 'facility_list/' + space_seq + '?name='+ searchText + '&filter=' + filter
    },
    editFacilityInfo(facility_seq){
        return this.SERVICE_URL + 'facility_info/' + facility_seq
    },

    regFacilityInfo(space_seq){
        return this.SERVICE_URL + 'reg_facility/' + space_seq
    },

    getPatrolerList(searchText, filter){
        if (searchText == null){
            searchText = ''
        }
        if (filter == null){
            filter = ''
        }
        return this.SERVICE_URL + 'patroler_list/' + sessionStorage.getItem(sessionManagerKey.userSeq) + '?name=' + searchText + '&filter=' + filter
    },
    regPatrolerInfo(){
        return this.SERVICE_URL + 'reg_patroler/' + sessionStorage.getItem(sessionManagerKey.userSeq)
    },
    editPatrolerInfo(patroler_seq){
        return this.SERVICE_URL + 'patroler_info/' + patroler_seq
    },

    getNoticeList(spaceSeq, filter){
        if (spaceSeq == null){
            spaceSeq = ''
        }
        if (spaceSeq === 0){
            spaceSeq = ''
        }
        if (filter == null){
            filter = ''
        }
        return this.SERVICE_URL + 'notice_list/' + sessionStorage.getItem(sessionManagerKey.userSeq) + '?space_seq=' + spaceSeq + '&filter=' + filter
    },
    editNoticeInfo(notice_seq){
        return this.SERVICE_URL + 'notice_info/' + notice_seq
    },
    regNoticeInfo(){
        return this.SERVICE_URL + 'reg_notice/' + sessionStorage.getItem(sessionManagerKey.userSeq)
    },

    getCompanyList(searchText){
        if (searchText == null){
            searchText = ''
        }

        return this.SERVICE_URL + 'company_list/' + sessionStorage.getItem(sessionManagerKey.userSeq) + '?name=' + searchText
    },

    regCompanyInfo(){
        return this.SERVICE_URL + 'reg_company/' + sessionStorage.getItem(sessionManagerKey.userSeq)
    },
    editCompanyInfo(company_seq){
        return this.SERVICE_URL + 'company_info/' + company_seq
    },
    userInfo(){
        return this.SERVICE_URL + 'user_info/' + sessionStorage.getItem(sessionManagerKey.userSeq)
    },

    getPatrolerHistoryList(){
        return this.SERVICE_URL + 'history_list/' + sessionStorage.getItem(sessionManagerKey.userSeq)
    },

    getUserList(searchText, filter){
        if (searchText == null){
            searchText = ''
        }
        if (filter == null){
            filter = ''
        }
        return this.SERVICE_URL + 'user_list/' + sessionStorage.getItem(sessionManagerKey.userSeq)  + '?name='+ searchText + '&filter=' + filter
    },
    editUserInfo(user_seq){
        return this.SERVICE_URL + 'user_info/' + user_seq
    },
    regUserInfo(){
        return this.SERVICE_URL + 'reg_user'
    },

    getAdList(){
        return this.SERVICE_URL + 'admin_ad_list'
    },
    removeImageFile(attach_seq){
        return this.SERVICE_URL + 'remove_ad_image' + '/' + attach_seq
    },

    editADInfo(ad_seq){
        return this.SERVICE_URL + 'ad_info/' + ad_seq
    },
    regADInfo(){
        return this.SERVICE_URL + 'reg_ad'
    },


}
