<template>
  <div class="container">
    <ComHead />
    <ul class="song-list">
      <li class="song-item" v-for="(x,index) in collection">
        <el-row>
          <el-col :span="2" class="song-num">{{ index+1 }}</el-col>
          <el-col :span="6" class="song-pic">
            <img :src="x.cover" alt="" class="src">
          </el-col>
          <el-col :span="14">
            <el-row class="song-name">
              {{ x.name }}
            </el-row>
            <el-row class="song-author">
              {{ x.artist}}
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
  import ComHead from './common-head'
  import service from '../util/service'
  export default {
    mounted(){
      if(this.$store.state.userInfo.music_collection){
        this.collection = this.$store.state.userInfo.music_collection;
      }else{
        this.$router.push({path:'/'});
      }
    },
    components:{
      ComHead
    },
    data(){
      return {
        collection:[]
      }
    },
    methods:{
      play(musicId){
        for(let i=0;i<this.$store.state.playList.length;i++){
          if(this.$store.state.playList[i].songId == musicId){
            return false
          }
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
              lrc:data.result.lrc_link,
              songId:musicId
            };
            this.$store.state.playList.push(songInfo);
            this.$store.state.ap.list.add(songInfo);
            this.$store.state.ap.list.switch(this.$store.state.playList.length-1);
            this.$store.state.ap.play();
            this.$store.state.playNow = songInfo;
          })
      }
    }
  }
</script>
<style scoped>
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
