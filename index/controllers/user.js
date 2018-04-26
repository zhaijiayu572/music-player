let user_model = require('../model/user_model');
let util = require('../util');
let user = {
    test(req,res){
        console.log('aa');
        util.setCORS(res);
        console.log(req.query.page);
        res.send('ok');
    },
    checkNickName(req,res,next){
        util.setCORS(res);
        let nickname = req.body.nickname;
        console.log(nickname);
        if(!nickname){
            let msg = util.errHandler('params is null');
            res.send(msg);
        }
        user_model.checkNickname(nickname,(rs)=>{
            if(rs.length){
                util.successHandler(res,{
                    is_exit:true
                });
            }else{
                util.successHandler(res,{
                    is_exit:false
                })
            }
        });

    },
    insertUser(req,res,next){
        util.setCORS(res);
        let params = {
            nickname:req.body.nickname,
            password:req.body.password,
            sex:req.body.sex
        };
        if(params.nickname && params.password && params.sex){
            user_model.insertUser(params, (rs) => {
                if (rs.result.ok) {
                    util.successHandler(res,{
                        success: true,
                        user_data: {
                            id: rs.ops[0]._id,
                            nickname: rs.ops[0].nickname,
                            age: rs.ops[0].age,
                            sex: rs.ops[0].sex,
                            music_collection: rs.ops[0].music_collection
                        }
                    })
                } else {
                    util.successHandler(res,{
                        success: false
                    })
                }
            })
        }else{
            util.errHandler('parms err');
        }

    },
    login(req,res,next){
        util.setCORS(res);
        let nickname = req.body.nickname;
        let password = req.body.password;
        if(nickname){
            user_model.login(nickname,password,(rs)=>{
                if(rs.length){
                    util.successHandler(res,{
                        success:true,
                        user_data:{
                            id:rs[0]._id,
                            nickname:rs[0].nickname,
                            age:rs[0].age,
                            sex:rs[0].sex,
                            music_collection:rs[0].music_collection
                        }
                    });
                }else{
                    util.successHandler(res,{
                        success:false,
                        user_data:{},
                        err:'用户名不存在'
                    })
                }
            })
        }else{
            res.send(util.errHandler('nickname can not be null'));
        }
    },
    collectMusic(req,res,next){
        util.setCORS(res);
        let songInfo = {
          name:req.body.name,
          artist:req.body.artist,
          url:req.body.url,
          cover:req.body.cover,
          lrc:req.body.lrc,
          songId:req.body.songId
        };
        console.log(songInfo);
        let id = req.body.id;
        if(songInfo){
            user_model.collectMusic(songInfo,id,(rs,music_collection)=>{
                if(rs.result.ok){
                    util.successHandler(res,{
                        success:true,
                        music_collection:music_collection
                    })
                }else{
                    util.successHandler(res,{
                        success:false
                    })
                }
            })
        }else{
            res.send(util.errHandler('params err'));
        }
    },
    getMyMusic(req,res,next){
        util.setCORS(res);
        let id = req.query.id;
        if(id){
          user_model.getMyMusic(id,(myList)=>{
            util.successHandler(res,myList);
          });
        }else{
          res.send(util.errHandler('参数名不能为空'));
        }
    },
    updateUserInfo(req,res,next){
        util.setCORS(res);
        let userInfo = {};
        let id = req.body.id;
        if(!id){
            res.send(util.errHandler('params err'));
            return false;
        }
        if(req.body.nickname){
            userInfo.nickname = req.body.nickname;
        }
        if(req.body.age){
            userInfo.age = req.body.age;
        }
        if(req.body.sex){
            userInfo.sex = req.body.sex;
        }
        if(Object.keys(userInfo).length === 0){
            res.send(util.errHandler('修改的信息值不能全为空'));
            return false;
        }
        user_model.updateUserInfo(id,userInfo,(rs)=>{
            if(!rs){
                res.send(util.errHandler('服务器错误！'));
                return false;
            }
            if(rs.result.ok){
                res.send(util.successHandler(res,{
                    result:'修改用户信息成功'
                }))
            }else{
                res.send(util.errHandler('服务器错误！'));
            }
        });
    }
}
module.exports = user;
