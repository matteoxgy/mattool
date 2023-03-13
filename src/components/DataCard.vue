<template>
	<Card class="data-card">
		<template #title>
			标题
			<Dropdown>
				<Button type="text">操作</Button>

				<template #list>
					<DropdownMenu>
						<DropdownItem>修改</DropdownItem>
						<DropdownItem>删除</DropdownItem>
					</DropdownMenu>
				</template>
			</Dropdown></template
		>

		content
	</Card>
</template>

<script setup>
import {
	Button,
	Card,
	Dropdown,
	DropdownMenu,
	DropdownItem,
} from "view-ui-plus";
</script>

<style lang="scss" scoped>
.data-card {
	width: 200px;
}
.data-card ::v-deep(.ivu-card-head) {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
