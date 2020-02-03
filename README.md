# 20191231
## 1. 本日内容

### 1.1 编写page_list.vue页面

* template部分采用[element-ui](https://element.eleme.cn/#/zh-CN)，具体标签应用属性参考官网介绍
  * button
  * table
  * pagination

# 20200106

## 1. 本日内容

### 1.1 编写page-add.vue页面

* template部分，element-ui标签：
  * form
  * button
  * MessageBox 弹框
  * Message 消息提示

### 1.2 完成编写page_edit.vue页面

## 2 学习总结

### 2.1 cms/router/index.js(路由)

* `src/module/cms/router/index.js`
* 该文件的主要作用
  * 导入页面组件`component`
  * 定义路径`path`
  * 定义组件名`name`
  * 是否隐藏`hidden`
  * 子组件的引入`children`

```javascript
import Home from '@/module/home/page/home.vue';//引入页面
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';
export default [{
    path: '/',
    component: Home,
    name: 'CMS', //菜单名称
    hidden: false, //是否显示左侧菜单，显示false， 不显示为true
    children: [
      {
        path: '/cms/page/page_list',//页面路径
        component: page_list,//相对应的页面组件
        name: '页面列表',//组件名
        hidden: false //不隐藏
      },
      {
        path: '/cms/page/page_add',
        component: page_add,
        name: '新增页面',
        hidden: false
      }
    ]
  }
]
```

* 需要再`base/router/index.js`的路由中合并

```javascript
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
// 定义路由配置
let routes = []
let concat = (router) => {
  routes = routes.concat(router)
}
// // 导入路由规则
import HomeRouter from '@/module/home/router'
import CmsRouter from '@/module/cms/router' //自己的模块
// 合并路由规则
concat(HomeRouter) //加入home模块的路由
concat(CmsRouter) //加入cms模块的路由
export default routes;
```



### 2.2 cms/api/cms.js(请求js)

* `src/module/cms/api/cms.js`
* 该文件的作用是向服务端发送请求

```javascript
import http from './../../../base/api/public' //引入http组件请求
import querystring from 'querystring' //引入json转换工具
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//页面查询
export const page_list = (page, size, params) => {
  //将params对象（json）拼接成key value串
  let queryString = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/cms/page/list/'+page+'/'+size + '?' + queryString);
}

//新增页面
export const page_add = params => {
  //表单自动为json字符串
  return http.requestPost(apiUrl + '/cms/page/add',params)
}
```

### 2.3 修改路由

* 页面js代码

```javascript
edit:function (pageId) {
    //打开修改页面
    this.$router.push({
        path:'/cms/page/edit/'+pageId
    })
}
```

* cms/router/index.js

```javascript
{
    path: '/cms/page/edit/:pageId', //注意url传参方式
    component: page_edit,
    name: '修改页面',
    hidden: false
}
```

# 20200107 

## 1. 本日内容

### 1.1 完成del的功能