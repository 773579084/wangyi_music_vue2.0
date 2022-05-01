import Layout from '@/layout/index.vue'

export default {
    path: '/localDownload',
    name: '',
    component: Layout,
    children: [
        {
            path: '',
            name: 'localDownload1',
            component: () => import('@/views/localDownload/index.vue')
        }
    ]
}
