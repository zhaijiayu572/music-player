<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import Index from './components/index'
export default {
  name: 'app',
  components:{
    Index
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
</style>
