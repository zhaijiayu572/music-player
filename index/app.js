let express = require('express');
let app = express();
let router = require('./router');
const path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: false
}));
app.use('/', router);
// app.use(cors());
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
//     else next();
// });
let server = app.listen(3001,()=>{
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

})
