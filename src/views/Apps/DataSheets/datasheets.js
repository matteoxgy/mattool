import { Message } from "view-ui-plus";
import { reactive } from "vue";

export function useDatasheets() {
	const datasheets = reactive({
		// 数据表记录
		data: [],
		// 选中的数据表 uid
		selection: [],
	});

	// 选中变化
	function onSelectionChange(sel) {
		datasheets.selection = sel.map((item) => item.uid);
	}

	// 新增数据表
	async function addNewDataTable() {
		fetch("/node/datasheets", {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then(async () => {
				Message.success("添加成功");
			})
			.catch(() => {
				Message.error("添加失败");
			})
			.finally(() => {
				getTableData(1, 10);
			});
	}

	// 获取数据表记录
	async function getTableData(pageIndex, pageSize) {
		fetch(`/node/datasheets?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				datasheets.data = data.datas.map((item) => {
					const updatedAt = new Date(item.updated_at);

					item.updated_at = `${updatedAt.getMonth()}月${updatedAt.getDate()} ${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`;

					return item;
				});
			})
			.catch((err) => {
				console.log(err);
				Message.error("查询失败");
			});
	}

	// 删除选中的数据表记录
	async function deleteDataTables() {
		fetch("/node/datasheets", {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				uids: datasheets.selection.join(","),
			}),
		})
			.then((res) => res.json())
			.then(() => {
				Message.success("删除成功");
			})
			.catch(() => {
				Message.error("删除失败");
			})
			.finally(() => {
				getTableData(1, 10);
			});
	}

	return {
		datasheets,
		addNewDataTable,
		getTableData,
		deleteDataTables,
		onSelectionChange,
	};
}
