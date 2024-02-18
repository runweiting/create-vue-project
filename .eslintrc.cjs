/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    // ESLint 會依照以下順序檢查規範
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    // 讓 ESLint 支援 Airbnb 規範
    "airbnb-base",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  settings: {
    // 讓 ESLint 可以正常解析 @ 的路徑
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".vue"],
      },
      node: {
        extensions: [".js", ".jsx", ".json", ".vue"],
        paths: ["src"],
      },
    },
    // import/core-modules 告訴 ESLint 這些套件是可以安裝在 devDependencies 裡面的，而不是 dependencies 裡面
    "import/core-modules": ["vite", "@vitejs/plugin-vue"],
  },
};
