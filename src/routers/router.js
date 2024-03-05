import { createRouter, createWebHistory } from 'vue-router'

import vueRouter from 'vue-router'

const routes = [
    { path: './header.vue', component: Header }
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
app.use(router);

export default router