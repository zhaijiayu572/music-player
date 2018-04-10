<template>
  <div class="head">
    <el-row class="container">
      <el-col :span="16" class="search-container">
        <div >
          <input
            class="search-input"
            placeholder="请输入搜索内容"
            @keyup.enter="search"
            v-model="keyword"
          >
        </div>
        <i class="el-icon-search search-btn"></i>
      </el-col>
      <el-col :span="8" class="user">
        <div>
          <el-dropdown v-if="isLogin" class="dropDown" :hide-on-click="false" trigger="click">
            <span class="el-dropdown-link">
              <span class="nickname">{{ nickname }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><div @click="logout">登出</div></el-dropdown-item>
              <el-dropdown-item><div>个人中心</div></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button v-else="" @click="login" class="login-btn" size="mini">登录</el-button>
        </div>
      </el-col>

    </el-row>

  </div>
</template>
<script>
export default {
  data(){
    return {
      nickname:'',
      keyword:'',
    }
  },
  mounted(){
    this.nickname = this.$store.state.userInfo.nickname ? this.$store.state.userInfo.nickname : '';
  },
  methods:{
    login(){
      const returnUrl = encodeURIComponent(this.$route.path);
      this.$router.push({ path: '/login', query: { returnUrl: returnUrl }})
    },
    logout(){
      alert('aa');
      this.$store.state.isLogin = false;
      this.$store.state.userInfo = {};
    },
    search(){
      if(this.keyword !== ''){
        this.$router.push({path:'/search',query:{keyword:this.keyword}});
      }else{
        return false;
      }
    }
  },
  computed:{
    isLogin(){
      return this.$store.state.isLogin;
    }
  }
}
</script>
<style scoped>
  .head{
    height: 40px;
    background: #409EFF;
    padding: 5px 10px;
  }
  .search-container,.user{
    position: relative;
    height: 40px;
  }
  .search-container .search-input{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    height: 1rem;
    border-radius: 5px;
    outline: none;
    border: none;
    padding: 0.2rem 0.5rem;
    width: 100%;
  }
  .search-container .search-btn{
    top:50%;
    transform: translate(0.5rem,-50%);
    right: 0;
    font-size: 0.8rem;
    position: absolute;
    color: #666;
  }
  .user .login-btn{
    right: 0;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
  }
  .user>div{
    float: right;
  }
  .user .nickname{
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user .dropDown{
    height: 100%;
    line-height: 40px;
    color:#fff;
  }
  .user .dropDown i{
    font-weight: bolder;
  }
</style>

