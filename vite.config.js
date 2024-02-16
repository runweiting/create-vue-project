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
  // 在開發模式下生成 CSS 的源映射（Source Map），在開發過程中，當檢查網頁元素時，能夠準確地找到 CSS 樣式定義來源，從而更容易進行調試和定位問題
  css: {
    devSourcemap: true,
  },
});
