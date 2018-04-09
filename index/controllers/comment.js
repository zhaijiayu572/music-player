let comment_model = require('../model/comment_model');
let util = require('../util');
let comment = {
    addComment(req,res,next){
        let commentItem = {};
        if(req.body.songId){
            commentItem.songId = req.body.songId;
        }
        if(req.body.username){
            commentItem.username = req.body.username;
        }
        if(req.body.comment){
            commentItem.comment = req.body.comment;
        }
        if(Object.keys(commentItem).length === 0){
            res.send(util.errHandler('参数不能全为空！'));
            return false;
        }else{
            comment_model.addComment(commentItem,(rs,error)=>{
                console.log(rs,'result');
                if(error){
                    console.log(error);
                    res.send(util.errHandler('服务器错误'));
                }
                if(rs.result.ok){
                    util.successHandler(res,{
                        result:'添加评论成功'
                    });
                }else{
                    res.send(util.errHandler('服务器错误'));
                }
            })
        }
    }
}
module.exports = comment;