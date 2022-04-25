import Layout from '@/layout/index.vue'

export default {
    path: '/localDownload',
    name: 'localDownload',
    component: Layout,
    children: [
        {
            path: '',
            name: 'localDownload',
            component: () => import('@/views/localDownload/index.vue')
        }
    ]
}
