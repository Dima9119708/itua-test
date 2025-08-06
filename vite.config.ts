import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    base: process.env.VITE_APP_BASENAME,
    define: {
        'import.meta.env.VITE_APP_BASENAME': JSON.stringify(process.env.VITE_APP_BASENAME),
    },
})
