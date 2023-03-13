import { defineStore } from "pinia";
import { ref } from "vue";

const useRecordStore = defineStore(
  "record",
  () => {
    const fields = ref([
      {
        type: "selection",
        width: 60,
      },
      {
        title: "支出项",
        key: "matter",
        slot: "matter",
        dataType: "string",
        editorType: "input",
      },
      {
        title: "分类",
        key: "category",
        slot: "category",
        dataType: "string",
        editorType: "select",
      },
      {
        title: "金额",
        key: "amount",
        slot: "amount",
        dataType: "number",
        editorType: "number",
      },
      {
        title: "日期",
        key: "date",
        slot: "date",
        dataType: "string",
        editorType: "date",
      },
    ]);

    const records = ref([
      {
        matter: "爬山",
        category: "娱乐",
        amount: 80,
        date: "2023-2-25",
      },
      {
        matter: "吃饭",
        category: "饮食",
        amount: 99,
        date: "2023-2-25",
      },
    ]);

    function addRecord() {
      records.value.push({
        matter: "",
        category: "饮食",
        amount: 10,
        date: new Date().toLocaleDateString(),
      });
    }

    function updateRecord(index, key, value) {
      records.value[index][key] = value;
    }

    return {
      fields,
      records,
      addRecord,
      updateRecord,
    };
  },
  {
    persist: {
      enabled: true,
    },
  }
);

export default useRecordStore;
