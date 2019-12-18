import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../app.vue'

const CatchDoll = ()=>import("../view/catchdoll/")
const CatchDollHome = ()=>import("../view/catchdoll/catchdoll.vue")
const CatchDollMain = ()=>import("../view/catchdoll/main.vue")
const CatchDollMain1 = ()=>import("../view/catchdoll/catchmain.vue")
const CatchDollGift = ()=>import("../view/catchdoll/gift.vue")
const CatchDollExchange = ()=>import("../view/catchdoll/exchange.vue")
const CatchDollQrcode = ()=>import("../view/catchdoll/qrcode.vue")
const CatchDollIndex = ()=>import("../view/catchdoll/catchdollIndex.vue")
const CatchDollXiaoyou = ()=>import("../view/catchdoll/xiaoyou.vue")

const routes = [
    {
        path: '/',
        component: App,
        children: [
            {
                name: 'CatchDoll',
                path: 'catchdoll',
                component: CatchDoll,
                meta: {
                    loading:0,
                    title: '小友大世界'
                }
            },
            {
                name: 'CatchDollIndex',
                path: 'catchdoll/catchdollIndex',
                component: CatchDollIndex,
                meta: {
                    //loading:0,
                    title: '小友大世界'
                }
            },
            {
                name: 'CatchDollHome',
                path: 'catchdoll/home',
                component: CatchDollHome,
                meta: {
                    //loading:0,
                    title: '小友大世界'
                }
            },
            {
                name: 'CatchDollMain',
                path: 'catchdoll/main',
                component: CatchDollMain,
                meta: {
                    loading:0,
                    keepAlive: true,
                    title: '小友大世界',
                }
            },
            {
                name: 'CatchDollMain1',
                path: 'catchdoll/main1',
                component: CatchDollMain1,
                meta: {
                    //loading:0,
                    title: '小友大世界'
                }
            },
            {
                name: 'CatchDollGift',
                path: 'catchdoll/gift',
                component: CatchDollGift,
                meta: {
                    //loading:0,
                    title: '小友大世界礼品箱'
                }
            },
            {
                name: 'CatchDollExchange',
                path: 'catchdoll/exchange',
                component: CatchDollExchange,
                meta: {
                    title: '小友大世界兑换'
                }
            },
            {
                name: 'CatchDollQrcode',
                path: 'catchdoll/qrcode',
                component: CatchDollQrcode,
                meta: {
                    title: '小友大世界二维码'
                }
            },
            {
                name: 'CatchDollXiaoyou',
                path: 'catchdoll/xiaoyou',
                component: CatchDollXiaoyou,
                meta: {
                    //loading:0,
                    title: '小友大世界'
                }
            }
        ]
    }
]

Vue.use(VueRouter)

const router = new VueRouter({ // 创建路由
    mode: 'hash',
    routes
})

//// 设置页面切换动画
// router.beforeEach((to, from, next) => {
//     if(to.meta.title) {
//         document.title = to.meta.title
//         configNavBar({
//             centerItems: {
//                 title: to.meta.title
//             }
//         })
//     }
//     next()
// })

export default router