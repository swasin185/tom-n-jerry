import { defineNuxtPlugin } from "#app"
import { install as VueCheetahGrid } from "vue-cheetah-grid"
import "cheetah-grid/main.css"

// Be used in Division.vue
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueCheetahGrid)
})
