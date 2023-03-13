<template>
    <div class="data-table">
        <Table stripe border :columns="fields" :data="records">
            <template #matter="{ row, index }">
                <div class="cell">
                    <Input type="textarea" :model-value="row.matter"
                        @on-change="updateRecord(index, 'matter', $event.target.value)" />
                </div>
            </template>

            <template #category="{ row, index }">
                <div class="cell">
                    <Select transfer :model-value="row.category" @on-change="updateRecord(index, 'category', $event)">
                        <Option label="娱乐" value="娱乐" />
                        <Option label="饮食" value="饮食" />
                    </Select>
                </div>
            </template>

            <template #amount="{ row, index }">
                <div class="cell">
                    <InputNumber :model-value="row.amount" @on-change="updateRecord(index, 'amount', $event)" />
                </div>
            </template>

            <template #date="{ row, index }">
                <div class="cell">
                    <DatePicker transfer :model-value="row.date" @on-change="updateRecord(index, 'date', $event)" />
                </div>
            </template>
        </Table>

        <Icon class="add-record" type="md-add-circle" size="30" color="lightblue" @click="addRecord" />
    </div>
</template>

<script setup>
import { Table, Input, InputNumber, Select, Option, DatePicker, Icon } from 'view-ui-plus'
import { storeToRefs } from 'pinia'
import useRecordStore from '../store/record'

const recordStore = useRecordStore();
const { fields, records } = storeToRefs(recordStore);
const { addRecord, updateRecord } = recordStore;

</script>

<style scoped>
.data-table {
    position: relative;
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

.data-table:hover .add-record {
    display: block;
}

.cell {
    padding: 8px;
}
</style>