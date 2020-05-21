<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="visible" :title="textMap[dialogStatus]"
             width="600px">
    <el-form ref="dataForm" label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'
             :rules="rules"
             :model="questionData"
             size="mini">
      <el-form-item label="连接标题" prop="linkDesc">
        <el-input v-model="questionData.linkDesc"></el-input>
      </el-form-item>
      <el-form-item label="连接" prop="linkUrl">
        <el-input v-model="questionData.linkUrl"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="questionData.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="visible = false">关闭</el-button>
      <el-button size="mini" type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>


<script>
  import {addLink,update} from '@/api/friLink.js'

  export default {
    name: 'frilinkSysDialogAdd',
    props: {},
    data(){
      return {
        visible: false,
        dialogStatus: '',
        textMap: {
          update: '修改常见问题',
          create: '新建常见问题'
        },
        rules: {
          linkDesc: [{required: true, message: '请填写问题描述', trigger: 'blur'}],
          linkUrl: [{required: true, message: '请填写问题描述', trigger: 'blur'}],
        },
        groupslist: [],
        questionData:{
          linkDesc:'',
          linkUrl :'',
          remark:''
        }
      }
    },
    methods: {
      submit(){
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if(this.questionData.id){
              update({id:this.questionData.id,linkDesc:this.questionData.linkDesc,linkUrl:this.questionData.linkUrl,remark:this.questionData.remark}).then(data => {
                if(data.data.code == 200){
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.visible = false;
                  this.$emit('submit');
                }
              })
            }else{
              addLink({linkDesc:this.questionData.linkDesc,linkUrl:this.questionData.linkUrl,remark:this.questionData.remark}).then(data => {
                if(data.data.code == 200){
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  this.visible = false;
                  this.$emit('submit');
                }
              })
            }
          }
        })

      }
    }
  }
</script>
