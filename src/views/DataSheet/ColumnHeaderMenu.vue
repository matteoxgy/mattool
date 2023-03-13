<template>
	<Dropdown
		transfer
		transfer-class-name="dropdown-menu"
		trigger="custom"
		:visible="visible"
		@on-clickoutside="visible = false"
	>
		<Icon class="add" type="md-add" @click="onAddClick" />

		<template #list>
			<Form class="form" :model="formData">
				<FormItem label="标题" prop="title">
					<Input placeholder="请输入字段标题" v-model="formData.title" />
				</FormItem>

				<FormItem label="字段类型" prop="dataType">
					<Select transfer v-model="formData.dataType">
						<Option value="string" label="文本" />
						<Option value="number" label="数值" />
						<Option value="option" label="选项" />
					</Select>
				</FormItem>
			</Form>

			<div class="menu-footer">
				<Button type="primary" @click="confirm">添加字段</Button>
			</div>
		</template>
	</Dropdown>
</template>

<script setup>
import {
	Button,
	Input,
	Icon,
	Form,
	FormItem,
	Select,
	Option,
	Dropdown,
} from "view-ui-plus";
import { ref, reactive } from "vue";

const formData = reactive({
		title: "",
		dataType: "string",
	}),
	visible = ref(false);

const emit = defineEmits(["addConfirm"]);

function onAddClick() {
	visible.value = true;
}

function confirm() {
	emit("addConfirm", formData);

	visible.value = false;
}
</script>

<style lang="scss" scoped>
.add {
	width: 64px;
	text-align: center;
	cursor: pointer;
}
.form {
	padding: 8px 8px 0 8px;
	box-sizing: border-box;
}
.menu-footer {
	padding: 0 8px 0 8px;
	display: flex;
	justify-content: flex-end;
}
</style>
