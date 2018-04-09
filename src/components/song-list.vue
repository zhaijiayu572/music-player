<template>
  <div class="container">
    <div class="head">
      <span class="back-btn" @click="goBack"><i class="el-icon-arrow-left"></i></span>
      <span class="home-btn" @click="backHome"><i class="fas fa-home"></i></span>
      <h3 class="rank-title">{{ rankTitle }}</h3>
    </div>
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
            <i class="far fa-play-circle"></i>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>
<script>
  import service from '../util/service'
  export default {
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
      goBack(){
        this.$router.go(-1);
      },
      backHome(){
        this.$router.push({path:'/'});
      }
    }
  }
</script>
<style scoped>
  .head{
    height: 2.5rem;
    padding: 0 0.5rem;
    background: #409EFF;
  }
  .head i{
    font-size: 1.25rem;
    color: #fff;
    line-height: 2.5rem;
  }
  .head .back-btn{
    float: left;
  }
  .head .home-btn{
    float: right;
  }
  .rank-title{
    margin: 0;
    font-weight: normal;
    font-size: 1rem;
    height: 100%;
    line-height: 2.5rem;
    color: #fff;
    text-align: center;
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
