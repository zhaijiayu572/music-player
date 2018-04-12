<template>
  <div class="container">
    <div id="player"></div>
    <ul class="extra-panel" :style="panelStyle">
      <li @click="collect"><i class="far fa-heart"></i></li>
      <li><i class="far fa-comment"></i></li>
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
      });
      this.$store.state.ap = ap;
    },
    data(){
      return {
        ap:null,
        panelStyle:{
          bottom:'1.2rem'
        }
      }
    },
    methods:{
      collect(){
        service.getSong({song_id:this.$store.state.playNow})
          .then((data)=>{
            data = JSON.parse(data);
            console.log(data);
          })
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
