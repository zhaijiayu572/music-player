<template>
  <div class="head">
    <span class="back-btn" @click="goBack"><i class="el-icon-arrow-left"></i></span>
    <span class="home-btn" @click="backHome"><i class="fas fa-home"></i></span>
    <h3 class="rank-title">{{ title }}</h3>
  </div>
</template>
<script>
  export default {
    props:{
      title:{
        type:String,
        default:''
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
      backHome(){
        this.$router.push({path:'/'});
      },
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
</style>
