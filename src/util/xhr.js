const xhr = (conf)=>{
    let ajax = new Promise((resolve,reject)=>{
        let createAjax = function () {
            let xhr = null;
            try {
                // IE系列浏览器
                xhr = new ActiveXObject('microsoft.xmlhttp');
            } catch (e1) {
                try {
                    // 非IE浏览器
                    xhr = new XMLHttpRequest();
                } catch (e2) {
                    console.log('您的浏览器不支持ajax，请更换！');
                }
            }
            return xhr;
        };
        // 初始化
        // type参数,可选
        let type = conf.type;
        // url参数，必填
        let url = conf.url;
        // data参数可选，只有在post请求时需要
        let data = new URLSearchParams(conf.data);
        // for(let i in conf.data){
        //     data.append(i,conf.data[i]);
        // }
        // console.log(data);
        // datatype参数可选
        let dataType = conf.dataType;
        // 回调函数可选
        // let success = conf.success;
        // let error = conf.error ? conf.error : () => { };

        if (type == null) {
            // type参数可选，默认为get
            type = 'get';
        }
        if (dataType == null) {
            // dataType参数可选，默认为text
            dataType = 'text';
        }
        // 创建ajax引擎对象
        let xhr = createAjax();
        // 打开
        xhr.open(type, url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (dataType == 'text' || dataType == 'TEXT') {
                        resolve(xhr.responseText);
                } else if (dataType == 'xml' || dataType == 'XML') {
                    resolve(xhr.responseXML);
                } else if (dataType == 'json' || dataType == 'JSON') {
                    resolve(eval('(' + xhr.responseText + ')'));
                }
            } else if (xhr.readyState == 4) {
                reject(xhr.status)
            }
        };

        // 发送
        if (type == 'GET' || type == 'get') {
            xhr.send(null);
        } else if (type == 'POST' || type == 'post') {
            xhr.setRequestHeader('content-type',
                'application/x-www-form-urlencoded');
            xhr.send(data);
        }
    });
    return ajax;
}
export default xhr;