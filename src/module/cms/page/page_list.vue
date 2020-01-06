<template>
<!--编写页面静态部分，即view部分-->
  <div>
    <!--查询条件siteId-->
    <el-select v-model="params.siteId" placeholder="请选择站点">
      <el-option
        v-for="item in siteList"
        :key="item.siteId"
        :label="item.siteName"
        :value="item.siteId">
      </el-option>
    </el-select>
    页面别名：<el-input v-model="params.pageAliase" placeholder="请输入内容" style="width: 100px"></el-input>
    <!--查询按钮-->
    <el-button type="primary" size="small" v-on:click="query">查询</el-button>
    <router-link class="mui-tab-item" :to="{
      path:'/cms/page/add',
      query:{
        page:this.params.page,
        siteId:this.params.siteId
      }

    }" >
      <el-button type="primary" size="small">新增页面</el-button>
    </router-link>

    <!--查询结果界面-->
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="100">
      </el-table-column>
      <el-table-column
        prop="pageName"
        label="页面名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="pageAliase"
        label="别名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="pageType"
        label="页面类型"
        width="200">
      </el-table-column>
      <el-table-column
        prop="pageWebPath"
        label="访问路径"
        width="250">
      </el-table-column>
      <el-table-column
        prop="pagePhysicalPath"
        label="物理路径"
        width="250">
      </el-table-column>
      <el-table-column
        prop="pageCreateTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="page"> <!--插槽，获取当前页面-->
          <el-button type="text" size="small" @click="edit(page.row.pageId)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="params.size"
      :total="total"
      :current-page="params.page"
      @current-change="changePage"
      style="float: right"

    >
    </el-pagination>
  </div>
</template>

<script>
//编写页面静态部分，即model和vm部分
//导入js
import * as cmsApi from '../api/cms'
export default {
  data() {
    return {
      siteList: [],
      list: [],
      total:0,
      params:{
        siteId:"",
        pageAliase:"",
        page:1,
        size:10
      }
    }
  },
  methods:{
    //分页查询
    changePage:function (page) {
      // console.log(page)
      this.params.page = page;
      this.query();//调用当前实例的换页方法
    },
    query:function () {
      // alert("查询");
      cmsApi.page_list(this.params.page,this.params.size,this.params)
        .then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
    },
    edit:function (pageId) {
      //打开修改页面
      this.$router.push({
        path:'/cms/page/edit/'+pageId
        // query:{
        //   page:this.params.page,
        //   siteId:this.params.siteId
        // }
      })
    }

  },
  created() {
    //vue对象已创建，但是dom还未渲染
    //取出路由中的参数，赋值给数据对象
    this.params.page = Number.parseInt(this.$route.query.page || 1);
    this.params.siteId = this.$route.query.siteId || '';
  },
  mounted() {
    //当dom元素渲染完成后调用query
    this.query();
    //初始化站点列表
    this.siteList = [
      {
        siteId: "5a751fab6abb5044e0d19ea1",
        siteName: "门户主站"
      },
      {
        siteId: "102",
        siteName: "测试站"
      }
    ]
  }
}
</script>

<style>
/*编写页面样式，不是必须*/
</style>
