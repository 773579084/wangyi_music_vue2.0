import Layout from '@/layout/index.vue'

export default {
    path: '/podcast',
    name: '',
    component: Layout,
    children: [
        {
            path: '',
            name: 'podcast1',
            component: () => import('@/views/podcast/index.vue')
        }
    ]
}
