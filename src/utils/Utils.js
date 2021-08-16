import axios from 'axios'

export function getRequest(url){

    return new Promise((success, failed) => {
        axios.get(url).then((response) => {
            if (response.status === 200) {
                const jsonString = response.data
                var errCode = jsonString['code']
                var data = jsonString['data']
                var msg = jsonString['msg']

                if (errCode != null){
                    let json = {
                        errCode : errCode,
                        msg : msg
                    }
                    failed(json)
                }else{
                    let json = {
                        msg : msg,
                        data : data
                    }
                    success(json)
                }

            }

        }).catch((err) => {
            if (err != null){
                let json = {
                    errCode : 9999,
                    msg : err.toString()
                }
                failed(json)
            }

        })
    })

}

export function updateRequest(url, params) {
    return new Promise((success, failed) => {
        axios.put(url, params).then((response) => {
            if (response.status === 200) {
                const jsonString = response.data
                var errCode = jsonString['code']
                var data = jsonString['data']
                var msg = jsonString['msg']

                if (errCode != null){
                    let json = {
                        errCode : errCode,
                        msg : msg
                    }
                    failed(json)
                }else{
                    let json = {
                        msg : msg,
                        data : data
                    }
                    success(json)
                }

            }

        }).catch((err) => {
            if (err != null){
                let json = {
                    errCode : 9999,
                    msg : err.toString()
                }
                failed(json)
            }

        })
    })

}

export function postRequest(url, params) {
    return new Promise((success, failed) => {
        axios.post(url, params).then((response) => {
            if (response.status === 200) {
                const jsonString = response.data
                var errCode = jsonString['code']
                var data = jsonString['data']
                var maxPageIndex = jsonString['maxPageIndex']
                var msg = jsonString['msg']

                if (errCode != null){
                    let json = {
                        errCode : errCode,
                        msg : msg
                    }
                    failed(json)
                }else{
                    let json = {
                        msg : msg,
                        data : data,
                        maxPageIndex : maxPageIndex
                    }
                    success(json)
                }

            }

        }).catch((err) => {
            if (err != null){
                let json = {
                    errCode : 9999,
                    msg : err.toString()
                }
                failed(json)
            }

        })
    })

}

export function deleteRequest(url) {
    return new Promise((success, failed) => {
        axios.delete(url).then((response) => {
            if (response.status === 200) {
                const jsonString = response.data
                var errCode = jsonString['code']
                var data = jsonString['data']
                var msg = jsonString['msg']

                if (errCode != null){
                    let json = {
                        errCode : errCode,
                        msg : msg
                    }
                    failed(json)
                }else{
                    let json = {
                        msg : msg,
                        data : data
                    }
                    success(json)
                }

            }

        }).catch((err) => {
            if (err != null){
                let json = {
                    errCode : 9999,
                    msg : err.toString()
                }
                failed(json)
            }

        })
    })

}

export function convertToText(obj) {
    //create an array that will later be joined into a string.
    var string = [];

    //is object
    //    Both arrays and objects seem to return "object"
    //    when typeof(obj) is applied to them. So instead
    //    I am checking to see if they have the property
    //    join, which normal objects don't have but
    //    arrays do.
    if (typeof(obj) == "object" && (obj.join == undefined)) {
        string.push("{");
        obj.forEach(prop => {
            string.push(prop, ": ", convertToText(obj[prop]), ",");
        })
        string.push("}");

        //is array
    } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
        string.push("[")
        obj.forEach(prop => {
            string.push(convertToText(obj[prop]), ",");
        })
        string.push("]")

        //is function
    } else if (typeof(obj) == "function") {
        string.push(obj.toString())

        //all other values can be done with JSON.stringify
    } else {
        string.push(JSON.stringify(obj))
    }

    return string.join("")
}