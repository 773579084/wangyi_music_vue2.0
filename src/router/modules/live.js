import Layout from '@/layout/index.vue'

export default {
    path: '/live',
    name: 'live',
    component: Layout,
    children: [
        {
            path: '',
            name: 'live',
            component: () => import('@/views/live/index.vue')
        }
    ]
}
