import Layout from '@/layout/index.vue'

export default {
    path: '/foundMusic',
    name: 'foundMusic',
    component: Layout,
    children: [
        {
            path: '',
            name: 'foundMusic',
            meta: {
                name: '发现音乐'
            },
            component: () => import('@/views/founMusic'),
            //  tab栏路由
            children: [
                {
                    path: 'recommend',
                    name: 'recommend',
                    meta: {
                        name: '个性推荐'
                    },
                    component: () => import('@/views/founMusic/recommend.vue')
                },
                {
                    path: 'customized',
                    name: 'customized',
                    meta: {
                        name: '专属定制'
                    },
                    component: () => import('@/views/founMusic/customized.vue')
                },
                {
                    path: 'songList',
                    name: 'songList',
                    meta: {
                        name: '歌单'
                    },
                    component: () => import('@/views/founMusic/songList.vue')
                },
                {
                    path: 'rankList',
                    name: 'rankList',
                    meta: {
                        name: '排行榜'
                    },
                    component: () => import('@/views/founMusic/rankList.vue')
                },
                {
                    path: 'singer',
                    name: 'singer',
                    meta: {
                        name: '歌手'
                    },
                    component: () => import('@/views/founMusic/singer.vue')
                },
                {
                    path: 'newMusic',
                    name: 'newMusic',
                    meta: {
                        name: '最新音乐'
                    },
                    component: () => import('@/views/founMusic/newMusic.vue')
                }
            ]
        }
    ]
}

