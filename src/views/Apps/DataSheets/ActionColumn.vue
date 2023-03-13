<template>
	<Dropdown
		transfer
		trigger="custom"
		:visible="showDropDown"
		@on-click="onDropDownClick($event, row, index)"
		@on-clickoutside="showDropDown = false"
	>
		<Icon type="ios-more" color="#2db7f5" @click.stop="showDropDown = true" />

		<template #list>
			<DropdownMenu>
				<DropdownItem name="edit">删除</DropdownItem>
			</DropdownMenu>
		</template>
	</Dropdown>
</template>

<script setup>
import { Dropdown, DropdownMenu, DropdownItem, Icon } from "view-ui-plus";
import { ref } from "vue";

const showDropDown = ref(false);

function onDropDownClick(action, row, index) {
	console.log(action, row, index);
}
</script>
