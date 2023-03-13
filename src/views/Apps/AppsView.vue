<template>
	<Layout>
		<Sider class="sider" hide-trigger>
			<Menu
				class="main-menu"
				theme="light"
				width="auto"
				:active-name="route.matched[2]?.name"
				:open-names="['1']"
			>
				<MenuItem name="数据" to="/apps/datasheets">
					<Icon type="md-grid"></Icon>
					数据
				</MenuItem>
				<MenuItem name="报表" to="/apps/report">
					<Icon type="md-stats"></Icon>
					报表
				</MenuItem>
			</Menu>
		</Sider>

		<Layout>
			<Breadcrumb class="breadcrumb">
				<BreadcrumbItem
					v-for="item of breadcrumbs"
					:key="item.path"
					:to="item.path"
				>
					{{ item.name || "首页" }}
				</BreadcrumbItem>
			</Breadcrumb>

			<Content class="content-view">
				<RouterView />
			</Content>
		</Layout>
	</Layout>
</template>

<script setup>
import {
	Sider,
	Content,
	Breadcrumb,
	BreadcrumbItem,
	Layout,
	Menu,
	MenuItem,
	Icon,
} from "view-ui-plus";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbs = computed(() => route.matched);
</script>

<style scoped>
.sider {
	background-color: #fff;
	border-right: 1px solid #dcdee2;
}
.main-menu::after {
	display: none !important;
}
.content-view {
	padding: 24px;
	background-color: #fff;
}
.breadcrumb {
	padding: 24px;
}
</style>
