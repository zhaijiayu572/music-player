let comment_model = require('../model/comment_model');
let util = require('../util');
let comment = {
    addComment(req,res,next){
        util.setCORS(res);
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
    },
  getComments(req,res,next){
      util.setCORS(res);
      let songId = req.body.songId;
      if(!songId){
        res.send(util.errHandler('参数为空'));
      }
      comment_model.getComments(songId,(rs,err)=>{
        if(err){
          res.send(util.errHandler('服务器错误'));
        }else{
          util.successHandler(res,rs)
        }
      })
  }
}
module.exports = comment;
