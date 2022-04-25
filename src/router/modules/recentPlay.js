import Layout from '@/layout/index.vue'

export default {
    path: '/recentPlay',
    name: 'recentPlay',
    component: Layout,
    children: [
        {
            path: '',
            name: 'recentPlay',
            component: () => import('@/views/recentPlay/index.vue')
        }
    ]
}
