import xhr from './xhr'
const service = {
  host:'http://192.168.0.102:3001/player',
  login(data){
    return xhr({
      url:this.host+'/login',
      type:'POST',
      data,
    })
  },
  register(data){
    return xhr({
      url:this.host+'/insert_user',
      type:'POST',
      data
    })
  },
  checkNickname(data){
    return xhr({
      url: this.host + '/check_nickname',
      type: 'POST',
      data
    })
  },
  getSongList(data){
    return xhr({
      url: this.host + '/index ',
      type: 'POST',
      data
    })
  },
  /**
   * 获取歌曲信息
   * @param data
   */
  getSong(data){
    return xhr({
      url:this.host+'/get_music',
      type:'POST',
      data
    })
  },
  searchSong(data){
    return xhr({
      url:this.host+'/search_music',
      type:'POST',
      data
    })
  },
  getComments(data){
    return xhr({
      url:this.host+'/get_comments',
      type:'POST',
      data
    })
  },
  addComment(data){
    return xhr({
      url:this.host+'/add_comment',
      type:'POST',
      data
    })
  },
  collectMusic(data){
    return xhr({
      url:this.host+'/collect_music',
      type:'POST',
      data
    })
  },
  getMyMusic(data){
    return xhr({
      url:this.host+'/get_my_music',
      type:'POST',
      data
    })
  }
};
export default service;
