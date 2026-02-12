<template>
    <div
        id="toolbar"
        style="
            background: crimson;
            width: 180px;
            float: left;
            padding: 10px 10px;
            border: 2px solid;
            margin: 20px;
        "
    >
        <label id="sizeLabel" for="sizeInput">Size:</label>
        <input
            type="number"
            id="sizeInput"
            min="10"
            max="1000"
            step="10"
            value="100"
            style="width: 50px; float: right; text-align: right"
        />
        <input
            type="range"
            id="sizeSlider"
            min="10"
            max="1000"
            step="10"
            value="100"
            @input="sizeInput.value = sizeSlider.value"
        />
        <label id="connectLabel" for="connInput">Connect:</label>
        <input
            type="number"
            id="connInput"
            min="0"
            max="1"
            step="0.1"
            value="0.5"
            style="width: 50px; float: right; text-align: right"
        />
        <input
            type="range"
            id="connSlider"
            min="0"
            max="1"
            step="0.1"
            value="0.5"
            @input="connInput.value = connSlider.value"
        />
        <br />
        <label id="delayLabel" for="delayInput">Delay:</label>
        <input
            type="number"
            id="delayInput"
            min="0"
            max="100"
            step="1"
            value="5"
            style="width: 50px; float: right; text-align: right"
        />
        <input
            type="range"
            id="delaySlider"
            min="0"
            max="100"
            step="1"
            value="5"
            @input="delayInput.value = delaySlider.value"
        />
        <br />
        <label for="wait">waiting </label>
        <input type="checkbox" id="waiting" checked="true" />
        <hr />
        <div class="progress-container">
            <div class="progress-bar" :style="{ width: progressPercent + '%' }">
            </div>
            <span class="progress-label">{{ activeRunners }} / {{ totalRunners }}</span>
        </div>
        <hr />
        <input type="button" class="button" id="new" value="New" @click="genMaze()" />
        <br />
        <!-- <input type="button" class="button" id="reset" value="Reset" @click="maze.reset()" />
        <br /> -->
        <input
            id="start"
            type="button"
            class="button"
            value="Start"
            @click="maze.solveMaze(Number(delayInput.value), waiting.checked)"
        />
        <br />
    </div>
    <canvas
        id="maze2"
        width="660"
        height="660"
        style="background: #800402; color: lightgray; margin-top: 20px"
        @click="clickXY"
    ></canvas>
</template>

<script lang="ts" setup>

// definePageMeta({ keepalive: true })

useHead({
    title: "Maze",
})

import Maze2 from "./Maze2"

let sizeInput: HTMLInputElement
let sizeSlider: HTMLInputElement
let connInput: HTMLInputElement
let connSlider: HTMLInputElement
let delayInput: HTMLInputElement
let delaySlider: HTMLInputElement
let waiting: HTMLInputElement
let maze: Maze2
const activeRunners = ref(0)
const totalRunners = ref(0)
const progressPercent = computed(() =>
    totalRunners.value > 0 ? (activeRunners.value / totalRunners.value) * 100 : 0
)

onMounted(() => {
    sizeInput = document.getElementById("sizeInput") as HTMLInputElement
    sizeSlider = document.getElementById("sizeSlider") as HTMLInputElement
    connInput = document.getElementById("connInput") as HTMLInputElement
    connSlider = document.getElementById("connSlider") as HTMLInputElement
    delayInput = document.getElementById("delayInput") as HTMLInputElement
    delaySlider = document.getElementById("delaySlider") as HTMLInputElement
    waiting = document.getElementById("waiting") as HTMLInputElement
    maze = new Maze2("maze2")
    maze.setOnStatsUpdate((active, total) => {
        activeRunners.value = active
        totalRunners.value = total
    })
    genMaze()
})

function genMaze(): void {
    maze.init(Number(sizeInput.value), Number(sizeInput.value))
    maze.generate(Number(connInput.value), Number(delayInput.value))
}

function clickXY(event: MouseEvent): void {
    maze.clickXY(event)
}
</script>

<style scoped>
.button {
    text-align: center;
    background-color: #0354ae;
    padding: 10px 20px;
    border: 2px solid;
    border-radius: 0.5rem;
    margin-top: 5px;
    margin-bottom: 5px;
    color: cyan;
    cursor: pointer;
    font-size: 16px;
    width: 160px;
}

.progress-container {
    position: relative;
    height: 32px;
    background: #333;
    border-radius: 11px;
    overflow: hidden;
    border: 1px solid #555;
    margin: 10px
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #0a84ff, #30d158);
    border-radius: 11px;
    transition: width 0.3s ease;
}

.progress-label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}
</style>
