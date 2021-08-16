const isActColorManager ={
    props:{
        state:Boolean,
        value:String,
    },
    methods:{
        isActColors(state) {
            if (state == true) return 'blue'
            else if (state == false) return 'red'
            else return 'dark-gray'
        },
        isActText(state) {
            if (state == true) return ''
            else if (state == false) return '[미 사용]'
            else return ''
        },
        isActTextList(state) {
            if (state == true) return '사용'
            else if (state == false) return '미 사용'
            else return ''
        },
        imageColors(value){
            if (value.length === 0){
                return 'grey'
            }else{
                return 'black'
            }
        },
    },
}

export default isActColorManager;
