<template>
  <div class="datasheet">
    <PageHeader back @on-back="onBack">
      <template #title>
        <Input
          style="width: 300px"
          placeholder="请输入数据表标题"
          :border="false"
          :model-value="datasheet.title"
          @on-change="onTitleChange"
        />
      </template>
    </PageHeader>

    <div class="table-wrapper">
      <Table border :width="tableWidth" :columns="columns" :data="rows" />

      <Icon
        class="add-record"
        type="md-add-circle"
        size="30"
        color="lightblue"
        @click="onAddBtnClick"
      />
    </div>
  </div>
</template>

<script setup>
import {
  Table,
  Input,
  InputNumber,
  Select,
  Option,
  DatePicker,
  Icon,
  PageHeader,
} from "view-ui-plus";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import ColumnHeadermenu from "./ColumnHeaderMenu.vue";
import { useDatasheet } from "./datasheet";

const props = defineProps(["uid"]);
const router = useRouter();
const { datasheet, getDatasheet, addColumn, addRecord } = useDatasheet();

const columns = computed(() => {
    return [
      {
        type: "selection",
        width: "54px",
      },
      ...datasheet.columns.map((column) => {
        const _column = JSON.parse(JSON.stringify(column));

        Object.assign(_column, {
          resizable: true,
          key: column.title,
          slot: column.title,
          render: (h, { row, column, index }) => {
            switch (column.dataType) {
              case "number":
                return h(InputNumber, {
                  modelValue: datasheet.data[index][column.key],
                  "onUpdate:modelValue": (value) => {
                    datasheet.data[index][column.key] = value;
                  },
                });
              case "option":
                const options = reactive([]);

                return h(
                  Select,
                  {
                    filterable: true,
                    allowCreate: true,
                    transfer: true,
                    modelValue: datasheet.data[index][column.key],
                    onOnChange: (value) => {
                      datasheet.data[index][column.key] = value;
                      console.log(value);
                    },
                    onOnCreate(query) {
                      options.push(query);
                    },
                  },
                  {
                    default: () =>
                      options.map((opt) =>
                        h(Option, {
                          key: opt,
                          label: opt,
                          value: opt,
                        })
                      ),
                  }
                );
              default:
                return h(Input, {
                  autosize: true,
                  type: "textarea",
                  modelValue: datasheet.data[index][column.key],
                  onChange: (event) => {
                    datasheet.data[index][column.key] = event.target.value;
                  },
                });
            }
          },
        });

        return _column;
      }),
      {
        title: "+",
        align: "center",
        key: "newColumn",
        width: "100px",
        className: "clickable-table-head",
        renderHeader: (h) => {
          return h(ColumnHeadermenu, {
            onAddConfirm(column) {
              addColumn(column);
            },
          });
        },
      },
    ];
  }),
  tableWidth = computed(() => {}),
  rows = computed(() => {
    return [...datasheet.data];
  });

function onAddBtnClick() {
  addRecord();
}

function onTitleChange(event) {
  datasheet.title = event.target.value;
}

function onBack() {
  router.push("/apps/datasheets");
}

getDatasheet(props.uid);
</script>

<style scoped>
.table-wrapper {
  position: relative;
  padding: 16px;
  user-select: none;
}
.add-record {
  display: none;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  width: 30px;
  height: 30px;
  z-index: 99;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}
.table-wrapper:hover .add-record {
  display: block;
}
.cell {
  padding: 8px;
}
.clickable-table-head {
  cursor: pointer;
}
</style>
