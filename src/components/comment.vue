<template>
  <div class="container">
    <ComHead></ComHead>
    <ul class="comment-container">
      <li v-for="x in commentList">
        <el-row>
          <el-col :span="6">
            {{ x.username }}
          </el-col>
        </el-row>
        <el-row>
          {{ x.comment ? x.comment : '' }}
        </el-row>
      </li>
    </ul>
    <el-dialog title="撰写评论" :visible.sync="showDialog" width="80%" @close="close">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="comment">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import ComHead from './common-head'
  import service from '../util/service'
  export default {
    mounted(){
      this.initComments();
    },
    components:{
      ComHead
    },
    data(){
      return {
        commentList:[],
        showDialog:true,
        comment:''
      };
    },
    methods:{
      initComments(){
        service.getComments({songId:46545})
          .then((data)=>{
            data = JSON.parse(data);
            this.commentList = data.result;
          })
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
<style>

</style>
