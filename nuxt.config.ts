// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "nuxt-auth-utils", "@nuxt/test-utils"],
    css: ["@/assets/styles.css"],
    runtimeConfig: {
        public: {
            buildTime: new Date().getTime(),
        },
        session: {
            maxAge: 36_000,
            password: process.env.NUXT_SESSION_PASSWORD || "1234567_1234567_1234567_12345678",
        },
    },
    nitro: {
        storage: {
            data: {
                driver: process.env.REDIS_URL? "redis" : "memory",
                url: process.env.REDIS_URL || "",
            },
        },
    },
    app: {
        head: {
            titleTemplate: "%s - TomNJerry",
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
            ],
        },
    },
})
