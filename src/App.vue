<template>
  <div id="app">
    <router-view></router-view>
    <Player v-show="playerShow"/>
  </div>
</template>

<script>
import axios from 'axios';
import Index from './components/index'
import Player from './components/play'
export default {
  name: 'app',
  mounted(){

  },
  components:{
    Index,
    Player
  },
  computed:{
    playerShow(){
      return this.$store.state.playerShow;
    }
  }
}
</script>

<style>
  body,html{
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
  }
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    height: 100%;
    width: 100%;
  }
  #player{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
