import http from './../../../base/api/public'
import querystring from 'querystring'
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


