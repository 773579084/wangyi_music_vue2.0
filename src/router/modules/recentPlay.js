import Layout from '@/layout/index.vue'

export default {
    path: '/recentPlay',
    name: '',
    component: Layout,
    children: [
        {
            path: '',
            name: 'recentPlay1',
            component: () => import('@/views/recentPlay/index.vue')
        }
    ]
}
