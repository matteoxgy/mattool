<template>
    <div class="line-chart" ref="el"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useRecordStore from '../store/record';
import useChartStore from '../store/chart';

const el = ref(null);
let chart = null;
const recordStore = useRecordStore();
const chartStore = useChartStore();
const { records } = storeToRefs(recordStore);
const { xAxisField, yAxisField } = storeToRefs(chartStore);

watch(records, () => {
    initChart();
}, {
    deep: true
})

onMounted(() => {
    initChart();
});

function initChart() {
    if (!chart) {
        chart = echarts.init(el.value);
    }

    const _records = JSON.parse(JSON.stringify(records.value));
    const xyMap = new Map();
    const xAxis = [];
    const data = [];

    _records.forEach(record => {
        const xAxisKey = record[xAxisField.value],
            oldValue = xyMap.get(xAxisKey),
            newValue = record[yAxisField.value];

        if (typeof oldValue === 'undefined') {
            xyMap.set(xAxisKey, newValue);
        } else {
            xyMap.set(xAxisKey, oldValue + newValue);
        }
    });

    Array.from(xyMap).forEach(item => {
        xAxis.push(item[0]);
        data.push(item[1]);
    });

    const opts = {
        xAxis: {
            type: 'category',
            data: xAxis
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis'
        },
        series: [
            {
                data: data,
                type: 'line',
                smooth: true
            }
        ]
    }

    chart.setOption(opts);
}
</script>

<style scoped>
.line-chart {
    width: 800px;
    height: 600px;
}
</style>