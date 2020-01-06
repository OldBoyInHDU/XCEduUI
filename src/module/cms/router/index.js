import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';
export default [{
    path: '/',
    component: Home,
    name: 'CMS', //菜单名称
    hidden: false, //是否显示左侧菜单，显示false， 不显示为true
    children: [
      {
        path: '/cms/page/page_list',
        component: page_list,
        name: '页面列表',
        hidden: false
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
