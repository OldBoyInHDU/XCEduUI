import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';
import page_edit from '@/module/cms/page/page_edit.vue';
export default [{
    path: '/',
    component: Home,
    name: 'CMS', //菜单名称
    hidden: false, //是否显示左侧菜单，显示false， 不显示为true
    children: [
      {
        path: '/cms/page/list',
        component: page_list,
        name: '页面列表',
        hidden: false
      },
      {
        path: '/cms/page/add',
        component: page_add,
        name: '新增页面',
        hidden: false
      },
      {
        path: '/cms/page/edit/:pageId', //注意url传参方式
        component: page_edit,
        name: '修改页面',
        hidden: false
      }
    ]
  }
]
