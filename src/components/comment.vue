<template>
  <div class="container">
    <ComHead></ComHead>
    <h3 class="title">精彩评论</h3>
    <ul class="comment-container" v-show="!isNull">
      <li v-for="x in commentList" style="margin: 0.3rem 0.2rem">
        <el-card class="box-card" :body-style="{ padding: '0.3rem 0.5rem' }">
          <el-row class="username">
            <el-col :span="6">
              {{ x.username }}
            </el-col>
          </el-row>
          <el-row class="comment">
            {{ x.comment ? x.comment : '' }}
          </el-row>
        </el-card>
      </li>
    </ul>
    <div class="white-space">
      <el-row>
        <el-col :span="8" :offset="8">
          <img src="../assets/comment-null.jpg" alt="" class="src">
        </el-col>
      </el-row>
      <el-row>
        现在还没有人评论，快来抢沙发~
      </el-row>
    </div>
    <el-dialog title="撰写评论" :visible.sync="showDialog" width="80%" @close="close">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="comment">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="addComment">确 定</el-button>
      </span>
    </el-dialog>
    <div class="add-comment-btn" @click="openDialog">
      <i class="far fa-edit"></i>
    </div>
  </div>
</template>
<script>
  import ComHead from './common-head'
  import service from '../util/service'
  export default {
    mounted(){
      let songId = this.$route.query.songId;
      if(!songId){
        this.$router.push({path:'/'});
      }
      this.songId = songId;
      this.initComments();
    },
    components:{
      ComHead
    },
    data(){
      return {
        songId:'',
        commentList:[],
        showDialog:false,
        comment:'',
        isNull:true,
      };
    },
    methods:{
      initComments(){
        service.getComments({songId:this.songId})
          .then((data)=>{
            data = JSON.parse(data);
            if(data.result.length === 0){
              this.isNull = true;
            }else{
              this.isNull = false;
            }
            this.commentList = data.result;
          })
      },
      addComment(){
        if(this.comment === '' || this.comment.match(/^<script>|<\/script>$/g)){
          this.$message('输入的内容为空或不合法！');
          return false;
        }
        let reqObj = {
          songId:this.songId,
          username:this.$store.state.userInfo.nickname,
          comment:this.comment
        };
        service.addComment(reqObj)
          .then((data)=>{
            data = JSON.parse(data);
            if(data.result.success){
              this.$message('评论成功!');
              this.showDialog = false;
              this.initComments();
            }else{
              this.$message('服务器出错，请稍后再试！');
            }
          })
      },
      openDialog(){
        if(!this.$store.state.isLogin){
          let returnUrl = encodeURIComponent('comment');
          this.$router.push({path:'login',query:{returnUrl:returnUrl}});
        }else{
          this.showDialog = true;
        }
      },
      dialogCancel(){
        this.showDialog = false;
        this.comment = '';
      },
      close(){
        this.comment = '';
      }
    }
  }
</script>
<style scoped>
  .container{
    padding-bottom: 4.5rem;
  }
  .white-space{
    width: 100%;
    text-align: center;
    padding: 2rem 0;
    color: #909399;
    font-size: 1rem;
  }
  .white-space img{
    width: 100%;
  }
  .title{
    font-size: 1rem;
    color: #303133;
    border-bottom: 1px solid #909399;
    margin: 0 0.5rem 0 0.5rem;
    padding: 0.5rem 0 0.5rem 0.5rem;
    font-weight: normal;
  }
  .add-comment-btn{
    width: 2rem;
    height: 2rem;
    border-radius: 0.4rem;
    background: #ddd;
    text-align: center;
    line-height: 2rem;
    font-size: 0.8rem;
    position: fixed;
    top: 2.7rem;
    right: 0.5rem;
    padding-left: 0.1rem;
    color: #606266;
  }
  .comment-container{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .username{
    padding: 0.5rem 0 0.5rem 0.3rem;
    font-size: 1rem;
    color: #303133;
  }
  .comment{
    padding: 0 0 0.3rem 0.7rem;
    font-size: 0.8rem;
    color: #606266;
  }
</style>
