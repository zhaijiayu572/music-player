<template>
  <div id="app">
    <Head></Head>
      <!-- {{ test }} -->
    <div class="container">
      <el-row class="song-rank">
        <el-col :span="24">
          <el-card>
            <el-row>
              <el-col :span="8">
                <img src="../assets/new-song.jpg" alt="" class="src" @click="chooseCatalog(2,'新歌榜')">
              </el-col>
              <el-col :span="16">
                <div class="song-list-container">
                  <ul>
                    <li v-for="(x,index) in new_list">
                      <el-row>
                        <el-col :span="15" class="song-name">
                          {{ (index+1)+'.'+x.music_title }}
                        </el-col>
                        <el-col :span="7" class="author">
                          {{ x.author }}
                        </el-col>
                        <el-col :span="2" class="play-btn">
                          <i class="far fa-play-circle"></i>
                        </el-col>
                      </el-row>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="song-rank">
        <el-col :span="24">
          <el-card>
            <el-row>
              <el-col :span="8">
                <img src="../assets/hot-rank.jpg" alt="" class="src" @click="chooseCatalog(2,'热歌榜')">
              </el-col>
              <el-col :span="16">
                <div class="song-list-container">
                  <ul>
                    <li v-for="(x,index) in hot_list">
                      <el-row>
                        <el-col :span="15" class="song-name">
                          {{ (index+1)+'.'+x.music_title }}
                        </el-col>
                        <el-col :span="7" class="author">
                          {{ x.author }}
                        </el-col>
                        <el-col :span="2" class="play-btn">
                          <i class="far fa-play-circle"></i>
                        </el-col>
                      </el-row>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="catalog-list-container">
        <el-card>
          <h3><i class="fas fa-th-large"></i>&nbsp;歌曲分类</h3>
          <el-row class="catalog-list">
            <el-row>
              <el-col
                :span="6"
                class="catalog-item"
                v-for="x in catalog_list.slice(2,6)"
              >
                <div @click="chooseCatalog(x.type,x.name)">{{ x.name }}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="6"
                class="catalog-item"
                v-for="x in catalog_list.slice(6,10)"
              >
                <div @click="chooseCatalog(x.type,x.name)">{{ x.name }}</div>
              </el-col>
            </el-row>
          </el-row>
        </el-card>
      </el-row>

    </div>

  </div>
</template>
<script>
import Head from './head'
import service from '../util/service'
export default {
  name:'index',
  components:{
      Head
  },
  data(){
    return {
      catalog_list:[                     //歌曲分类的列表
          {
              name:'新歌榜',
              type:1
          },
          {
              name:'热歌榜',
              type:2
          },
          {
              name:'摇滚榜',
              type:11
          },
          {
              name:'爵士',
              type:12
          },
          {
              name:'流行',
              type:16
          },
          {
              name:'欧美金曲',
              type:21
          },
          {
              name:'经典老歌',
              type:22
          },
          {
              name:'情歌对唱',
              type:23
          },
          {
              name:'影视金曲',
              type:24
          },
          {
              name:'网络歌曲',
              type:25 
          }
      ],
      show_list:[],     //显示的歌曲的列表
      new_list:[],
      hot_list:[],
    }
  },
  created(){
    // if(!this.$store.isLogin){
    //     const returnUrl = encodeURIComponent(this.$route.path);
    //     this.$router.push({ path: '/login', query: { returnUrl: returnUrl }})
    // }
  },
  mounted(){
    this.getNewList();
    this.getHotList();
  },
  methods:{
    chooseCatalog(type,keyword){
      this.$router.push({path:'/rank',query:{type,keyword}});
    },
    getHotList(){
      const data = {
        type:2,
        size:5,
        offset:0
      };
      service.getSongList(data)
        .then((data)=>{
          data = JSON.parse(data);
          this.hot_list = data;
          console.log(data);
        })
    },
    getNewList(){
      const data = {
        type:1,
        size:5,
        offset:0
      };
      service.getSongList(data)
        .then((data)=>{
          data = JSON.parse(data);
          this.new_list = data;
          console.log(data);
        })
    },
  }
}
</script>
<style scoped>
  .container{
    padding: 0 0.3rem;
  }
  .song-rank{
    margin: 0.5rem 0;
  }
  .song-rank img{
    height: 5rem;
  }
  .catalog-list-container h3{
    border-bottom: 1px solid #ddd;
    padding: 0;
    margin: 0 0 0.3rem 0;
    color: #303133;
  }
  .catalog-list .catalog-item{
    border: 1px solid #eee;
    text-align: center;
    padding: 0.5rem 0.3rem;
    font-size: 0.7rem;
  }
  .song-list-container ul{
    margin: 0;
    padding: 0 0 0 0.5rem;
    list-style: none;
    font-size: 0.7rem;
  }
  .song-list-container .song-name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 0.3rem;
  }
  .song-list-container .author{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .song-list-container .play-btn{
    font-size: 0.9rem;
    color: #aaa;
    padding-left: 0.3rem;
  }
</style>




