import Layout from '@/layout/index.vue'

export default {
    path: '/podcast',
    name: 'podcast',
    component: Layout,
    children: [
        {
            path: '',
            name: 'podcast',
            component: () => import('@/views/podcast/index.vue')
        }
    ]
}
