import { defineStore } from "pinia";
import { ref } from "vue";

const useChartStore = defineStore("chart", () => {
  const xAxisField = ref("");
  const yAxisField = ref("");

  function setXAxisField(value) {
    xAxisField.value = value;
  }

  function setYAxisField(value) {
    yAxisField.value = value;
  }

  return {
    xAxisField,
    setXAxisField,
    yAxisField,
    setYAxisField,
  };
});

export default useChartStore;
