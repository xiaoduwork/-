import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/group'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/group',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/group/group.vue'),
                    meta: { title: '集团' }
                },
                {
                    path: '/Sentai',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/group/Sentai.vue'),
                    meta: { title: '森泰煤业' }
                },
                {
                    path: '/people',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Production/people.vue'),
                    meta: { title: '人员定位' },
                },
                {
                    path: '/safe_data',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Production/safe_data.vue'),
                    meta: { title: '安全检测' },
                },
                {
                    path: '/output',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Production/output.vue'),
                    meta: { title: '产品监控' },
                },
                // 报表部分
                {
                    path: '/people_table',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Reports/people_table.vue'),
                    meta: { title: '人员定位' },
                },
                {
                    path: '/safe_table',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Reports/safe_table.vue'),
                    meta: { title: '安全检测' },
                },
                {
                    path: '/output_table',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Reports/output_table.vue'),
                    meta: { title: '产品监控' },
                },
                {
                    path: '/alarm_output',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/alarm/alarm_output.vue'),
                    meta: { title: '异常预警' },
                },
                {
                    path: '/query',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/alarm/query1.vue'),
                    meta: { title: '产品监控' },
                },

                // 用户管理
                {
                    path: '/user_admin',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/admin/user_admin.vue'),
                    meta: { title: '用户管理' },
                },
                {
                    path: '/role_admin',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/admin/role_admin.vue'),
                    meta: { title: '角色管理' },
                },
                {
                    path: '/permissions_admin',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/admin/permissions_admin.vue'),
                    meta: { title: '权限管理' },
                },
                //员工
                {
                    path: '/staffList',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/staff/staffList.vue'),
                    meta: { title: '员工管理' },
                },

            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/large_group',
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/Large/large_group.vue'),
            meta: { title: '集团可视化大屏' },
        },
        {
            path: '/large_sentai',
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/Large/large_sentai.vue'),
            meta: { title: '森泰可视化大屏' },
        },
        {
            path: '*',
            redirect: '/group'
        }
    ]
});
