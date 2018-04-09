<template>
  <div class="container">
    <div class="head">
      <span class="back-btn" @click="goBack"><i class="el-icon-arrow-left"></i></span>
      <span class="home-btn" @click="backHome"><i class="fas fa-home"></i></span>
    </div>
    <div class="title">音乐播放器</div>
    <div class="login-box">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="登录" name='login'>
            <Login/>
        </el-tab-pane>
        <el-tab-pane label="注册" name='register'><Register/></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Login from './login.vue'
import Register from './register.vue'
export default {
  components:{
      Login,
      Register
  },
  data(){
      return {
        activeName:'login'
      }
  },
  methods:{
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
    background: none;
  }
  .head i{
    font-size: 1.25rem;
    color: #fff;
    line-height: 2.5rem;
  }
  .head .home-btn{
    float: right;
  }
  .container{
      overflow: hidden;
      height: 100%;
      width: 100%;
      background: #409EFF;
  }
  .title{
    text-align: center;
    font-size: 2rem;
    margin-top: 1rem;
    color: #fff;
  }
  .login-box{
      width: 80%;
      margin: 0 auto;
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform:translate(-50%,-50%);
  }
</style>


