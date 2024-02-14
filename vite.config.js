import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 在網頁上看到 ESLint 警告
import eslintPlugin from 'vite-plugin-eslint';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/create-vue-project/',
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
