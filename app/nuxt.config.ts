import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000',
        DATABASE_URL: process.env.DATABASE_URL,
    },
    css: ['vuetify/lib/styles/main.sass'],
    build: {
        transpile: ['vuetify']
    },
    vite: {
        define: {
            'process.env.DEBUG': 'false',
        }
    }
})
