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
  return http.requestPost(apiUrl + '/cms/page/add',params);
}

//根据id查询页面
export const page_get = pageId => {
  return http.requestQuickGet(apiUrl + '/cms/page/get/' + pageId);
}

//修改页面
export const page_edit = (pageId,params) => {
  return http.requestPut(apiUrl + '/cms/page/edit/'+pageId, params);
}

//删除页面
export const page_del = pageId => {
  return http.requestDelete(apiUrl+'/cms/page/del/'+pageId);
}

//发布也米娜
export const page_postPage = pageId => {
  return http.requestPost(apiUrl+'/cms/page/postPage/'+pageId);
}


