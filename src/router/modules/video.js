import Layout from '@/layout/index.vue'

export default {
    path: '/video',
    name: 'video',
    component: Layout,
    children: [
        {
            path: '',
            name: 'video',
            component: () => import('@/views/video/index.vue')
        }
    ]
}
