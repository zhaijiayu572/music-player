<template>
  <div class="container">
    <div id="player"></div>
    <ul class="extra-panel" :style="panelStyle">
      <li @click="collect">
        <i class="fas fa-heart" v-show="collected"></i>
        <i class="far fa-heart" v-show="!collected"></i>
      </li>
      <li @click="comment"><i class="far fa-comment"></i></li>
    </ul>
  </div>
</template>
<script>
  import $ from 'jquery'
  import Player from 'vue-aplayer'
  import service from '../util/service'
  import Aplayer from 'aplayer';
  export default {
    components:{
      Player:Player
    },
    mounted(){
      const ap = new Aplayer({
        container:document.getElementById('player'),
        autoplay: false,
        theme: '#FADFA3',
        loop: 'all',
        order: 'random',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: false,
        listMaxHeight: '90px',
        lrcType: 3,
        audio:[]
      });
      this.ap = ap;
      this.ap.on('listhide',()=>{
        this.panelStyle = {
          bottom:'1.2rem'
        }
      });
      this.ap.on('listshow',()=>{
        let length = this.$store.state.playList.length;
        if(length === 1){
          this.panelStyle = {
            bottom:'1.2rem'
          }
        }else if(length === 2){
          console.log('aa');
          this.panelStyle = {
            bottom:"4.4rem",
          }
        }else{
          this.panelStyle = {
            bottom:'5.8rem'
          }
        }
      });
      this.ap.on('listadd',()=>{
        let length = this.$store.state.playList.length;
        if(length === 1){
          this.panelStyle = {
            bottom:'1.2rem'
          }
        }else if(length === 2){
          console.log('aa');
          this.panelStyle = {
            bottom:"4.4rem",
          }
        }else{
          this.panelStyle = {
            bottom:'5.8rem'
          }
        }
      });
      this.ap.on('listswitch',(data)=>{
        this.$store.state.playNow = this.$store.state.playList[data.index];
        if(this.$store.state.isLogin){
          let myCollection = this.$store.state.userInfo.music_collection;
          this.collected = false;
          for(let i=0;i<myCollection.length;i++){
            if(this.$store.state.playList[data.index] == myCollection[i]){
              this.collected = true
            }
          }
        }
        console.log(this.collected);
      });
      this.$store.state.ap = ap;
    },
    data(){
      return {
        ap:null,
        panelStyle:{
          bottom:'1.2rem'
        },
        collected:false,
      }
    },
    methods:{
      collect(){
        if(!this.$store.state.isLogin){
          // 跳转登录时让音乐暂停
          this.$store.state.ap.pause();
          this.$router.push('login');
          return false;
        }
        if(this.collected){
          return false;
        }
        let songId = this.$store.state.playNow;
        let reqObj = {
          songId,
          id:this.$store.state.userInfo.id,
        };
        service.collectMusic(reqObj)
          .then((data)=>{
            data = JSON.parse(data);
            if(data.result.success){
              this.$store.state.userInfo.music_collection = data.result.music_collection;
              this.collected = true;
            }else{
              this.$message('收藏音乐失败！');
              return false;
            }
          })
      },
      comment(){
        this.$router.push({path:'comment',query:{songId:this.$store.state.playNow}});
      }
    }
  }
</script>
<style scoped>
  /*.container{*/
     /*position: absolute;*/
    /*!*height: 5rem;*!*/
    /*width: 100%;*/
  /*}*/
  .extra-panel{
    position: fixed;
    /*bottom: 1.2rem;*/
    right: 0.2rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .extra-panel li{
    font-size: 0.5rem;
    color: #999;
    padding-bottom: 0.2rem;
  }
</style>
