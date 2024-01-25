<script>
import Swal from 'sweetalert2';
import Modal from 'bootstrap/js/dist/modal';

export default {
    props: {
        tempData: Object,
        isNew: Boolean,
        showAddImgSection: Boolean,
    },
    data() {
        return {
            // 新增 apiUrl、apiPath
            apiUrl: import.meta.env.VITE_URL,
            apiPath: import.meta.env.VITE_PATH,
            editModal: null,
            selectedRating: 0,
        }
    },
    mounted() {
        this.editModal = new Modal(document.querySelector('#editModal'), {
            // 禁用鍵盤 Esc 關閉 modal
            keyboard: false,
            // 禁止點擊 Modal 以外區域以關閉對話框
            backdrop: 'static',
        });
    },
    methods: {
        // 多圖新增 - 顯示/隱藏 新增圖片區塊
        toggleAddImg() {
            this.$emit('toggleAddImg')
        },
        // 多圖新增 - 新增/刪除圖片
        modifyImg(action) {
            if (action === 'add') {
                // 如果 imagesUrl 不存在或 null，則初始化 imagesUrl 為包含一個空字串的陣列
                if(!this.tempData.imagesUrl) {
                    this.tempData.imagesUrl = [''];
                };
                // 新增一個空字串到 imagesUrl 中，以觸發 v-if + v-for 渲染
                this.tempData.imagesUrl.push('')
            } else if (action === 'delete') {
                // 如果 imagesUrl 中有多於一個元素，則刪除最後一個元素
                if(this.tempData.imagesUrl.length > 1) {
                this.tempData.imagesUrl.pop();
                // 如果 imagesUrl 中只有一個元素，則將其重設為包含一個空字串的陣列，同時隱藏新增圖片區塊
                } else {
                this.tempData.imagesUrl = [''];
                this.showAddImgSection = false;
                }
            }
        }, 
        // POST 新增商品 or PUT 編輯商品
        updateData() {
            // -> 新增商品
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let method = 'post';
            // -> 編輯現有商品
            if (!this.isNew) {
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempData.id}`;
                method = 'put'
            }
            this.axios[method](url, {
                data: this.tempData,
            })
            .then((res)=> {
                Swal.fire({
                    title: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            })
            .then(()=> {
                this.editModal.hide();
                this.$emit('update');
            })
            .catch((err)=> {
                Swal.fire({
                    title: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                    })
            })
        },
        // 上傳圖片
        upload() {
            const fileInput = document.querySelector('#formFile');
            // 取出 fileInput 內的 file 物件
            const file = fileInput.files[0];
            // 新增 formData 物件
            const formData = new FormData;
            // 在 formData 最後一個子節點插入 file 和 'file-to-upload'
            formData.append('file-to-upload', file);
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/upload`;
            this.axios
            .post(url, formData)
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>

<template>
    <!-- editModal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">
                        <span v-if="isNew">新增商品</span>
                        <span v-else>編輯商品</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-4">
                                    <label for="imgUrl" class="form-label">主要圖片</label>
                                    <input v-model="tempData.imageUrl" type="url" class="form-control mb-2" id="imgUrl" placeholder="請輸入網址">
                                    <img :src="tempData.imageUrl" class="img-fluid">
                                </div>
                                <!-- 多圖新增 -->
                                <h4 class="fw-bold">多圖新增</h4>
                                <div v-if="showAddImgSection" class="mb-4">
                                    <!-- // ? v-if 隱藏圖片網址區塊 -->
                                    <div v-for="(url, key) in tempData.imagesUrl" :key="key">
                                        <label :for="`url${key}`" class="form-label">圖片網址</label>
                                        <input :id="`url${key}`" v-model="tempData.imagesUrl[key]" type="url" class="form-control mb-2"  placeholder="請輸入網址">
                                        <img :src="tempData.imagesUrl[key]" class="img-fluid mb-2">
                                    </div>
                                    <div class="d-flex gap-2">
                                        <button @click="modifyImg('add')" type="button" class="btn btn-outline-primary w-100">新增圖片</button>
                                        <button @click="modifyImg('delete')" type="button" class="btn btn-outline-danger w-100">刪除圖片</button>
                                    </div>
                                </div>
                                <div v-else class="mb-4">
                                    <!-- // ? v-else 顯示新增圖片按鈕 -->
                                    <button @click="toggleAddImg" type="button" class="btn btn-outline-primary w-100">新增圖片</button>
                                </div>
                                <!-- 上傳圖片 -->
                                <h4 class="fw-bold">上傳圖片</h4>
                                <div class="mb-4">
                                    <input @change="upload" class="form-control" type="file" id="formFile" placeholder="請輸入圖片連結">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <label for="title" class="form-label">標題</label>
                                <input v-model="tempData.title" type="text" class="form-control mb-4" name="title" placeholder="請輸入標題">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="category" class="form-label">分類</label>
                                        <input v-model="tempData.category" type="text" class="form-control mb-4" id="category" placeholder="請輸入分類">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="unit" class="form-label">單位</label>
                                        <input v-model="tempData.unit" type="text" class="form-control mb-4" id="unit" placeholder="請輸入單位">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="original_price" class="form-label">原價</label>
                                        <input v-model.number="tempData.origin_price" type="number" min="0" class="form-control mb-4" id="original_price" placeholder="請輸入原價">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="price" class="form-label">售價</label>
                                        <input v-model.number="tempData.price" type="number" min="0" class="form-control mb-4" id="price" placeholder="請輸入售價">
                                    </div>
                                </div>
                                <hr>
                                <div>
                                    <label for="textarea" class="form-label">商品描述</label>
                                    <textarea v-model="tempData.description" class="form-control mb-4" placeholder="請輸入商品描述" id="textarea"></textarea>
                                </div>
                                <div>
                                    <label for="textarea" class="form-label">說明內容</label>
                                    <textarea v-model="tempData.content" class="form-control mb-4" placeholder="請輸入說明內容" id="textarea"></textarea>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="range" class="form-label">商品評價</label>
                                        <span class="ms-2 text-primary fw-bold fs-5">{{ selectedRating }} 分</span>
                                        <input v-model="selectedRating" type="range" class="form-range" min="0" max="5" step="1">
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-check">
                                            <input v-model="tempData.is_enabled" class="form-check-input" type="checkbox" id="checkbox">
                                            <label class="form-check-label" for="checkbox">
                                                是否啟用
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button 
                    @click="updateData" type="button" class="btn btn-primary">確認</button>
                </div>
            </div>
        </div>
    </div>
</template>