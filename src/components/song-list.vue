<template>
  <div class="container">
    <ComHead :title="rankTitle"></ComHead>
    <ul class="song-list">
      <li class="song-item" v-for="(x,index) in songList">
        <el-row>
          <el-col :span="2" class="song-num">{{ index+1 }}</el-col>
          <el-col :span="6" class="song-pic">
            <img :src="x.pic_link" alt="" class="src">
          </el-col>
          <el-col :span="14">
            <el-row class="song-name">
              {{ x.music_title }}
            </el-row>
            <el-row class="song-author">
              {{ x.author }}
            </el-row>
          </el-col>
          <el-col :span="2" class="play-btn">
            <i class="far fa-play-circle" @click="play(x.song_id)"></i>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>
<script>
  import service from '../util/service'
  import ComHead from './common-head'
  export default {
    components:{
      ComHead
    },
    mounted(){
      let type = this.$route.query.type;
      let title = this.$route.query.keyword;
      if(!type){
        this.$router.push({path:'/'});
      }else{
        this.type = type;
        this.rankTitle = title;
      }
      this.initList();
    },
    data(){
      return {
        songList:[],
        type:1,
        rankTitle:'',
      }
    },
    methods:{
      initList(){
        let data = {
          type:this.type,
          size:50,
          offset:0
        };
        service.getSongList(data)
          .then((data)=>{
            data = JSON.parse(data);
            this.songList = data;
          },(err)=>{
            if(err){
              this.$message('服务器错误');
            }
          })
      },
      play(musicId){
        if(this.$store.state.playList.indexOf(musicId) !== -1){
          return false;
        }
        let data = {
          song_id:musicId
        };
        service.getSong(data)
          .then((data)=>{
            data = JSON.parse(data);
            let songInfo = {
              name:data.result.music_title,
              artist:data.result.author,
              url:data.result.file_link,
              cover:data.result.pic_link,
              lrc:data.result.lrc_link
            };
            this.$store.state.playList.push(musicId);
            this.$store.state.playNow = musicId;
            this.$store.state.ap.list.add(songInfo);
            this.$store.state.ap.list.switch(this.$store.state.playList.length-1);
            this.$store.state.ap.play();
          })
      }
    }
  }
</script>
<style scoped>
  .container{
    padding-bottom: 5rem;
  }
  .song-list{
    padding: 0 0.5rem;
  }
  .song-list{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .song-item{
    height: 2.5rem;
    border-bottom: 1px solid #ddd;
    padding: 0.5rem 1rem;
  }
  .song-num{
    height: 100%;
    line-height: 2.5rem;
    font-style: italic;
  }
  .song-pic,.song-pic img{
    height: 2.5rem;
  }
  .song-pic{
    padding-left: 0.5rem;
  }
  .song-name{
    color: #606266;
    font-size: 0.95rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .song-author{
    color: #909399;
    font-size: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .play-btn{
    font-size: 1.5rem;
    color: #606266;
    line-height: 2.5rem;
  }
</style>
