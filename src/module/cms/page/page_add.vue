<template>
  <div>
    <el-form  label-width="80px" :model="pageForm" :rules="pageFormRules" ref="pageForm">
      <el-form-item label="所属站点" prop="siteId" >
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模板" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选择站点">
          <el-option
            v-for="item in templateList"
            :key="item.templateId"
            :label="item.templateName"
            :value="item.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName"></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="pageAliase">
        <el-input v-model="pageForm.pageAliase"></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath"></el-input>
      </el-form-item>
      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath"></el-input>
      </el-form-item>
      <el-form-item label="类型" >
        <el-radio-group v-model="pageForm.pageType">
          <el-radio :label="0">静态</el-radio>
          <el-radio :label="1">动态</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="pageForm.pageCreateTime"
          type="datetime"
          placeholder="创建时间">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button type="primary" @click="addSubmit">提交</el-button>
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
  </div>

</template>

<script>
//编写页面静态部分，即model和vm部分
//导入js
import * as cmsApi from '../api/cms'
export default {
  data() {
    return {
      //站点列表
      siteList:[],
      //模板列表
      templateList:[],
      //新增界面数据
      pageForm:{
        siteId:'',
        templateId:'',
        pageName:'',
        pageAliase:'',
        pageWebPath:'',
        pageParameter:'',
        pagePhysicalPath:'',
        pageType:'',
        pageCreateTime:new Date()
      },
      pageFormRules:{
        siteId:[
          { required: true, message: '请输入站点', trigger: 'blur' }
          ],
        templateId:[
          { required: true, message: '请选择模板', trigger: 'blur' }
        ],
        pageName:[
          { required: true, message: '请输入页面名称', trigger: 'blur' }
        ],
        pageWebPath:[
          { required: true, message: '请输入访问路径', trigger: 'blur' }
        ],
        pagePhysicalPath:[
          { required: true, message: '请输入物理路径', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    addSubmit:function () {
      this.$refs['pageForm'].validate((valid) => {
        if (valid) {
          //表单校验成功，确认信息弹窗
          this.$confirm('确认提交表单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
            // type: 'warning'
          }).then(() => {
            //使用page_add方法请求新增页面接口
            cmsApi.page_add(this.pageForm).then(res=>{
              //解析服务端响应内容
              if (res.success) {
                this.$message({
                  message:"操作成功",
                  type:"success"
                });
                //操作成功后清空表单
                this.$refs['pageForm'].resetFields();
              } else if (res.message){
                //获得返回的错误信息
                this.$message.error(res.message);
              } else {
                this.$message.error("提交失败");
              }
            })
          })

        } else {
          alert('校验失败');
          return false;
        }
      });
    },
    goBack:function () {
      this.$router.push({
        path:'/cms/page/page_list',
        query:{
          page:this.$route.query.page,
          siteId:this.$route.query.siteId
        }
      })
    }

  },
  mounted() {

  },
  created() {
    this.siteList = [
      {
        siteId: "5a751fab6abb5044e0d19ea1",
        siteName: "门户主站"
      },
      {
        siteId: "102",
        siteName: "测试站"
      }
    ],
    this.templateList = [
      {
        templateId: "5a962b52b00ffc514038faf7",
        templateName: "首页"

      },
      {
        templateId: "5a962bf8b00ffc514038fafa",
        templateName: "轮播图"
      }
    ]
  }
}
</script>

<style>
/*编写页面样式，不是必须*/
</style>
