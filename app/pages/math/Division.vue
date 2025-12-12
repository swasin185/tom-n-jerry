<template>
    <UCard class="flex font-mono font-bold text-xl">
        <UInputNumber v-model="dividend" class="w-24 mr-2" orientation="vertical" :min="1" />
        /
        <UInputNumber v-model="divisor" class="w-24 mr-2" orientation="vertical" :min="2" />
        <UButton class="ml-4 mb-2 justify-center" @click="division" color="secondary"
            >Division</UButton
        >
        <div v-if="outputRepeat" class="w-full flex justify-between">
            <span class="text-left text-sm">ทศนิยมซ้ำ</span>
            <span class="text-right">{{ outputRepeat }}</span>
        </div>
        <div class="w-full flex justify-between">
            <span class="text-left mr-4">ผลหาร</span>
            <span class="text-right primary">{{ output }}</span>
        </div>
        <div class="w-full flex justify-between">
            <span class="text-left">หารร่วมมาก</span>
            <span class="text-right">{{ gcd }}</span>
        </div>
        <UTable
            :columns="[
                { accessorKey: 'step', header: 'Step' },
                { accessorKey: 'remainder', header: 'Remainder' },
                { accessorKey: 'quotient', header: 'Quotient' },
                { accessorKey: 'repeat', header: 'Repeat' },
            ]"
            :data="rows"
        />
        <template #footer> </template>
    </UCard>
</template>

<script lang="ts" setup>
useHead({
    title: "Division",
})
import { ref, onMounted } from "vue"
const dividend = ref<number>(1)
const divisor = ref<number>(2)
const output = ref<string>("0")
const gcd = ref<number>(0)
const repeat = ref<number>(0)
const outputRepeat = ref<string>("")
const rows = ref<any[]>()

onMounted(() => {
    division()
})

async function division() {
    rows.value = []
    console.log(dividend.value + ' / ' + divisor.value)
    console.time("division")
    const result = (await $fetch("/api/division", {
        query: {
            x: dividend.value,
            y: divisor.value,
        },
    })) as {
        decimal: string
        dividend: number
        divisor: number
        quotient: string
        remainderList: number[]
        repeatPoint: number
        gcd: number
    }
    console.timeLog("division", "fetch from api/division")
    if (result.decimal.length > 100) {
        result.decimal = result.decimal.slice(0, 100)   
    }
    output.value = result.quotient
    if (result.decimal) output.value += "." + result.decimal
    gcd.value = result.gcd
    repeat.value = result.repeatPoint
    const ln = result.decimal.length - result.repeatPoint
    outputRepeat.value = repeat.value > 0 ? ".".repeat(ln + 1) : ""
    const list = []
    for (let i = 0; i < result.remainderList.length; i++) {
        list.push({
            step: i + 1,
            remainder: result.remainderList[i],
            quotient: i == 0 ? result.quotient : result.decimal[i-1],
            repeat: i > 0 && i >= result.repeatPoint ? "*" : "",
        })
    }
    console.timeLog("division", "create list")
    rows.value = list
    console.timeEnd("division")
}
</script>
<style scoped></style>
