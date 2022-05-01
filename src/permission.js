// permission（许可，权限） 此文件夹专门处理路由权限
import router from '@/router'
import store from '@/store/index'

router.beforeEach(async (to, from, next) => {
    if (store.getters.token) {
        const routes = await store.dispatch('permission/saveRoutes')
        router.addRoutes([...routes])
        next()
    } else {
        console.log(12)
        const blackArr = ['/userInfo/']
        if (blackArr.indexOf(to.path) !== -1) {
            next('/')
        }
        next()
    }
})

