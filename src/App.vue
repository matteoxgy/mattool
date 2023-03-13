<template>
	<RouterView v-slot="{ Component }">
		<KeepAlive includes="MainView">
			<component class="main-view" :is="Component" />
		</KeepAlive>
	</RouterView>
</template>

<style lang="scss" scoped>
.main-view {
	height: 100vh;
}
</style>
