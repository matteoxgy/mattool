<template>
	<div class="data-view">
		<ButtonGroup>
			<Button ghost type="primary" :loading="addLoading" @click="onAddBtnClick">
				新增
			</Button>
			<Button ghost disabled type="primary">上传</Button>
			<Button
				ghost
				type="error"
				:loading="deleteLoading"
				@click="onDelBtnClick"
			>
				删除
			</Button>
		</ButtonGroup>

		<Table
			class="data-table"
			:columns="columns"
			:data="datasheets.data"
			@on-row-click="onRowClick"
			@on-selection-change="onSelectionChange"
		>
			<template #name="{ row }">
				<Icon type="md-document" />
				{{ row.title }}
			</template>

			<template #action="{ row, index }">
				<ActionColumn />
			</template>
		</Table>

		<Page show-sizer show-total show-elevator :total="datasheets.data.length" />
	</div>
</template>

<script setup>
import { Button, ButtonGroup, Icon, Page, Table } from "view-ui-plus";
import { ref } from "vue";
import ActionColumn from "./ActionColumn.vue";
import { useDatasheets } from "./datasheets";

const {
	datasheets,
	addNewDataTable,
	getTableData,
	deleteDataTables,
	onSelectionChange,
} = useDatasheets();

const columns = [
	{
		type: "selection",
		width: 60,
		align: "center",
	},
	{
		title: "名称",
		slot: "name",
	},
	{
		title: "修改时间",
		key: "updated_at",
	},
	{
		title: "操作",
		slot: "action",
	},
];

const addLoading = ref(false),
	deleteLoading = ref(false);

function onRowClick(row) {
	openDataTable(row.uid);
}

function openDataTable(uid) {
	open(`/datasheets/${uid}`, "_blank");
}

async function onAddBtnClick() {
	addLoading.value = true;

	await addNewDataTable();

	addLoading.value = false;
}

async function onDelBtnClick() {
	deleteDataTables();
}

// 初始化时请求数据表记录
getTableData(1, 10);
</script>

<style lang="scss" scoped>
.data-view {
	display: flex;
	flex-direction: column;
	gap: 16px;
	height: 100%;
}
.data-table {
	flex: 1 1 auto;
}
::v-deep(.ivu-table-row) {
	cursor: pointer;
}
</style>
