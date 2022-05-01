import Layout from '@/layout/index.vue'

export default {
    path: '/live',
    name: '',
    component: Layout,
    children: [
        {
            path: '',
            name: 'live1',
            component: () => import('@/views/live/index.vue')
        }
    ]
}
