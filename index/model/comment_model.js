let ObjectId = require('mongodb').ObjectId;
let MongoClient = require('mongodb').MongoClient;
let DB_Connect = 'mongodb://localhost:27017/player';
function connect(callback) {
    MongoClient.connect(DB_Connect, (err, db) => {
        if (err) {
            console.log(err);
        } else {
            callback(db);
        }

    });
}
exports.addComment = (commentItem,callback) => {
    connect((db)=>{
        let comment = db.collection('comment');
        comment.insert(commentItem,(err,result)=>{
            callback(result,err);
        })
    })
}