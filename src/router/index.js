import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue";
import Article from "../views/Article.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/articles/:docId",
        name: "Article",
        component: Article
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,

    scrollBehavior () {
        return { x: 0, y: 0 };
    }
  })
  
  export default router
  