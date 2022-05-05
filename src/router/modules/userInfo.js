import Layout from '@/layout/index.vue'

export default {
  path: '/userInfo',
  name: '',
  component: Layout,
  children: [
    {
      path: '',
      name: 'userInfo',
      component: () => import('@/views/userInfo/index.vue')
    },
    {
      path: 'editUser',
      name: 'editUser',
      meta: {
        name: '编辑个人信息'
      },
      component: () => import('@/views/userInfo/editUser.vue')
    }
  ]

}
