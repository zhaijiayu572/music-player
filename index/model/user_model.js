let ObjectId = require('mongodb').ObjectId;
let MongoClient = require('mongodb').MongoClient;
let DB_Connect = 'mongodb://localhost:27017/player';
function connect(callback){
    MongoClient.connect(DB_Connect, (err, db) => {
        if (err) {
            console.log(err);
        }else{
            callback(db);
        }

    });
}

exports.checkNickname = (nickname,callback)=>{
    connect((db)=>{
        let user = db.collection('user');
        user.find({ "nickname": nickname }).toArray((err, result) => {
            console.log(result);
            callback(result);
            db.close();
        })
    })
}
exports.insertUser = (params,callback)=>{
    connect((db)=>{
        let user = db.collection('user');
        user.insert({
            "nickname":params.nickname,
            "age":params.age,
            "sex":params.sex,
            "music_collection":[]
        },(err,result)=>{
            console.log(result);
            callback(result);
            db.close();
        })
    })
}
exports.login = (nickname,callback)=>{
    connect(db=>{
        db.collection('user').find({"nickname":nickname})
            .toArray((err,rs)=>{
                if(err){
                    console.log(err);
                }
                callback(rs);
            })
    })
};
exports.collectMusic = (musicId,id,callback)=>{
    connect(db=>{
        id = ObjectId(id);
        let user = db.collection('user');
        user.find({_id:id}).toArray((err,rs)=>{
            let music_collections = [];
            if(rs[0].music_collection){
               music_collections = rs[0].music_collection;
            }
            music_collections.push(musicId);
            user.update({_id:id},{$set:{"music_collection":music_collections}},(err,update_result)=>{
                callback(update_result,music_collections);
                db.close();
            })
        })
    })
};
exports.getMyMusic = (id,callback)=>{
  connect(db=>{
    id = ObjectId(id);
    let user = db.collection('user');
    user.find({_id:id}).toArray((err,rs)=>{
      let music_collections = [];
      if(rs[0].music_collection){
        music_collections = rs[0].music_collection;
      }
      callback(music_collections);
      db.close();
    })
  })
};
/**
 * 更新用户信息
 * @param {ObjectId} id 用户的ID
 * @param {Object} userInfo 用户变更的信息对象
 * @param {funtion} callback 回调函数
 */
exports.updateUserInfo = (id,userInfo,callback)=>{
    connect((db)=>{
        id = ObjectId(id);
        let user = db.collection('user');
        user.update({_id:id},{$set:userInfo},(err,update_result)=>{
            callback(update_result);
            if(err){
                console.log(err);
            }
            db.close();
        })
    })
}
// 测试数据无用
exports.test = ()=>{
    connect(db=>{
        let id = ObjectId('5a0d084534cd2a05dd120e2a');
        console.log(id);
        db.collection('user').find({
            _id:id
        }).toArray((err,rs)=>{
            console.log(rs);
            db.close();
        })

    })
}
