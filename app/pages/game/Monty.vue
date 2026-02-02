<template>
    <div class="game-container">
        <h1>{{ coins }} เหรียญ</h1>
        <div class="bet-controls">
            <label>เดิมพัน: </label>
            <input
                type="number"
                v-model.number="betAmount"
                min="1"
                :max="coins"
                :disabled="!isAllOpened && selected != -1"
            />
        </div>
        <h2>{{ message }}</h2>
        <div>
            <button
                class="card"
                :class="{
                    selected: card.id == selected,
                    'no-hover': isAllOpened,
                    closed: !card.isOpened,
                }"
                v-for="card in cards"
                :key="card.id"
                @click="select(card)"
            >
                <h3>{{ card.name }}</h3>
                <img src="/assets/game/question.svg" v-show="!card.isOpened" />
                <img
                    src="/assets/game/coin.png"
                    v-show="card.isOpened && card.id == coinCard"
                    :class="{ blinking: card.id == selected }"
                />
                <img
                    src="/assets/game/bomb.svg"
                    v-show="card.isOpened && card.id != coinCard"
                    :class="{ blinking: card.id == selected }"
                />
            </button>
        </div>
        <h4>
            ครั้งที่ {{ counter }}
            <progress :value="winrate" max="100" />
            {{ winrate }}%
        </h4>
    </div>
</template>

<script lang="ts" setup>
useHead({
    title: "Monty Hall",
    link: [
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
        },
    ],
})
import { ref, computed } from "vue"

const message = ref("เกมส์เปิดการ์ดหาเหรียญ")
const coins = ref(10)
const betAmount = ref(1)
const counter = ref(0)
const winrate = ref(0)
let selected = ref(-1)
let coinCard = 1
let winCount = 0

interface Card {
    id: number
    name: string
    isOpened: boolean
}

const cards = ref<Card[]>([
    { id: 0, name: "A", isOpened: true },
    { id: 1, name: "B", isOpened: true },
    { id: 2, name: "C", isOpened: true },
])

const isAllOpened = computed(() => cards.value.every((c) => c.isOpened))

function select(card: Card): void {
    if (cards.value[coinCard]!.isOpened) {
        reset()
        return
    }
    if (selected.value == -1) {
        selected.value = card.id
        message.value = "ยืนยัน / เปลี่ยนการ์ด"
        let rc = Math.round(Math.random())
        if (card.id != coinCard) rc = 0
        let x = (card.id + 1 + rc) % cards.value.length
        while (cards.value[x]!.id == coinCard) x = (x + 1) % cards.value.length
        cards.value[x]!.isOpened = true
    } else {
        if (card.id == coinCard) {
            coins.value += betAmount.value * 2
            winCount++
            message.value = `ได้รับเหรียญ +${betAmount.value * 2}`
        } else {
            message.value = "!!! ตูม !!!"
        }
        winrate.value = Math.round((winCount / counter.value) * 10000) / 100
        for (const c of cards.value) c.isOpened = true
        selected.value = card.id
    }
}

function reset(): void {
    if (coins.value == 0 || coins.value < betAmount.value) {
        message.value = "เหรียญไม่พอเดิมพัน"
        return
    }
    for (let x of cards.value) x.isOpened = false
    coinCard = Math.floor(Math.random() * cards.value.length)
    selected.value = -1
    counter.value++
    coins.value -= betAmount.value
    message.value = "เลือกการ์ด 1 ใบ"
    const x = document.activeElement as HTMLElement
    x.blur()
}
</script>

<style lang="css" scoped>
.game-container {
    height: 100%;
    min-height: 100vh;
    padding: 60px 20px;
    text-align: center;
    font-family: "Outfit", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #ecc94b 0%, #d69e2e 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.bet-controls {
    background: white;
    padding: 1rem 2rem;
    border-radius: 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
}

label {
    font-size: 1.5rem;
    font-weight: 800;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

input {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border: 3px solid #e2e8f0;
    border-radius: 1rem;
    width: 5em;
    text-align: center;
    font-weight: 900;
    color: #2d3748;
    background: #f7fafc;
    transition: all 0.2s;
}

input:focus {
    border-color: #ecc94b;
    outline: none;
    box-shadow: 0 0 0 4px rgba(214, 158, 46, 0.2);
    transform: scale(1.05);
}

h2 {
    font-size: 2.5rem;
    color: #2d3748;
    margin: 1rem 0;
    height: 1.5em;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
}

h3 {
    font-size: 3rem;
    margin: 0;
    color: #dd6b20;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.5);
    font-weight: 900;
}

h4 {
    margin-top: 2rem;
    font-size: 1.2rem;
    color: #718096;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
}

progress {
    accent-color: #ecc94b;
    height: 1rem;
    border-radius: 0.5rem;
    margin: 0 1rem;
    width: 200px;
}

img {
    height: 8em;
    padding: 10px;
    margin: auto;
}

.card:not(.no-hover):hover {
    opacity: 1;
    color: orange;
    border-color: orange;
}

.card.selected {
    color: red;
    border-color: red;
    border-width: 0.5em;
}

.card.closed {
    opacity: 0.4;
    background: black;
}

.card {
    margin: 1em;
    height: 20em;
    width: 12em;
    background: papayawhip;
    color: gray;
    border-width: 0.2em;
    border-color: darkgrey;
    outline-color: red;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.blinking {
    animation: blink 1s infinite;
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
