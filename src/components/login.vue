<template>
    <div class="container">
        <div class="login-container">
            <div class="login-body">
                <el-input
                    placeholder="请输入用户名"
                    size='medium'
                    v-model="username">
                </el-input>
            </div>
            <div class="login-foot">
                <button class="login-btn btn" @click="login">登录</button>
                <button
                    class="reset-btn btn"
                    @click="reset">重置</button>

            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios'
import myLib from '../util/myLib'
import service from '../util/service'
export default {
    data(){
        return {
            username:'',
            password:'',
            returnUrl:''
        }
    },
    mounted(){
        let returnUrl = this.$route.query.returnUrl;
        this.returnUrl = returnUrl ? decodeURIComponent(returnUrl) : '';
        console.log(this.returnUrl);
        if(this.$store.state.isLogin){
            let url = this.returnUrl ? this.returnUrl : '/';
            this.$router.push({path:url});
        }
    },
    methods:{
        reset(){
            this.username = '';
        },
        checkUserName(){
            if(this.username === ''){
                this.$message('输入内容不能为空');
                return false;
            }
            if(this.username.match(/^<script>|<\/script>$/g)){
                this.$message('输入的内容不合法');
                return false;
            }
            return true;
        },
        login(){
            if(!this.checkUserName()){
                return false;
            }
            let nickname = this.username;
            service.login({nickname}).then((data)=>{
                // console.log(JSON.parse(data));
                data = JSON.parse(data);
                if(data.result.success){
                    // let url = this.returnUrl ? this.returnUrl : '/';
                    this.$store.state.userInfo = data.result.user_data;
                    this.$store.state.isLogin = true;
                    // 登录完成后如果之前正在播放音乐则从头开始
                    if(this.$store.state.playNow >= 0){
                      console.log(this.$store.state.userInfo.music_collection);
                      this.$store.state.ap.list.switch(0);
                    }
                    this.$router.go(-1);
                }else{
                    this.$message(data.result.err);
                    this.username = '';
                }
            },(err)=>{
                console.log(err);
                this.$message("服务器错误！");
            })
        },
        getUrlParam(param){
            const reg = new RegExp(`(^|&)${param}=([^&]*)(&|$)`, 'i');
            const r = window.location.search.substr(1).match(reg);
            return r ? decodeURIComponent(r[2]) : null;
        }
    }
}
</script>
<style scoped>
    .container{
        height: 100%;
        width: 100%;
        background: none;
    }
    .login-body{
        padding: 0.5rem;
    }
    .login-foot{
        width: 100%;
        margin-top: 0.5rem;
    }
    .login-foot .btn{
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
    .login-foot .reset-btn{
        margin-top: 0.3rem;
        background: #F56C6C;
    }
    .login-foot .login-btn{
        background: #67C23A;
    }
</style>

