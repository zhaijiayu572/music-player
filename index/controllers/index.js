let host = 'http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&';
let request = require('request');
let util = require('../util');
let returnObj = {          //返回对象模板
    status_code:'',
    result:{}
};
let index = {
    initIndex(req,res,next){
        util.setCORS(res);
        let type = req.body.type;
        let size = req.body.size;
        let offset = req.body.offset;
        let methods = 'method=baidu.ting.billboard.billList&type=' + type + '&size=' + size + '&offset='+offset;
        let url = host+methods;
        console.log(url);
        if(type && size && offset){
            request.get(url, (err, response, body) => {
                if (err) {
                    res.send(util.errHandler(err, returnObj));
                }
                let data = JSON.parse(body);
                let returnDataList = [];
                data.song_list.forEach(element => {
                    let dataItem = {
                        music_title: element.title,   //歌曲标题
                        language: element.language,   //歌曲语言
                        author: element.author,      //歌手名称
                        song_id: parseInt(element.song_id),     //歌曲ID
                        pic_link: element.pic_big,    //歌曲封面
                        album_title: element.album_title    //专辑名称
                    }
                    returnDataList.push(dataItem);
                });
                returnObj.status_code = '2000';
                returnObj.result = returnDataList;
                res.send(JSON.stringify(returnDataList));
            })
        }else{
            res.send(util.errHandler('params is fail'));
        }
       
    },
    getMusic(req,res,next){
        util.setCORS(res);
        let songId = req.body.song_id;
        let methods = "method=baidu.ting.song.play&songid="+songId;
        request(host+methods,(err,response,body)=>{
            if (err) {
                res.send(util.errHandler(err, returnObj));
            }
            let data = JSON.parse(body);
            console.log(data);
            if(data.songinfo){
                let obj = {
                    music_title:data.songinfo.title,      //歌曲名称
                    author:data.songinfo.author,          //歌手名称
                    album_title:data.songinfo.album_title,    //专辑名称
                    pic_link:data.songinfo.pic_big,        //歌曲图片
                    lrc_link:data.songinfo.lrclink,        // 歌词链接
                    file_link:data.bitrate.file_link,      // 音乐链接
                    author_id:data.songinfo.ting_uid      //歌手ID
                }
                returnObj.result = obj;
                returnObj.status_code = '2000';
                res.send(returnObj);
            }else{
                console.log(body);
                returnObj.status_code = '4001';
                returnObj.result = data;
                res.send(returnObj);
            }
        })
    },
    searchMusic(req,res,next){
        util.setCORS(res);
        let keyword = encodeURIComponent(req.body.keyword);
        let methods = 'method=baidu.ting.search.catalogSug&query='+keyword;
        console.log(methods);
        request(host+methods,(err,response,data)=>{
            data = JSON.parse(data);
            if (err) {
                res.send(util.errHandler(err, returnObj));
            }
            console.log(data);
            if(data.song){
                returnObj.status_code = '2000';
                let songList = [];
                data.song.forEach(el=>{
                    let obj = {
                        music_title:el.songname,  //歌曲名称
                        author:el.artistname,     //歌手名称
                        song_id:el.songid        //歌曲ID
                    }
                    songList.push(obj);
                })
                returnObj.result = songList;
                res.send(returnObj);
            }else{
                console.log(data,'request interface error');
                returnObj.status_code = '4001';
                returnObj.result = data;
                res.send(returnObj);
            }
        })
    },
    getAuthor(req,res,next){
        util.setCORS(res);
        let author_id = req.body.author_id;
        let methods = 'method=baidu.ting.artist.getinfo&format=json&tinguid='+author_id;
        request(host+methods,(err,response,data)=>{
            if(err){
                res.send(util.errHandler(err,returnObj));
            }
            data = JSON.parse(data);
            console.log(data);
            if(data.ting_uid){
                let obj = {
                    author_id:data.ting_uid,       //ting id
                    albums_num:data.albums_total,    // 总专辑
                    country:data.country,           //歌手所在城市
                    songs_num:data.songs_total,      //歌曲数量
                    author:data.name,               //歌手姓名
                    author_avatar: data.avatar_big     //歌手头像
                }
                returnObj.result = obj;
                returnObj.status_code = '2000';
                res.send(returnObj);
            }else{
                returnObj.status_code = '4001';
                returnObj.result = {
                    err:'未知歌手ting id'
                }
                res.send(returnObj);
            }
        })
    },
    getAuthorSongList(req,res,next){
        util.setCORS(res);
        let author_id = req.body.author_id;
        let num = parseInt(req.body.num);
        if(!num){
            if(num == 0){
                returnObj.status_code = '2000';
                returnObj.result = [];
                res.send(returnObj);
            }else{
                res.send(util.errHandler('num’s value is not permitted', returnObj))
            }
        }
        let methods = 'method=baidu.ting.artist.getSongList&tinguid='+ author_id +'&limits='+ num +'&use_cluster=1&order=2';
        request(host+methods,(err,response,data)=>{
            if(err){
                res.send(util.errHandler(err,returnObj));
            }
            data = JSON.parse(data);
            console.log(data);
            if(data.songlist){
                let song_list = [];
                data.songlist.forEach(el=>{
                    let obj = {
                        music_title:el.title,   //歌曲名称
                        song_id:el.song_id       //歌曲ID
                    }
                    song_list.push(obj);
                });
                returnObj.status_code = '2000';
                returnObj.result = song_list;
                res.send(returnObj);
            }else{
                returnObj.status_code = '4001';
                returnObj.result.err = 'author id 不正确';
                res.send(returnObj);
            }
            res.send(data);

        })
    }
}
module.exports = index;
