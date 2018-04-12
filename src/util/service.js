import xhr from './xhr'
const service = {
  host:'http://localhost:3001/player',
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
  }
};
export default service;
