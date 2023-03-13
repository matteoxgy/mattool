<template>
	<Layout>
		<Header>
			<Menu
				class="header-menu"
				mode="horizontal"
				theme="dark"
				:active-name="route.matched[1].name"
			>
				<RouterLink to="/home">
					<h1 class="logo">Mattool</h1>
				</RouterLink>
				<div class="layout-nav">
					<MenuItem name="首页" to="/home">
						<Icon type="md-home"></Icon>
						<span>首页</span>
					</MenuItem>
					<MenuItem name="应用" to="/apps">
						<Icon type="md-apps"></Icon>
						<span>应用</span>
					</MenuItem>
				</div>
			</Menu>
		</Header>

		<Layout class="main-content">
			<RouterView v-slot="{ Component }">
				<KeepAlive includes="HomeView">
					<component :is="Component" />
				</KeepAlive>
			</RouterView>
		</Layout>
	</Layout>
</template>

<script setup>
import { Layout, Header, Menu, MenuItem, Icon } from "view-ui-plus";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style lang="scss" scoped>
.main-content {
	overflow: auto;
}

.header-menu {
	display: flex;
	gap: 24px;
}

.logo {
	color: #fff;
	cursor: pointer;
}
</style>
