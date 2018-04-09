let returnObj = {          //返回对象模板
    status_code: '2000',
    result:{}
};
let util = {
    setCORS(res){
        res.header('Access-Control-Allow-Origin', '*');
    },
    errHandler(err){ 
        console.log(err);
        returnObj.status_code = '4003';
        returnObj.result.err = err;
        return returnObj;
    },
    successHandler(res,data){
        returnObj.status_code = '2000';
        returnObj.err = '';
        returnObj.result = data;
        res.send(returnObj);
    }
}
module.exports = util;