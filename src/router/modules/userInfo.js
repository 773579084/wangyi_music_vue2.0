import Layout from '@/layout/index.vue'

export default {
    path: '/userInfo',
    name: '',
    component: Layout,
    children: [
        {
            path: '',
            name: 'userInfo1',
            component: () => import('@/views/userInfo/index.vue')
        }
    ]
}
