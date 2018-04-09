# 音乐接口
## 获取列表
> ###url: /player/index <br>

#### 请求参数
1. type   (number)
  * 1：新歌榜
  * 2：热歌榜
  * 11：摇滚榜
  * 12：爵士
  * 16：流行
  * 21：欧美金曲
  * 22：经典老歌
  * 23：情歌对唱
  * 24：影视金曲
  * 25：网络歌曲
2. size 歌曲的数量 (number)
3. offset 偏移值  (number)
  
#### 返回结果 
 
```
{
	status_code:'',   string //succes 2000,fail 4003
	result:[{
		music_title:'',    //歌曲名称  string
		language:'',      //歌曲语言  string
		author:'',        //歌手名称 string
		song_id:564102115,      // 歌曲ID  number
		pic_link:'',      //歌曲封面图片 string
		album_title:''      //歌曲专辑名称 string
	}]	
}

```
## 获取音乐信息
> ### url: /player/get_music

### 请求参数
#### &nbsp;&nbsp;&nbsp;&nbsp;1. song_id (number)   歌曲的id
### 返回结果
```
{
	status_code:'', string //success 2000,fail 4003,4001
	result:{
		music_title:data.songinfo.title,      //歌曲名称                 
		author:data.songinfo.author,          //歌手名称          
		album_title:data.songinfo.album_title,    //专辑名称
    	pic_link:data.songinfo.pic_big,        //歌曲图片
      	lrc_link:data.songinfo.lrclink,        // 歌词链接
      	file_link:data.bitrate.file_link,      // 音乐链接
      	author_id:data.songinfo.ting_uid      //歌手ID
	}
}
``` 
## 搜索音乐
> ### url: /player/search_music

###请求参数
#### keyword：' ' (string) 查询关键字
### 返回结果
```
{
	status_code:'', string //success 2000,fail 4003,4001
	result:[{
		music_title:el.songname,  //歌曲名称
      	author:el.artistname,     //歌手名称
      	song_id:el.songid        //歌曲ID
	}]
}
```
## 获取歌手信息
> ### url: /player/get_author

### 请求参数
#### author_id (number)
### 返回结果
```
{
	status_code:'', string //success 2000,fail 4003,4001
	result:{
		author_id:data.ting_uid,       //歌手id
      	albums_num:data.albums_total,    // 总专辑
   		country:data.country,           //歌手所在城市
    	songs_num:data.songs_total,      //歌曲数量
    	author:data.name,               //歌手姓名
    	author_avatar: data.avatar_big     //歌手头像
	}	
}
```
## 获取歌手歌曲列表
> ### url: /player/get_author_songs

### 请求参数
#### author_id (number) 歌手ID
#### num (number)   歌曲数量
### 返回结果
```
{
	status_code:'', string //success 2000,fail 4003,4001
	result:[
		{
			music_title:el.title,   //歌曲名称
         	song_id:el.song_id       //歌曲ID
		}
	]
}
```
# 用户接口
## 查询是否重名
> ### url: /player/check_nickname

### 请求参数
#### nickname (string) 用户输入用户名
### 返回结果
```
{
	status_code:'', string  //success 2000,fail 4003
	result:{
		is_exit:true   boolean 
	}
}
```
## 注册用户
> ### url: /player/insert_user

### 请求参数
#### nickname (string) 用户名
#### age (int) 年龄
#### sex (strng) 性别
### 返回结果
```
{
	status_code:'',string  //success 2000,fail 4003
	result:{
		success:true    boolean
		user_data: {
				id: '', 
				nickname: '',
				age: '',
				sex: '',
				music_collection: []
		}
	}
}
```
## 登录
> ### url: /player/login

### 请求参数
#### nickname(string)用户名
```
{
	status_code:'',string  //success 2000,fail 4003
	result:{
		success:true    boolean
	}
}
```
## 更新用户信息
> ### url: /player/update_info
```
{
	status_code:'', string //success 2000,fail 4003
	result:{
		result:'', //成功信息
		err:'',  //错误信息
	}
}
```1