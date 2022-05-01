import Layout from '@/layout/index.vue'

export default {
    path: '/video',
    name: '',
    component: Layout,
    children: [
        {
            path: '',
            name: 'video1',
            component: () => import('@/views/video/index.vue')
        }
    ]
}
