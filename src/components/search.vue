<template>
  <div class="container">
    <!--<div class="head">-->
      <!--<span class="back-btn" @click="goBack"><i class="el-icon-arrow-left"></i></span>-->
      <!--<span class="home-btn" @click="backHome"><i class="fas fa-home"></i></span>-->
      <!--<h3 class="rank-title">搜索结果</h3>-->
    <!--</div>-->
    <ComHead title="搜索结果"></ComHead>
    <div class="white-content" v-show="isNull">
      <el-row>
        <el-col :span="12" :offset="6">
          <img src="../assets/search-fail.jpg" alt="" class="fail-pic">
        </el-col>
      </el-row>
      <el-row class="tips">
        没有找到相关搜索/(ㄒoㄒ)/~~
      </el-row>
    </div>
    <ul class="song-list" v-show="!isNull">
      <li class="song-item" v-for="(x,index) in songList">
        <el-row>
          <el-col :span="2" class="song-num">{{ index+1 }}</el-col>
          <el-col :span="20">
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
  import service from '../util/service';
  import ComHead from './common-head'
  export default {
    components:{
      ComHead
    },
    mounted(){
      let keyword = this.$route.query.keyword;
      if(!keyword){
        this.$router.push({path:'/'});
      }
      this.keyword = keyword;
      this.initSearchResult();
    },
    data(){
      return {
        songList:[],
        keyword:'',
        isNull:false,
      }
    },
    methods:{
      initSearchResult(){
        let data = {
          keyword:this.keyword
        };
        service.searchSong(data)
          .then((data)=>{
            data = JSON.parse(data);
            if(data.status_code === '4001' || data.status_code === '4003'){
              this.isNull = true;
              return false;
            }
            this.songList = data.result;
            if(this.songList.length === 0){
              this.isNull = true;
            }
          },(err)=>{
            if(err){
              this.$message('服务器异常');
              this.isNull = true;
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
            this.$store.state.ap.list.add(songInfo);
            this.$store.state.ap.list.switch(this.$store.state.playList.length);
            this.$store.state.ap.play();
            this.$store.state.playList.push(musicId);
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
  .white-content{
    padding-top: 2rem;
  }
  .white-content .fail-pic{
    width: 100%;
  }
  .white-content .tips{
    padding-top: 1rem;
    text-align: center;
    color: #606266;
  }
</style>
