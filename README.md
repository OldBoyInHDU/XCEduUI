# 20191231
## 1. 本日内容

### 1.1 编写page_list.vue页面

* template部分采用[element-ui](https://element.eleme.cn/#/zh-CN)，具体标签应用属性参考官网介绍
  * button
  * table
  * pagination
* js部分

```html
<template>
<!--编写页面静态部分，即view部分-->
  <div>
<!--    测试页面-->
    <el-button type="primary" size="small" v-on:click="query">查询</el-button>
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
import * as cmsApi from '../api/cms'
export default {
  data() {
    return {
      list: [],
      total:0,
      params:{
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
      cmsApi.page_list(this.params.page,this.params.size)
        .then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
    }

  },
  mounted() {
    //当dom元素渲染完成后调用query
    this.query();
  }
}
</script>

<style>
/*编写页面样式，不是必须*/
</style>

```

