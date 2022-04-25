import Layout from '@/layout/index.vue'

export default {
    path: '/privateFM',
    name: 'privateFM',
    component: Layout,
    children: [
        {
            path: '',
            name: 'privateFM',
            component: () => import('@/views/privateFM/index.vue')
        }
    ]
}
