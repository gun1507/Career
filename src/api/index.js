export default {
    // ## 로그인 인증
    TRANSIT_LOGIN    : '/v1/transit/decrypt/app_manage.common.auth',
    // hello mis
    HELLO_MIS_AUTH   : '/api/user/hellomis/auth/',
    VERIFY_TOKEN     : '/api/user/verify_token/',

    // ## 히스토리 TOP
    // 모델수
    MODEL_COUNT : 'api/history/top/count/',

    // ## 히스토리 리스트
    //USER 별 학습 데이터 팝업
    LEARNING_USER_INFO  : 'api/history/learning/user/',
    //리스트
    HISTORY_LIST    : 'api/history/',
    //프로젝트 정보
    PROJECT_INFO    : 'api/history/project/info/',
    //세션 정보
    SESSION_INFO    : 'api/history/session/info/',
    // 삭제
    HISTORY_DEL     : 'api/history/project/del/',
    //학습데이터 추가
    LEARNING_ADD    : 'api/history/learning/add/',
    // 학습 시작
    // LEARNING_PROJECT_CREATE : 'api/history/project_create/',
    LEARNING_PROJECT_CREATE : `${process.env.VUE_APP_LEARN_API}/history/project_create/`,


    // LEARNING_PROJECT_CREATE : `api/history/project_create/`,
    
    // ## 학습데이터 업로드
    //chunk upload
    CHUNK_UPLOAD            : 'api/history/chunked_upload/',
    //chunk upload 완료
    CHUNK_UPLOAD_COMPLETE   : 'api/history/chunked_upload_complete/',
    // file info 가져오기
    FILE_INFO               : 'api/history/file_info/',
    // validation 체트
    VALIDATION_CHK          : 'api/history/file_info/chk/',
    // 자원 체크
    RESOURCE_CHK            : 'api/history/resource/chk/',
    
    // ## 테스트페이지
    TEST_RUN      : '/api/history/test/run/',         // get
    TEST_CHECK    : '/api/history/test/check/',     // post
    TEST_SEND     : '/api/history/test/send/',
    // TEST_SEND     : `${process.env.VUE_APP_LEARN_API}/history/test/send/`,

    // ## 모델
    // 모델 등록
    MODEL_ADD       : '/api/adminPage/model/add/',
    // 모델 리스트
    MODEL_LIST      : '/api/adminPage/model/list/',
    // 모델 삭제
    MODEL_DEL       : '/api/adminPage/model/del/',
    // 모델 수정
    MODEL_MOD       : '/api/adminPage/model/mod/',

    // ## LOG
    // LOG 리스트
    LOG_LIST      : '/api/learnLog/log/list/',
    
    // ## 사용자 관리
    // 유저 리스트
    USER             : '/api/user/auth/',
    // 유저 팝업
    USER_POP         : (user) => '/api/user/'+ user + '/'

            
}