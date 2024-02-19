<script>
export default {
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_APP_URL,
      apiPath: import.meta.env.VITE_APP_PATH,
      user: {
        username: '',
        password: '',
      },
      products: [],
      title: '上傳圖片',
    };
  },
  created() {
    // 從 cookies 讀取 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    // axios headers 預設寫法
    this.axios.defaults.headers.common.Authorization = token;
    const url = `${this.apiUrl}/api/${this.apiPath}/products/all`;
    this.axios.get(url);
  },
  methods: {
    upload() {
      const fileInput = document.querySelector('#formFile');
      // 取出 fileInput 內的 file 物件
      const file = fileInput.files[0];
      // 新增 formData 物件
      const formData = new FormData();
      // 在 formData 最後一個子節點插入 file 和 'file-to-upload'
      formData.append('file-to-upload', file);
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/upload`;
      this.axios.post(url, formData);
    },
  },
};
</script>

<template>
  <div class="col-md-8 py-2">
    <h2>{{ title }}</h2>
    <div class="mb-3">
      <input
        @change="upload"
        class="form-control"
        type="file"
        id="formFile"
        placeholder="請輸入圖片連結"
      />
    </div>
  </div>
</template>

<style scoped></style>
