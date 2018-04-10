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
      this.$store.state.ap = ap;
    },
    data(){
      return {
        ap:null
      }
    },
    methods:{

    }
  }
</script>
<style>

</style>
