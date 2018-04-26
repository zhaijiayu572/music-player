<template>
  <div class="register-page">
    <ul class="register-body">
      <li>
        <el-input
          type="text"
          placeholder="请输入用户名"
          v-model="nickname"
          @blur="checkNickname"
        />
         <el-alert
          :title="alertMsg"
          type="error"
          show-icon
          v-show="isExit"
          :closable="false"
          >
        </el-alert>
      </li>
      <li>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="password"
        />
      </li>
      <li>
        <el-select v-model="sex" placeholder="请选择性别">
          <el-option value="man" label="男"></el-option>
          <el-option value="woman" label="女"></el-option></el-option>
        </el-select>
      </li>
    </ul>
    <div class="register-footer">
      <button class="login-btn btn" @click="register">注册</button>
      <button class="reset-btn btn" @click="reset">重置</button>
    </div>
  </div>
</template>
<script>
import service from '../util/service'
export default {
  data(){
    return {
      nickname:'',
      sex:'',
      password:'',
      isExit:false,
      alertMsg:''
    }
  },
  mounted(){
    let returnUrl = this.$route.query.returnUrl;
    this.returnUrl = returnUrl ? decodeURIComponent(returnUrl) : '';
    if(this.$store.state.isLogin){
        let url = this.returnUrl ? this.returnUrl : '/';
        this.$router.push({path:url});
    }
  },
  methods:{
    reset(){
      this.nickname = '';
      this.sex = '';
      this.password = '';
    },
    checkNickname(){
      if(this.nickname === ''){
        return false;
      }
      service.checkNickname({nickname:this.nickname})
          .then((data) => {
            data = JSON.parse(data);
            if(data.status_code === '2000'){
              this.isExit = data.result.is_exit;
              if(this.isExit){
                this.alertMsg = '用户名已存在';
              }
            }else{
              this.isExit = true;
              this.$message(data.result.err);
            }
          },(err) => {
            console.log(err);
            this.alertMsg = '服务器错误!';
            this.isExit = true;
          })
    },
    checkUserInfo(){
      if(this.nickname && this.sex && this.password){
        if(this.nickname.match(/^<script>|<\/script>$|[&,#]/g)){
          this.$message("输入的内容不合法");
          return false;
        }else{
          return true;
        }
      }else{
        this.$message("输入内容不能为空");
        return false;
      }
    },
    register(){
      if(!this.checkUserInfo() || this.isExit){
        return false;
      }
      service.register({
        nickname:this.nickname,
        password:this.password,
        sex:this.sex
      }).then((data) => {
        data = JSON.parse(data);
        if(data.status_code === '2000'){
          if(data.result.success){
            this.$store.state.userInfo = data.result.user_data;
            this.$store.state.isLogin = true;
            this.$message('注册成功！');
            // 登录完成后如果之前正在播放音乐则从头开始
            if(this.$store.state.playNow >= 0){
              console.log(this.$store.state.userInfo.music_collection);
              this.$store.state.ap.list.switch(0);
            }
            this.$router.go(-1);
          }else{
            this.$message('注册失败！');
          }
        }else{
          this.$message(data.result.err);
        }
      },(err) => {
        this.$message('服务器错误');
        console.log(err);
      })
    }
  }
}
</script>
<style>
  .register-body{
    margin: 0;
    padding: 0;
  }
  .register-body li{
    list-style: none;
    margin: 10px 0;
  }
  .register-footer .btn{
      height: 1.5rem;
      width: 80%;
      border-radius: 0.5rem;
      color:#fff;
      font-size: 0.7rem;
      font-weight: bolder;
      font-family: 'PingFang SC';
      outline: none;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
  }
  .register-footer .reset-btn{
    margin-top: 0.3rem;
    background: #F56C6C;
  }
  .register-footer .login-btn{
    background: #67C23A;
  }
</style>

