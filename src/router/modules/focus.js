import Layout from '@/layout/index.vue'

export default {
    path: '/focus',
    name: 'focus',
    component: Layout,
    children: [
        {
            path: '',
            name: 'focus',
            component: () => import('@/views/focus/index.vue')
        }
    ]
}
