import { Message } from "view-ui-plus";
import { reactive, watch } from "vue";
import { throttle } from "../../utils/throttle";

function createNewRow(columns) {
  const newRow = {};

  columns.forEach((column) => {
    switch (column.dataType) {
      case "number":
        newRow[column.title] = 0;
        break;
      default:
        newRow[column.title] = "";
        break;
    }
  });

  return newRow;
}

export function useDatasheet() {
  const datasheet = reactive({
    uid: "",
    title: "",
    createdAt: "",
    updatedAt: "",
    columns: [],
    data: [],
  });

  let newLife = true;

  async function getDatasheet(uid) {
    fetch("/node/datasheets/" + uid, {
      method: "GET",
      headers: {
        Accept: "application/josn",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Object.assign(datasheet, data);

        document.title = data.title;

        if (newLife) {
          watch(datasheet, throttle(updateDatasheet, 300), {
            deep: true,
          });

          newLife = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addColumn(column) {
    if (!column.title) {
      const index =
        datasheet.columns.filter((col) => col.dataType === column.dataType)
          .length + 1;

      switch (column.dataType) {
        case "string":
          column.title = "文本" + index;
          break;
        case "number":
          column.title = "数值" + index;
          break;
        case "option":
          column.title = "选项" + index;
          break;
        default:
          break;
      }
    }

    if (!column.width) {
      column.width = "150px";
    }

    const dulplicate = datasheet.columns.some(
      (col) => col.title === column.title
    );

    if (dulplicate) {
      return Message.warning({
        content: `字段名称"${column.title}"已存在，请输入其他名称`,
        duration: 3,
      });
    }

    datasheet.columns.push(column);
  }

  function addRecord() {
    const newRow = createNewRow(datasheet.columns);

    datasheet.data.push(newRow);
  }

  async function updateDatasheet() {
    fetch("/node/datasheets", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datasheet),
    })
      .then((res) => res.json())
      .then(() => {
        if (document.title !== datasheet.title) {
          document.title = datasheet.title;
        }

        Message.info("已自动保存");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    datasheet,
    getDatasheet,
    addColumn,
    addRecord,
  };
}
