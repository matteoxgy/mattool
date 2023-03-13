import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: MainView,
			redirect: "/home",
			children: [
				{
					name: "首页",
					path: "home",
					component: () => import("../views/HomeView.vue"),
				},
				{
					name: "应用",
					path: "apps",
					component: () => import("../views/Apps/AppsView.vue"),
					redirect: "/apps/datasheets",
					children: [
						{
							name: "数据",
							path: "datasheets",
							component: () =>
								import("../views/Apps/DataSheets/DataSheetList.vue"),
						},
						{
							name: "报表",
							path: "report",
							component: () => import("../views/Apps/ReportView.vue"),
						},
					],
				},
			],
		},
		{
			name: "数据表",
			path: "/datasheets/:uid",
			props: true,
			component: () => import("../views/DataSheet/DataSheet.vue"),
		},
		{
			name: "异常",
			path: "/exception/:type",
			props: true,
			component: () => import("../views/ExceptionPage.vue"),
		},
	],
});

export default router;
