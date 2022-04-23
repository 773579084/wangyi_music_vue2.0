import Layout from '@/layout/index.vue'

export default {
    path: '/playlist',
    name: 'playlist',
    component: Layout,
    children: [
        {
            path: '',
            name: 'playlist',
            component: () => import('@/views/playList/index.vue'),
            children: [
                {
                    path: 'musicAll',
                    name: 'musicAll',
                    meta: {
                        name: '歌曲列表'
                    },
                    component: () => import('@/views/playList/musicAll.vue')
                },
                {
                    path: 'songSingleComment',
                    name: 'songSingleComment',
                    meta: {
                        name: '评论'
                    },
                    component: () => import('@/views/playList/songSingleComment.vue')
                },
                {
                    path: 'collectionPeople',
                    name: 'collectionPeople',
                    meta: {
                        name: '收藏者'
                    },
                    component: () => import('@/views/playList/collectionPeople.vue')
                }
            ]
        }
    ]
}
