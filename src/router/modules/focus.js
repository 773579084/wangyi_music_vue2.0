import Layout from '@/layout/index.vue'

export default {
    path: '/focus',
    name: '',
    component: Layout,
    children: [
        {
            path: '',
            name: 'focus1',
            component: () => import('@/views/focus/index.vue')
        }
    ]
}
