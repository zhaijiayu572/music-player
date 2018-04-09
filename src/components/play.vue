<template>
  <div id="player"></div>
</template>
<script>
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
        fixed:true,
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
        audio:[{
          name:'aaa',
          artist:'dddd',
          url:'http://zhangmenshiting.qianqian.com/data2/music/001a55e91eebf89f620b8b5e1df71d79/586422344/586422344.mp3?xcode=c1c3cacfa7cecb8b350a5c038dd045b5',
          cover:'http://qukufile2.qianqian.com/data2/pic/201589a4d9e0c6cb21a4a5242e66a590/586420691/586420691.jpg@s_1,w_150,h_150'
        },{
          name:'aaa',
          artist:'dddd',
          url:'http://zhangmenshiting.qianqian.com/data2/music/001a55e91eebf89f620b8b5e1df71d79/586422344/586422344.mp3?xcode=c1c3cacfa7cecb8b350a5c038dd045b5',
          cover:'http://qukufile2.qianqian.com/data2/pic/201589a4d9e0c6cb21a4a5242e66a590/586420691/586420691.jpg@s_1,w_150,h_150'
        }]
      });
      this.musicId = musicId;
      this.initMusic();
    },
    data(){
      return {
        musicId:'',   // 音乐的id
        music:{}
      }
    },
    methods:{

    }
  }
</script>
<style>

</style>
