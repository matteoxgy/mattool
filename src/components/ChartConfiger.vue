<template>
    <div class="chart-configer">
        <Form>
            <FormItem label="横轴">
                <Select :model-value="xAxisField" @on-change="setXAxisField">
                    <Option v-for="opt of xAxisFields" :key="opt.key" :value="opt.key" :label="opt.text" />
                </Select>
            </FormItem>

            <FormItem label="纵轴">
                <Select :model-value="yAxisField" @on-change="setYAxisField">
                    <Option v-for="opt of yAxisFields" :key="opt.key" :value="opt.key" :label="opt.text" />
                </Select>
            </FormItem>
        </Form>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { Form, FormItem, Select, Option } from "view-ui-plus";
import { computed, onMounted } from "vue";
import useRecordStore from "../store/record";
import useChartStore from "../store/chart";

const recordStore = useRecordStore();
const chartStore = useChartStore();
const { fields } = storeToRefs(recordStore);
const { xAxisField, yAxisField } = storeToRefs(chartStore);
const { setXAxisField, setYAxisField } = chartStore;
const xAxisFields = computed(() =>
    fields.value
        .filter((field) => field.dataType && field.editorType && field.dataType === 'string' && (field.editorType === 'select' || field.editorType === 'date'))
        .map((field) => ({
            key: field.key,
            text: field.title,
        }))
);
const yAxisFields = computed(() =>
    fields.value
        .filter((field) => field.dataType && field.editorType && field.dataType === 'number' && field.editorType === "number")
        .map((field) => ({
            key: field.key,
            text: field.title,
        }))
);

onMounted(() => {
    if (!xAxisField.value) {
        setXAxisField(xAxisFields.value[0].key);
    }
    if (!yAxisField.value) {
        setYAxisField(yAxisFields.value[0].key);
    }
})
</script>

<style scoped>
.chart-configer {
    padding: 16px;
    width: 600px;
    height: 400px;
    background: #eee;
}
</style>
