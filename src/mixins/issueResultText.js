const issueResultText ={
    props:{
        state:Boolean,
    },
    methods:{
        isIssueTextColor(state){
            if (state == false) return 'blue'
            else if (state == true) return 'red'
            else return 'dark-gray'
        },
        isIssueText(state) {
            if (state == true) return '확인 필요'
            else if (state == false) return '-'
            else return ''
        },
    },
}

export default issueResultText;
