import Layout from '@/layout/index.vue'

export default {
    path: '/privateFM',
    name: '',
    component: Layout,
    children: [
        {
            path: '',
            name: 'privateFM1',
            component: () => import('@/views/privateFM/index.vue')
        }
    ]
}
